import React, { useState } from 'react';
import { Volume2, Play, RotateCcw, Check, Sparkles, HelpCircle } from 'lucide-react';

export const DictationLab: React.FC = () => {
  const [speed, setSpeed] = useState<number>(1.0);
  const [studentInput, setStudentInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sampleSentence = "The government announced a significant investment in renewable energy projects to combat climate change.";

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sampleSentence);
      utterance.lang = 'en-US';
      utterance.rate = speed;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheck = async () => {
    setEvaluating(true);
    try {
      const res = await fetch('/api/ai/evaluate-dictation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: sampleSentence, studentInput }),
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        // Fallback local diff
        evaluateLocalDiff();
      }
    } catch {
      evaluateLocalDiff();
    } finally {
      setEvaluating(false);
    }
  };

  const evaluateLocalDiff = () => {
    const refWords = sampleSentence.split(/\s+/);
    const stuWords = studentInput.trim().split(/\s+/);
    const diff: any[] = [];
    let correct = 0;

    for (let i = 0; i < Math.max(refWords.length, stuWords.length); i++) {
      const r = refWords[i];
      const s = stuWords[i];
      if (!s) {
        diff.push({ word: r, status: 'missing' });
      } else if (!r) {
        diff.push({ word: s, status: 'wrong' });
      } else if (r.toLowerCase().replace(/[^a-z0-9]/g, '') === s.toLowerCase().replace(/[^a-z0-9]/g, '')) {
        diff.push({ word: s, status: 'correct' });
        correct++;
      } else {
        diff.push({ word: s, status: 'wrong' });
      }
    }

    const accuracy = Math.round((correct / refWords.length) * 100);
    setResult({
      accuracy,
      diff,
      explanation: accuracy === 100
        ? 'Tuyệt vời! Bạn đã nghe chính xác 100% các từ trong câu.'
        : 'Chú ý nghe kỹ các âm đuôi (ending sounds) như "announced" (/st/) và từ ghép "renewable energy".',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Dictation Lab & AI Explanation
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Luyện Nghe Chép Chính Tả
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Nghe đoạn hội thoại, gõ lại chính xác và xem trợ lý AI giải thích lỗi nuốt âm tức thì.
          </p>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          {[0.75, 1.0, 1.25].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                speed === s
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Audio Player Console */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center justify-center space-y-6">
        <button
          onClick={handlePlayAudio}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${
            isPlaying
              ? 'bg-emerald-500 text-white shadow-emerald-500/30 animate-pulse'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
          }`}
        >
          {isPlaying ? <Volume2 className="w-9 h-9" /> : <Play className="w-9 h-9 ml-1" />}
        </button>
        <span className="text-xs font-semibold text-slate-400">
          {isPlaying ? 'Đang phát âm thanh...' : 'Bấm để nghe audio mẫu (chuẩn giọng en-US)'}
        </span>
      </div>

      {/* Student Input Area */}
      <div className="space-y-4">
        <textarea
          rows={4}
          value={studentInput}
          onChange={(e) => setStudentInput(e.target.value)}
          placeholder="Gõ lại chính xác những gì bạn nghe được tại đây..."
          className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm leading-relaxed"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => { setStudentInput(''); setResult(null); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            <RotateCcw className="w-4 h-4" />
            Làm lại
          </button>
          <button
            onClick={handleCheck}
            disabled={!studentInput.trim() || evaluating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Check className="w-4 h-4" />
            {evaluating ? 'Đang phân tích...' : 'Kiểm tra với AI'}
          </button>
        </div>
      </div>

      {/* Result & Diff Box */}
      {result && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Kết Quả Đối Chiếu Từ Vựng (Diff Viewer)
            </h3>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-extrabold text-sm border border-indigo-500/30">
              Độ chính xác: {result.accuracy}%
            </span>
          </div>

          {/* Color-coded Diff Pills */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-wrap gap-2 text-sm">
            {result.diff?.map((item: any, idx: number) => {
              let colorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
              if (item.status === 'missing') colorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/30 line-through';
              if (item.status === 'wrong') colorClass = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
              return (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-lg border font-medium text-xs ${colorClass}`}
                >
                  {item.word}
                </span>
              );
            })}
          </div>

          {/* AI Explanation Card */}
          <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
              <HelpCircle className="w-4 h-4" />
              <span>Giải thích lỗi từ Trợ lý AI:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
