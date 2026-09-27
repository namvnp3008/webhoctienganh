import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AnswerSanitizerInterceptor } from '../../common/interceptors/answer-sanitizer.interceptor';

@Controller('api/attempts')
@UseGuards(JwtAuthGuard)
export class AttemptsController {
  constructor(private attemptsService: AttemptsService) {}

  @Post('start')
  async startAttempt(
    @CurrentUser('id') userId: string,
    @Body() body: { testId: string; mode?: string },
  ) {
    return this.attemptsService.startAttempt(userId, body.testId, body.mode);
  }

  @Post(':id/auto-save')
  async autoSave(
    @CurrentUser('id') userId: string,
    @Param('id') attemptId: string,
    @Body() body: { answers: Record<string, any> },
  ) {
    return this.attemptsService.autoSave(userId, attemptId, body.answers);
  }

  @Post(':id/submit')
  async submit(
    @CurrentUser('id') userId: string,
    @Param('id') attemptId: string,
    @Body() body: { answers: Record<string, any> },
  ) {
    return this.attemptsService.submitAttempt(userId, attemptId, body.answers);
  }

  @Get(':id/result')
  @UseInterceptors(AnswerSanitizerInterceptor)
  async getResult(
    @CurrentUser('id') userId: string,
    @Param('id') attemptId: string,
  ) {
    return this.attemptsService.getAttemptResult(userId, attemptId);
  }

  @Post('grant-retake')
  async grantRetake(
    @CurrentUser('id') teacherId: string,
    @Body() body: { studentEmail: string; testId: string },
  ) {
    return this.attemptsService.grantRetake(teacherId, body);
  }

  @Get('admin/grading-queue')
  async getGradingQueue(
    @CurrentUser('id') teacherId: string,
  ) {
    return this.attemptsService.getGradingQueue(teacherId);
  }

  @Post('admin/submit-review')
  async submitReview(
    @CurrentUser('id') teacherId: string,
    @Body()
    body: {
      attemptAnswerId: string;
      totalScore: number;
      feedback: string;
      skill: string;
      scores?: any[];
    },
  ) {
    return this.attemptsService.submitReview(teacherId, body.attemptAnswerId, body);
  }

  @Post('admin/cleanup-audio')
  async cleanupAudio() {
    return this.attemptsService.cleanupExpiredAudio();
  }
}
