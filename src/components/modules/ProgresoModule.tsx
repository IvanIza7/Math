import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Flame, Award, Calendar, Star, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import { UserStats, UserProfile } from '../../types';
import { BADGES_LIST } from '../../data/badges';
import { HexagonBadgeSvg } from '../Illustrations';
import { playSound } from '../../utils/sound';

interface ProgresoModuleProps {
  userStats: UserStats;
  userProfile?: UserProfile;
  onOpenBadgesModal: () => void;
  onOpenAttendanceModal: () => void;
}

export const ProgresoModule: React.FC<ProgresoModuleProps> = ({
  userStats,
  userProfile,
  onOpenBadgesModal,
  onOpenAttendanceModal,
}) => {
  const currentXpInLevel = userStats.xp % 500;
  const xpProgressPercent = Math.min(100, Math.round((currentXpInLevel / 500) * 100));

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
              📊
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1E1E24]/80 block">
                Dashboard de Rendimiento
              </span>
              <h1 className="text-xl font-black uppercase tracking-tight text-[#1E1E24]">
                MI PROGRESO
              </h1>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound('click');
              onOpenBadgesModal();
            }}
            className="px-3.5 py-1.5 bg-white border-2 border-[#1E1E24] hover:bg-[#F8FAFC] text-[#1E1E24] font-black text-xs uppercase tracking-wider rounded-full shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-[#1E1E24]" />
            <span>Medallas ({userStats.badgesUnlocked.length})</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main White Card with Rounded Top Corners */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.35 }}
        className="relative z-20 w-full max-w-md mx-auto bg-white dark:bg-[#161822] rounded-t-[36px] border-t-2 border-x-2 border-[#1E1E24] dark:border-[#2C2C3C] shadow-2xl p-5 pt-6 pb-24 space-y-4 flex-1 transition-colors duration-200"
      >
        {/* Level Progression Hero Card */}
        <div className="bg-[#FFF9E6] dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] rounded-3xl p-4 shadow-xs space-y-2.5 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-[#1E1E24] dark:text-white flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#F7CA38] text-[#1E1E24]" />
              Nivel de Maestría {userStats.level}
            </span>
            <span className="bg-white dark:bg-[#282B3E] border border-[#1E1E24] dark:border-[#3E4259] px-2.5 py-0.5 rounded-full text-[10px] font-black text-[#6F78DB] dark:text-[#8D96F5]">
              {currentXpInLevel} / 500 XP
            </span>
          </div>

          <div className="w-full bg-white dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] h-6 rounded-full overflow-hidden p-0.5 shadow-2xs">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(15, xpProgressPercent)}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="bg-[#6F78DB] h-full rounded-full flex items-center justify-start px-3 text-[10px] font-black text-white"
            >
              {xpProgressPercent}%
            </motion.div>
          </div>
        </div>

        {/* Grid of Core Metric Cards (2x2) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Streak Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#F8FAFC] dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] p-3.5 rounded-3xl shadow-xs transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase text-[#8A909F] dark:text-gray-400">
                Racha Activa
              </span>
              <span className="w-6 h-6 rounded-full bg-[#FFF9E6] dark:bg-[#282B3E] border border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center text-xs">
                🔥
              </span>
            </div>
            <span className="text-2xl font-black text-[#1E1E24] dark:text-white block tracking-tight">
              {userStats.streak} Días
            </span>
            <span className="text-[10px] font-black text-[#22C55E] bg-[#DCFCE7] dark:bg-[#14532D]/40 border border-[#22C55E]/40 px-2 py-0.5 rounded-md inline-block mt-1">
              ¡Sin perder el ritmo!
            </span>
          </motion.div>

          {/* Total XP Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#F8FAFC] dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] p-3.5 rounded-3xl shadow-xs transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase text-[#8A909F] dark:text-gray-400">
                XP Total
              </span>
              <span className="w-6 h-6 rounded-full bg-[#FFF9E6] dark:bg-[#282B3E] border border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center text-xs">
                ⭐
              </span>
            </div>
            <span className="text-2xl font-black text-[#1E1E24] dark:text-white block tracking-tight">
              {userStats.xp} XP
            </span>
            <span className="text-[10px] font-black text-[#6F78DB] dark:text-[#8D96F5] bg-[#EEF2FF] dark:bg-[#1E2040] border border-[#6F78DB]/30 px-2 py-0.5 rounded-md inline-block mt-1">
              Puntos Acumulados
            </span>
          </motion.div>

          {/* Perfect Combos */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#F8FAFC] dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] p-3.5 rounded-3xl shadow-xs transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase text-[#8A909F] dark:text-gray-400">
                Trials Perfectos
              </span>
              <span className="w-6 h-6 rounded-full bg-[#FFF9E6] dark:bg-[#282B3E] border border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center text-xs">
                ⚡
              </span>
            </div>
            <span className="text-2xl font-black text-[#1E1E24] dark:text-white block tracking-tight">
              {userStats.perfectTrialsCount}
            </span>
            <span className="text-[10px] font-black text-[#F59E0B] bg-[#FEF3C7] dark:bg-[#78350F]/40 border border-[#F59E0B]/30 px-2 py-0.5 rounded-md inline-block mt-1">
              Sin cometer faltas
            </span>
          </motion.div>

          {/* Attendance Classes */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#F8FAFC] dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] p-3.5 rounded-3xl shadow-xs transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase text-[#8A909F] dark:text-gray-400">
                Clases Presenciales
              </span>
              <span className="w-6 h-6 rounded-full bg-[#FFF9E6] dark:bg-[#282B3E] border border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center text-xs">
                📅
              </span>
            </div>
            <span className="text-2xl font-black text-[#1E1E24] dark:text-white block tracking-tight">
              {userStats.attendanceRecords.length}
            </span>
            <span className="text-[10px] font-black text-[#166534] dark:text-[#4ADE80] bg-[#DCFCE7] dark:bg-[#14532D]/40 border border-[#22C55E]/40 px-2 py-0.5 rounded-md inline-block mt-1">
              Sesiones validadas
            </span>
          </motion.div>
        </div>

        {/* Attendance Summary Section */}
        <div className="bg-white dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] rounded-3xl p-4 shadow-xs space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-[#1E1E24] dark:text-white flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#6F78DB]" />
              <span>Historial de Clases</span>
            </h3>

            <button
              onClick={() => {
                playSound('click');
                onOpenAttendanceModal();
              }}
              className="px-3 py-1 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] font-black text-[11px] uppercase rounded-full border border-[#1E1E24] shadow-xs cursor-pointer"
            >
              Registrar
            </button>
          </div>

          <div className="space-y-2">
            {[...userStats.attendanceRecords].slice(-3).reverse().map((rec) => (
              <div
                key={rec.id}
                className="bg-[#F8FAFC] dark:bg-[#161822] p-3 rounded-2xl border-2 border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <span className="font-black text-[#1E1E24] dark:text-white block">
                    Sesión #{rec.sessionNumber}
                  </span>
                  <span className="font-medium text-[#4A4E69] dark:text-gray-300 text-[11px]">
                    {rec.topicCovered}
                  </span>
                </div>
                <span className="text-[10px] font-black text-[#166534] dark:text-[#4ADE80] bg-[#DCFCE7] dark:bg-[#14532D]/40 border border-[#22C55E]/40 px-2.5 py-1 rounded-full">
                  {rec.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Preview Section */}
        <div className="bg-white dark:bg-[#1E202E] border-2 border-[#1E1E24] dark:border-[#2E3144] rounded-3xl p-4 shadow-xs space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-[#1E1E24] dark:text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#6F78DB]" />
              <span>Medallas Desbloqueadas</span>
            </h3>

            <button
              onClick={() => {
                playSound('click');
                onOpenBadgesModal();
              }}
              className="flex items-center gap-1 px-3 py-1 bg-white dark:bg-[#1E1E24] border-2 border-[#1E1E24] dark:border-[#4A4E69] rounded-full text-[11px] font-black text-[#1E1E24] dark:text-white shadow-[2px_2px_0px_0px_#1E1E24] dark:shadow-[2px_2px_0px_0px_#4A4E69] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <span>Ver Todas</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {BADGES_LIST.slice(0, 4).map((badge) => {
              const isUnlocked = userStats.badgesUnlocked.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  onClick={() => {
                    playSound('click');
                    onOpenBadgesModal();
                  }}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-transform hover:scale-102 flex items-center gap-2.5 ${
                    isUnlocked
                      ? 'bg-[#FFF9E6] dark:bg-[#202334] border-[#1E1E24] dark:border-[#3E4259] shadow-xs'
                      : 'bg-[#F8FAFC] dark:bg-[#161822] border-[#1E1E24]/30 dark:border-white/10 opacity-60'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#282B3E] border-2 border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center text-base font-black shrink-0">
                    {isUnlocked ? '🏅' : '🔒'}
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#1E1E24] dark:text-white block leading-tight">
                      {badge.title}
                    </span>
                    <span className="text-[10px] font-bold text-[#8A909F] dark:text-gray-400">
                      {isUnlocked ? 'Desbloqueado' : 'Bloqueado'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
