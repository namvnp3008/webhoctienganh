import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Lumina English: Seeding Database on Supabase ---');

  const passwordHash = await bcrypt.hash('Lumina@2026', 10);

  // 1. Seed Users (Owner, Teachers, Students)
  const owner = await prisma.user.upsert({
    where: { email: 'owner@lumina-english.vn' },
    update: {},
    create: {
      email: 'owner@lumina-english.vn',
      fullName: 'System Owner Administrator',
      passwordHash,
      role: 'admin',
      isOwner: true,
      dailyAiQuota: 999,
      status: 'active',
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher.sarah@lumina.edu.vn' },
    update: {},
    create: {
      email: 'teacher.sarah@lumina.edu.vn',
      fullName: 'Ms. Sarah Jenkins (IELTS 8.5)',
      passwordHash,
      role: 'admin',
      isOwner: false,
      dailyAiQuota: 100,
      status: 'active',
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student.minh@example.com' },
    update: {},
    create: {
      email: 'student.minh@example.com',
      fullName: 'Nguyễn Văn Minh',
      passwordHash,
      role: 'student',
      isOwner: false,
      dailyAiQuota: 20,
      status: 'active',
    },
  });

  console.log('✓ Seeded Users: Owner, Teacher, Student');

  // 2. Seed Exam Types
  const ieltsType = await prisma.examType.upsert({
    where: { id: 'ielts' },
    update: {},
    create: {
      id: 'ielts',
      name: 'IELTS Academic & General Training',
      allowedQuestionTypes: ['single_choice', 'multiple_choice', 'fill_blank', 'matching', 'true_false_ng', 'writing', 'speaking'],
      defaultStructure: { sections: 4, skills: ['listening', 'reading', 'writing', 'speaking'] },
      scoringRules: { scale: 'band', min: 0, max: 9.0, step: 0.5 },
      isSystem: true,
    },
  });

  const toeicType = await prisma.examType.upsert({
    where: { id: 'toeic' },
    update: {},
    create: {
      id: 'toeic',
      name: 'TOEIC Listening & Reading',
      allowedQuestionTypes: ['single_choice', 'multiple_choice'],
      defaultStructure: { sections: 2, skills: ['listening', 'reading'] },
      scoringRules: { scale: 'points', min: 10, max: 990, step: 5 },
      isSystem: true,
    },
  });

  console.log('✓ Seeded ExamTypes: IELTS, TOEIC');

  // 3. Seed Classes & Join Codes
  const sampleClass = await prisma.class.upsert({
    where: { joinCode: 'LUM75A' },
    update: {},
    create: {
      name: 'IELTS Master 7.5+ Intensive (Khóa K26)',
      description: 'Lớp luyện đề chuyên sâu 4 kỹ năng với AI co-grader và giáo viên chấm Rubric chi tiết.',
      joinCode: 'LUM75A',
      teacherId: teacher.id,
      status: 'active',
    },
  });

  // Enroll student
  await prisma.classMember.upsert({
    where: {
      classId_userId: {
        classId: sampleClass.id,
        userId: student.id,
      },
    },
    update: {},
    create: {
      classId: sampleClass.id,
      userId: student.id,
    },
  });

  console.log('✓ Seeded Classes & Enrolled Members');

  // 4. Seed Tests with Sections & Questions
  const test1 = await prisma.test.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      title: 'IELTS Academic Reading Mock Test 1 - Climate & Ecosystems',
      description: 'Đề thi thử IELTS Reading học thuật tiêu chuẩn với 3 bài đọc chuyên sâu, đầy đủ dạng True/False/Not Given và Multiple Choice.',
      examTypeId: ieltsType.id,
      skill: 'reading',
      durationMinutes: 60,
      difficulty: 'medium',
      status: 'published',
      answerVisibility: 'show_after_submit',
      createdBy: teacher.id,
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    },
  });

  const test2 = await prisma.test.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      title: 'TOEIC Full Practice Test 2026 - Economy Format',
      description: 'Luyện đề TOEIC trắc nghiệm 200 câu Listening & Reading với đồng hồ đếm ngược tiêu chuẩn 120 phút ETS.',
      examTypeId: toeicType.id,
      skill: 'full',
      durationMinutes: 120,
      difficulty: 'hard',
      status: 'published',
      answerVisibility: 'show_after_submit',
      createdBy: teacher.id,
      coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    },
  });

  console.log('✓ Seeded Tests: IELTS Reading, TOEIC Full Test');
  console.log('--- Lumina English: Seeding Database Completed Successfully! ---');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
