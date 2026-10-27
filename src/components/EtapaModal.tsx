import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, ArrowRight, ArrowLeftRight, Percent, PieChart, Sparkles, HelpCircle } from 'lucide-react';
import { EjercicioIntegrador } from '../data/porcentajesIntegradoresData';
import { PieChartGraphic } from './PieChartGraphic';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';

interface EtapaModalProps {
  isOpen: boolean;
  onClose: () => void;
  stageNumber: 1 | 2 | 3;
  exercise: EjercicioIntegrador;
  isAlreadyCompleted: boolean;
  onStageSuccess: (stage: 1 | 2 | 3) => void;
  onGoToNextStage?: (nextStage: 1 | 2 | 3) => void;
  onGoToNextExercise?: () => void;
}

export const EtapaModal: React.FC<EtapaModalProps> = ({
  isOpen,
  onClose,
  stageNumber,
  exercise,
  isAlreadyCompleted,
  onStageSuccess,
  onGoToNextStage,
  onGoToNextExercise,
}) => {
  // Select active stage data
  const stageData =
    stageNumber === 1
      ? exercise.etapa1
      : stageNumber === 2
      ? exercise.etapa2
      : exercise.etapa3;

  const [selectedKey, setSelectedKey] = useState<string | null>(
    isAlreadyCompleted ? stageData.correctKey : null
  );
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(isAlreadyCompleted);
  const [isCorrect, setIsCorrect] = useState<boolean>(isAlreadyCompleted);

  // Sync state when exercise or stage changes
  React.useEffect(() => {
    setSelectedKey(isAlreadyCompleted ? stageData.correctKey : null);
    setHasSubmitted(isAlreadyCompleted);
    setIsCorrect(isAlreadyCompleted);
  }, [stageNumber, exercise.id, isAlreadyCompleted]);

  if (!isOpen) return null;

  const handleOptionSelect = (key: string) => {
    if (hasSubmitted && isCorrect) return; // Prevent changing if already correct
    playSound('click');
    setSelectedKey(key);
    setHasSubmitted(false);
  };

  const handleCheckAnswer = () => {
    if (!selectedKey) return;

    const correct = selectedKey === stageData.correctKey;
    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      playSound('success');
      onStageSuccess(stageNumber);
    } else {
      playSound('wrong');
    }
  };

  const headerColors = {
    1: {
      bg: 'bg-[#3B82F6]',
      text: 'text-white',
      badge: 'bg-white/20 text-white',
      icon: ArrowLeftRight,
      name: 'Etapa 1. Conversión de unidades',
    },
    2: {
      bg: 'bg-[#F59E0B]',
      text: 'text-white',
      badge: 'bg-[#1E1E24]/20 text-[#1E1E24]',
      icon: Percent,
      name: 'Etapa 2. Cálculo de porcentajes',
    },
    3: {
      bg: 'bg-[#EC4899]',
      text: 'text-white',
      badge: 'bg-white/20 text-white',
      icon: PieChart,
      name: 'Etapa 3. Representación gráfica',
    },
  }[stageNumber];

  const HeaderIcon = headerColors.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs font-jakarta overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="fixed inset-0 bg-black/50"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative z-10 w-full max-w-2xl bg-[#F8FAFC] dark:bg-[#12141D] rounded-[32px] border-4 border-[#1E1E24] shadow-[8px_8px_0px_0px_#1E1E24] overflow-hidden flex flex-col my-auto max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`${headerColors.bg} px-6 py-4.5 border-b-4 border-[#1E1E24] flex items-center justify-between text-white`}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border-2 border-[#1E1E24] text-[#1E1E24] flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
                <HeaderIcon className="w-6 h-6" />
              </div>
              <div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-0.5 ${headerColors.badge}`}>
                  Ejercicio {exercise.id} · {exercise.title}
                </span>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight drop-shadow-xs">
                  {stageData.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="w-9 h-9 bg-white text-[#1E1E24] border-2 border-[#1E1E24] rounded-full flex items-center justify-center hover:bg-gray-100 active:translate-y-0.5 active:translate-x-0.5 shadow-[2px_2px_0px_0px_#1E1E24] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
            {/* Question Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24]">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Pregunta del Desafío:
              </span>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-relaxed">
                {stageData.question}
              </p>

              {/* Special Formula display for Stage 3 */}
              {stageNumber === 3 && (exercise.etapa3 as any).formula && (
                <div className="mt-3 p-3 bg-pink-50 dark:bg-pink-950/30 rounded-xl border border-pink-200 dark:border-pink-800 flex items-center justify-between text-xs font-bold text-pink-900 dark:text-pink-200">
                  <span>Fórmula fundamental:</span>
                  <MathView latex={(exercise.etapa3 as any).formula} inline />
                </div>
              )}
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Selecciona tu respuesta:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {stageData.options.map((opt) => {
                  const isSelected = selectedKey === opt.key;
                  let cardStyle = 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-500';

                  if (isSelected && !hasSubmitted) {
                    cardStyle = 'border-[#1E1E24] bg-[#F7CA38] text-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] font-black';
                  } else if (hasSubmitted) {
                    if (opt.key === stageData.correctKey) {
                      cardStyle = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-[3px_3px_0px_0px_#059669] font-black';
                    } else if (isSelected && !isCorrect) {
                      cardStyle = 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 shadow-[3px_3px_0px_0px_#E11D48] font-bold';
                    }
                  }

                  return (
                    <motion.button
                      key={opt.key}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleOptionSelect(opt.key)}
                      className={`p-3.5 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer text-left ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg border-2 border-[#1E1E24] flex items-center justify-center font-black text-xs shrink-0 bg-white text-[#1E1E24]">
                          {opt.key}
                        </span>
                        <span className="text-sm font-bold">{opt.text}</span>
                      </div>

                      {hasSubmitted && opt.key === stageData.correctKey && (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Check Button (before correct submission) */}
            {(!hasSubmitted || !isCorrect) && (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedKey}
                className={`w-full py-3.5 border-3 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none font-black text-sm uppercase tracking-wider rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  selectedKey
                    ? 'bg-[#1E1E24] text-white hover:bg-slate-800'
                    : 'bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <span>Comprobar Respuesta</span>
              </button>
            )}

            {/* Feedback: Incorrect Answer Banner */}
            {hasSubmitted && !isCorrect && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-800 flex items-center gap-3 text-rose-800 dark:text-rose-200 text-xs font-bold"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>
                  Respuesta incorrecta. ¡Inténtalo de nuevo! Revisa con cuidado las operaciones o la equivalencia de unidades.
                </span>
              </motion.div>
            )}

            {/* Feedback: Correct Answer Detailed Procedure */}
            {hasSubmitted && isCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-2 border-t-2 border-slate-200 dark:border-slate-700"
              >
                {/* Confirmation banner */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-500 flex items-center justify-between text-emerald-900 dark:text-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wide">
                      ¡Correcto! Etapa superada con éxito.
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                </div>

                {/* Stage 1 Procedure display */}
                {stageNumber === 1 && (
                  <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 space-y-2">
                    <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-300 tracking-wider block">
                      Procedimiento de Conversión:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {exercise.etapa1.explanation}
                    </p>
                    {exercise.etapa1.latexExplanation && (
                      <div className="pt-2 text-center">
                        <MathView latex={exercise.etapa1.latexExplanation} />
                      </div>
                    )}
                  </div>
                )}

                {/* Stage 2 Procedure display */}
                {stageNumber === 2 && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800 space-y-3">
                    <span className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-300 tracking-wider block">
                      Procedimiento Paso a Paso:
                    </span>
                    <div className="space-y-2">
                      {exercise.etapa2.steps.map((st, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 text-xs">
                          <p className="font-extrabold text-amber-900 dark:text-amber-300 mb-1">
                            {st.stepTitle}
                          </p>
                          <div className="my-1 text-center font-bold">
                            <MathView latex={st.latex} />
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mt-1">{st.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage 3 Pie Chart & Angle Breakdown */}
                {stageNumber === 3 && (
                  <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-pink-950/20 border-2 border-pink-200 dark:border-pink-800 space-y-4">
                    <span className="text-[10px] font-black uppercase text-pink-700 dark:text-pink-300 tracking-wider block text-center">
                      Representación en Gráfica de Pastel:
                    </span>

                    <PieChartGraphic
                      descuentoPercent={exercise.etapa3.descuentoPercent}
                      descuentoAngle={exercise.etapa3.descuentoAngle}
                      descuentoAmount={exercise.etapa3.descuentoAmount}
                      pagoPercent={exercise.etapa3.pagoPercent}
                      pagoAngle={exercise.etapa3.pagoAngle}
                      pagoAmount={exercise.etapa3.pagoAmount}
                      totalAmount={exercise.etapa3.totalAmount}
                      size={260}
                    />

                    <p className="text-xs text-slate-700 dark:text-slate-300 text-center font-medium">
                      {exercise.etapa3.explanation}
                    </p>
                  </div>
                )}

                {/* Action Buttons: Next Stage or Return */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  {stageNumber < 3 && onGoToNextStage ? (
                    <button
                      onClick={() => {
                        playSound('click');
                        onGoToNextStage((stageNumber + 1) as 1 | 2 | 3);
                      }}
                      className="flex-1 py-3 bg-[#1E1E24] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <span>Ir a Etapa {stageNumber + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : onGoToNextExercise ? (
                    <button
                      onClick={() => {
                        playSound('click');
                        onGoToNextExercise();
                      }}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <span>¡Ejercicio Completo! Siguiente</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : null}

                  <button
                    onClick={() => {
                      playSound('click');
                      onClose();
                    }}
                    className="px-5 py-3 bg-white text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-slate-300 hover:bg-slate-100 cursor-pointer"
                  >
                    Regresar al Enunciado
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
