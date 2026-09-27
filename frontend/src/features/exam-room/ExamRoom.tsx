import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Save, Send, AlertTriangle, CheckCircle2, ZoomIn, ZoomOut, Flag } from 'lucide-react';

interface ExamRoomProps {
  testId: string;
  onExit: () => void;
  user: any;
}

export const ExamRoom: React.FC<ExamRoomProps> = ({ testId, onExit, user }) => {
  const [test, setTest] = useState<any>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [fontSize, setFontSize] = useState<number>(14);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Initialize test and attempt
  useEffect(() => {
    fetch(`/api/tests/${testId}`)
      .then((res) => res.json())
      .then((data) => {
        setTest(data);
        if (data.durationMinutes) {
          setTimeLeft(data.durationMinutes * 60);
        }
      })
      .catch(() => {
        // Fallback default sample test
        setTest({
          id: testId,
          title: 'IELTS Academic Reading Mock Test 1 - Climate & Ecosystems',
          durationMinutes: 60,
          sections: [
            {
              id: 'sec-1',
              title: 'Passage 1: The Secret Life of Coral Reefs',
              passageText: `Coral reefs are among the most biologically diverse ecosystems on Earth. Covering less than 0.1% of the ocean floor, they are home to at least 25% of all marine species. Reefs provide essential services such as shoreline protection, coastal economies support, and potential medicinal compounds. However, climate change, specifically rising ocean temperatures leading to mass coral bleaching events, poses an existential threat to these delicate environments. When water temperatures exceed normal summer highs by just 1-2 degrees Celsius for sustained periods, corals expel their symbiotic zooxanthellae algae, turning bone white and risking starvation.`,
              questionGroups: [
                {
                  id: 'qg-1',
                  instruction: 'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE, FALSE, or NOT GIVEN.',
                  questions: [
                    {
                      id: 'q-1',
                      orderIndex: 1,
                      content: 'Coral reefs cover more than 1% of the entire ocean floor.',
                      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                    },
                    {
                      id: 'q-2',
                      orderIndex: 2,
                      content: 'At least one quarter of all marine organisms depend on coral reefs.',
                      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                    },
                    {
                      id: 'q-3',
                      orderIndex: 3,
                      content: 'Bleaching occurs when ocean temperatures rise by 5 degrees Celsius or more.',
                      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
                    },
                  ],
                },
              ],
            },
          ],
        });
      });
  }, [testId]);

  // Countdown timer
  useEffect(() => {
    if (result) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [result]);

  const handleSelectAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      setAutoSaveStatus('saving');
      setTimeout(() => setAutoSaveStatus('saved'), 600);
      return next;
    });
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmit = () => {
    setShowSubmitModal(false);
    let score = 0;
    const total = allQuestions.length || 1;

    allQuestions.forEach((q: any) => {
      const studentAns = (answers[q.id] || '').trim().toLowerCase();
      const correctList = Array.isArray(q.correctAnswers)
        ? q.correctAnswers.map((c: any) => String(c).trim().toLowerCase())
        : [String(q.correctAnswer || '').trim().toLowerCase()];

      if (correctList.includes(studentAns) && studentAns !== '') {
        score++;
      }
    });

    const calculatedBand = Math.min(9.0, Math.round(((score / total) * 9) * 2) / 2) || (score > 0 ? 5.0 : 1.0);
    setResult({
      bandScore: calculatedBand,
      correctCount: score,
      totalQuestions: total,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!test) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-400">
        Đang tải phòng thi...
      </div>
    );
  }

  const currentSection = test.sections?.[0];
  const allQuestions = currentSection?.questionGroups?.flatMap((g: any) => g.questions) || [];

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl animate-fadeIn">
      {/* Sticky CBT Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Rời phòng thi
          </button>
          <span className="hidden sm:inline font-bold text-sm text-white truncate max-w-md">
            {test.title}
          </span>
        </div>

        {/* Center Timer & Auto-save */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-mono text-base font-bold text-white tracking-wider">
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
            <Save className={`w-3.5 h-3.5 ${autoSaveStatus === 'saving' ? 'text-amber-400 animate-spin' : 'text-emerald-400'}`} />
            <span>{autoSaveStatus === 'saving' ? 'Đang lưu...' : 'Đã tự lưu'}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setFontSize((s) => Math.max(12, s - 1))}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Giảm cỡ chữ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFontSize((s) => Math.min(20, s + 1))}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Tăng cỡ chữ"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Nộp bài</span>
          </button>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left Column: Passage Viewer */}
        <div className="overflow-y-auto p-6 lg:p-8 bg-slate-900/40">
          <div className="max-w-prose mx-auto">
            <h2 className="text-lg font-bold text-white mb-4">
              {currentSection?.title || 'Reading Passage'}
            </h2>
            <div
              className="text-slate-300 leading-relaxed space-y-4"
              style={{ fontSize: `${fontSize}px` }}
            >
              {currentSection?.passageText ? (
                currentSection.passageText.split('\n\n').map((para: string, idx: number) => (
                  <p key={idx} className="relative pl-4 border-l-2 border-indigo-500/30 hover:border-indigo-500 transition-colors">
                    {para}
                  </p>
                ))
              ) : (
                <p>Nội dung bài đọc chưa được cập nhật.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Sheet */}
        <div className="overflow-y-auto p-6 lg:p-8 bg-slate-900/60 flex flex-col justify-between">
          <div className="space-y-8 max-w-prose mx-auto w-full">
            {currentSection?.questionGroups?.map((group: any, gIdx: number) => (
              <div key={group.id || gIdx} className="space-y-6">
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 text-xs font-semibold leading-relaxed">
                  {group.instruction}
                </div>

                <div className="space-y-6">
                  {group.questions?.map((q: any) => (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-bold text-white text-sm">
                          Câu {q.orderIndex}. {q.content}
                        </span>
                        <button
                          onClick={() => toggleFlag(q.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            flagged[q.id]
                              ? 'text-amber-400 bg-amber-400/10'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                          title="Gắn cờ xem lại"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Options Radio pills or Fill In Blank Input */}
                      {Array.isArray(q.options) && q.options.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          {q.options.map((opt: string) => {
                            const isSelected = answers[q.id] === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => handleSelectAnswer(q.id, opt)}
                                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left border ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                                    : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="pt-2">
                          <input
                            type="text"
                            value={answers[q.id] || ''}
                            onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                            placeholder="Gõ câu trả lời của bạn vào đây..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Palette Pill Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {allQuestions.map((q: any) => {
                const isAnswered = !!answers[q.id];
                const isFlagged = !!flagged[q.id];
                return (
                  <div
                    key={q.id}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border ${
                      isFlagged
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                        : isAnswered
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {q.orderIndex}
                  </div>
                );
              })}
            </div>
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
              Đã làm: {Object.keys(answers).length}/{allQuestions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white text-center">Xác nhận nộp bài thi?</h3>
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              Bạn đã hoàn thành <span className="font-bold text-white">{Object.keys(answers).length}</span> trên tổng số <span className="font-bold text-white">{allQuestions.length}</span> câu hỏi. Bạn có chắc chắn muốn nộp bài ngay bây giờ?
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
              >
                Nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-indigo-500/30 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Kết Quả Bài Thi Trực Tuyến
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">Hoàn thành bài thi!</h2>
            </div>

            <div className="flex items-center justify-center gap-6 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div>
                <span className="block text-4xl font-extrabold text-indigo-400">
                  {result.bandScore}
                </span>
                <span className="text-xs text-slate-400 font-semibold uppercase">IELTS Band</span>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div>
                <span className="block text-4xl font-extrabold text-emerald-400">
                  {result.correctCount}/{result.totalQuestions}
                </span>
                <span className="text-xs text-slate-400 font-semibold uppercase">Số câu đúng</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Đáp án chi tiết đang được ẩn theo cấu hình của giáo viên để bảo toàn tính bảo mật của đề thi. Bạn có thể xem lại kết quả này trong hồ sơ cá nhân.
            </p>

            <button
              onClick={onExit}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
            >
              Quay lại danh mục đề thi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
