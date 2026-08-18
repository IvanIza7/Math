import React, { useState, useEffect } from 'react';
import { supabase } from './config/supabase';
import { LoginScreen } from './components/auth/LoginScreen';
import { User } from '@supabase/supabase-js';
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

function AppContent({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<MainTab>('guia');
  const [isLoadingData, setIsLoadingData] = useState(true);

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

  // Sync with Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const [profileRes, statsRes] = await Promise.all([
          supabase.from('user_profiles').select('*').eq('id', user.id).single(),
          supabase.from('user_stats').select('*').eq('id', user.id).single()
        ]);
        
        if (profileRes.data) {
          setUserProfile({
            name: profileRes.data.name,
            handle: profileRes.data.handle,
            avatarId: profileRes.data.avatar_id,
            academicGoal: profileRes.data.academic_goal,
            bio: profileRes.data.bio,
            favoriteArea: profileRes.data.favorite_area,
          });
        }
        
        if (statsRes.data) {
          setUserStats(prev => ({
            ...prev,
            xp: statsRes.data.xp,
            level: statsRes.data.level,
            streak: statsRes.data.streak,
            perfectTrialsCount: statsRes.data.perfect_trials_count,
            illegalMovesCaughtCount: statsRes.data.illegal_moves_caught_count,
            trialsCompleted: statsRes.data.trials_completed || [],
            badgesUnlocked: statsRes.data.badges_unlocked || [],
            completedTopics: statsRes.data.completed_topics || [],
          }));
        }
        
        const { data: attendanceData } = await supabase
          .from('attendance_records')
          .select('*')
          .eq('user_id', user.id);
          
        if (attendanceData) {
          setUserStats(prev => ({
            ...prev,
            attendanceRecords: attendanceData.map(r => ({
              id: r.id,
              dateStr: r.date_str,
              timestamp: r.timestamp,
              sessionNumber: r.session_number,
              topicCovered: r.topic_covered,
              notes: r.notes,
              status: r.status as any
            }))
          }));
        }
        
      } catch (err) {
        console.error('Error fetching data from Supabase', err);
      } finally {
        setIsLoadingData(false);
      }
    };
    
    fetchData();
  }, [user.id]);

  // Save User Profile to Supabase & localStorage
  useEffect(() => {
    try {
      localStorage.setItem('math_user_profile_data', JSON.stringify(userProfile));
      if (!isLoadingData) {
        supabase.from('user_profiles').upsert({
          id: user.id,
          name: userProfile.name,
          handle: userProfile.handle,
          avatar_id: userProfile.avatarId,
          academic_goal: userProfile.academicGoal,
          bio: userProfile.bio,
          favorite_area: userProfile.favoriteArea,
        }).then(({error}) => { if (error) console.error(error) });
      }
    } catch {
      // ignore
    }
  }, [userProfile, isLoadingData, user.id]);

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
      if (!isLoadingData) {
        supabase.from('user_stats').upsert({
          id: user.id,
          xp: userStats.xp,
          level: userStats.level,
          streak: userStats.streak,
          perfect_trials_count: userStats.perfectTrialsCount,
          illegal_moves_caught_count: userStats.illegalMovesCaughtCount,
          trials_completed: userStats.trialsCompleted,
          badges_unlocked: userStats.badgesUnlocked,
          completed_topics: userStats.completedTopics,
        }).then(({error}) => { if (error) console.error(error) });
      }
    } catch {
      // ignore
    }
  }, [userStats, isLoadingData, user.id]);

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

  const handleAddAttendance = async (
    status: 'completed' | 'cancelled' | 'absence' | 'none',
    dateStr: string,
    notes?: string
  ) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const timestamp = `${dateStr} ${hours}:${mins}`;

    const existingFilter = userStats.attendanceRecords.filter((r) => r.dateStr !== dateStr);
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

    // Optimistic UI Update
    setUserStats((prev) => ({
      ...prev,
      streak: status === 'completed' ? prev.streak + 1 : prev.streak,
      attendanceRecords: [...existingFilter, newRecord],
    }));
    
    // Also save to Supabase directly since attendance is a separate table
    if (!isLoadingData) {
      await supabase.from('attendance_records').insert({
        user_id: user.id,
        date_str: newRecord.dateStr,
        timestamp: newRecord.timestamp,
        session_number: newRecord.sessionNumber,
        topic_covered: newRecord.topicCovered,
        notes: newRecord.notes,
        status: newRecord.status
      });
    }
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
  const [session, setSession] = useState<any>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoadingSession) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!session) {
    return <LoginScreen onLoginSuccess={() => {}} />;
  }

  return (
    <ThemeProvider>
      <AppContent user={session.user} />
    </ThemeProvider>
  );
}

