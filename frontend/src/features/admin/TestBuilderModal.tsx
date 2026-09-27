import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface QuestionDraft {
  type: string;
  content: string;
  options: string[];
  correctAnswers: string[];
  points: number;
  explanation: string;
}

interface TestBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (createdTest: any) => void;
  onPreview?: (testId: string) => void;
}

export const TestBuilderModal: React.FC<TestBuilderModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onPreview,
}) => {
  // Test Level Settings (GV-03)
  const [title, setTitle] = useState('');
  const [examTypeId, setExamTypeId] = useState('ielts');
  const [skill, setSkill] = useState('reading');
  const [difficulty, setDifficulty] = useState('medium');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [maxAttempts, setMaxAttempts] = useState<number | ''>('');
  const [answerVisibility, setAnswerVisibility] = useState('hidden'); // Default 'hidden' per PRD GV-03 / GV-13
  const [allowAiGrading, setAllowAiGrading] = useState(true);

  // Section Level Settings (GV-04)
  const [sectionTitle, setSectionTitle] = useState('Passage 1: Renewable Energy Systems');
  const [sectionInstruction, setSectionInstruction] = useState(
    'You should spend about 20 minutes on Questions 1-5, which are based on Reading Passage 1 below.'
  );
  const [passageText, setPassageText] = useState(
    'Renewable energy sources such as solar and wind power have expanded exponentially over the last decade. Advances in battery storage technology and smart grid integration have dramatically lowered levelized costs of electricity. However, intermittent generation and geographical constraints still present technical hurdles that require international cooperation and infrastructure investment.'
  );
  const [audioUrl, setAudioUrl] = useState('');

  // Questions List (GV-05)
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    {
      type: 'true_false_ng',
      content: 'Renewable energy adoption has grown rapidly over the last ten years.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswers: ['TRUE'],
      points: 1.0,
      explanation: 'The passage explicitly says: "have expanded exponentially over the last decade".',
    },
    {
      type: 'single_choice',
      content: 'What recent advancement has significantly reduced the cost of electricity?',
      options: [
        'Advances in battery storage and smart grid integration',
        'Increased usage of fossil fuel subsidies',
        'Reduction in international cooperation',
        'Elimination of power transmission lines',
      ],
      correctAnswers: ['Advances in battery storage and smart grid integration'],
      points: 1.0,
      explanation: 'Text states advances in battery storage technology and smart grid integration lowered costs.',
    },
    {
      type: 'fill_blank',
      content: 'Renewable energy faces challenges due to _____ generation and geographical constraints.',
      options: [],
      correctAnswers: ['intermittent'],
      points: 1.0,
      explanation: 'The passage mentions "intermittent generation and geographical constraints".',
    },
  ]);

  // Current Question Under Edit
  const [qType, setQType] = useState('single_choice');
  const [qContent, setQContent] = useState('');
  const [qOptions, setQOptions] = useState<string[]>(['Option A', 'Option B', 'Option C', 'Option D']);
  const [qCorrect, setQCorrect] = useState('');
  const [qPoints, setQPoints] = useState(1.0);
  const [qExplanation, setQExplanation] = useState('');
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    if (!qContent.trim()) {
      setErrorMsg('Vui lòng nhập nội dung câu hỏi!');
      return;
    }

    const newQ: QuestionDraft = {
      type: qType,
      content: qContent,
      options: qType === 'fill_blank' || qType === 'writing' || qType === 'speaking' ? [] : qOptions.filter((o) => o.trim() !== ''),
      correctAnswers: [qCorrect || qOptions[0] || 'TRUE'],
      points: Number(qPoints) || 1.0,
      explanation: qExplanation,
    };

    setQuestions((prev) => [...prev, newQ]);
    setQContent('');
    setQCorrect('');
    setQExplanation('');
    setErrorMsg(null);
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleLoadSample = () => {
    setTitle('IELTS Reading Practice: Clean Energy Transition 2026');
    setExamTypeId('ielts');
    setSkill('reading');
    setDifficulty('medium');
    setDurationMinutes(60);
    setAnswerVisibility('hidden');
  };

  const handleSaveTest = async () => {
    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tiêu đề đề thi!');
      return;
    }

    setSaving(true);
    setErrorMsg(null);
    const token = localStorage.getItem('lumina_token');

    const payload = {
      title,
      description: `Đề thi luyện tập ${title} bao gồm ${questions.length} câu hỏi theo định dạng chuẩn ${examTypeId.toUpperCase()}.`,
      examTypeId,
      skill,
      difficulty,
      durationMinutes: Number(durationMinutes),
      maxAttempts: maxAttempts !== '' ? Number(maxAttempts) : null,
      answerVisibility,
      answerHideLevel: 'keep_correctness',
      allowStudentAiGrading: allowAiGrading,
      maxAiGradingsPerAnswer: 2,
      status: 'published',
      sections: [
        {
          title: sectionTitle,
          instruction: sectionInstruction,
          passageText,
          audioUrl: audioUrl || null,
          questionGroups: [
            {
              instruction: sectionInstruction || 'Answer the questions below',
              questions: questions.map((q, idx) => ({
                ...q,
                orderIndex: idx + 1,
              })),
            },
          ],
        },
      ],
    };

    try {
      const res = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const created = await res.json();
        onSuccess(created);
        onClose();
      } else {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err.message || 'Không thể tạo đề thi. Vui lòng kiểm tra lại dữ liệu.');
      }
    } catch {
      setErrorMsg('Lỗi kết nối tới máy chủ. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#1E293B] border border-slate-700/80 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/70 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  GV-03 • GV-04 • GV-05
                </span>
                <span className="text-xs text-slate-400 font-medium">Trình Soạn Thảo Đề Thi Chi Tiết</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">Tạo Đề Thi & Ngân Hàng Câu Hỏi Chuẩn Quốc Tế</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Nạp Mẫu Đề Thi Chuẩn
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Section 1: General Test Parameters (GV-03) */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              1. Cấu Hình Thông Tin Đề Thi (GV-03)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="font-semibold text-slate-300">Tên Đề Thi <span className="text-rose-400">*</span></label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: IELTS Academic Reading Mock Test 08..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Kiểu Đề Thi</label>
                <select
                  value={examTypeId}
                  onChange={(e) => setExamTypeId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="ielts">IELTS Academic</option>
                  <option value="toeic">TOEIC ETS Standard</option>
                  <option value="general">CEFR / Tiếng Anh Chung</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Kỹ Năng Đánh Giá</label>
                <select
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="reading">Reading (Đọc hiểu)</option>
                  <option value="listening">Listening (Nghe hiểu)</option>
                  <option value="writing">Writing (Viết luận)</option>
                  <option value="speaking">Speaking (Nói)</option>
                  <option value="full">Full Test (Cả 4 kỹ năng)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Thời Gian Làm Bài (phút)</label>
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Độ Khó</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="easy">Dễ (Easy)</option>
                  <option value="medium">Trung bình (Medium)</option>
                  <option value="hard">Khó (Hard / Band 7.5+)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Chế Độ Hiển Thị Đáp Án (GV-13)</label>
                <select
                  value={answerVisibility}
                  onChange={(e) => setAnswerVisibility(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="hidden">Ẩn đáp án (Mặc định PRD)</option>
                  <option value="show_after_submit">Hiện ngay sau khi nộp</option>
                  <option value="scheduled">Hẹn giờ mở đáp án</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Giới Hạn Lượt Làm (GV-03)</label>
                <select
                  value={maxAttempts}
                  onChange={(e) => setMaxAttempts(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Không giới hạn</option>
                  <option value="1">1 lần duy nhất</option>
                  <option value="2">2 lần</option>
                  <option value="3">3 lần</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={allowAiGrading}
                  onChange={(e) => setAllowAiGrading(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
                />
                <span>Cho phép học sinh tự nhờ AI chấm Writing / Speaking (GV-03, HS-16)</span>
              </label>
            </div>
          </div>

          {/* Section 2: Section & Passage / Audio (GV-04) */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              2. Phần Thi & Bài Đọc / File Nghe (GV-04, GV-07)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Tiêu Đề Phân Đoạn (Section)</label>
                <input
                  type="text"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  placeholder="VD: Passage 1: The Evolution of Language..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Audio URL (Dành cho phần Listening)</label>
                <input
                  type="text"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  placeholder="VD: https://storage.lumina.edu.vn/audio/test1-part1.mp3"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Đoạn Văn Bài Đọc (Passage Text / Transcript)</label>
              <textarea
                rows={4}
                value={passageText}
                onChange={(e) => setPassageText(e.target.value)}
                placeholder="Dán nội dung đoạn văn bài đọc hoặc transcript bài nghe vào đây..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white leading-relaxed focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Section 3: Question Editor (GV-05) */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                3. Thêm Câu Hỏi Mới (7 Dạng Câu Hỏi - GV-05)
              </h3>
              <span className="text-xs text-indigo-400 font-semibold">
                Đã thêm: {questions.length} câu hỏi
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Dạng Câu Hỏi (GV-05)</label>
                <select
                  value={qType}
                  onChange={(e) => {
                    setQType(e.target.value);
                    if (e.target.value === 'true_false_ng') {
                      setQOptions(['TRUE', 'FALSE', 'NOT GIVEN']);
                      setQCorrect('TRUE');
                    } else if (e.target.value === 'single_choice' || e.target.value === 'multiple_choice') {
                      setQOptions(['Option A', 'Option B', 'Option C', 'Option D']);
                      setQCorrect('Option A');
                    }
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="single_choice">Trắc nghiệm 1 đáp án (Single Choice)</option>
                  <option value="multiple_choice">Trắc nghiệm nhiều đáp án (Multiple Choice)</option>
                  <option value="true_false_ng">True / False / Not Given</option>
                  <option value="fill_blank">Điền từ vào chỗ trống (Fill in blank)</option>
                  <option value="matching">Nối thông tin (Matching)</option>
                  <option value="writing">Tự luận viết (Writing Task)</option>
                  <option value="speaking">Nói tự luận (Speaking Task)</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="font-semibold text-slate-300">Nội Dung Câu Hỏi / Yêu Cầu</label>
                <input
                  type="text"
                  value={qContent}
                  onChange={(e) => setQContent(e.target.value)}
                  placeholder="VD: What is the main cause of coral bleaching mentioned in paragraph 2?"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Options & Correct Answer */}
            {qType !== 'fill_blank' && qType !== 'writing' && qType !== 'speaking' && (
              <div className="space-y-2">
                <label className="font-semibold text-slate-300">Các Lựa Chọn Đáp Án</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {qOptions.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <span className="w-6 text-slate-500 font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...qOptions];
                          updated[oIdx] = e.target.value;
                          setQOptions(updated);
                        }}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Đáp Án Đúng</label>
                <input
                  type="text"
                  value={qCorrect}
                  onChange={(e) => setQCorrect(e.target.value)}
                  placeholder={qType === 'fill_blank' ? 'VD: bleaching' : 'Nhập chính xác đáp án đúng...'}
                  className="w-full bg-slate-800 border border-emerald-500/50 rounded-xl px-3 py-2 text-emerald-400 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="font-semibold text-slate-300">Giải Thích Chi Tiết (Explanation)</label>
                <input
                  type="text"
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  placeholder="Dẫn chứng từ bài đọc để học sinh đối chiếu khi xem đáp án..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Câu Hỏi Này Vào Danh Sách</span>
              </button>
            </div>
          </div>

          {/* Section 4: Current Questions List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Danh Sách Câu Hỏi Trong Đề ({questions.length} câu)
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-white">{q.content}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {q.type}
                      </span>
                    </div>
                    {q.options && q.options.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 pl-7">
                        {q.options.map((opt, oIdx) => (
                          <span
                            key={oIdx}
                            className={`px-2 py-0.5 rounded ${
                              q.correctAnswers.includes(opt)
                                ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                                : 'bg-slate-800/80'
                            }`}
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    )}
                    {q.explanation && (
                      <p className="text-[11px] text-slate-500 italic pl-7">
                        Giải thích: {q.explanation}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveQuestion(idx)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700/70 flex items-center justify-between bg-slate-900/60">
          <div className="text-xs text-slate-400">
            Tổng cộng: <span className="font-bold text-white">{questions.length} câu hỏi</span> • Thời lượng:{' '}
            <span className="font-bold text-white">{durationMinutes} phút</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSaveTest}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all"
            >
              {saving ? (
                <span>Đang Lưu...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Lưu & Xuất Bản Đề Thi</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
