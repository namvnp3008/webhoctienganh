import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AIService {
  constructor(private prisma: PrismaService) {}

  async checkAndDecrementQuota(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { dailyAiQuota: true },
    });
    if (!user || user.dailyAiQuota <= 0) {
      throw new BadRequestException('Bạn đã sử dụng hết lượt chấm AI miễn phí trong ngày (20 lượt). Vui lòng thử lại vào ngày mai!');
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: { dailyAiQuota: { decrement: 1 } },
    });
  }

  async evaluateWriting(userId: string, data: { essay: string; prompt: string }) {
    await this.checkAndDecrementQuota(userId);

    const wordCount = data.essay.trim().split(/\s+/).filter(Boolean).length;
    let baseBand = 6.0;
    if (wordCount >= 250) baseBand = 6.5;
    if (wordCount >= 300) baseBand = 7.0;
    if (wordCount < 150) baseBand = 5.0;

    // Simulated high-fidelity rubric breakdown according to TECH_ARCHITECTURE.md
    return {
      totalScore: baseBand,
      criterionScores: [
        {
          criterionName: 'Task Achievement',
          score: baseBand,
          feedback: `Bài viết đã phản hồi câu hỏi đề bài với độ dài ${wordCount} từ. Đã nêu được luận điểm chính, cần phát triển thêm ví dụ thực tế.`,
        },
        {
          criterionName: 'Coherence and Cohesion',
          score: baseBand,
          feedback: 'Cấu trúc các đoạn văn rõ ràng, liên kết câu tương đối mạch lạc bằng các từ nối (Furthermore, In conclusion).',
        },
        {
          criterionName: 'Lexical Resource',
          score: baseBand,
          feedback: 'Sử dụng vốn từ vựng phù hợp với chủ đề, có một số từ học thuật tốt.',
        },
        {
          criterionName: 'Grammatical Range and Accuracy',
          score: baseBand,
          feedback: 'Kiểm soát tốt cấu trúc câu đơn và câu ghép, cần chú ý mạo từ và sự hòa hợp chủ vị.',
        },
      ],
      annotations: [
        {
          startIndex: 0,
          endIndex: 15,
          errorText: 'In the modern era',
          errorType: 'vocabulary',
          suggestion: 'In contemporary society',
          explanationVi: 'Sử dụng "contemporary society" sẽ mang tính học thuật (academic style) cao hơn.',
        },
      ],
      generalFeedback: 'Bài viết đạt yêu cầu cơ bản của đề thi IELTS Writing. Để nâng lên Band 7.5+, hãy mở rộng thêm câu phức có mệnh đề quan hệ và các cấu trúc đảo ngữ.',
      wordCount,
    };
  }

  async evaluateDictation(userId: string, data: { reference: string; studentInput: string }) {
    await this.checkAndDecrementQuota(userId);

    const refWords = data.reference.trim().split(/\s+/);
    const stuWords = data.studentInput.trim().split(/\s+/);

    const diff: Array<{ word: string; status: 'correct' | 'missing' | 'wrong' }> = [];
    let correctCount = 0;

    for (let i = 0; i < Math.max(refWords.length, stuWords.length); i++) {
      const ref = refWords[i];
      const stu = stuWords[i];

      if (!stu) {
        diff.push({ word: ref, status: 'missing' });
      } else if (!ref) {
        diff.push({ word: stu, status: 'wrong' });
      } else if (ref.toLowerCase().replace(/[^a-z0-9]/g, '') === stu.toLowerCase().replace(/[^a-z0-9]/g, '')) {
        diff.push({ word: stu, status: 'correct' });
        correctCount++;
      } else {
        diff.push({ word: stu, status: 'wrong' });
      }
    }

    const accuracy = Math.round((correctCount / Math.max(refWords.length, 1)) * 100);

    return {
      accuracy,
      diff,
      explanation: accuracy === 100 
        ? 'Xuất sắc! Bạn đã nghe và chép chính xác 100% câu thoại.'
        : 'Chú ý các từ nối âm và phụ âm cuối (ending sounds). Hãy nghe lại đoạn audio ở tốc độ 0.75x để phân biệt rõ âm tiết bị thiếu.',
    };
  }

  async evaluatePronunciation(userId: string, data: { reference: string }) {
    await this.checkAndDecrementQuota(userId);

    const words = data.reference.trim().split(/\s+/);
    const wordScores = words.map((w) => ({
      word: w,
      score: Math.floor(Math.random() * 20) + 80,
      phonemes: ['/θ/', '/s/', '/t/'],
    }));

    const avgScore = Math.round(wordScores.reduce((acc, curr) => acc + curr.score, 0) / words.length);

    return {
      overallScore: avgScore,
      accuracy: avgScore - 2,
      fluency: avgScore + 1,
      completeness: 98,
      prosody: avgScore - 1,
      wordFeedback: wordScores,
      tipVi: 'Khẩu hình âm /θ/ trong từ "think": Đặt đầu lưỡi giữa hai hàm răng và đẩy luồng hơi nhẹ nhàng ra ngoài.',
    };
  }

  async evaluateSpeaking(
    userId: string,
    data: { topic: string; part: number; transcript?: string; audioDurationSec?: number },
  ) {
    await this.checkAndDecrementQuota(userId);

    const fluencyScore = 7.0;
    const lexicalScore = 7.5;
    const grammarScore = 7.0;
    const pronunciationScore = 7.5;
    const overallBand = 7.5;

    return {
      skill: 'speaking',
      part: data.part || 2,
      topic: data.topic,
      overallBand,
      criterionScores: {
        fluencyAndCoherence: fluencyScore,
        lexicalResource: lexicalScore,
        grammaticalRange: grammarScore,
        pronunciation: pronunciationScore,
      },
      feedback:
        'Bài nói tự nhiên, duy trì được độ trôi chảy xuyên suốt các ý. Từ vựng theo chủ đề được sử dụng linh hoạt với một số cụm Collocation nâng cao. Cần chú ý nhấn trọng âm câu chính xác hơn ở các từ mang nghĩa quan trọng.',
      metrics: {
        speechRateWpm: 135,
        pauseCount: 4,
        fillerWordsCount: 2,
      },
    };
  }

  async getStoragePresignedUrl(
    userId: string,
    data: { fileName: string; fileType: string },
  ) {
    const timestamp = Date.now();
    const cleanFileName = data.fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const objectKey = `audio/${userId}/${timestamp}-${cleanFileName}`;
    const uploadUrl = `https://storage.luminaenglish.com/upload/${objectKey}?token=temp_upload_${timestamp}`;
    const publicUrl = `https://storage.luminaenglish.com/public/${objectKey}`;

    const deleteAfter = new Date();
    deleteAfter.setDate(deleteAfter.getDate() + 30); // 30-day retention

    return {
      uploadUrl,
      publicUrl,
      objectKey,
      deleteAfter,
      expiresInSeconds: 300,
    };
  }
}

