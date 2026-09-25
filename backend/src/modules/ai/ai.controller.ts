import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AIService } from './ai.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('api/ai')
@UseGuards(JwtAuthGuard)
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('evaluate-writing')
  async evaluateWriting(
    @CurrentUser('id') userId: string,
    @Body() body: { essay: string; prompt: string },
  ) {
    return this.aiService.evaluateWriting(userId, body);
  }

  @Post('evaluate-dictation')
  async evaluateDictation(
    @CurrentUser('id') userId: string,
    @Body() body: { reference: string; studentInput: string },
  ) {
    return this.aiService.evaluateDictation(userId, body);
  }

  @Post('evaluate-pronunciation')
  async evaluatePronunciation(
    @CurrentUser('id') userId: string,
    @Body() body: { reference: string },
  ) {
    return this.aiService.evaluatePronunciation(userId, body);
  }
}
