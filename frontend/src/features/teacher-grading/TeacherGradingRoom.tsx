import React, { useState, useEffect } from 'react';
import {
  Inbox,
  CheckCircle,
  Clock,
  Sparkles,
  FileText,
  Mic,
  ChevronRight,
  User,
  Award,
  AlertCircle,
  Save,
  Send,
  ArrowLeft,
  Volume2,
  Calendar,
} from 'lucide-react';

interface QueueItem {
  id: string;
  attemptId: string;
  testTitle: string;
  studentName: string;
  studentEmail: string;
  skill: 'writing' | 'speaking';
  submittedAt: string;
  wordCount?: number;
  audioUrl?: string;
  responseText: string;
  aiDraft?: {
    overallBand: number;
    feedback: string;
    criteria?: Record<string, { band: number; feedback: string }>;
  };
}

export const TeacherGradingRoom: React.FC = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);

  // Rubric Scores State (1.0 to 9.0)
  const [trScore, setTrScore] = useState<number>(6.5);
  const [ccScore, setCcScore] = useState<number>(6.5);
  const [lrScore, setLrScore] = useState<number>(6.5);
  const [graScore, setGraScore] = useState<number>(6.0);
  const [overallScore, setOverallScore] = useState<number>(6.5);
  const [feedback, setFeedback] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchGradingQueue();
  }, []);

  // Auto calculate average overall band
  useEffect(() => {
    const avg = (trScore + ccScore + lrScore + graScore) / 4;
    // Round to nearest 0.5
    const rounded = Math.round(avg * 2) / 2;
    setOverallScore(rounded);
  }, [trScore, ccScore, lrScore, graScore]);

  const fetchGradingQueue = async () => {
    setLoading(true);
    const token = localStorage.getItem('lumina_token');
    try {
      const res = await fetch('/api/attempts/admin/grading-queue', {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setQueue(data);
          setLoading(false);
          return;
        }
      }
    } catch {
      // ignore
    }

    // Default mock queue items matching Stitch ADM-10 design
    setQueue([
      {
        id: 'ans-w1',
        attemptId: 'att-101',
        testTitle: 'IELTS Academic Practice Test 04 - Writing',
        studentName: 'Nguyễn Văn Minh',
        studentEmail: 'minh.nguyen@example.com',
        skill: 'writing',
        submittedAt: '2026-09-27 21:40',
        wordCount: 284,
        responseText: `Some people think that the government should strictly regulate social media platforms to avoid the spread of misleading news and hate speech. Others argue that freedom of speech must be protected at all costs. In my perspective, while freedom of expression is crucial, government supervision is indispensable to safeguard civil harmony and truth in the digital era.\n\nTo begin with, unregulated fake news can cause enormous turbulence in society. For instance, during health emergencies, inaccurate rumors about medical treatments could endanger human lives. Without state verification, algorithms tend to prioritize sensationalism over factual truth.\n\nOn the other hand, proponents of absolute freedom argue that government censorship might suppress constructive political criticism. This is a valid apprehension; nonetheless, oversight bodies can comprise independent journalists and legal scholars rather than unilateral state apparatus.\n\nIn conclusion, balanced regulation with judicial checks and balances is the optimal solution for contemporary cyberspace.`,
        aiDraft: {
          overallBand: 6.5,
          feedback: 'Bài viết lập luận rõ ràng, từ vựng học thuật phong phú (turbulence, sensationalism, apparatus). Cần phát triển thêm ví dụ cụ thể ở thân bài 2.',
          criteria: {
            tr: { band: 6.5, feedback: 'Đáp ứng tốt yêu cầu đề bài, quan điểm rõ ràng xuyên suốt.' },
            cc: { band: 6.5, feedback: 'Liên kết đoạn mạch lạc, chuyển tiếp câu uyển chuyển.' },
            lr: { band: 7.0, feedback: 'Vốn từ vựng chuyên sâu về công nghệ và pháp luật.' },
            gra: { band: 6.0, feedback: 'Cấu trúc câu phong phú nhưng có một số chỗ dùng dấu câu chưa tối ưu.' },
          },
        },
      },
      {
        id: 'ans-s1',
        attemptId: 'att-102',
        testTitle: 'IELTS General Training Test 02 - Speaking',
        studentName: 'Trần Thị Thu Hà',
        studentEmail: 'ha.tran@example.com',
        skill: 'speaking',
        submittedAt: '2026-09-27 22:15',
        audioUrl: 'https://cdn.lumina-english.vn/samples/speaking_part1_sample.mp3',
        responseText: `I'd like to talk about a memorable journey to Da Lat that I took last winter with my closest university companions. We decided to embark on a motorcycle road trip across the mountain passes...`,
        aiDraft: {
          overallBand: 7.0,
          feedback: 'Thí sinh phát âm lưu loát, ngữ điệu truyền cảm, kiểm soát tốt các thì quá khứ khi kể chuyện.',
          criteria: {
            fluency: { band: 7.0, feedback: 'Nói trôi chảy, không có nhiều đoạn ừm à ngập ngừng.' },
            lexical: { band: 7.0, feedback: 'Dùng nhiều collocations tự nhiên (embark on, mountain passes).' },
            grammar: { band: 6.5, feedback: 'Chia thì quá khứ đơn và quá khứ hoàn thành chuẩn xác.' },
            pronunciation: { band: 7.0, feedback: 'Trọng âm từ rõ ràng, nối âm tự nhiên.' },
          },
        },
      },
    ]);
    setLoading(false);
  };

  const handleOpenItem = (item: QueueItem) => {
    setSelectedItem(item);
    setSuccessMessage(null);
    if (item.aiDraft) {
      setOverallScore(item.aiDraft.overallBand);
      setFeedback(item.aiDraft.feedback);
      if (item.aiDraft.criteria) {
        const c = item.aiDraft.criteria;
        setTrScore(c.tr?.band || c.fluency?.band || 6.5);
        setCcScore(c.cc?.band || c.lexical?.band || 6.5);
        setLrScore(c.lr?.band || c.grammar?.band || 6.5);
        setGraScore(c.gra?.band || c.pronunciation?.band || 6.0);
      }
    } else {
      setTrScore(6.5);
      setCcScore(6.5);
      setLrScore(6.5);
      setGraScore(6.0);
      setFeedback('');
    }
  };

  const handleSubmitReview = async () => {
    if (!selectedItem) return;
    setSubmitting(true);
    const token = localStorage.getItem('lumina_token');

    try {
      await fetch('/api/attempts/admin/submit-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          attemptAnswerId: selectedItem.id,
          totalScore: overallScore,
          feedback,
          skill: selectedItem.skill,
          scores: [
            { criterion: 'TR/Fluency', score: trScore },
            { criterion: 'CC/Lexical', score: ccScore },
            { criterion: 'LR/Grammar', score: lrScore },
            { criterion: 'GRA/Pronunciation', score: graScore },
          ],
        }),
      });

      setSuccessMessage('Chấm bài và công bố điểm chính thức thành công!');
      // Remove item from queue
      setQueue((prev) => prev.filter((q) => q.id !== selectedItem.id));
      setTimeout(() => {
        setSelectedItem(null);
        setSuccessMessage(null);
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* View 1: ADM-10 Queue List */}
      {!selectedItem ? (
        <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                ADM-10: Hàng Đợi Chờ Chấm Bài
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Hàng Đợi Chấm Bài Writing & Speaking
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Các bài nộp cần giáo viên chấm điểm chính thức theo Rubric tiêu chuẩn quốc tế.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                {queue.length} bài đang chờ
              </span>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Đang tải danh sách bài thi chờ chấm...
            </div>
          ) : queue.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-200">Không có bài thi nào đang chờ chấm!</h3>
              <p className="text-xs text-slate-400">Tất cả bài nộp Writing và Speaking đều đã được hoàn tất.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {queue.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenItem(item)}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${
                        item.skill === 'writing'
                          ? 'bg-indigo-600/30 border border-indigo-500/40 text-indigo-400'
                          : 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-400'
                      }`}
                    >
                      {item.skill === 'writing' ? (
                        <FileText className="w-6 h-6" />
                      ) : (
                        <Mic className="w-6 h-6" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {item.skill.toUpperCase()}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.submittedAt}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                        {item.testTitle}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1 font-medium text-slate-300">
                          <User className="w-3.5 h-3.5 text-indigo-400" />
                          {item.studentName}
                        </span>
                        <span>({item.studentEmail})</span>
                        {item.wordCount && (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px]">
                            {item.wordCount} words
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {item.aiDraft && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Draft: Band {item.aiDraft.overallBand}</span>
                      </div>
                    )}
                    <button className="px-4 py-2 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all">
                      <span>Vào Chấm Bài</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* View 2: ADM-11 / ADM-12 Rubric Grading Room */
        <div className="space-y-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between bg-[#1E293B] border border-slate-700/80 rounded-2xl p-4 px-6 shadow-lg">
            <button
              onClick={() => setSelectedItem(null)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách chờ chấm
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Học sinh:</span>
              <span className="text-xs font-bold text-white bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                {selectedItem.studentName}
              </span>
            </div>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {successMessage}
            </div>
          )}

          {/* Split Screen: Student Work vs Rubric Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Student Submission */}
            <div className="lg:col-span-7 bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <div className="flex items-center gap-2">
                  {selectedItem.skill === 'writing' ? (
                    <FileText className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <Mic className="w-5 h-5 text-emerald-400" />
                  )}
                  <h2 className="text-base font-bold text-white">
                    Bài Làm Của Học Sinh ({selectedItem.skill.toUpperCase()})
                  </h2>
                </div>
                {selectedItem.wordCount && (
                  <span className="text-xs font-semibold text-slate-400">
                    {selectedItem.wordCount} words
                  </span>
                )}
              </div>

              {selectedItem.skill === 'speaking' && selectedItem.audioUrl && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span>Bản ghi âm câu trả lời</span>
                  </div>
                  <audio src={selectedItem.audioUrl} controls className="w-full h-9" />
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line max-h-[500px] overflow-y-auto">
                {selectedItem.responseText}
              </div>

              {selectedItem.aiDraft && (
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Gợi Ý Bản Nháp Từ AI (Tham Khảo)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedItem.aiDraft.feedback}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Rubric Scoring Panel */}
            <div className="lg:col-span-5 bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Chấm Điểm Theo Rubric
                </h2>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    Band Tổng Quy Đổi
                  </span>
                  <span className="text-2xl font-black text-amber-400">
                    Band {overallScore.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* 4 Criteria Band Selectors */}
              <div className="space-y-4">
                {[
                  { label: selectedItem.skill === 'writing' ? 'Task Response (TR)' : 'Fluency & Coherence', val: trScore, set: setTrScore },
                  { label: selectedItem.skill === 'writing' ? 'Coherence & Cohesion (CC)' : 'Lexical Resource', val: ccScore, set: setCcScore },
                  { label: selectedItem.skill === 'writing' ? 'Lexical Resource (LR)' : 'Grammatical Range', val: lrScore, set: setLrScore },
                  { label: selectedItem.skill === 'writing' ? 'Grammar & Accuracy (GRA)' : 'Pronunciation', val: graScore, set: setGraScore },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">{item.label}</span>
                      <span className="font-bold text-indigo-400">Band {item.val.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min={4.0}
                      max={9.0}
                      step={0.5}
                      value={item.val}
                      onChange={(e) => item.set(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              {/* Feedback Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Nhận xét chính thức của Giáo viên:
                </label>
                <textarea
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Ghi nhận xét chi tiết, điểm mạnh và các điểm cần khắc phục cho học sinh..."
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleSubmitReview}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Đang lưu...' : 'Hoàn Tất & Công Bố Điểm'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
