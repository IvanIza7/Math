import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, CheckCircle2, XCircle, Trophy, Sparkles, X, RotateCcw, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ArenaChallenge, ArenaQuestion } from '../data/arenaChallengesData';
import { QuizMemphisIllustration } from './Illustrations';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';

interface ArenaChallengeRunnerProps {
  challenge: ArenaChallenge;
  onClose: () => void;
  onComplete: (score: number, total: number, passed: boolean) => void;
}

export const ArenaChallengeRunner: React.FC<ArenaChallengeRunnerProps> = ({
  challenge,
  onClose,
  onComplete,
}) => {
  // Select 5 questions from the 50-question bank
  const [sessionQuestions, setSessionQuestions] = useState<ArenaQuestion[]>(() => {
    const shuffled = [...challenge.questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(180); // 3:00 min

  const currentQ = sessionQuestions[currentIndex] || sessionQuestions[0];
  const totalQ = sessionQuestions.length;

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isChecked) return;
    playSound('click');
    setSelectedKey(key);
  };

  const handleConfirmOrNext = () => {
    if (!selectedKey) return;

    if (!isChecked) {
      // Check answer
      const isCorrect = selectedKey === currentQ.correctKey;
      setIsChecked(true);

      if (isCorrect) {
        playSound('correct');
        setScore((s) => s + 1);
      } else {
        playSound('error');
      }
    } else {
      // Advance to next question or show summary
      if (currentIndex < totalQ - 1) {
        playSound('click');
        setCurrentIndex((i) => i + 1);
        setSelectedKey(null);
        setIsChecked(false);
      } else {
        const finalScore = score + (selectedKey === currentQ.correctKey ? 0 : 0);
        const passed = finalScore >= challenge.passingScore; // 3/5

        if (passed) {
          playSound('fanfare');
          confetti({
            particleCount: 80,
            spread: 70,
            colors: ['#F7CA38', '#22C55E', '#6F78DB', '#38bdf8'],
          });
        } else {
          playSound('click');
        }

        setIsFinished(true);
        onComplete(finalScore, totalQ, passed);
      }
    }
  };

  const handleRestartRound = () => {
    playSound('click');
    const shuffled = [...challenge.questions].sort(() => 0.5 - Math.random());
    setSessionQuestions(shuffled.slice(0, 5));
    setCurrentIndex(0);
    setSelectedKey(null);
    setIsChecked(false);
    setScore(0);
    setIsFinished(false);
    setSecondsLeft(180);
  };

  const isCurrentCorrect = isChecked && selectedKey === currentQ.correctKey;

  // Final Summary Screen
  if (isFinished) {
    const passed = score >= challenge.passingScore;

    return (
      <div className="fixed inset-0 z-50 bg-[#6F78DB] text-white flex flex-col justify-between p-6 overflow-y-auto no-scrollbar font-jakarta">
        {/* Top Bar */}
        <div className="flex items-center justify-between max-w-md mx-auto w-full pt-4">
          <span className="text-xs font-black uppercase tracking-wider text-white/80">
            {challenge.shortTitle}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border border-white/40 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Result Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto w-full bg-white rounded-3xl p-6 text-[#1E1E24] border-2 border-[#1E1E24] shadow-2xl text-center space-y-4 my-auto"
        >
          <div className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-3xl border-2 border-[#1E1E24] shadow-xs"
            style={{ backgroundColor: passed ? '#DCFCE7' : '#FEE2E2' }}
          >
            {passed ? '🏆' : '📚'}
          </div>

          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase mb-1 border ${
                passed
                  ? 'bg-[#22C55E] text-white border-[#1E1E24]'
                  : 'bg-[#EF4444] text-white border-[#1E1E24]'
              }`}
            >
              {passed ? '¡DESAFÍO COMPLETADO!' : 'NO ALCANZADO (MÍNIMO 3/5)'}
            </span>
            <h2 className="text-2xl font-black text-[#1E1E24] tracking-tight">
              {passed ? '¡Excelente Trabajo!' : 'Sigue Practicando'}
            </h2>
            <p className="text-xs font-semibold text-[#4A4E69] mt-1">
              {passed
                ? `Aprobaste con ${score} de ${totalQ} respuestas correctas.`
                : `Obtuviste ${score} de ${totalQ}. Necesitas al menos 3/5 para aprobar.`}
            </p>
          </div>

          {/* Score Counter Card */}
          <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-2xl p-4 flex items-center justify-around">
            <div>
              <span className="text-[10px] font-black uppercase text-[#8A909F] block">
                Tu Puntuación
              </span>
              <span className="text-3xl font-black text-[#1E1E24]">
                {score}/{totalQ}
              </span>
            </div>

            <div className="w-px h-10 bg-[#1E1E24]/20" />

            <div>
              <span className="text-[10px] font-black uppercase text-[#8A909F] block">
                Requisito
              </span>
              <span className="text-sm font-black text-[#22C55E]">
                3/5 Aciertos
              </span>
            </div>

            <div className="w-px h-10 bg-[#1E1E24]/20" />

            <div>
              <span className="text-[10px] font-black uppercase text-[#8A909F] block">
                Recompensa
              </span>
              <span className="text-sm font-black text-[#F59E0B]">
                {passed ? '+75 XP' : '+15 XP'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleRestartRound}
              className="w-full py-3.5 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase tracking-wider rounded-full shadow-md cursor-pointer flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practicar otras 5 preguntas</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#F4F7FC] hover:bg-[#E2E8F0] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase tracking-wider rounded-full cursor-pointer"
            >
              Volver a la Arena
            </button>
          </div>
        </motion.div>

        <div className="text-center text-white/70 text-xs font-semibold pb-4">
          Banco de {challenge.totalExercises} ejercicios activos
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#6F78DB] text-white flex flex-col justify-between overflow-y-auto no-scrollbar font-jakarta">
      {/* Top Header Bar */}
      <div className="px-5 pt-5 pb-2 flex items-center justify-between gap-3 max-w-lg mx-auto w-full">
        {/* Close Button X */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/40 flex items-center justify-center cursor-pointer shadow-xs shrink-0 transition-colors"
          title="Cerrar Desafío"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </motion.button>

        {/* Progress Bar Capsule (5 steps) */}
        <div className="flex-1 flex items-center gap-1.5 bg-white/20 p-1.5 rounded-full border border-white/30">
          {sessionQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                idx < currentIndex
                  ? 'bg-[#F7CA38]'
                  : idx === currentIndex
                  ? 'bg-white'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Timer Badge */}
        <div className="flex items-center gap-1.5 bg-[#F7CA38] border-2 border-[#1E1E24] px-3 py-1 rounded-full font-black text-xs text-[#1E1E24] shadow-xs shrink-0">
          <Clock className="w-3.5 h-3.5 text-[#1E1E24]" />
          <span>{formatTime(secondsLeft)}</span>
        </div>
      </div>

      {/* Main Center Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-3 max-w-lg mx-auto w-full text-center">
        {/* Challenge Header & Illustration */}
        <div className="mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#F7CA38] bg-[#1E1E24]/30 px-3 py-1 rounded-full border border-white/20">
            Pregunta {currentIndex + 1} de {totalQ} · Meta: ≥ 3/5
          </span>
        </div>

        <motion.div
          key={`illu-${currentIndex}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="my-1"
        >
          <QuizMemphisIllustration />
        </motion.div>

        {/* Question Title */}
        <motion.div
          key={`q-${currentIndex}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-2 mb-2 text-left w-full"
        >
          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight text-center">
            {currentQ.question}
          </h2>

          {/* Focal Math Display Card */}
          {currentQ.latex && (
            <div className="my-3 py-4 px-6 rounded-3xl bg-white/20 border-2 border-white/40 backdrop-blur-xs text-white text-center w-full shadow-inner flex items-center justify-center min-h-[64px]">
              <span className="text-2xl sm:text-3xl font-black tracking-wide">
                <MathView latex={currentQ.latex} />
              </span>
            </div>
          )}
        </motion.div>

        {/* Section Label */}
        <div className="w-full text-left pl-1 mb-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-white/90">
            SELECCIONA TU RESPUESTA
          </span>
        </div>

        {/* 2x2 Options Grid */}
        <div className="grid grid-cols-2 gap-3 w-full my-2">
          {currentQ.options.map((opt) => {
            const isSelected = selectedKey === opt.key;
            let btnClass =
              'bg-white text-[#1E1E24] border-2 border-[#1E1E24] hover:bg-[#FFFDF5] shadow-xs';

            if (isSelected && !isChecked) {
              btnClass =
                'bg-[#F7CA38] text-[#1E1E24] font-black border-2 border-[#1E1E24] shadow-md scale-[1.02]';
            } else if (isChecked) {
              if (opt.key === currentQ.correctKey) {
                btnClass =
                  'bg-[#22C55E] text-white font-black border-2 border-[#1E1E24] shadow-md';
              } else if (isSelected) {
                btnClass =
                  'bg-[#EF4444] text-white font-black border-2 border-[#1E1E24] shadow-md';
              } else {
                btnClass = 'bg-white/20 text-white/50 border-2 border-transparent';
              }
            }

            return (
              <motion.button
                key={opt.key}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelectOption(opt.key)}
                className={`py-3.5 px-4 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center text-center gap-1.5 ${btnClass}`}
              >
                <span className="w-5 h-5 rounded-full bg-[#1E1E24]/10 border border-[#1E1E24]/30 flex items-center justify-center text-[10px] shrink-0">
                  {opt.key}
                </span>
                <span>{opt.text}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Banner */}
        <AnimatePresence>
          {isChecked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`w-full mt-3 p-3.5 rounded-2xl flex items-center gap-3 text-left border-2 border-white shadow-md ${
                isCurrentCorrect ? 'bg-[#22C55E]/95 text-white' : 'bg-[#EF4444]/95 text-white'
              }`}
            >
              {isCurrentCorrect ? (
                <CheckCircle2 className="w-6 h-6 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 shrink-0" />
              )}
              <div className="text-xs font-semibold">
                <span className="font-black block uppercase">
                  {isCurrentCorrect ? '¡Correcto! (+1 Acierto)' : 'Respuesta Incorrecta'}
                </span>
                <p className="opacity-95">
                  La opción correcta era la {currentQ.correctKey}: {currentQ.options.find(o => o.key === currentQ.correctKey)?.text}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Floating Navigation Dock */}
      <div className="px-6 py-4 bg-white/10 backdrop-blur-md border-t border-white/20 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-black text-white/90">
            Aciertos actuales: <span className="text-[#F7CA38]">{score}</span> / {currentIndex + (isChecked ? 1 : 0)}
          </div>

          {/* Confirm / Next Button */}
          <button
            onClick={handleConfirmOrNext}
            disabled={!selectedKey}
            className={`py-3.5 px-7 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md border-2 border-[#1E1E24] ${
              !selectedKey
                ? 'bg-white/40 text-white/70 border-transparent cursor-not-allowed'
                : !isChecked
                ? 'bg-white text-[#1E1E24] hover:bg-[#F8FAFC] active:scale-95'
                : 'bg-[#22C55E] text-white hover:bg-[#16a34a] active:scale-95'
            }`}
          >
            <span>{!isChecked ? 'Confirmar' : currentIndex === totalQ - 1 ? 'Ver Resultado' : 'Siguiente >'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
