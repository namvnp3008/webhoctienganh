import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; fullName: string }) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: any) {
    return { user };
  }

  // --- ADM-18: Teacher Management ---
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin/teachers')
  async getTeachers() {
    return this.authService.getTeachers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('admin/teachers')
  async createTeacher(@Body() body: { email: string; password: string; fullName: string }) {
    return this.authService.createTeacher(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('admin/teachers/:id/toggle-status')
  async toggleTeacherStatus(@Param('id') teacherId: string) {
    return this.authService.toggleTeacherStatus(teacherId);
  }

  // --- ADM-19: System Settings ---
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin/system-settings')
  async getSystemSettings() {
    return this.authService.getSystemSettings();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('admin/system-settings')
  async updateSystemSettings(
    @Body() body: { defaultDailyAiQuota?: number; audioRetentionDays?: number },
  ) {
    return this.authService.updateSystemSettings(body);
  }
}

