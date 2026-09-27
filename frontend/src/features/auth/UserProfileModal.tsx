import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Award,
  Sparkles,
  Calendar,
  Shield,
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onUpdateUser?: (updated: any) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [targetScore, setTargetScore] = useState('7.0');
  const [examType, setExamType] = useState('IELTS Academic');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-lg">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <span className="text-xs font-semibold text-indigo-400">
                STU-18: Hồ Sơ Học Viên & Quản Lý Hạn Mức
              </span>
              <h2 className="text-xl font-bold text-white">{user?.fullName || 'Học Viên Lumina'}</h2>
              <p className="text-xs text-slate-400">{user?.email || 'student@lumina-english.vn'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Daily Quota Counter Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-900/40 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Hạn Mức Đánh Giá AI Hôm Nay (Daily AI Quota)</span>
            </div>
            <p className="text-xs text-slate-300">
              Mỗi học sinh được cấp 20 lượt AI miễn phí mỗi ngày (làm mới lúc 00:00 UTC).
            </p>
          </div>
          <div className="flex items-baseline gap-1 bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800 shrink-0">
            <span className="text-2xl font-black text-emerald-400">
              {user?.dailyAiQuota ?? 20}
            </span>
            <span className="text-xs text-slate-500 font-semibold">/ 20 lượt</span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-400" />
              Số Bài Đã Thi
            </span>
            <div className="text-lg font-bold text-white">12 bài</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              Band Score Cao Nhất
            </span>
            <div className="text-lg font-bold text-emerald-400">7.5</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-indigo-400" />
              Thời Gian Học
            </span>
            <div className="text-lg font-bold text-indigo-300">26 giờ</div>
          </div>
        </div>

        {/* Target Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Mục Tiêu Học Tập & Lộ Trình
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Chứng chỉ mục tiêu</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="IELTS Academic">IELTS Academic</option>
                <option value="IELTS General">IELTS General Training</option>
                <option value="TOEIC 4 Kỹ Năng">TOEIC (Listening & Reading)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Band / Điểm số</label>
              <select
                value={targetScore}
                onChange={(e) => setTargetScore(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="6.0">Band 6.0 (Competent)</option>
                <option value="6.5">Band 6.5 (Good Competent)</option>
                <option value="7.0">Band 7.0 (Good User)</option>
                <option value="7.5">Band 7.5 (Very Good User)</option>
                <option value="8.0+">Band 8.0+ (Expert User)</option>
              </select>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Đã cập nhật mục tiêu học tập thành công!
            </div>
          )}

          <div className="flex justify-between items-center pt-3 border-t border-slate-700/60">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Vai trò: <span className="text-indigo-400 font-semibold">{user?.role === 'admin' ? 'Giáo Viên / Admin' : 'Học Viên'}</span>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all"
            >
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
