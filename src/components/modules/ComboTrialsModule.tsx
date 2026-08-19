import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Clock, Trophy, CheckCircle, Sparkles, Target, Play, RotateCcw, Award, Zap, Shield, Swords, Flame } from 'lucide-react';
import { ARENA_CHALLENGES, ArenaChallenge } from '../../data/arenaChallengesData';
import { ArenaChallengeRunner } from '../ArenaChallengeRunner';
import { CrossMathGame } from '../CrossMathGame';
import { AsedioLinealGame } from '../AsedioLinealGame';
import { PracticeSetup } from '../PracticeSetup';
import { PracticeQuiz } from '../PracticeQuiz';
import { PracticeResults } from '../PracticeResults';
import { PracticePreset } from '../../types';
import { playSound } from '../../utils/sound';
import { saveActiveHeroSession } from '../../utils/activeSession';

interface ComboTrialsModuleProps {
  onAwardXp: (amount: number) => void;
  onOpenArsenal?: () => void;
  onIllegalMove?: (reason: string, choice: any) => void;
  initialGameMode?: 'desafios' | 'asedio' | 'crossmath' | 'practica';
  initialAsedioLevel?: number;
}

export interface ChallengeRecord {
  id: string;
  bestScore: number;
  completed: boolean;
}

export const ComboTrialsModule: React.FC<ComboTrialsModuleProps> = ({
  onAwardXp,
  initialGameMode = 'desafios',
  initialAsedioLevel = 0,
}) => {
  const [activeTab, setActiveTab] = useState<'desafios' | 'asedio' | 'crossmath' | 'practica'>(initialGameMode);
  const [activeChallenge, setActiveChallenge] = useState<ArenaChallenge | null>(null);
  const [isCrossMathActive, setIsCrossMathActive] = useState<boolean>(false);
  const [isAsedioActive, setIsAsedioActive] = useState<boolean>(false);
  const [asedioStartLevel, setAsedioStartLevel] = useState<number>(initialAsedioLevel);

  // Practice Flow State
  const [activePracticePreset, setActivePracticePreset] = useState<PracticePreset | null>(null);
  const [practiceSessionData, setPracticeSessionData] = useState<any>(null);

  // Storage of completed challenges with scores
  const [completedRecords, setCompletedRecords] = useState<Record<string, ChallengeRecord>>(() => {
    try {
      const saved = localStorage.getItem('arena_completed_challenges_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [timerSeconds, setTimerSeconds] = useState<number>(39257); // 10:54:17

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleChallengeComplete = (score: number, total: number, passed: boolean) => {
    if (!activeChallenge) return;

    const challengeId = activeChallenge.id;
    const currentRecord = completedRecords[challengeId];
    const prevBest = currentRecord?.bestScore || 0;
    const newBest = Math.max(prevBest, score);
    const isNowCompleted = passed || (currentRecord?.completed ?? false);

    const updatedRecords = {
      ...completedRecords,
      [challengeId]: {
        id: challengeId,
        bestScore: newBest,
        completed: isNowCompleted,
      },
    };

    setCompletedRecords(updatedRecords);
    try {
      localStorage.setItem('arena_completed_challenges_v2', JSON.stringify(updatedRecords));
    } catch {}

    if (passed) {
      onAwardXp(75);
    } else {
      onAwardXp(15);
    }
  };

  const completedCount = (Object.values(completedRecords) as ChallengeRecord[]).filter(
    (r) => r.completed
  ).length;

  if (activeChallenge) {
    return (
      <ArenaChallengeRunner
        challenge={activeChallenge}
        onClose={() => setActiveChallenge(null)}
        onComplete={(score, total, passed) => {
          handleChallengeComplete(score, total, passed);
        }}
      />
    );
  }

  if (isAsedioActive) {
    return (
      <AsedioLinealGame
        onBack={() => setIsAsedioActive(false)}
        onAwardXp={onAwardXp}
        initialLevelIndex={asedioStartLevel}
      />
    );
  }

  if (isCrossMathActive) {
    return (
      <CrossMathGame
        onBack={() => setIsCrossMathActive(false)}
        onAwardXp={onAwardXp}
      />
    );
  }

  if (activePracticePreset) {
    return (
      <PracticeQuiz 
        preset={activePracticePreset}
        onBack={() => setActivePracticePreset(null)}
        onFinish={(sessionData) => {
          setActivePracticePreset(null);
          setPracticeSessionData(sessionData);
          onAwardXp(50); // Small XP reward for practice
        }}
      />
    );
  }

  if (practiceSessionData) {
    return (
      <PracticeResults 
        sessionData={practiceSessionData}
        onBack={() => setPracticeSessionData(null)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F7CA38] text-[#1E1E24] pb-16 font-jakarta relative overflow-hidden">
      {/* Top Yellow Header Section with signature Memphis styling */}
      <motion.div
        initial={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          scaleY: 0.9,
          y: -15,
        }}
        animate={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scaleY: 1,
          y: 0,
        }}
        transition={{
          duration: 0.38,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: 'top center' }}
        className="w-full bg-[#F7CA38] pt-4 pb-7 px-5 flex flex-col items-center relative z-10"
      >
        {/* Background Memphis Accents */}
        <div className="absolute top-3 left-6 w-6 h-6 rounded-full border-2 border-[#1E1E24]/20 pointer-events-none" />
        <div className="absolute top-10 left-16 w-2 h-2 rounded-full bg-[#1E1E24]/30 pointer-events-none" />
        <div className="absolute top-6 right-8 text-[#1E1E24]/20 font-black text-lg pointer-events-none select-none">
          ✦
        </div>

        {/* Top Header Row */}
        <div className="w-full flex items-center justify-between mb-2 max-w-md">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-2xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-lg shadow-xs">
              ⚡
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1E1E24]/80 block">
                Entrenamiento & Combate
              </span>
              <h1 className="text-xl font-black uppercase tracking-tight text-[#1E1E24]">
                ARENA DE DESAFÍOS
              </h1>
            </div>
          </div>

          <div className="bg-white/95 border-2 border-[#1E1E24] shadow-xs rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-black text-[#1E1E24]">
            <Clock className="w-3.5 h-3.5 text-[#F97316]" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>
        </div>

        {/* Category 3-Way Tabs — "Desafíos" · "Asedio Lineal" · "Cross Math" */}
        <div className="w-full max-w-md flex items-center bg-white/90 p-1 rounded-full border-2 border-[#1E1E24] shadow-xs mt-2 gap-1">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playSound('click');
              setActiveTab('desafios');
            }}
            className={`flex-1 py-2 rounded-full text-center text-xs cursor-pointer flex items-center justify-center gap-1 active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all ${
              activeTab === 'desafios'
                ? 'bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] font-black'
                : 'text-[#8A909F] hover:text-[#1E1E24] font-bold border-2 border-transparent'
            }`}
          >
            <span>Desafíos</span>
            <span className="bg-white/80 border border-[#1E1E24]/30 rounded-md px-1.5 py-0.2 text-[9px] font-black text-[#1E1E24]">
              {completedCount}/4
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playSound('click');
              setActiveTab('asedio');
            }}
            className={`flex-1 py-2 rounded-full text-center text-xs cursor-pointer flex items-center justify-center gap-1 active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all ${
              activeTab === 'asedio'
                ? 'bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] font-black'
                : 'text-[#8A909F] hover:text-[#1E1E24] font-bold border-2 border-transparent'
            }`}
          >
            <span>⚔️ Asedio</span>
            <span className="bg-[#EF4444] text-white rounded-md px-1 py-0.2 text-[9px] font-black">
              30
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playSound('click');
              setActiveTab('crossmath');
            }}
            className={`flex-1 py-2 rounded-full text-center text-xs cursor-pointer flex items-center justify-center gap-1 active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all ${
              activeTab === 'crossmath'
                ? 'bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] font-black'
                : 'text-[#8A909F] hover:text-[#1E1E24] font-bold border-2 border-transparent'
            }`}
          >
            <span>Cross</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playSound('click');
              setActiveTab('practica');
            }}
            className={`flex-1 py-2 rounded-full text-center text-xs cursor-pointer flex items-center justify-center gap-1 active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all ${
              activeTab === 'practica'
                ? 'bg-[#BAFF29] text-[#1E1E24] border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] font-black'
                : 'text-[#8A909F] hover:text-[#1E1E24] font-bold border-2 border-transparent'
            }`}
          >
            <span>Práctica</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main White Content Card with Rounded Top Corners */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.35 }}
        className="relative z-20 w-full max-w-md mx-auto bg-white rounded-t-[36px] border-t-2 border-x-2 border-[#1E1E24] shadow-2xl p-5 pt-6 pb-24 space-y-4 flex-1"
      >
        {/* Milestone Progress Hero Card */}
        <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-3xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-black text-[#1E1E24]">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#F59E0B]" />
              Progreso de Desafíos
            </span>
            <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#1E1E24] text-[10px] text-[#6F78DB]">
              Pase Mínimo: 3/5 Aciertos
            </span>
          </div>

          {/* Horizontal Node Track */}
          <div className="relative flex items-center justify-between mx-2 my-2">
            {/* Connecting Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#E2E8F0] border border-[#1E1E24]/20 -z-0 rounded-full" />

            {/* 4 Nodes */}
            {[0, 1, 2, 3].map((nodeIdx) => {
              const challenge = ARENA_CHALLENGES[nodeIdx];
              const isCompleted = challenge && completedRecords[challenge.id]?.completed;

              return (
                <div key={nodeIdx} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full border-2 border-[#1E1E24] flex items-center justify-center transition-all shadow-xs ${
                      isCompleted
                        ? 'bg-[#22C55E] text-white font-black'
                        : 'bg-white text-[#8A909F]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-black text-xs">{nodeIdx + 1}</span>
                    )}
                  </div>

                  <span className="absolute -bottom-4 text-[#1E1E24] bg-white border border-[#1E1E24]/30 px-1.5 py-0.2 rounded-md text-[9px] font-black">
                    D-{nodeIdx + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Central Counter Large */}
          <div className="text-center pt-2">
            <div className="font-black text-3xl tracking-tight text-[#1E1E24]">
              {completedCount}/4
            </div>
            <p className="text-[11px] text-[#4A4E69] font-bold mt-0.5">
              Grandes Desafíos Superados (Banco de 200 Ejercicios)
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#1E1E24]">
            {activeTab === 'desafios'
              ? 'Banco de Desafíos Oficiales'
              : activeTab === 'asedio'
              ? 'Asedio Lineal · Clash Math'
              : activeTab === 'crossmath'
              ? 'Puzzles Cross Math'
              : 'Entrenamiento Libre'}
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold text-[#8A909F]">
            {activeTab === 'desafios'
              ? '5 preguntas aleatorias'
              : activeTab === 'asedio'
              ? '30 Escenarios'
              : activeTab === 'crossmath'
              ? 'Fácil · Medio · Difícil'
              : 'Ajustes Personalizados'}
          </span>
        </div>

        {/* Desafíos Cards List */}
        {activeTab === 'desafios' ? (
          <div className="grid grid-cols-2 gap-3">
            {ARENA_CHALLENGES.map((challenge, idx) => {
              const record = completedRecords[challenge.id];
              const isCompleted = record?.completed ?? false;

              return (
                <motion.div
                  key={challenge.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playSound('click');
                    setActiveChallenge(challenge);
                    // Save active session
                    saveActiveHeroSession({
                      id: `active-${challenge.id}`,
                      type: 'arena-challenge',
                      title: challenge.title,
                      subtitle: `${challenge.totalExercises} ejercicios · Meta 3/5`,
                      badge: 'ARENA · EN PROGRESO',
                      progressText: '5 preguntas por intento',
                      progressPercent: isCompleted ? 100 : 50,
                      totalSteps: 5,
                      currentStep: 1,
                      bgGradient: 'bg-gradient-to-br from-[#F7CA38] via-[#FBBF24] to-[#F59E0B]',
                      textColor: 'text-[#1E1E24]',
                      badgeBg: 'bg-[#1E1E24] text-white font-black',
                      ctaBg: 'bg-[#1E1E24] text-white font-black',
                      theme: 'arithmetic',
                      actionPayload: { challengeId: challenge.id },
                      lastUpdated: Date.now(),
                    });
                  }}
                  className={`border-2 border-[#1E1E24] rounded-3xl p-3 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer shadow-xs group ${
                    isCompleted ? 'bg-[#F0FDF4]' : 'bg-white'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-[11px] font-bold mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border border-[#1E1E24] ${
                      isCompleted ? 'bg-[#22C55E] text-white' : 'bg-[#FFF9E6] text-[#854D0E]'
                    }`}>
                      D-{idx + 1}
                    </span>
                    {isCompleted && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#22C55E]" />
                    )}
                  </div>

                  {/* Artwork Preview Box */}
                  <div className="my-1 h-20 rounded-2xl bg-[#FFF9E6] border-2 border-[#1E1E24] flex items-center justify-center p-2">
                    <div className="flex items-center gap-1">
                      {[idx === 0 ? '-3' : idx === 1 ? '½' : idx === 2 ? 'x²' : 'a²', idx === 0 ? '×' : idx === 1 ? '+' : idx === 2 ? '·' : '-', idx === 0 ? '-4' : idx === 1 ? '¾' : idx === 2 ? 'x³' : 'b²'].map((val, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-md border border-[#1E1E24] flex items-center justify-center text-[10px] font-black shadow-2xs ${
                            i === 1 ? 'bg-white text-[#8A909F]' : 'bg-[#F7CA38] text-[#1E1E24]'
                          }`}
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1E1E24]/15">
                    <div className="pr-1 flex-1">
                      <h3 className="font-black text-[10px] text-[#1E1E24] leading-tight uppercase line-clamp-2">
                        {challenge.shortTitle}
                      </h3>
                    </div>
                    <div className="w-6 h-6 shrink-0 bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1E24] group-active:translate-y-0.5 group-active:translate-x-0.5 group-active:shadow-none transition-all">
                      <ChevronRight className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : activeTab === 'asedio' ? (
          /* Asedio Lineal Feature Card */
          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 border-2 border-white flex items-center justify-center text-xl shadow-xs">
                    ⚔️
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                      MODO CLASH ROYALE
                    </span>
                    <h3 className="font-black text-base text-white">
                      Asedio Lineal: 30 Escenarios
                    </h3>
                  </div>
                </div>

                <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/30 shadow-xs">
                  Arena de Batalla
                </span>
              </div>

              {/* Leagues Preview Badges */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-800/80 border border-amber-500/40 rounded-xl p-2 text-center">
                  <span className="text-[9px] font-black text-amber-400 uppercase block">🥉 Bronce</span>
                  <span className="text-xs font-bold text-slate-200">1 a 10</span>
                </div>
                <div className="bg-slate-800/80 border border-slate-400/40 rounded-xl p-2 text-center">
                  <span className="text-[9px] font-black text-slate-300 uppercase block">🥈 Plata</span>
                  <span className="text-xs font-bold text-slate-200">11 a 20</span>
                </div>
                <div className="bg-slate-800/80 border border-yellow-400/40 rounded-xl p-2 text-center">
                  <span className="text-[9px] font-black text-yellow-300 uppercase block">🥇 Oro</span>
                  <span className="text-xs font-bold text-slate-200">21 a 30</span>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-3 text-xs text-slate-300 space-y-1">
                <p>
                  🛡️ <strong>Agrupamiento de Tropas:</strong> Fusiona $2x$ y $3x$ en su mismo lado antes de atacar.
                </p>
                <p>
                  🌉 <strong>Cruce del Puente ($=$):</strong> Transposición de términos invirtiendo signos.
                </p>
              </div>

              <button
                onClick={() => {
                  playSound('click');
                  setIsAsedioActive(true);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 border-2 border-slate-900 font-black text-xs uppercase tracking-wider rounded-full shadow-[4px_4px_0px_0px_#0F172A] cursor-pointer flex items-center justify-center gap-2 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
              >
                <Flame className="w-4 h-4 text-red-600 fill-current" />
                <span>Entrar a la Arena de Asedio</span>
              </button>
            </motion.div>
          </div>
        ) : activeTab === 'crossmath' ? (
          /* Cross Math Hub Tab */
          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playSound('click');
                setIsCrossMathActive(true);
                saveActiveHeroSession({
                  id: 'active-cross-math',
                  type: 'crossmath',
                  title: 'Cross Math: Puzzles de Lógica',
                  subtitle: 'Alinea sumas, restas y productos',
                  badge: 'CROSS MATH · PUZZLE',
                  progressText: '15 Niveles · Fácil a Difícil',
                  progressPercent: 33,
                  totalSteps: 3,
                  currentStep: 1,
                  bgGradient: 'bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#0369A1]',
                  textColor: 'text-white',
                  badgeBg: 'bg-[#FDE047] text-[#1E1E24] font-black',
                  ctaBg: 'bg-[#FDE047] text-[#1E1E24] font-black',
                  theme: 'algebra',
                  actionPayload: { difficulty: 'easy' },
                  lastUpdated: Date.now(),
                });
              }}
              className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer shadow-xs group"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between text-[11px] font-bold mb-3">
                <span className="bg-[#DCFCE7] text-[#166534] border border-[#1E1E24] px-3 py-0.5 rounded-full text-[10px] font-black">
                  15 Niveles Disponibles
                </span>

                <span className="text-xs font-black text-[#1E1E24] bg-[#FDE047] border border-[#1E1E24] px-2.5 py-0.5 rounded-full">
                  Fácil · Medio · Difícil
                </span>
              </div>

              {/* Artwork 3x3 Preview Grid */}
              <div className="my-2 h-32 rounded-2xl bg-[#FFF9E6] border-2 border-[#1E1E24] flex items-center justify-center p-3">
                <div className="grid grid-cols-3 gap-2">
                  {[7, '+', 8, '*', 6, '-', 12, '=', 23].map((val, idx) => (
                    <div
                      key={idx}
                      className={`w-7 h-7 rounded-lg border border-[#1E1E24] flex items-center justify-center text-[11px] font-black shadow-2xs ${
                        typeof val === 'number'
                          ? 'bg-[#F7CA38] text-[#1E1E24]'
                          : 'bg-white text-[#8A909F]'
                      }`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1E1E24]/15">
                <div>
                  <h3 className="font-black text-sm text-[#1E1E24]">
                    CROSS MATH PUZZLES
                  </h3>
                  <span className="text-[11px] text-[#4A4E69] font-bold block">
                    Cuadrículas 2x2 y 3x3 con las 4 operaciones
                  </span>
                </div>

                <div className="w-9 h-9 bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#1E1E24] group-active:translate-y-1 group-active:translate-x-1 group-active:shadow-none transition-all">
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Practica Tab */
          <div className="space-y-3">
            <PracticeSetup 
              onStartQuiz={(preset) => {
                setActivePracticePreset(preset);
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};
