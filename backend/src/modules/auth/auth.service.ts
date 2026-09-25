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
}
