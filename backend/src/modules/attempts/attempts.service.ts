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

  async grantRetake(teacherId: string, payload: { studentEmail: string; testId: string }) {
    const student = await this.prisma.user.findUnique({
      where: { email: payload.studentEmail },
    });
    if (!student) {
      throw new NotFoundException('Không tìm thấy học sinh với email này');
    }

    // Reset or mark last attempt to allow retry
    const lastAttempt = await this.prisma.attempt.findFirst({
      where: { userId: student.id, testId: payload.testId },
      orderBy: { createdAt: 'desc' },
    });

    if (lastAttempt) {
      await this.prisma.attempt.update({
        where: { id: lastAttempt.id },
        data: { mode: 'retake_granted' },
      });
    }

    return {
      message: `Đã cấp thêm lượt thi thành công cho học sinh ${student.fullName} (${student.email})`,
      studentId: student.id,
      testId: payload.testId,
    };
  }

  async getGradingQueue(teacherId: string, filter?: { skill?: string }) {
    const where: any = {
      attempt: { status: 'submitted' },
      question: {
        type: { in: ['writing', 'speaking'] },
      },
      review: null,
    };

    if (filter?.skill) {
      where.question.type = filter.skill;
    }

    return this.prisma.attemptAnswer.findMany({
      where,
      include: {
        question: true,
        attempt: {
          include: {
            user: { select: { id: true, fullName: true, email: true, avatarUrl: true } },
            test: { select: { id: true, title: true, examTypeId: true } },
          },
        },
        aiEvaluation: true,
      },
      orderBy: { attempt: { submittedAt: 'desc' } },
      take: 50,
    });
  }

  async submitReview(
    teacherId: string,
    attemptAnswerId: string,
    body: {
      totalScore: number;
      feedback: string;
      skill: string;
      scores?: { criterionId: string; score: number; comment?: string }[];
    },
  ) {
    const answer = await this.prisma.attemptAnswer.findUnique({
      where: { id: attemptAnswerId },
      include: { review: true },
    });

    if (!answer) {
      throw new NotFoundException('Không tìm thấy bài làm');
    }

    const review = await this.prisma.review.upsert({
      where: { attemptAnswerId },
      create: {
        attemptAnswerId,
        skill: body.skill || 'writing',
        reviewerId: teacherId,
        totalScore: body.totalScore,
        feedback: body.feedback,
        status: 'final',
        reviewedAt: new Date(),
        scores: body.scores
          ? {
              create: body.scores.map((s) => ({
                criterionId: s.criterionId,
                score: s.score,
                comment: s.comment,
              })),
            }
          : undefined,
      },
      update: {
        totalScore: body.totalScore,
        feedback: body.feedback,
        status: 'final',
        reviewedAt: new Date(),
      },
      include: { scores: true },
    });

    return {
      message: 'Đã hoàn tất chấm điểm chính thức theo Rubric',
      review,
    };
  }

  async cleanupExpiredAudio() {
    const now = new Date();
    const result = await this.prisma.speakingResponse.deleteMany({
      where: {
        deleteAfter: { lte: now },
      },
    });

    return {
      message: `Đã dọn dẹp ${result.count} file ghi âm Speaking quá hạn lưu trữ 30 ngày`,
      deletedCount: result.count,
    };
  }
}

