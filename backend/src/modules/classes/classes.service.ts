import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  private generateJoinCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async createClass(teacherId: string, data: { name: string; description?: string }) {
    let joinCode = this.generateJoinCode();
    // Ensure uniqueness
    while (await this.prisma.class.findUnique({ where: { joinCode } })) {
      joinCode = this.generateJoinCode();
    }

    return this.prisma.class.create({
      data: {
        teacherId,
        name: data.name,
        description: data.description,
        joinCode,
      },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });
  }

  async joinClass(userId: string, joinCode: string) {
    const normalized = joinCode.trim().toUpperCase();
    const cls = await this.prisma.class.findUnique({
      where: { joinCode: normalized },
    });

    if (!cls || cls.status !== 'active') {
      throw new NotFoundException('Mã mời không tồn tại hoặc lớp học đã đóng');
    }

    const existing = await this.prisma.classMember.findUnique({
      where: {
        classId_userId: {
          classId: cls.id,
          userId,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('Bạn đã là thành viên của lớp học này');
    }

    await this.prisma.classMember.create({
      data: {
        classId: cls.id,
        userId,
      },
    });

    return { success: true, message: `Tham gia lớp học "${cls.name}" thành công!`, class: cls };
  }

  async getTeacherClasses(teacherId: string) {
    return this.prisma.class.findMany({
      where: { teacherId },
      include: {
        _count: {
          select: { members: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStudentClasses(userId: string) {
    const memberships = await this.prisma.classMember.findMany({
      where: { userId },
      include: {
        class: {
          include: {
            teacher: {
              select: { fullName: true, email: true },
            },
            _count: {
              select: { members: true },
            },
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });

    return memberships.map((m) => m.class);
  }
}
