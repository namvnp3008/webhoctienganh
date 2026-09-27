import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TestCatalog } from './features/test-catalog/TestCatalog';
import { ExamRoom } from './features/exam-room/ExamRoom';
import { SpeakingSimulator } from './features/speaking/SpeakingSimulator';
import { DictationLab } from './features/dictation/DictationLab';
import { PronunciationLab } from './features/pronunciation/PronunciationLab';
import { EnrolledClasses } from './features/classes/EnrolledClasses';
import { TeacherGradingRoom } from './features/teacher-grading/TeacherGradingRoom';
import { AdminPortal } from './features/admin/AdminPortal';
import { AuthModal } from './features/auth/AuthModal';
import { UserProfileModal } from './features/auth/UserProfileModal';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<
    'catalog' | 'speaking' | 'dictation' | 'pronunciation' | 'classes' | 'grading' | 'admin'
  >('catalog');
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('lumina_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleAuthSuccess = (loggedUser: any, token: string) => {
    setUser(loggedUser);
    localStorage.setItem('lumina_user', JSON.stringify(loggedUser));
    localStorage.setItem('lumina_token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lumina_user');
    localStorage.removeItem('lumina_token');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col">
      {/* If in Exam Room, hide normal Navbar to provide full Zen Exam Mode */}
      {!activeExamId && (
        <Navbar
          currentTab={currentTab}
          setCurrentTab={(tab: any) => setCurrentTab(tab)}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          onOpenProfile={() => setIsProfileOpen(true)}
        />
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeExamId ? (
          <ExamRoom
            testId={activeExamId}
            onExit={() => setActiveExamId(null)}
            user={user}
          />
        ) : (
          <>
            {currentTab === 'catalog' && (
              <TestCatalog
                onSelectTest={(testId) => setActiveExamId(testId)}
                user={user}
              />
            )}
            {currentTab === 'speaking' && (
              <SpeakingSimulator
                user={user}
                onExit={() => setCurrentTab('catalog')}
              />
            )}
            {currentTab === 'dictation' && <DictationLab />}
            {currentTab === 'pronunciation' && <PronunciationLab />}
            {currentTab === 'classes' && (
              <EnrolledClasses
                user={user}
                onOpenTest={(testId) => setActiveExamId(testId)}
              />
            )}
            {currentTab === 'grading' && <TeacherGradingRoom />}
            {currentTab === 'admin' && <AdminPortal />}
          </>
        )}
      </main>

      {/* Footer */}
      {!activeExamId && (
        <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p className="font-semibold text-slate-400">
              Lumina English © 2026 — Nền Tảng Luyện Thi Tiếng Anh & Chấm Điểm AI Quốc Tế
            </p>
            <p>
              Hạ tầng điện toán đám mây: Supabase PostgreSQL & Render Web Service
            </p>
          </div>
        </footer>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Profile Modal (STU-18) */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </div>
  );
};

export default App;

