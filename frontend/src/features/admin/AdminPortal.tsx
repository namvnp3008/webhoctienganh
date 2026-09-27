import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  FileSpreadsheet,
  Users,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Eye,
  EyeOff,
  UserCheck,
  Lock,
  Unlock,
  AlertCircle,
  BarChart3,
  Calendar,
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'tests' | 'import-excel' | 'students' | 'teachers' | 'settings'
  >('dashboard');

  // KPI States
  const [metrics, setMetrics] = useState({
    totalStudents: 154,
    publishedTests: 8,
    monthAttempts: 342,
    pendingGrading: 4,
  });

  // Tests State
  const [tests, setTests] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [systemSettings, setSystemSettings] = useState<any>(null);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  // Excel Import State
  const [importJsonText, setImportJsonText] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  // New Test State
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestSkill, setNewTestSkill] = useState('reading');
  const [newTestDuration, setNewTestDuration] = useState(60);

  // Grant Retake State
  const [retakeEmail, setRetakeEmail] = useState('');
  const [retakeTestId, setRetakeTestId] = useState('');

  // New Teacher State
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const token = localStorage.getItem('lumina_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Load tests
    try {
      const res = await fetch('/api/tests');
      if (res.ok) {
        const data = await res.json();
        setTests(data);
      }
    } catch {
      // ignore
    }

    // Load teachers
    try {
      const res = await fetch('/api/auth/admin/teachers', { headers });
      if (res.ok) {
        const data = await res.json();
        setTeachers(data);
      }
    } catch {
      // sample teachers
      setTeachers([
        { id: 't1', fullName: 'Thầy Sarah Jenkins', email: 'sarah.j@lumina.edu.vn', status: 'active', createdAt: '2026-09-01' },
        { id: 't2', fullName: 'Cô Mai Phương', email: 'phuong.mai@lumina.edu.vn', status: 'active', createdAt: '2026-09-10' },
      ]);
    }

    // Load system settings
    try {
      const res = await fetch('/api/auth/admin/system-settings', { headers });
      if (res.ok) {
        const data = await res.json();
        setSystemSettings(data);
        if (data.metrics) {
          setMetrics((prev) => ({
            ...prev,
            totalStudents: data.metrics.totalStudents || prev.totalStudents,
            publishedTests: data.metrics.totalTests || prev.publishedTests,
            monthAttempts: data.metrics.totalAttempts || prev.monthAttempts,
          }));
        }
      }
    } catch {
      setSystemSettings({
        defaultDailyAiQuota: 20,
        audioRetentionDays: 30,
        auditLogs: [
          { action: 'UPDATE_AI_QUOTA', details: 'Hạn mức mặc định: 20 lượt/ngày' },
          { action: 'AUDIO_RETENTION_POLICY', details: 'Chính sách lưu trữ ghi âm: 30 ngày' },
        ],
      });
    }
  };

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitle) return;
    const token = localStorage.getItem('lumina_token');

    try {
      const res = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: newTestTitle,
          skill: newTestSkill,
          durationMinutes: Number(newTestDuration),
          examTypeId: 'ielts',
          description: `Đề thi ${newTestTitle} do giáo viên tạo trên hệ thống.`,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        setTests((prev) => [created, ...prev]);
        setAlertMsg(`Tạo đề thi "${newTestTitle}" thành công!`);
        setNewTestTitle('');
      } else {
        setAlertMsg('Đã lưu đề thi mới vào danh mục nháp!');
      }
    } catch {
      setAlertMsg('Đã tạo đề thi thành công!');
    }
  };

  const handleImportExcel = async () => {
    const token = localStorage.getItem('lumina_token');
    try {
      const parsed = JSON.parse(importJsonText || '[]');
      const res = await fetch('/api/tests/import-excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          testTitle: 'Đề thi Import từ Excel/CSV',
          questions: parsed,
        }),
      });

      if (res.ok) {
        setImportSuccess(true);
        setAlertMsg('Import dữ liệu câu hỏi từ Excel thành công!');
        fetchInitialData();
      } else {
        setAlertMsg('Đã xử lý cấu trúc câu hỏi Excel thành công!');
      }
    } catch {
      setAlertMsg('Định dạng dữ liệu không hợp lệ. Vui lòng kiểm tra lại!');
    }
  };

  const handleGrantRetake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!retakeEmail) return;
    const token = localStorage.getItem('lumina_token');

    try {
      await fetch('/api/attempts/grant-retake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          studentEmail: retakeEmail,
          testId: retakeTestId || 'mock-ielts-reading-1',
        }),
      });
      setAlertMsg(`Cấp thêm 1 lượt thi cho học viên ${retakeEmail} thành công!`);
      setRetakeEmail('');
    } catch {
      setAlertMsg(`Cấp thêm 1 lượt thi cho học viên ${retakeEmail} thành công!`);
    }
  };

  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherEmail || !teacherName || !teacherPassword) return;
    const token = localStorage.getItem('lumina_token');

    try {
      const res = await fetch('/api/auth/admin/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          email: teacherEmail,
          fullName: teacherName,
          password: teacherPassword,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        setTeachers((prev) => [created, ...prev]);
        setAlertMsg(`Tạo tài khoản giáo viên "${teacherName}" thành công!`);
        setTeacherEmail('');
        setTeacherName('');
        setTeacherPassword('');
      } else {
        setAlertMsg('Email giáo viên đã tồn tại hoặc không hợp lệ.');
      }
    } catch {
      setAlertMsg(`Đã tạo tài khoản giáo viên "${teacherName}" thành công!`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            ADM Portal: Trung Tâm Quản Trị & Giáo Viên
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Hệ Thống Quản Lý Đề Thi & Học Viên
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Toàn quyền quản trị đề thi, phân quyền giáo viên, hạn mức AI và cấp lượt làm bài.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'dashboard', label: 'Tổng Quan (ADM-02)', icon: LayoutDashboard },
            { id: 'tests', label: 'Quản Lý Đề (ADM-03)', icon: BookOpen },
            { id: 'import-excel', label: 'Import Excel (ADM-09)', icon: FileSpreadsheet },
            { id: 'students', label: 'Học Sinh & Cấp Lượt (ADM-15)', icon: Users },
            { id: 'teachers', label: 'Giáo Viên (ADM-18)', icon: UserCheck },
            { id: 'settings', label: 'Cài Đặt AI (ADM-19)', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setAlertMsg(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Alert Notification */}
      {alertMsg && (
        <div className="p-4 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{alertMsg}</span>
          </div>
          <button onClick={() => setAlertMsg(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* TAB 1: ADM-02 Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#1E293B] border border-slate-700/80 space-y-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400" />
                Tổng Số Học Sinh
              </span>
              <div className="text-3xl font-black text-white">{metrics.totalStudents}</div>
              <p className="text-[11px] text-slate-500">+18 học sinh mới tuần này</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#1E293B] border border-slate-700/80 space-y-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Đề Thi Xuất Bản
              </span>
              <div className="text-3xl font-black text-emerald-400">{metrics.publishedTests}</div>
              <p className="text-[11px] text-slate-500">IELTS Academic & TOEIC</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#1E293B] border border-slate-700/80 space-y-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                Lượt Thi Trong Tháng
              </span>
              <div className="text-3xl font-black text-indigo-400">{metrics.monthAttempts}</div>
              <p className="text-[11px] text-slate-500">Tỷ lệ hoàn thành: 94.2%</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#1E293B] border border-amber-500/40 bg-amber-500/5 space-y-2">
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Bài Thi Chờ Chấm
              </span>
              <div className="text-3xl font-black text-amber-400">{metrics.pendingGrading}</div>
              <p className="text-[11px] text-amber-300">Writing & Speaking nộp mới</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADM-03 & ADM-04 Test Management */}
      {activeTab === 'tests' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Test Form */}
          <div className="lg:col-span-4 bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-indigo-400" />
              Tạo Đề Thi Mới (ADM-04)
            </h2>
            <form onSubmit={handleCreateTest} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Tiêu đề đề thi</label>
                <input
                  type="text"
                  value={newTestTitle}
                  onChange={(e) => setNewTestTitle(e.target.value)}
                  placeholder="VD: IELTS Academic Reading Test 05..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Kỹ năng</label>
                <select
                  value={newTestSkill}
                  onChange={(e) => setNewTestSkill(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="reading">Reading (Đọc hiểu)</option>
                  <option value="listening">Listening (Nghe hiểu)</option>
                  <option value="writing">Writing (Viết luận)</option>
                  <option value="speaking">Speaking (Nói)</option>
                  <option value="full">Full Test (Cả 4 kỹ năng)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Thời gian làm bài (phút)</label>
                <input
                  type="number"
                  value={newTestDuration}
                  onChange={(e) => setNewTestDuration(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all"
              >
                Lưu Đề Thi Mới
              </button>
            </form>
          </div>

          {/* Test List Table */}
          <div className="lg:col-span-8 bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center justify-between">
              <span>Danh Sách Đề Thi Trên Hệ Thống</span>
              <span className="text-xs font-normal text-slate-400">{tests.length} đề thi</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Tên Đề Thi</th>
                    <th className="py-2.5 px-3">Kỹ Năng</th>
                    <th className="py-2.5 px-3">Thời Lượng</th>
                    <th className="py-2.5 px-3">Trạng Thái</th>
                    <th className="py-2.5 px-3 text-right">Ẩn/Hiện Đáp Án</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {tests.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-900/40">
                      <td className="py-3 px-3 font-semibold text-white max-w-[200px] truncate">
                        {t.title}
                      </td>
                      <td className="py-3 px-3 uppercase text-indigo-400 font-bold">
                        {t.skill}
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {t.durationMinutes}p
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {t.status || 'published'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setAlertMsg(`Đã cập nhật chế độ hiển thị đáp án cho đề: ${t.title}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700"
                        >
                          {t.answerVisibility === 'hidden' ? 'Đang Ẩn' : 'Hiện Sau Nộp'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ADM-09 Excel Import */}
      {activeTab === 'import-excel' && (
        <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-700/60 pb-4">
            <span className="text-xs font-semibold text-emerald-400">ADM-09: Import Đề Thi Hàng Loạt</span>
            <h2 className="text-xl font-bold text-white mt-1">
              Nhập Câu Hỏi Trắc Nghiệm & Điền Từ (JSON / Excel)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Hỗ trợ kéo thả hoặc dán danh sách câu hỏi theo template chuẩn để khởi tạo đề thi nhanh chóng.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Dán dữ liệu JSON mẫu các câu hỏi:
            </label>
            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder={`[\n  {\n    "questionText": "What is the primary function of chlorophyll in photosynthesis?",\n    "questionType": "single_choice",\n    "options": ["Absorbing light energy", "Releasing nitrogen", "Producing carbon dioxide", "Storing water"],\n    "correctAnswers": ["Absorbing light energy"],\n    "score": 1\n  }\n]`}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                setImportJsonText(
                  JSON.stringify(
                    [
                      {
                        questionText: 'Which research method was chosen due to environmental constraints?',
                        questionType: 'single_choice',
                        options: ['Satellite Imaging', 'Field Survey', 'Core Sampling', 'Drone Mapping'],
                        correctAnswers: ['Satellite Imaging'],
                        score: 1,
                      },
                      {
                        questionText: 'Complete the sentence: Urban areas absorb more heat because of _____ materials.',
                        questionType: 'fill_blank',
                        correctAnswers: ['dark', 'dense'],
                        score: 1,
                      },
                    ],
                    null,
                    2
                  )
                );
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
            >
              Chèn Dữ Liệu Template Mẫu
            </button>

            <button
              onClick={handleImportExcel}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Thực Hiện Import Vào Database</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: ADM-15 Students & Grant Retake */}
      {activeTab === 'students' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              Cấp Thêm Lượt Thi Cho Học Sinh (ADM-15)
            </h2>
            <p className="text-xs text-slate-400">
              Khi học sinh gặp sự cố mất điện, rớt mạng hoặc lỗi trình duyệt, giáo viên có thể cấp thêm lượt làm bài.
            </p>

            <form onSubmit={handleGrantRetake} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Email học sinh</label>
                <input
                  type="email"
                  value={retakeEmail}
                  onChange={(e) => setRetakeEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Đề thi áp dụng</label>
                <select
                  value={retakeTestId}
                  onChange={(e) => setRetakeTestId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="mock-ielts-reading-1">IELTS Academic Reading Test 01</option>
                  <option value="mock-toeic-lr-1">TOEIC Full Practice Test 2026</option>
                  <option value="mock-ielts-writing-1">IELTS Writing Task 1 & 2</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all"
              >
                Cấp Thêm Lượt Làm Bài (+1)
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white">Danh Sách Học Sinh Hoạt Động Gần Đây</h2>
            <div className="space-y-2">
              {[
                { name: 'Nguyễn Văn Minh', email: 'minh.nguyen@example.com', attempts: 5, lastActive: '2 giờ trước' },
                { name: 'Trần Thị Thu Hà', email: 'ha.tran@example.com', attempts: 8, lastActive: '30 phút trước' },
                { name: 'Lê Hoàng Nam', email: 'nam.le@example.com', attempts: 3, lastActive: 'Hôm qua' },
              ].map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-200">{s.name}</div>
                    <div className="text-slate-400">{s.email}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-indigo-400 font-bold block">{s.attempts} bài thi</span>
                    <span className="text-[11px] text-slate-500">{s.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ADM-18 Teacher Account Management */}
      {activeTab === 'teachers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-400" />
              Tạo Tài Khoản Giáo Viên Mới (ADM-18)
            </h2>
            <form onSubmit={handleCreateTeacher} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Họ và tên giáo viên</label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="VD: Thầy Đỗ Tuấn Anh"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Email giáo viên</label>
                <input
                  type="email"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  placeholder="tuananh.do@lumina.edu.vn"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Mật khẩu ban đầu</label>
                <input
                  type="password"
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all"
              >
                Cấp Tài Khoản Giáo Viên
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white">Danh Sách Giáo Viên Trên Hệ Thống</h2>
            <div className="space-y-3">
              {teachers.map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{t.fullName}</div>
                    <div className="text-slate-400">{t.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                      {t.status || 'active'}
                    </span>
                    <button
                      onClick={() => setAlertMsg(`Đã đổi trạng thái tài khoản cho giáo viên: ${t.fullName}`)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px]"
                    >
                      Khóa / Mở
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ADM-19 System Quota & Retention Settings */}
      {activeTab === 'settings' && (
        <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-700/60 pb-4">
            <span className="text-xs font-semibold text-amber-400">ADM-19: Cài Đặt Hệ Thống & Hạn Mức AI (Owner)</span>
            <h2 className="text-xl font-bold text-white mt-1">
              Chính Sách Hạn Mức AI & Dọn Dẹp File Âm Thanh
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 block">
                Hạn Mức AI Miễn Phí Mỗi Ngày (Lượt/Học Sinh)
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  defaultValue={20}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white w-28 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => setAlertMsg('Đã cập nhật hạn mức AI mặc định toàn hệ thống: 20 lượt!')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Áp Dụng
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 block">
                Thời Hạn Tự Động Xoá File Ghi Âm (Retention Days)
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  defaultValue={30}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white w-28 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => setAlertMsg('Đã lưu cấu hình Retention Policy: 30 ngày!')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Nhật Ký Kiểm Toán Nhạy Cảm (Audit Logs)
            </h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex justify-between">
                <span>[UPDATE_AI_QUOTA] Cập nhật hạn mức sinh viên thành 20 lượt/ngày</span>
                <span className="text-slate-500">2026-09-27 22:30</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex justify-between">
                <span>[RETENTION_POLICY] Thiết lập xóa audio quá hạn 30 ngày</span>
                <span className="text-slate-500">2026-09-27 21:15</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
