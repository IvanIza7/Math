import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ArrowLeft, Trophy, Sparkles, CheckCircle2, Zap, Target, Award, ChevronRight, Layers } from 'lucide-react';
import { PORCENTAJES_LEVELS_INFO, PorcentajesDifficulty, DifficultyLevelInfo } from '../data/porcentajesChallenges';
import { ArenaChallenge } from '../data/arenaChallengesData';
import { playSound } from '../utils/sound';

interface PorcentajesDifficultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: (challenge: ArenaChallenge, selectedDifficulty: PorcentajesDifficulty, questionCount: number) => void;
  completedRecords?: Record<string, any>;
}

export const PorcentajesDifficultyModal: React.FC<PorcentajesDifficultyModalProps> = ({
  isOpen,
  onClose,
  onStartQuiz,
  completedRecords = {},
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<PorcentajesDifficulty>('basico');
  const [questionCount, setQuestionCount] = useState<number>(10);

  if (!isOpen) return null;

  const currentLevelInfo = PORCENTAJES_LEVELS_INFO.find((l) => l.id === selectedDifficulty) || PORCENTAJES_LEVELS_INFO[0];

  const handleLaunch = () => {
    playSound('click');
    const customChallenge: ArenaChallenge = {
      id: `desafio-porcentajes-${selectedDifficulty}`,
      title: `DESAFÍO: PORCENTAJES (${currentLevelInfo.name.toUpperCase()})`,
      shortTitle: `Porcentajes: ${currentLevelInfo.name}`,
      description: currentLevelInfo.description,
      totalExercises: currentLevelInfo.totalQuestions,
      passingScore: Math.ceil(questionCount * 0.6),
      color: selectedDifficulty === 'basico' ? '#22C55E' : selectedDifficulty === 'intermedio' ? '#F59E0B' : '#EF4444',
      bgGradient: selectedDifficulty === 'basico' ? 'from-[#22C55E] to-[#16A34A]' : selectedDifficulty === 'intermedio' ? 'from-[#F59E0B] to-[#D97706]' : 'from-[#EF4444] to-[#DC2626]',
      badgeBg: 'bg-[#1E1E24] text-white',
      hasDifficulties: true,
      questions: currentLevelInfo.questions,
    };
    (customChallenge as any).sessionQuestionCount = questionCount;
    onStartQuiz(customChallenge, selectedDifficulty, questionCount);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs font-jakarta overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="fixed inset-0 bg-black/40"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg bg-[#F8FAFC] dark:bg-[#12141D] rounded-[36px] border-4 border-[#1E1E24] dark:border-[#2C2E40] shadow-[8px_8px_0px_0px_#1E1E24] dark:shadow-[8px_8px_0px_0px_#000000] overflow-hidden flex flex-col my-auto max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="bg-[#EC4899] px-6 pt-6 pb-5 border-b-4 border-[#1E1E24] dark:border-[#2C2E40] relative flex items-center justify-between text-[#1E1E24]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#1E1E24] shrink-0 font-black">
                %
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-white/90 bg-[#1E1E24]/20 px-2 py-0.5 rounded-full inline-block mb-0.5">
                  Desafío de Arena
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white drop-shadow-xs">
                  Cálculo de Porcentajes
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="w-10 h-10 bg-white border-2 border-[#1E1E24] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 active:translate-y-0.5 active:translate-x-0.5 shadow-[2px_2px_0px_0px_#1E1E24] transition-all"
            >
              <X className="w-5 h-5 text-[#1E1E24]" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
            {/* Intro text */}
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#4A4E69] dark:text-gray-300">
                Selecciona el nivel de reto que deseas practicar. Cada nivel contiene un banco especializado de 30 ejercicios resueltos con opciones y retroalimentación inmediata.
              </p>
            </div>

            {/* 3 Difficulty Cards */}
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8A909F] dark:text-gray-400 block">
                1. Selecciona la Dificultad:
              </span>

              {PORCENTAJES_LEVELS_INFO.map((level) => {
                const isSelected = selectedDifficulty === level.id;
                const record = completedRecords[`desafio-porcentajes-${level.id}`];
                const isCompleted = record?.completed ?? false;

                return (
                  <motion.div
                    key={level.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      playSound('click');
                      setSelectedDifficulty(level.id);
                    }}
                    className={`p-4 rounded-2xl border-3 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#1E1E24] bg-white dark:bg-[#1E202E] shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000]'
                        : 'border-[#1E1E24]/20 hover:border-[#1E1E24]/50 bg-white/60 dark:bg-[#161822]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-12 h-12 rounded-2xl border-2 border-[#1E1E24] flex items-center justify-center text-xl shrink-0 shadow-xs ${
                          level.id === 'basico'
                            ? 'bg-[#22C55E]/15 text-[#16A34A]'
                            : level.id === 'intermedio'
                            ? 'bg-[#F59E0B]/15 text-[#D97706]'
                            : 'bg-[#EF4444]/15 text-[#DC2626]'
                        }`}
                      >
                        {level.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-sm sm:text-base text-[#1E1E24] dark:text-white">
                            {level.name}
                          </h4>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-[#1E1E24] ${level.badgeColor}`}>
                            {level.badge}
                          </span>
                          {isCompleted && (
                            <span className="flex items-center gap-1 text-[9px] font-black text-[#16A34A] bg-[#22C55E]/10 px-2 py-0.5 rounded-full border border-[#22C55E]/40">
                              <CheckCircle2 className="w-3 h-3" /> Dominado
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-bold text-[#8A909F] dark:text-gray-400 mt-0.5 line-clamp-1">
                          {level.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 border-[#1E1E24] flex items-center justify-center transition-all ${
                          isSelected ? 'bg-[#EC4899] text-white' : 'bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Question count selector */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8A909F] dark:text-gray-400 block">
                2. Cantidad de Preguntas por Ronda:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { count: 5, label: '5 Preguntas', badge: '⚡ Rápido' },
                  { count: 10, label: '10 Preguntas', badge: '🎯 Estándar' },
                  { count: 30, label: '30 Preguntas', badge: '🏆 Completo' },
                ].map((item) => {
                  const isCountSelected = questionCount === item.count;
                  return (
                    <button
                      key={item.count}
                      onClick={() => {
                        playSound('click');
                        setQuestionCount(item.count);
                      }}
                      className={`p-3 rounded-2xl border-2 border-[#1E1E24] text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                        isCountSelected
                          ? 'bg-[#F7CA38] text-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] font-black translate-x-0.5 translate-y-0.5'
                          : 'bg-white dark:bg-[#1E202E] text-[#1E1E24] dark:text-white hover:bg-gray-50 font-bold shadow-xs'
                      }`}
                    >
                      <span className="text-xs font-black">{item.label}</span>
                      <span className="text-[9px] font-black uppercase opacity-75">{item.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Launch CTA Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLaunch}
                className="w-full py-4 bg-[#BAFF29] hover:bg-[#A6F516] text-[#1E1E24] border-3 border-[#1E1E24] rounded-2xl shadow-[4px_4px_0px_0px_#1E1E24] font-black text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 active:translate-y-1 active:translate-x-1 active:shadow-none"
              >
                <Play className="w-5 h-5 fill-[#1E1E24]" />
                <span>Iniciar Quiz de Porcentajes ({questionCount} Preguntas)</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
