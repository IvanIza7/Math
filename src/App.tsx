import React, { useState, useEffect } from 'react';
import { UserStats, UserProfile, MainTab, AttendanceRecord } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { FloatingNav } from './components/FloatingNav';
import { AttendanceModal } from './components/AttendanceModal';
import { ArsenalModal } from './components/ArsenalModal';
import { BadgesModal } from './components/BadgesModal';
import { EncyclopediaLayout } from './components/EncyclopediaLayout';
import { ComboTrialsModule } from './components/modules/ComboTrialsModule';
import { PlanDeClaseModule } from './components/modules/PlanDeClaseModule';
import { ProgresoModule } from './components/modules/ProgresoModule';

function AppContent() {
  const [activeTab, setActiveTab] = useState<MainTab>('guia');

  // User Profile State (Stored in localStorage)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('math_user_profile_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      name: 'Ian',
      handle: '@ian_math',
      avatarId: 'astro',
      academicGoal: 'Bachillerato · Examen UNAM',
      bio: 'Dominando el álgebra y las matemáticas sin adivinar ✨',
      favoriteArea: 'Álgebra',
    };
  });

  // Save User Profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('math_user_profile_data', JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  }, [userProfile]);

  // Gamification User Stats (Stored in localStorage)
  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('math_anti_guessing_stats');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      xp: 320,
      level: 1,
      streak: 3,
      trialsCompleted: ['t01'],
      badgesUnlocked: ['badge-novice'],
      perfectTrialsCount: 1,
      illegalMovesCaughtCount: 0,
      attendanceRecords: [
        {
          id: 'att-1',
          dateStr: '2026-08-01',
          timestamp: '2026-08-01 10:00',
          sessionNumber: 1,
          topicCovered: 'Clasificación de Números Reales',
          notes: 'Clase introductoria de repaso.',
          status: 'completed',
        },
      ],
      completedTopics: ['vol1-t1', 'vol1-t2'],
    };
  });

  // Save stats on update
  useEffect(() => {
    try {
      localStorage.setItem('math_anti_guessing_stats', JSON.stringify(userStats));
    } catch {
      // ignore
    }
  }, [userStats]);

  // Modal States
  const [isAttendanceOpen, setIsAttendanceOpen] = useState<boolean>(false);
  const [isArsenalOpen, setIsArsenalOpen] = useState<boolean>(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);

  const handleAwardXp = (amount: number) => {
    setUserStats((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 500) + 1;
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        perfectTrialsCount: prev.perfectTrialsCount + 1,
      };
    });
  };

  const handleAddAttendance = (
    status: 'completed' | 'cancelled' | 'absence' | 'none',
    dateStr: string,
    notes?: string
  ) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const timestamp = `${dateStr} ${hours}:${mins}`;

    setUserStats((prev) => {
      const existingFilter = prev.attendanceRecords.filter((r) => r.dateStr !== dateStr);
      const completedCount = existingFilter.filter((r) => r.status === 'completed').length;
      const sessionNumber = status === 'completed' ? completedCount + 1 : completedCount;

      const newRecord: AttendanceRecord = {
        id: `att-${Date.now()}`,
        dateStr,
        timestamp,
        sessionNumber,
        topicCovered: status === 'completed' ? `Clase #${sessionNumber} Impartida` : status === 'cancelled' ? 'Clase Cancelada' : 'Ausencia del Alumno',
        notes: notes || (status === 'completed' ? 'Clase presencial realizada' : 'Registro de asistencia'),
        status,
      };

      return {
        ...prev,
        streak: status === 'completed' ? prev.streak + 1 : prev.streak,
        attendanceRecords: [...existingFilter, newRecord],
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-[#0F1117] text-[#1E1E24] dark:text-[#F4F7FC] flex flex-col font-jakarta relative pb-20 no-scrollbar transition-colors duration-200">
      {/* Main View Switcher */}
      <main className="flex-1 w-full max-w-md mx-auto">
        {activeTab === 'guia' && (
          <EncyclopediaLayout
            userStats={userStats}
            userProfile={userProfile}
            onUpdateProfile={(updated) => setUserProfile(updated)}
            onAwardXp={handleAwardXp}
            onOpenNotifications={() => setIsBadgesOpen(true)}
            onOpenBadges={() => setIsBadgesOpen(true)}
          />
        )}

        {(activeTab === 'arena' || activeTab === 'trials') && (
          <ComboTrialsModule
            onAwardXp={handleAwardXp}
            onOpenArsenal={() => setIsArsenalOpen(true)}
            completedTrialIds={userStats.trialsCompleted}
          />
        )}

        {activeTab === 'plan' && (
          <PlanDeClaseModule
            attendanceRecords={userStats.attendanceRecords}
            onOpenAttendanceModal={() => setIsAttendanceOpen(true)}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'mas' && (
          <ProgresoModule
            userStats={userStats}
            userProfile={userProfile}
            onOpenBadgesModal={() => setIsBadgesOpen(true)}
            onOpenAttendanceModal={() => setIsAttendanceOpen(true)}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar (5 Core Tabs) */}
      <FloatingNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Modals */}
      <AttendanceModal
        isOpen={isAttendanceOpen}
        onClose={() => setIsAttendanceOpen(false)}
        attendanceRecords={userStats.attendanceRecords}
        onAddAttendance={handleAddAttendance}
      />

      <ArsenalModal
        isOpen={isArsenalOpen}
        onClose={() => setIsArsenalOpen(false)}
      />

      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        userStats={userStats}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

