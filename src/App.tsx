import React, { useState, useEffect } from 'react';
import { supabase } from './config/supabase';
import { LoginScreen } from './components/auth/LoginScreen';
import { User } from '@supabase/supabase-js';
import { UserStats, UserProfile, MainTab, AttendanceRecord, ProgressEvent } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressEngine } from './engine/ProgressEngine';
import { FloatingNav } from './components/FloatingNav';
import { AttendanceModal } from './components/AttendanceModal';
import { ArsenalModal } from './components/ArsenalModal';
import { BadgesModal } from './components/BadgesModal';
import { OnboardingModal, AcademicGrade } from './components/OnboardingModal';
import { EncyclopediaLayout } from './components/EncyclopediaLayout';
import { ComboTrialsModule } from './components/modules/ComboTrialsModule';
import { PlanDeClaseModule } from './components/modules/PlanDeClaseModule';
import { ProgresoModule } from './components/modules/ProgresoModule';
import { FormulaViewModule } from './components/modules/FormulaViewModule';
import { MagicFormulaModal } from './components/MagicFormulaModal';
import { AdminPanelModule } from './components/modules/AdminPanelModule';
import { Wand2 } from 'lucide-react';

function AppContent({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<MainTab>('guia');
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isMagicFormulaOpen, setIsMagicFormulaOpen] = useState(false);

  const profileStorageKey = `math_user_profile_${user.id}`;
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(profileStorageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      name: '',
      handle: '',
      avatarId: 'astro',
      academicGoal: '',
      bio: 'Dominando el álgebra y las matemáticas sin adivinar ✨',
      favoriteArea: 'Álgebra',
      role: 'student',
    };
  });

  const [showOnboarding, setShowOnboarding] = useState(false);

  // Internal Events State
  const [events, setEvents] = useState<ProgressEvent[]>([]);

  // Sync with Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const [profileRes, statsRes, eventsRes] = await Promise.all([
          supabase.from('user_profiles').select('*').eq('id', user.id).maybeSingle(),
          supabase.from('user_stats').select('*').eq('id', user.id).maybeSingle(),
          supabase.from('progress_events').select('*').eq('student_id', user.id).order('created_at', { ascending: true })
        ]);
        
        if (profileRes.data) {
          let loadedName = profileRes.data.name || '';
          if (loadedName.startsWith('mathapp.dummy.')) {
            loadedName = loadedName.replace('mathapp.dummy.', '');
          }
          setUserProfile({
            name: loadedName,
            handle: profileRes.data.handle,
            avatarId: profileRes.data.avatar_id,
            academicGoal: profileRes.data.academic_goal,
            bio: profileRes.data.bio,
            favoriteArea: profileRes.data.favorite_area,
            role: profileRes.data.role || 'student',
          });
        } else {
          // New Profile! Set initial name from metadata and trigger onboarding
          const metaUsername = user.user_metadata?.username;
          let baseName = metaUsername || (user.email ? user.email.split('@')[0] : 'Estudiante');
          if (baseName.startsWith('mathapp.dummy.')) {
            baseName = baseName.replace('mathapp.dummy.', '');
          }
          
          if (!profileRes.data || !profileRes.data.avatar_id) {
            // No profile set up yet
            setUserProfile(prev => ({
              ...prev,
              name: baseName,
              handle: `@${baseName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
            }));
            
            // Clear any previous user's local storage data
            localStorage.removeItem('math_active_hero_sessions_v2');
            localStorage.removeItem('arena_completed_challenges_v2');
            setShowOnboarding(true);
          }
        }
        
        let baseStats: Partial<UserStats> = {};
        if (statsRes.data) {
          baseStats = {
            xp: statsRes.data.xp,
            level: statsRes.data.level,
            streak: statsRes.data.streak,
            perfectTrialsCount: statsRes.data.perfect_trials_count,
            illegalMovesCaughtCount: statsRes.data.illegal_moves_caught_count,
            trialsCompleted: statsRes.data.trials_completed || [],
            badgesUnlocked: statsRes.data.badges_unlocked || [],
            completedTopics: statsRes.data.completed_topics || [],
          };
        }
        
        let loadedEvents: ProgressEvent[] = [];
        if (eventsRes.data) {
          loadedEvents = eventsRes.data.map(e => ({
            id: e.id,
            studentId: e.student_id,
            eventType: e.event_type as ProgressEvent['eventType'],
            entityId: e.entity_id,
            timestamp: e.created_at,
            xpDelta: e.xp_delta,
            metadata: e.metadata
          }));
          setEvents(loadedEvents);
        }

        const { data: attendanceData } = await supabase
          .from('attendance_records')
          .select('*')
          .eq('user_id', user.id);
        if (attendanceData) {
          const attendanceRecs = attendanceData.map(r => ({
            id: r.id,
            dateStr: r.date_str,
            timestamp: r.timestamp,
            sessionNumber: r.session_number,
            topicCovered: r.topic_covered,
            notes: r.notes,
            status: r.status as any
          }));
          baseStats.attendanceRecords = attendanceRecs;
        }

        // Compute actual state using engine
        const computedState = ProgressEngine.calculateStateFromEvents(loadedEvents, baseStats);
        setUserStats(computedState);
        
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
      localStorage.setItem(`math_user_profile_${user.id}`, JSON.stringify(userProfile));
      if (!isLoadingData && !showOnboarding) {
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
  }, [userProfile, isLoadingData, showOnboarding, user.id]);

  // Gamification User Stats (Stored in localStorage)
  const statsStorageKey = `math_anti_guessing_stats_${user.id}`;
  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(statsStorageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      xp: 0,
      level: 1,
      streak: 0,
      trialsCompleted: [],
      badgesUnlocked: [],
      perfectTrialsCount: 0,
      illegalMovesCaughtCount: 0,
      attendanceRecords: [],
      completedTopics: [],
    };
  });

  // Save stats on update
  useEffect(() => {
    try {
      localStorage.setItem(`math_anti_guessing_stats_${user.id}`, JSON.stringify(userStats));
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

  const handleSaveAttendance = (record: AttendanceRecord) => {
    // Also save to Supabase attendance_records directly
    supabase.from('attendance_records').insert({
      id: record.id,
      user_id: user.id,
      date_str: record.dateStr,
      timestamp: record.timestamp,
      session_number: record.sessionNumber,
      topic_covered: record.topicCovered,
      notes: record.notes,
      status: record.status
    }).then(({error}) => {
      if (error) console.error('Error saving attendance', error);
    });

    // Create and save event
    const evt = ProgressEngine.createEvent(user.id, 'ATTENDANCE_REGISTERED', record.id, 0, { record });
    saveEventAndRecalculate(evt);
  };

  const handleAwardXp = (amount: number, reason?: string, entityId?: string, metadata?: any) => {
    let evtType: any = 'TOPIC_COMPLETED';
    if (reason === 'trials' || reason === 'TRIAL_COMPLETED') evtType = 'TRIAL_COMPLETED';
    if (reason === 'PRACTICE_COMPLETED') evtType = 'PRACTICE_COMPLETED';
    if (reason === 'TOPIC_COMPLETED') evtType = 'TOPIC_COMPLETED';

    const evt = ProgressEngine.createEvent(user.id, evtType, entityId || `gen_${Date.now()}`, amount, metadata || {});
    saveEventAndRecalculate(evt);
  };

  const saveEventAndRecalculate = (evt: ProgressEvent) => {
    // 1. Save to Supabase
    supabase.from('progress_events').insert({
      id: evt.id,
      student_id: evt.studentId,
      event_type: evt.eventType,
      entity_id: evt.entityId,
      xp_delta: evt.xpDelta,
      created_at: evt.timestamp,
      metadata: evt.metadata
    }).then(({error}) => {
      if (error) console.error('Error saving event', error);
    });

    // 2. Update local events and recalculate
    setEvents(prev => {
      const newEvents = [...prev, evt];
      
      // Calculate new state
      const computedState = ProgressEngine.calculateStateFromEvents(newEvents, {
        xp: userStats.xp,
        level: userStats.level,
        streak: userStats.streak,
        trialsCompleted: userStats.trialsCompleted,
        badgesUnlocked: userStats.badgesUnlocked,
        perfectTrialsCount: userStats.perfectTrialsCount,
        illegalMovesCaughtCount: userStats.illegalMovesCaughtCount,
        completedTopics: userStats.completedTopics,
        attendanceRecords: userStats.attendanceRecords
      });

      setUserStats(computedState);
      return newEvents;
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
            onAwardXp={(amount) => handleAwardXp(amount, 'general')}
            onOpenNotifications={() => setIsBadgesOpen(true)}
            onOpenBadges={() => setIsBadgesOpen(true)}
            onAdminClick={() => setActiveTab('admin')}
          />
        )}

        {(activeTab === 'arena' || activeTab === 'trials') && (
          <ComboTrialsModule
            onAwardXp={(amount) => handleAwardXp(amount, 'trials')}
            onOpenArsenal={() => setIsArsenalOpen(true)}
            completedTrialIds={userStats.trialsCompleted}
          />
        )}

        {activeTab === 'formulario' && <FormulaViewModule />}

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

        {activeTab === 'admin' && (
          userProfile.role === 'admin' ? (
            <AdminPanelModule
              onBack={() => setActiveTab('guia')}
              onSaveAttendance={handleSaveAttendance}
              attendanceRecords={userStats.attendanceRecords}
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
              <h1 className="text-4xl font-black mb-4">403</h1>
              <p className="font-bold text-gray-500">Acceso denegado. No tienes permisos de administrador.</p>
              <button 
                onClick={() => setActiveTab('guia')}
                className="mt-6 px-6 py-3 bg-[#1E1E24] text-white font-black rounded-xl"
              >
                Volver
              </button>
            </div>
          )
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

      <MagicFormulaModal 
        isOpen={isMagicFormulaOpen}
        onClose={() => setIsMagicFormulaOpen(false)}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        username={userProfile.name || 'Estudiante'}
        onComplete={(onboardingData) => {
          const updatedProfile = { 
            ...userProfile, 
            academicGoal: onboardingData.academicGoal,
            avatarId: onboardingData.avatarId,
            bio: onboardingData.bio,
            favoriteArea: onboardingData.favoriteArea
          };
          setUserProfile(updatedProfile);
          setShowOnboarding(false);
          // Actualizar inmediatamente en base de datos para no perderlo
          supabase.from('user_profiles').upsert({
            id: user.id,
            name: updatedProfile.name,
            handle: updatedProfile.handle,
            avatar_id: updatedProfile.avatarId,
            academic_goal: updatedProfile.academicGoal,
            bio: updatedProfile.bio,
            favorite_area: updatedProfile.favoriteArea,
          }).then();
        }}
      />

      {/* Floating Magic Formula Button */}
      <button
        onClick={() => setIsMagicFormulaOpen(true)}
        className="fixed bottom-24 right-4 z-40 w-14 h-14 bg-[#BAFF29] rounded-full border-2 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] flex items-center justify-center cursor-pointer active:translate-y-1 active:translate-x-1 active:shadow-none transition-all group"
      >
        <Wand2 className="w-6 h-6 text-[#1E1E24] group-hover:rotate-12 transition-transform" />
      </button>
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

