import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AnswerSanitizerInterceptor } from '../../common/interceptors/answer-sanitizer.interceptor';

@Controller('api/tests')
export class TestsController {
  constructor(private testsService: TestsService) {}

  @Get()
  async getTests(
    @Query('skill') skill?: string,
    @Query('examTypeId') examTypeId?: string,
    @Query('difficulty') difficulty?: string,
    @Query('search') search?: string,
  ) {
    return this.testsService.findAll({ skill, examTypeId, difficulty, search });
  }

  @Get(':id')
  @UseInterceptors(AnswerSanitizerInterceptor)
  async getTestDetail(@Param('id') id: string) {
    return this.testsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createTest(@CurrentUser('id') teacherId: string, @Body() body: any) {
    return this.testsService.create(teacherId, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id/answer-visibility')
  async updateAnswerVisibility(
    @Param('id') id: string,
    @Body() body: { visibility: any; hideLevel: any; releaseAt?: string },
  ) {
    return this.testsService.updateAnswerVisibility(id, {
      visibility: body.visibility,
      hideLevel: body.hideLevel,
      releaseAt: body.releaseAt ? new Date(body.releaseAt) : undefined,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('seed-sample')
  async seedSample(@CurrentUser('id') teacherId: string) {
    return this.testsService.seedSampleTests(teacherId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('import-excel')
  async importExcel(@CurrentUser('id') teacherId: string, @Body() body: any) {
    return this.testsService.importExcel(teacherId, body);
  }

  @Get(':id/analytics')
  async getAnalytics(@Param('id') id: string) {
    return this.testsService.getAnalytics(id);
  }
}
