import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AttemptsService {
  constructor(private prisma: PrismaService) {}

  async startAttempt(userId: string, testId: string, mode: string = 'full_test') {
    const test = await this.prisma.test.findUnique({
      where: { id: testId },
      include: {
        sections: {
          include: {
            questionGroups: {
              include: { questions: true },
            },
          },
        },
      },
    });

    if (!test) {
      throw new NotFoundException('Không tìm thấy đề thi');
    }

    if (test.maxAttempts) {
      const pastAttempts = await this.prisma.attempt.count({
        where: { userId, testId },
      });
      if (pastAttempts >= test.maxAttempts) {
        throw new BadRequestException('Bạn đã hết số lượt làm bài cho đề thi này. Hãy liên hệ giáo viên để xin cấp thêm lượt!');
      }
    }

    const attemptNo = (await this.prisma.attempt.count({ where: { userId, testId } })) + 1;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + test.durationMinutes * 60 * 1000);

    const attempt = await this.prisma.attempt.create({
      data: {
        userId,
        testId,
        attemptNo,
        mode,
        startedAt: now,
        expiresAt,
        status: 'in_progress',
      },
      include: {
        test: {
          include: {
            sections: {
              orderBy: { orderIndex: 'asc' },
              include: {
                questionGroups: {
                  orderBy: { orderIndex: 'asc' },
                  include: {
                    questions: {
                      orderBy: { orderIndex: 'asc' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return attempt;
  }

  async autoSave(userId: string, attemptId: string, answersMap: Record<string, any>) {
    const attempt = await this.prisma.attempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt || attempt.userId !== userId) {
      throw new ForbiddenException('Không có quyền truy cập lượt thi này');
    }

    if (attempt.status !== 'in_progress') {
      return { message: 'Bài thi đã nộp hoặc đã kết thúc' };
    }

    for (const [questionId, studentAnswer] of Object.entries(answersMap)) {
      await this.prisma.attemptAnswer.upsert({
        where: {
          // find unique by attemptId and questionId
          id: `${attemptId}_${questionId}`,
        },
        update: {
          answer: studentAnswer,
        },
        create: {
          id: `${attemptId}_${questionId}`,
          attemptId,
          questionId,
          answer: studentAnswer,
        },
      });
    }

    return { success: true, savedAt: new Date() };
  }

  async submitAttempt(userId: string, attemptId: string, finalAnswers: Record<string, any>) {
    const attempt = await this.prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        test: {
          include: {
            sections: {
              include: {
                questionGroups: {
                  include: { questions: true },
                },
              },
            },
          },
        },
      },
    });

    if (!attempt || attempt.userId !== userId) {
      throw new ForbiddenException('Không có quyền thao tác trên lượt thi này');
    }

    if (attempt.status !== 'in_progress') {
      return this.getAttemptResult(userId, attemptId);
    }

    let correctCount = 0;
    let totalQuestions = 0;
    let totalScore = 0;

    for (const section of attempt.test.sections) {
      for (const group of section.questionGroups) {
        for (const question of group.questions) {
          totalQuestions++;
          const studentAns = finalAnswers[question.id] || null;
          const correctAnswers = (question.correctAnswers as any[]) || [];

          let isCorrect = false;
          let earnedPoints = 0;

          if (studentAns !== null && studentAns !== undefined) {
            const normalizedStudent = String(studentAns).trim().toLowerCase();
            const hasMatch = correctAnswers.some(
              (ans) => String(ans).trim().toLowerCase() === normalizedStudent,
            );
            if (hasMatch) {
              isCorrect = true;
              earnedPoints = Number(question.points) || 1.0;
              correctCount++;
              totalScore += earnedPoints;
            }
          }

          await this.prisma.attemptAnswer.upsert({
            where: { id: `${attemptId}_${question.id}` },
            update: {
              answer: studentAns,
              isCorrect,
              score: earnedPoints,
            },
            create: {
              id: `${attemptId}_${question.id}`,
              attemptId,
              questionId: question.id,
              answer: studentAns,
              isCorrect,
              score: earnedPoints,
            },
          });
        }
      }
    }

    // Convert score (IELTS Reading scale approximation: e.g. 3/3 -> 9.0)
    let calculatedBand = totalQuestions > 0 ? (correctCount / totalQuestions) * 9 : 0;
    calculatedBand = Math.round(calculatedBand * 2) / 2; // round to nearest 0.5

    const updatedAttempt = await this.prisma.attempt.update({
      where: { id: attemptId },
      data: {
        submittedAt: new Date(),
        status: 'submitted',
        totalScore: calculatedBand,
      },
      include: {
        test: true,
        answers: {
          include: { question: true },
        },
      },
    });

    return {
      attempt: updatedAttempt,
      correctCount,
      totalQuestions,
      bandScore: calculatedBand,
    };
  }

  async getAttemptResult(userId: string, attemptId: string) {
    const attempt = await this.prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        test: {
          include: {
            sections: {
              orderBy: { orderIndex: 'asc' },
              include: {
                questionGroups: {
                  orderBy: { orderIndex: 'asc' },
                  include: {
                    questions: {
                      orderBy: { orderIndex: 'asc' },
                    },
                  },
                },
              },
            },
          },
        },
        answers: {
          include: {
            question: true,
            aiEvaluation: true,
            review: true,
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundException('Không tìm thấy lượt làm bài');
    }

    return attempt;
  }
}
