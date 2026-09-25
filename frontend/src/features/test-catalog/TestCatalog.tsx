import React, { useState, useEffect } from 'react';
import { Search, Clock, FileText, CheckCircle2, ChevronRight, Sparkles, Filter } from 'lucide-react';

interface TestCatalogProps {
  onSelectTest: (testId: string) => void;
  user: any;
}

export const TestCatalog: React.FC<TestCatalogProps> = ({ onSelectTest, user }) => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback initial tests if API is not yet running locally
  const defaultSampleTests = [
    {
      id: 'mock-ielts-reading-1',
      title: 'IELTS Academic Reading Mock Test 1 - Climate & Ecosystems',
      description: 'Đề thi thử IELTS Reading học thuật tiêu chuẩn với 3 bài đọc chuyên sâu, đầy đủ dạng True/False/Not Given và Multiple Choice.',
      skill: 'reading',
      examTypeId: 'ielts',
      difficulty: 'medium',
      durationMinutes: 60,
      totalQuestions: 40,
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'mock-toeic-lr-1',
      title: 'TOEIC Full Practice Test 2026 - Economy Format',
      description: 'Luyện đề TOEIC trắc nghiệm 200 câu Listening & Reading với đồng hồ đếm ngược tiêu chuẩn 120 phút ETS.',
      skill: 'full',
      examTypeId: 'toeic',
      difficulty: 'hard',
      durationMinutes: 120,
      totalQuestions: 200,
      coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'mock-ielts-writing-1',
      title: 'IELTS Writing Task 1 & Task 2 - AI Rubric Co-Grader',
      description: 'Phòng thi Writing chuyên sâu. Viết bài và nhận bản đánh giá 4 tiêu chí (TR, CC, LR, GRA) từ Gemini 2.5 Flash trong 10 giây.',
      skill: 'writing',
      examTypeId: 'ielts',
      difficulty: 'medium',
      durationMinutes: 60,
      totalQuestions: 2,
      coverUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    },
  ];

  useEffect(() => {
    fetch('/api/tests')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTests(data);
        } else {
          setTests(defaultSampleTests);
        }
      })
      .catch(() => {
        setTests(defaultSampleTests);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTests = tests.filter((t) => {
    const matchSkill = selectedSkill === 'all' || t.skill === selectedSkill;
    const matchSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSkill && matchSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Computer-based Testing & AI Assessment
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Luyện Thi Thông Minh <br />
            <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Chấm Điểm Chuẩn Quốc Tế
            </span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Mô phỏng 100% giao diện thi máy tính IELTS CBT và TOEIC. Trợ lý AI phân tích lỗi chi tiết và đề xuất phương án cải thiện điểm số tức thì.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'Tất cả kỹ năng' },
            { id: 'reading', label: 'Reading' },
            { id: 'listening', label: 'Listening' },
            { id: 'writing', label: 'Writing AI' },
            { id: 'speaking', label: 'Speaking AI' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSkill(item.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSkill === item.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm đề thi..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Test Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-slate-800">
                <img
                  src={test.coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'}
                  alt={test.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow">
                    {test.examTypeId || 'IELTS'}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                    {test.skill}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {test.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {test.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{test.durationMinutes} phút</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{test.totalQuestions || 40} câu hỏi</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onSelectTest(test.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 group-hover:bg-indigo-600 text-slate-200 group-hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>Vào Phòng Thi</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
