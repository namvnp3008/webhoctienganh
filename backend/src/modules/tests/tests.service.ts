import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TestsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { skill?: string; examTypeId?: string; difficulty?: string; search?: string }) {
    const where: any = {
      status: 'published',
    };

    if (query.skill && query.skill !== 'all') {
      where.skill = query.skill;
    }
    if (query.examTypeId && query.examTypeId !== 'all') {
      where.examTypeId = query.examTypeId;
    }
    if (query.difficulty && query.difficulty !== 'all') {
      where.difficulty = query.difficulty;
    }
    if (query.search) {
      where.title = { contains: query.search, mode: 'insensitive' };
    }

    return this.prisma.test.findMany({
      where,
      include: {
        examType: true,
        _count: {
          select: { attempts: true, sections: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const test = await this.prisma.test.findUnique({
      where: { id },
      include: {
        examType: true,
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
    });

    if (!test) {
      throw new NotFoundException('Không tìm thấy đề thi');
    }
    return test;
  }

  async create(teacherId: string, data: any) {
    return this.prisma.test.create({
      data: {
        title: data.title,
        description: data.description,
        examTypeId: data.examTypeId || 'ielts',
        skill: data.skill || 'full',
        difficulty: data.difficulty || 'medium',
        durationMinutes: data.durationMinutes || 60,
        coverUrl: data.coverUrl,
        status: data.status || 'published',
        answerVisibility: data.answerVisibility || 'hidden',
        answerHideLevel: data.answerHideLevel || 'keep_correctness',
        createdBy: teacherId,
      },
    });
  }

  async updateAnswerVisibility(testId: string, data: { visibility: any; hideLevel: any; releaseAt?: Date }) {
    return this.prisma.test.update({
      where: { id: testId },
      data: {
        answerVisibility: data.visibility,
        answerHideLevel: data.hideLevel,
        answerReleaseAt: data.releaseAt,
      },
    });
  }

  async seedSampleTests(teacherId: string) {
    const count = await this.prisma.test.count();
    if (count > 0) return { message: 'Đã có dữ liệu đề thi' };

    const test = await this.prisma.test.create({
      data: {
        title: 'IELTS Academic Reading Mock Test 1 - Climate & Ecosystems',
        description: 'Đề thi thử IELTS Reading học thuật tiêu chuẩn với 3 bài đọc chuyên sâu, đầy đủ dạng True/False/Not Given và Multiple Choice.',
        examTypeId: 'ielts',
        skill: 'reading',
        difficulty: 'medium',
        durationMinutes: 60,
        coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
        status: 'published',
        answerVisibility: 'hidden',
        answerHideLevel: 'keep_correctness',
        createdBy: teacherId,
        sections: {
          create: [
            {
              title: 'Passage 1: The Secret Life of Coral Reefs',
              instruction: 'You should spend about 20 minutes on Questions 1-5, which are based on Reading Passage 1 below.',
              orderIndex: 1,
              durationMinutes: 20,
              passageText: `Coral reefs are among the most biologically diverse ecosystems on Earth. Covering less than 0.1% of the ocean floor, they are home to at least 25% of all marine species. Reefs provide essential services such as shoreline protection, coastal economies support, and potential medicinal compounds. However, climate change, specifically rising ocean temperatures leading to mass coral bleaching events, poses an existential threat to these delicate environments. When water temperatures exceed normal summer highs by just 1-2 degrees Celsius for sustained periods, corals expel their symbiotic zooxanthellae algae, turning bone white and risking starvation.`,
              questionGroups: {
                create: [
                  {
                    instruction: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
                    orderIndex: 1,
                    questions: {
                      create: [
                        {
                          type: 'true_false_ng',
                          content: 'Coral reefs cover more than 1% of the entire ocean floor.',
                          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                          correctAnswers: ['FALSE'],
                          points: 1.0,
                          explanation: 'The passage explicitly states: "Covering less than 0.1% of the ocean floor". Hence, the statement is FALSE.',
                          orderIndex: 1,
                        },
                        {
                          type: 'true_false_ng',
                          content: 'At least one quarter of all marine organisms depend on coral reefs.',
                          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                          correctAnswers: ['TRUE'],
                          points: 1.0,
                          explanation: 'The passage says: "...they are home to at least 25% of all marine species." 25% is one quarter.',
                          orderIndex: 2,
                        },
                        {
                          type: 'true_false_ng',
                          content: 'Bleaching occurs when ocean temperatures rise by 5 degrees Celsius or more.',
                          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                          correctAnswers: ['FALSE'],
                          points: 1.0,
                          explanation: 'The passage states bleaching happens when temperatures exceed normal highs by "just 1-2 degrees Celsius".',
                          orderIndex: 3,
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });

    return { message: 'Đã khởi tạo đề thi mẫu thành công', test };
  }

  async importExcel(teacherId: string, payload: any) {
    const { title, examTypeId = 'ielts', skill = 'full', durationMinutes = 60, difficulty = 'medium', sections = [] } = payload;
    
    return this.prisma.$transaction(async (tx) => {
      const test = await tx.test.create({
        data: {
          title,
          examTypeId,
          skill,
          durationMinutes,
          difficulty,
          status: 'published',
          answerVisibility: 'show_after_submit',
          answerHideLevel: 'keep_correctness',
          createdBy: teacherId,
        },
      });

      for (let sIdx = 0; sIdx < sections.length; sIdx++) {
        const s = sections[sIdx];
        const section = await tx.section.create({
          data: {
            testId: test.id,
            title: s.title || `Section ${sIdx + 1}`,
            instruction: s.instruction,
            orderIndex: sIdx + 1,
            passageText: s.passageText,
            audioUrl: s.audioUrl,
          },
        });

        const groups = s.questionGroups || [{ questions: s.questions || [] }];
        for (let gIdx = 0; gIdx < groups.length; gIdx++) {
          const g = groups[gIdx];
          const group = await tx.questionGroup.create({
            data: {
              sectionId: section.id,
              instruction: g.instruction || 'Answer the questions below',
              orderIndex: gIdx + 1,
            },
          });

          const questions = g.questions || [];
          for (let qIdx = 0; qIdx < questions.length; qIdx++) {
            const q = questions[qIdx];
            await tx.question.create({
              data: {
                groupId: group.id,
                type: q.type || 'multiple_choice',
                content: q.content,
                options: q.options || [],
                correctAnswers: q.correctAnswers || [q.correctAnswer],
                points: q.points || 1.0,
                explanation: q.explanation || '',
                orderIndex: qIdx + 1,
              },
            });
          }
        }
      }

      return {
        message: 'Import đề thi từ file thành công',
        testId: test.id,
        sectionsCount: sections.length,
      };
    });
  }

  async getAnalytics(testId: string) {
    const test = await this.prisma.test.findUnique({
      where: { id: testId },
      include: {
        attempts: {
          where: { status: 'submitted' },
          include: {
            answers: {
              include: { question: true },
            },
          },
        },
      },
    });

    if (!test) {
      throw new NotFoundException('Không tìm thấy đề thi');
    }

    const attempts = test.attempts;
    const totalAttempts = attempts.length;

    if (totalAttempts === 0) {
      return {
        testId,
        title: test.title,
        totalAttempts: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        scoreDistribution: {
          '0-30%': 0,
          '30-50%': 0,
          '50-70%': 0,
          '70-85%': 0,
          '85-100%': 0,
        },
        questionAccuracy: [],
      };
    }

    const scores = attempts.map((a) => Number(a.totalScore || 0));
    const avgScore = Number((scores.reduce((sum, s) => sum + s, 0) / totalAttempts).toFixed(2));
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);

    const distribution = {
      '0-30%': 0,
      '30-50%': 0,
      '50-70%': 0,
      '70-85%': 0,
      '85-100%': 0,
    };

    scores.forEach((s) => {
      const pct = (s / 10) * 100; // Normalized 10 scale
      if (pct < 30) distribution['0-30%']++;
      else if (pct < 50) distribution['30-50%']++;
      else if (pct < 70) distribution['50-70%']++;
      else if (pct < 85) distribution['70-85%']++;
      else distribution['85-100%']++;
    });

    // Question Accuracy Ranking
    const questionStats: Record<string, { content: string; correct: number; total: number }> = {};
    attempts.forEach((a) => {
      a.answers.forEach((ans) => {
        if (!questionStats[ans.questionId]) {
          questionStats[ans.questionId] = {
            content: ans.question.content,
            correct: 0,
            total: 0,
          };
        }
        questionStats[ans.questionId].total++;
        if (ans.isCorrect) {
          questionStats[ans.questionId].correct++;
        }
      });
    });

    const questionAccuracy = Object.entries(questionStats).map(([qId, stat]) => ({
      questionId: qId,
      content: stat.content,
      accuracyRate: Math.round((stat.correct / (stat.total || 1)) * 100),
      totalAttempts: stat.total,
    })).sort((a, b) => a.accuracyRate - b.accuracyRate); // hardest questions first

    return {
      testId,
      title: test.title,
      totalAttempts,
      averageScore: avgScore,
      highestScore: maxScore,
      lowestScore: minScore,
      scoreDistribution: distribution,
      questionAccuracy,
    };
  }
}

