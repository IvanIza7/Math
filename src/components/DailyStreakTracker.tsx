import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Check, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';

interface DailyStreakTrackerProps {
  streakDays?: number;
  onOpenArena?: () => void;
}

export const DailyStreakTracker: React.FC<DailyStreakTrackerProps> = ({
  streakDays = 5,
  onOpenArena,
}) => {
  const [claimedToday, setClaimedToday] = useState(false);
  const [showRewardToast, setShowRewardToast] = useState(false);

  const daysOfWeek = [
    { label: 'L', name: 'Lun', active: true, isToday: false },
    { label: 'M', name: 'Mar', active: true, isToday: false },
    { label: 'M', name: 'Mié', active: true, isToday: false },
    { label: 'J', name: 'Jue', active: true, isToday: false },
    { label: 'V', name: 'Vie', active: true, isToday: true },
    { label: 'S', name: 'Sáb', active: false, isToday: false },
    { label: 'D', name: 'Dom', active: false, isToday: false },
  ];

  const handleClaimStreak = () => {
    playSound('correct');
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.3 },
      colors: ['#F97316', '#F59E0B', '#F7CA38', '#6F78DB'],
    });
    setClaimedToday(true);
    setShowRewardToast(true);
    setTimeout(() => setShowRewardToast(false), 3000);
  };

  return (
    <div className="px-5 pt-3 pb-1">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF0D4] border-2 border-[#1E1E24] rounded-3xl p-4 shadow-md overflow-hidden"
      >
        {/* Background Memphis Accents */}
        <div className="absolute top-2 right-4 text-xs text-[#F59E0B]/30 font-black select-none pointer-events-none">
          ✦ ✦
        </div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-[#F59E0B]/10 pointer-events-none" />

        {/* Top Header Row: Fire Icon + Days Counter + Streak Status Badge */}
        <div className="flex items-center justify-between mb-2.5 relative z-10">
          <div className="flex items-center gap-2.5">
            {/* Animated Flame Badge */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                rotate: [-2, 2, -2],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: 'easeInOut',
              }}
              className="w-10 h-10 rounded-2xl bg-[#F97316] border-2 border-[#1E1E24] flex items-center justify-center text-white shadow-xs shrink-0"
            >
              <Flame className="w-6 h-6 fill-[#FDE047] text-white stroke-[2.2]" />
            </motion.div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-base text-[#1E1E24] tracking-tight leading-none">
                  {streakDays} Días de Racha
                </h3>
                <span className="bg-[#F97316] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-[#1E1E24] shadow-2xs">
                  Activa
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#8A909F]">
                ¡Meta semanal: 7/7 días!
              </span>
            </div>
          </div>

          {/* Action / Claim Button */}
          {!claimedToday ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClaimStreak}
              className="bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] border-2 border-[#1E1E24] text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-xs cursor-pointer flex items-center gap-1 shrink-0"
            >
              <Sparkles className="w-3 h-3 text-[#1E1E24]" />
              <span>Marcar Hoy</span>
            </motion.button>
          ) : (
            <span className="bg-[#22C55E] text-white border-2 border-[#1E1E24] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[3]" /> ¡Completado!
            </span>
          )}
        </div>

        {/* Motivational Message */}
        <p className="text-xs font-bold text-[#4A4E69] leading-snug mb-3 relative z-10 bg-white/70 border border-[#1E1E24]/15 rounded-xl p-2.5">
          🔥 <span className="text-[#1E1E24] font-black">¡Estás imparable!</span> Resuelve un desafío hoy en la Arena para mantener encendida la llama del conocimiento.
        </p>

        {/* 7-Day Visual Progress Track */}
        <div className="grid grid-cols-7 gap-1.5 pt-1 relative z-10">
          {daysOfWeek.map((day, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl border-2 transition-all ${
                day.active
                  ? 'bg-white border-[#1E1E24] text-[#1E1E24] shadow-2xs'
                  : 'bg-[#1E1E24]/5 border-[#1E1E24]/20 text-[#8A909F]'
              } ${day.isToday ? 'ring-2 ring-[#F97316] ring-offset-1 font-black' : ''}`}
            >
              <span className="text-[9px] font-black uppercase block mb-1">
                {day.label}
              </span>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  day.active
                    ? 'bg-[#F97316] text-white border border-[#1E1E24]'
                    : 'bg-white/60 text-[#8A909F] border border-[#1E1E24]/20'
                }`}
              >
                {day.active ? (
                  <Flame className="w-3.5 h-3.5 fill-[#FDE047] text-white" />
                ) : (
                  <span className="text-[10px]">•</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reward Toast */}
        <AnimatePresence>
          {showRewardToast && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute inset-x-4 bottom-3 bg-[#1E1E24] text-white rounded-2xl p-2.5 flex items-center justify-between border-2 border-[#F7CA38] shadow-lg z-20"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#F7CA38]" />
                <span className="text-xs font-black text-[#F7CA38]">
                  ¡Racha asegurada! +25 XP Diario ⭐
                </span>
              </div>
              {onOpenArena && (
                <button
                  onClick={onOpenArena}
                  className="text-[10px] font-black uppercase text-white bg-white/20 px-2 py-1 rounded-full flex items-center gap-0.5 cursor-pointer hover:bg-white/30"
                >
                  Ir a Arena <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
