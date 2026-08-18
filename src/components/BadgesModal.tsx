import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Award, Lock, Sparkles, Star } from 'lucide-react';
import { GAME_BADGES } from '../data/badges';
import { UserStats } from '../types';
import { playSound } from '../utils/sound';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose, userStats }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs font-jakarta">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-3xl border-2 border-[#1E1E24] shadow-2xl flex flex-col overflow-hidden text-[#1E1E24]"
        >
          {/* Header Bar */}
          <div className="bg-[#F7CA38] border-b-2 border-[#1E1E24] p-4 sm:p-5 flex items-center justify-between text-[#1E1E24]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white border-2 border-[#1E1E24] rounded-2xl shadow-xs">
                <Trophy className="w-6 h-6 text-[#1E1E24]" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#1E1E24]">
                  Logros y Medallas
                </h2>
                <p className="text-xs font-bold text-[#1E1E24]/80">
                  Nivel {userStats.level} • {userStats.xp} XP Acumulados
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="p-2 bg-white border-2 border-[#1E1E24] hover:bg-black/10 text-[#1E1E24] rounded-full cursor-pointer transition-colors shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="p-4 border-b-2 border-[#1E1E24]/20 bg-[#F8FAFC] grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-white border-2 border-[#1E1E24] rounded-2xl shadow-2xs">
              <span className="text-[10px] font-black uppercase text-[#8A909F] block">
                Nivel Actual
              </span>
              <span className="text-base font-black text-[#1E1E24]">Niv. {userStats.level}</span>
            </div>
            <div className="p-2.5 bg-white border-2 border-[#1E1E24] rounded-2xl shadow-2xs">
              <span className="text-[10px] font-black uppercase text-[#8A909F] block">
                Combos Perfectos
              </span>
              <span className="text-base font-black text-[#6F78DB]">{userStats.perfectTrialsCount}</span>
            </div>
            <div className="p-2.5 bg-white border-2 border-[#1E1E24] rounded-2xl shadow-2xs">
              <span className="text-[10px] font-black uppercase text-[#8A909F] block">
                Racha Activa
              </span>
              <span className="text-base font-black text-[#F97316]">{userStats.streak} 🔥</span>
            </div>
            <div className="p-2.5 bg-white border-2 border-[#1E1E24] rounded-2xl shadow-2xs">
              <span className="text-[10px] font-black uppercase text-[#8A909F] block">
                Trampas Evitadas
              </span>
              <span className="text-base font-black text-[#1E1E24]">{userStats.illegalMovesCaughtCount}</span>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white no-scrollbar">
            {GAME_BADGES.map((badge) => {
              const isUnlocked =
                badge.unlocked || userStats.badgesUnlocked.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3.5 border-2 rounded-2xl flex items-center gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-[#FFF9E6] border-[#1E1E24] shadow-xs'
                      : 'bg-[#F8FAFC] border-[#1E1E24]/20 opacity-50'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-2xl border-2 border-[#1E1E24] flex items-center justify-center shrink-0 shadow-xs text-xl"
                    style={{ backgroundColor: isUnlocked ? badge.color : '#E2E8F0' }}
                  >
                    {isUnlocked ? (
                      <Award className="w-6 h-6 text-[#1E1E24]" />
                    ) : (
                      <Lock className="w-5 h-5 text-[#8A909F]" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xs font-black text-[#1E1E24] flex items-center gap-1">
                      {badge.title}
                      {isUnlocked && <Star className="w-3 h-3 fill-[#F7CA38] text-[#F7CA38]" />}
                    </h3>
                    <p className="text-[11px] font-medium text-[#4A4E69] leading-tight mt-0.5">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-[#F8FAFC] border-t border-[#E8EEF8] text-center">
            <p className="text-xs font-bold text-[#8A909F] flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F7CA38]" /> ¡Sigue practicando para desbloquear más insignias!
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
