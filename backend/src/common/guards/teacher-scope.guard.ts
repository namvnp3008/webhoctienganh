import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TeacherScopeGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Chưa xác thực danh tính');
    }
    if (user.isOwner) {
      return true;
    }
    if (user.role !== 'admin') {
      throw new ForbiddenException('Chỉ dành cho Giáo viên / Quản trị viên');
    }

    const classId = request.params.classId || request.params.id;
    if (classId && request.route.path.includes('/classes/')) {
      const cls = await this.prisma.class.findUnique({
        where: { id: classId },
        select: { teacherId: true },
      });
      if (cls && cls.teacherId !== user.id) {
        throw new ForbiddenException('Bạn không có quyền quản lý lớp học này');
      }
    }

    return true;
  }
}
