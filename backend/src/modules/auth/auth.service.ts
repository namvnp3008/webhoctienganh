import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: { email: string; password: string; fullName: string }) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });
    if (existing) {
      throw new BadRequestException('Email đã được sử dụng');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await this.prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        passwordHash,
        fullName: data.fullName.trim(),
        role: 'student',
        dailyAiQuota: 20,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isOwner: true,
        dailyAiQuota: true,
      },
    });

    const token = this.generateToken(user);
    return { user, ...token };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    if (user.status === 'locked') {
      throw new UnauthorizedException('Tài khoản đã bị tạm khóa');
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isOwner: user.isOwner,
      dailyAiQuota: user.dailyAiQuota,
    };

    const token = this.generateToken(safeUser);
    return { user: safeUser, ...token };
  }

  private generateToken(user: { id: string; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
    };
  }

  // --- ADM-18: Teacher Account Management ---
  async getTeachers() {
    return this.prisma.user.findMany({
      where: { role: 'admin' },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        isOwner: true,
        createdAt: true,
        _count: {
          select: {
            createdTests: true,
            classesOwned: true,
            reviewsDone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createTeacher(data: { email: string; password: string; fullName: string }) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });
    if (existing) {
      throw new BadRequestException('Email giáo viên đã tồn tại trên hệ thống');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        passwordHash,
        fullName: data.fullName.trim(),
        role: 'admin',
        dailyAiQuota: 100,
        status: 'active',
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async toggleTeacherStatus(teacherId: string) {
    const teacher = await this.prisma.user.findUnique({
      where: { id: teacherId },
    });
    if (!teacher) {
      throw new BadRequestException('Không tìm thấy giáo viên');
    }

    const newStatus = teacher.status === 'active' ? 'locked' : 'active';
    return this.prisma.user.update({
      where: { id: teacherId },
      data: { status: newStatus },
      select: {
        id: true,
        email: true,
        fullName: true,
        status: true,
      },
    });
  }

  // --- ADM-19: Owner System Quota & Retention Settings ---
  async getSystemSettings() {
    const totalStudents = await this.prisma.user.count({ where: { role: 'student' } });
    const totalTeachers = await this.prisma.user.count({ where: { role: 'admin' } });
    const totalTests = await this.prisma.test.count();
    const totalAttempts = await this.prisma.attempt.count();

    return {
      defaultDailyAiQuota: 20,
      audioRetentionDays: 30,
      allowAiSelfEvaluation: true,
      metrics: {
        totalStudents,
        totalTeachers,
        totalTests,
        totalAttempts,
      },
      auditLogs: [
        { action: 'UPDATE_AI_QUOTA', details: 'Hạn mức mặc định: 20 lượt/ngày', timestamp: new Date() },
        { action: 'AUDIO_RETENTION_POLICY', details: 'Chính sách lưu trữ ghi âm: 30 ngày', timestamp: new Date() },
      ],
    };
  }

  async updateSystemSettings(data: { defaultDailyAiQuota?: number; audioRetentionDays?: number }) {
    if (data.defaultDailyAiQuota) {
      // Bulk update default quota for students
      await this.prisma.user.updateMany({
        where: { role: 'student' },
        data: { dailyAiQuota: data.defaultDailyAiQuota },
      });
    }

    return {
      success: true,
      message: 'Cập nhật cấu hình hệ thống thành công',
      settings: {
        defaultDailyAiQuota: data.defaultDailyAiQuota ?? 20,
        audioRetentionDays: data.audioRetentionDays ?? 30,
      },
    };
  }
}

