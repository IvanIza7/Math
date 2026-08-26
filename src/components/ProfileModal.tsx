import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Star, Flame, Award, Sparkles, Trophy, Zap, LogOut } from 'lucide-react';
import { supabase } from '../config/supabase';
import { CatlyneAvatar, StreakCheeringCharacter } from './Illustrations';
import { UserStats } from '../types';
import { playSound } from '../utils/sound';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  onOpenBadgesFull?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userStats,
  onOpenBadgesFull,
}) => {
  if (!isOpen) return null;

  const currentXp = userStats?.xp ?? 0;
  const progressPercent = Math.min(100, Math.round(((currentXp % 500) / 500) * 100));

  const badges = [
    { id: 'b1', name: 'Super Star', icon: '⭐', bg: '#FEF08A', border: '#FACC15', unlocked: true },
    { id: 'b2', name: 'Quiz Champion', icon: '🏆', bg: '#BAE6FD', border: '#38BDF8', unlocked: true },
    { id: 'b3', name: 'Math Whiz Kid', icon: '⚡', bg: '#FECDD3', border: '#F43F5E', unlocked: true },
    { id: 'b4', name: 'Science Pro', icon: '🔬', bg: '#DDD6FE', border: '#8B5CF6', unlocked: true },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs font-jakarta">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute inset-0 bg-black/40"
        />

        {/* Modal Main Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: -25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: -25 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="relative z-10 w-full max-w-sm max-h-[92vh] bg-white rounded-[36px] shadow-2xl flex flex-col overflow-hidden text-[#1E1E24] border-2 border-[#1E1E24]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Yellow Header Section with rounded downward corners & drop-in microanimation */}
          <motion.div
            initial={{ y: -60, opacity: 0, scaleY: 0.85 }}
            animate={{ y: 0, opacity: 1, scaleY: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 240 }}
            className="bg-[#F7CA38] border-b-2 border-[#1E1E24] p-5 pb-7 flex flex-col items-center relative rounded-b-[44px] shadow-xs z-10 overflow-hidden"
          >
            {/* Background Memphis Accents */}
            <div className="absolute top-2 left-4 w-6 h-6 rounded-full border-2 border-black/10 pointer-events-none" />
            <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-black/15 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full border-2 border-dashed border-black/10 pointer-events-none" />
            <div className="absolute top-12 right-12 text-black/15 font-black text-lg pointer-events-none select-none">
              ✦
            </div>

            {/* Close Button Top Right with micro-interaction */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="absolute top-4 right-4 w-9 h-9 bg-white hover:bg-black/10 border-2 border-[#1E1E24] rounded-full flex items-center justify-center text-[#1E1E24] cursor-pointer transition-colors z-20 shadow-2xs"
              title="Cerrar perfil"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </motion.button>

            {/* Profile Avatar with bouncy spring pop */}
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 220, delay: 0.1 }}
              className="mt-1 p-1 bg-white rounded-full shadow-lg border-2 border-[#1E1E24] relative group"
            >
              <CatlyneAvatar size={80} />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#22C55E] border-2 border-white shadow-xs" />
            </motion.div>

            {/* User Name & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-center mt-2.5"
            >
              <h2 className="text-xl font-black text-[#1E1E24] tracking-tight">
                Catlyne Sarah
              </h2>
              <span className="text-xs font-bold text-[#1E1E24]/85">
                @cat23_ · Estudiante Bachillerato
              </span>
            </motion.div>

            {/* Level Progress & XP Line */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="w-full mt-3.5 flex flex-col gap-1 px-3"
            >
              <div className="flex items-center justify-between text-xs font-black text-[#1E1E24]">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#1E1E24]" /> My Level Progress
                </span>
                <span className="flex items-center gap-1 bg-white/60 border border-[#1E1E24]/30 px-2 py-0.5 rounded-full text-[11px] font-black">
                  <Star className="w-3 h-3 fill-[#1E1E24] text-[#1E1E24]" />
                  {currentXp} XP
                </span>
              </div>
              <div className="w-full bg-white/60 border border-[#1E1E24]/40 h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(15, progressPercent)}%` }}
                  transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                  className="bg-[#6F78DB] h-full rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Card Content with Slide-Up Microanimation */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.35 }}
            className="flex-1 overflow-y-auto p-4 pt-3 space-y-3.5 bg-white no-scrollbar"
          >
            {/* Streaks Hero Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-2xl p-3.5 flex items-center justify-between shadow-2xs cursor-pointer transition-transform"
            >
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-[#B45309] uppercase tracking-wider block">
                  Racha Actual
                </span>
                <h3 className="text-lg font-black text-[#1E1E24] flex items-center gap-1.5">
                  {userStats?.streak ?? 0} días activos <Flame className="w-4 h-4 fill-[#F97316] text-[#F97316] animate-bounce" />
                </h3>
              </div>

              <div className="flex items-center gap-1">
                <StreakCheeringCharacter />
                <ChevronRight className="w-5 h-5 text-[#B45309] stroke-[2.5]" />
              </div>
            </motion.div>

            {/* 2-Column Stats (Level & Points) */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-3 flex items-center gap-2.5 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] border border-[#1E1E24]/30 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                  🥇
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#8A909F] block">
                    Nivel
                  </span>
                  <span className="text-xs font-black text-[#1E1E24]">
                    Nivel {userStats?.level ?? 1}
                  </span>
                </div>
              </div>

              <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-3 flex items-center gap-2.5 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] border border-[#F7CA38]/40 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                  ⭐
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#8A909F] block">
                    Puntos XP
                  </span>
                  <span className="text-xs font-black text-[#1E1E24]">
                    {currentXp} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Level Progress Capsule */}
            <div className="space-y-1.5 bg-[#F8FAFC] p-3 rounded-2xl border-2 border-[#1E1E24] shadow-2xs">
              <div className="flex items-center justify-between text-xs font-black text-[#1E1E24]">
                <span>Progreso hacia Nivel {(userStats?.level ?? 1) + 1}</span>
                <span className="text-[#6F78DB] font-extrabold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-7 rounded-full p-1 flex items-center border border-[#1E1E24]/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(25, progressPercent)}%` }}
                  transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
                  className="bg-[#6F78DB] h-full rounded-full flex items-center justify-end px-2.5 text-[10px] font-black text-white shadow-2xs"
                >
                  {currentXp % 500} / 500
                </motion.div>
              </div>
            </div>

            {/* My Badges Section */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#1E1E24] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#6F78DB]" /> Medallas Destacadas
                </span>
                <button
                  onClick={() => {
                    playSound('click');
                    if (onOpenBadgesFull) onOpenBadgesFull();
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-white border-2 border-[#1E1E24] rounded-full text-[11px] font-black text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  <span>Ver Todas</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {badges.map((b) => (
                  <motion.div
                    key={b.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shadow-xs border-2 border-[#1E1E24] transition-transform"
                      style={{ backgroundColor: b.bg }}
                    >
                      {b.icon}
                    </div>
                    <span className="text-[10px] font-bold text-[#1E1E24] leading-tight line-clamp-1">
                      {b.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Logout Button */}
            <div className="pt-2">
              <button
                onClick={async () => {
                  playSound('click');
                  localStorage.removeItem('math_active_hero_sessions_v2');
                  localStorage.removeItem('arena_completed_challenges_v2');
                  await supabase.auth.signOut();
                }}
                className="w-full bg-white border-2 border-[#1E1E24] text-[#EF4444] rounded-2xl p-3 flex items-center justify-center gap-2 font-black shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all cursor-pointer"
              >
                <LogOut className="w-5 h-5 stroke-[3]" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
