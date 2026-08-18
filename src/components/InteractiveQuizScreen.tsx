import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Lightbulb, Clock, CheckCircle2, XCircle, Sparkles, HelpCircle, X } from 'lucide-react';
import { QuizMemphisIllustration } from './Illustrations';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  latex?: string;
  options: Array<{ key: string; text: string; latex?: string }>;
  correctKey: string;
  hint: string;
  explanation: string;
  xpReward: number;
}

interface InteractiveQuizScreenProps {
  title: string;
  subtitle?: string;
  questions: QuizQuestion[];
  onClose: () => void;
  onComplete: (totalXp: number, score: number) => void;
}

export const InteractiveQuizScreen: React.FC<InteractiveQuizScreenProps> = ({
  title,
  subtitle,
  questions,
  onClose,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(240); // 4:00 timer

  const currentQ = questions[currentIndex] || questions[0];
  const totalQ = questions.length;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (key: string) => {
    if (isAnswerChecked) return;
    playSound('click');
    setSelectedOption(key);
  };

  const handleConfirmOrNext = () => {
    if (!selectedOption) return;

    if (!isAnswerChecked) {
      // Check answer
      const isCorrect = selectedOption === currentQ.correctKey;
      setIsAnswerChecked(true);

      if (isCorrect) {
        playSound('correct');
        setScore((s) => s + 1);
        setEarnedXp((xp) => xp + (currentQ.xpReward || 50));
      } else {
        playSound('error');
      }
    } else {
      // Advance to next question or complete
      if (currentIndex < totalQ - 1) {
        playSound('click');
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setIsAnswerChecked(false);
      } else {
        playSound('fanfare');
        const finalScore = score + (selectedOption === currentQ.correctKey ? 0 : 0);
        onComplete(earnedXp, finalScore);
      }
    }
  };

  const isCurrentCorrect = isAnswerChecked && selectedOption === currentQ.correctKey;
  const isCurrentWrong = isAnswerChecked && selectedOption !== currentQ.correctKey;

  return (
    <div className="fixed inset-0 z-50 bg-[#6F78DB] text-white flex flex-col justify-between overflow-y-auto no-scrollbar font-jakarta">
      {/* Top Header Bar (Matching Reference Image with Close X Button) */}
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
          title="Cerrar Quiz"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </motion.button>

        {/* Progress Bar Capsule */}
        <div className="flex-1 flex items-center gap-1.5 bg-white/20 p-1.5 rounded-full border border-white/30">
          {questions.map((_, idx) => (
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

        {/* Yellow Timer Pill Badge (Matching image.png: 03:42 in yellow pill) */}
        <div className="flex items-center gap-1.5 bg-[#F7CA38] border-2 border-[#1E1E24] px-3.5 py-1.5 rounded-full font-black text-xs text-[#1E1E24] shadow-xs shrink-0">
          <Clock className="w-3.5 h-3.5 text-[#1E1E24]" />
          <span>{formatTime(secondsLeft)}</span>
        </div>
      </div>

      {/* Main Center Area (Illustration + Math Question + Visual Focus Card + 2x2 Options) */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-3 max-w-lg mx-auto w-full text-center">
        {/* Vector Quiz Mascot Illustration */}
        <motion.div
          key={`illu-${currentIndex}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="my-1"
        >
          <QuizMemphisIllustration />
        </motion.div>

        {/* Question Text */}
        <motion.div
          key={`q-${currentIndex}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-2 mb-2 text-left w-full"
        >
          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight text-center">
            {currentQ.question}
          </h2>

          {/* Visual Highlight Card: Prominent rounded focal box matching reference screenshot */}
          {currentQ.latex ? (
            <div className="my-3 py-4 px-6 rounded-3xl bg-white/20 border-2 border-white/40 backdrop-blur-xs text-white text-center w-full shadow-inner flex items-center justify-center min-h-[64px]">
              <span className="text-xl sm:text-2xl font-black">
                <MathView latex={currentQ.latex} />
              </span>
            </div>
          ) : (
            <div className="my-3 py-3 px-5 rounded-3xl bg-white/15 border-2 border-white/30 backdrop-blur-xs text-white text-center w-full shadow-inner flex items-center justify-center">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white/90">
                {currentQ.category}
              </span>
            </div>
          )}
        </motion.div>

        {/* Section Label: "CHOOSE YOUR ANSWER" */}
        <div className="w-full text-left pl-1 mb-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-white/90">
            CHOOSE YOUR ANSWER
          </span>
        </div>

        {/* 2x2 Options Grid (Matching image reference: Clean rounded white capsules, yellow on select) */}
        <div className="grid grid-cols-2 gap-3 w-full my-2">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.key;
            let btnClass =
              'bg-white text-[#1E1E24] border-2 border-[#1E1E24] hover:bg-[#FFFDF5] shadow-xs';

            if (isSelected && !isAnswerChecked) {
              btnClass =
                'bg-[#F7CA38] text-[#1E1E24] font-black border-2 border-[#1E1E24] shadow-md scale-[1.02]';
            } else if (isAnswerChecked) {
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
                <span>{opt.text}</span>
                {opt.latex && <MathView latex={opt.latex} inline />}
              </motion.button>
            );
          })}
        </div>

        {/* Answer Feedback Banner */}
        <AnimatePresence>
          {isAnswerChecked && (
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
                  {isCurrentCorrect ? '¡Excelente! Respuesta Correcta (+50 XP)' : '¡Respuesta Incorrecta!'}
                </span>
                <p className="opacity-95">{currentQ.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Floating Navigation Dock (Matching image.png: Previous <, Blue bulb 💡, Next >) */}
      <div className="px-6 py-4 bg-white/10 backdrop-blur-md border-t border-white/20 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between gap-3">
          {/* Previous Button (Translucent Capsule) */}
          <button
            onClick={() => {
              if (currentIndex > 0) {
                playSound('click');
                setCurrentIndex((i) => i - 1);
                setSelectedOption(null);
                setIsAnswerChecked(false);
              }
            }}
            disabled={currentIndex === 0}
            className={`px-5 py-3 rounded-full text-xs font-black tracking-wider transition-all cursor-pointer border ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed text-white border-transparent'
                : 'bg-white/20 hover:bg-white/30 text-white border-white/40 active:scale-95'
            }`}
          >
            &lt; Previous
          </button>

          {/* Center Hint Lightbulb Button (Matching image.png: Circular light blue button with dark badge "4") */}
          <button
            onClick={() => {
              playSound('click');
              setShowHintModal(true);
            }}
            className="relative w-12 h-12 rounded-full bg-[#93E1FF] hover:bg-[#7CD4FD] text-[#1E1E24] border-2 border-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
            title="Ver pista"
          >
            <Lightbulb className="w-6 h-6 fill-[#1E1E24] text-[#1E1E24]" />
            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#1E1E24] text-white text-[10px] font-black flex items-center justify-center border border-white shadow-2xs">
              4
            </span>
          </button>

          {/* Next / Confirm Button (Matching image.png: Clean White Pill) */}
          <button
            onClick={handleConfirmOrNext}
            disabled={!selectedOption}
            className={`py-3.5 px-6 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md border-2 border-[#1E1E24] ${
              !selectedOption
                ? 'bg-white/40 text-white/70 border-transparent cursor-not-allowed'
                : !isAnswerChecked
                ? 'bg-white text-[#1E1E24] hover:bg-[#F8FAFC] active:scale-95'
                : 'bg-[#22C55E] text-white hover:bg-[#16a34a] active:scale-95'
            }`}
          >
            <span>{!isAnswerChecked ? 'Next >' : currentIndex === totalQ - 1 ? 'Finish' : 'Next >'}</span>
          </button>
        </div>
      </div>

      {/* Hint Modal */}
      <AnimatePresence>
        {showHintModal && (
          <div className="fixed inset-0 z-60 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 text-[#1E1E24] max-w-sm w-full shadow-2xl space-y-4 border-2 border-[#1E1E24]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF9E6] border-2 border-[#1E1E24] flex items-center justify-center text-xl">
                  💡
                </div>
                <div>
                  <h3 className="text-base font-black text-[#1E1E24]">Pista Pedagógica</h3>
                  <span className="text-xs font-semibold text-[#8A909F]">Ley del Arsenal Real</span>
                </div>
              </div>

              <p className="text-xs font-medium text-[#4A4E69] leading-relaxed bg-[#F4F7FC] border-2 border-[#1E1E24]/10 p-3.5 rounded-2xl">
                {currentQ.hint}
              </p>

              <button
                onClick={() => setShowHintModal(false)}
                className="w-full py-3 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] cursor-pointer transition-transform active:scale-95"
              >
                Entendido, ¡continuar!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
