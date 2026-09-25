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
}
