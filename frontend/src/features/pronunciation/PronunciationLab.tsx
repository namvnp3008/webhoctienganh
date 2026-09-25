import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export const PronunciationLab: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sampleSentence = "Thoughtful communication fosters meaningful connections between different cultures.";
  const sampleIPA = "/ˈθɔːt.fəl kəˌmjuː.nɪˈkeɪ.ʃən ˈfɒs.təz ˈmiː.nɪŋ.fəl kəˈnek.ʃənz/";

  const handlePlaySample = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sampleSentence);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate 3 seconds recording
      setTimeout(() => {
        setIsRecording(false);
        setEvaluating(true);
        setTimeout(() => {
          setResult({
            overallScore: 86,
            accuracy: 84,
            fluency: 88,
            completeness: 95,
            prosody: 87,
            wordFeedback: [
              { word: 'Thoughtful', score: 82, error: '/θ/' },
              { word: 'communication', score: 89 },
              { word: 'fosters', score: 92 },
              { word: 'meaningful', score: 86 },
              { word: 'connections', score: 88 },
              { word: 'between', score: 94 },
              { word: 'different', score: 85 },
              { word: 'cultures.', score: 80 },
            ],
            tipVi: 'Khẩu hình âm /θ/ trong từ "Thoughtful": Đầu lưỡi đặt nhẹ giữa hai hàm răng, thổi luồng hơi không rung dây thanh quản (vô thanh). Hãy tránh phát âm nhầm thành âm /t/ hoặc /s/.',
          });
          setEvaluating(false);
        }, 1200);
      }, 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Azure AI Speech & Pronunciation Assessment
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Phòng Luyện Phát Âm Chuẩn IPA
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Chấm điểm độ chính xác, độ trôi chảy và ngữ điệu đến từng âm vị theo chuẩn giọng Anh - Mỹ (en-US).
        </p>
      </div>

      {/* Target Sentence Card */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Câu luyện tập mẫu
          </span>
          <button
            onClick={handlePlaySample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 text-xs font-semibold transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe mẫu en-US</span>
          </button>
        </div>

        <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
          "{sampleSentence}"
        </p>

        <p className="font-mono text-sm text-indigo-400/90 bg-indigo-950/30 px-3 py-1.5 rounded-lg inline-block border border-indigo-500/20">
          {sampleIPA}
        </p>
      </div>

      {/* Mic Console */}
      <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          {isRecording && (
            <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
          )}
          <button
            onClick={handleRecord}
            disabled={evaluating}
            className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${
              isRecording
                ? 'bg-rose-600 text-white shadow-rose-600/40'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            <Mic className="w-10 h-10" />
          </button>
        </div>

        <div className="text-center space-y-1">
          <span className="font-bold text-sm text-white block">
            {isRecording
              ? 'Đang thu âm giọng nói của bạn... Hãy đọc to câu mẫu ở trên!'
              : evaluating
              ? 'AI đang phân tích âm vị và ngữ điệu...'
              : 'Nhấn vào micro để bắt đầu thu âm phát âm'}
          </span>
          <span className="text-xs text-slate-500 block">
            Hệ thống hỗ trợ micro trực tiếp trên trình duyệt qua HTTPS
          </span>
        </div>
      </div>

      {/* Assessment Metrics Result */}
      {result && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8 animate-fadeIn">
          {/* Radial / Stat Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="block text-3xl font-extrabold text-emerald-400">
                {result.overallScore}
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase">Điểm tổng quát</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="block text-3xl font-extrabold text-indigo-400">
                {result.accuracy}%
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase">Độ chính xác</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="block text-3xl font-extrabold text-purple-400">
                {result.fluency}%
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase">Độ trôi chảy</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="block text-3xl font-extrabold text-amber-400">
                {result.prosody}%
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase">Ngữ điệu</span>
            </div>
          </div>

          {/* Word-by-word pills */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white">Đánh giá chi tiết từng từ:</h3>
            <div className="flex flex-wrap gap-2">
              {result.wordFeedback?.map((w: any, idx: number) => {
                const isHigh = w.score >= 85;
                const isMedium = w.score >= 70 && w.score < 85;
                return (
                  <div
                    key={idx}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold ${
                      isHigh
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : isMedium
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    <span>{w.word}</span>
                    <span className="text-[10px] opacity-75 font-mono">{w.score}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phoneme Diagnostic Card */}
          <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
              <AlertCircle className="w-4 h-4" />
              <span>Chẩn đoán âm vị & Hướng dẫn khẩu hình:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.tipVi}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
