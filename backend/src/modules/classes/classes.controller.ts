import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('api/classes')
@UseGuards(JwtAuthGuard)
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  async createClass(
    @CurrentUser('id') teacherId: string,
    @Body() body: { name: string; description?: string },
  ) {
    return this.classesService.createClass(teacherId, body);
  }

  @Post('join')
  async joinClass(
    @CurrentUser('id') userId: string,
    @Body('joinCode') joinCode: string,
  ) {
    return this.classesService.joinClass(userId, joinCode);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('my-teaching')
  async getTeacherClasses(@CurrentUser('id') teacherId: string) {
    return this.classesService.getTeacherClasses(teacherId);
  }

  @Get('my-classes')
  async getStudentClasses(@CurrentUser('id') userId: string) {
    return this.classesService.getStudentClasses(userId);
  }
}
