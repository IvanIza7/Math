import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Trophy,
  ArrowLeftRight,
  Calculator,
  Table as TableIcon,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { CONVERSION_EXERCISES, ConversionExercise } from '../data/conversionUnidadesData';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';

interface ConversionUnidadesRunnerProps {
  onClose: () => void;
  onAwardXp: (amount: number, reason?: string, entityId?: string, metadata?: any) => void;
}

export const ConversionUnidadesRunner: React.FC<ConversionUnidadesRunnerProps> = ({
  onClose,
  onAwardXp,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [inputVal, setInputVal] = useState<string>('');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showVictory, setShowVictory] = useState<boolean>(false);

  // Completed map: { [exerciseId]: boolean }
  const [completedMap, setCompletedMap] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('conversion_unidades_progress_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentExercise = CONVERSION_EXERCISES[currentIdx];
  const isCurrentCompleted = completedMap[currentExercise.id] ?? false;

  // Sync state when moving between exercises
  useEffect(() => {
    const isDone = completedMap[currentExercise.id] ?? false;
    setHasChecked(isDone);
    setIsCorrect(isDone);
    setInputVal(isDone ? currentExercise.targetValue.toString() : '');
    setSelectedKey(isDone ? currentExercise.correctKey : null);
  }, [currentIdx, currentExercise.id, completedMap]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('conversion_unidades_progress_v1', JSON.stringify(completedMap));
    } catch {}
  }, [completedMap]);

  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / CONVERSION_EXERCISES.length) * 100);

  const handleVerify = (valToCheck?: string, keyToCheck?: string) => {
    const rawInput = (valToCheck !== undefined ? valToCheck : inputVal).trim().replace(',', '.');
    const chosenKey = keyToCheck !== undefined ? keyToCheck : selectedKey;

    let correct = false;

    // Check by numeric input value
    if (rawInput !== '') {
      const parsed = parseFloat(rawInput);
      if (!isNaN(parsed) && Math.abs(parsed - currentExercise.targetValue) < 0.0001) {
        correct = true;
      }
    }

    // Check by multiple choice option key
    if (!correct && chosenKey) {
      if (chosenKey === currentExercise.correctKey) {
        correct = true;
      }
    }

    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      playSound('success');
      const updated = { ...completedMap, [currentExercise.id]: true };
      setCompletedMap(updated);

      onAwardXp(15, 'CONVERSION_EXERCISE_COMPLETED', `conversion-${currentExercise.id}`);

      // Check if all 10 completed
      const allDone = CONVERSION_EXERCISES.every((e) => updated[e.id]);
      if (allDone) {
        onAwardXp(60, 'ALL_CONVERSIONS_COMPLETED', 'conversion-unidades-master');
        setTimeout(() => setShowVictory(true), 800);
      }
    } else {
      playSound('wrong');
    }
  };

  const handleReset = () => {
    playSound('click');
    if (window.confirm('¿Deseas reiniciar el progreso de este desafío de conversión de unidades?')) {
      setCompletedMap({});
      setHasChecked(false);
      setIsCorrect(false);
      setInputVal('');
      setSelectedKey(null);
      try {
        localStorage.removeItem('conversion_unidades_progress_v1');
      } catch {}
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0B0D13] text-slate-800 dark:text-slate-100 font-jakarta flex flex-col p-3 sm:p-6 transition-colors">
      {/* Top Header Bar */}
      <div className="max-w-4xl w-full mx-auto mb-4 flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="px-4 py-2.5 bg-white dark:bg-slate-800 border-2 border-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Arena</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="bg-white dark:bg-slate-800 border-2 border-[#1E1E24] rounded-xl p-1 flex items-center gap-1 shadow-[2px_2px_0px_0px_#1E1E24]">
            <button
              onClick={() => {
                playSound('click');
                setViewMode('card');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-[#1E1E24] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Tarjeta Guiada
            </button>
            <button
              onClick={() => {
                playSound('click');
                setViewMode('table');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-[#1E1E24] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabla de los 10</span>
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="p-2.5 bg-white dark:bg-slate-800 border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 rounded-xl text-slate-600 hover:text-slate-900 cursor-pointer transition-all"
            title="Reiniciar progreso"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col space-y-4">
        {/* Banner with Essential Practical Rules (As highlighted by user) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-3 border-[#1E1E24] shadow-[5px_5px_0px_0px_#1E1E24] p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#3B82F6] bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Desafío Básico · Regla de Tres
              </span>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Conversión de Unidades Métricas
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Progreso:</span>
              <span className="px-3 py-1 rounded-full bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs shadow-2xs">
                {completedCount} / 10 Resueltos
              </span>
            </div>
          </div>

          {/* Two Fundamental Rules Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-white border-2 border-[#1E1E24] flex items-center justify-center font-black text-lg shrink-0">
                ⚡
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                  Regla Práctica 1
                </span>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  Unidad más pequeña → <span className="text-amber-600 underline">Multiplicación</span>
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Ej: De metros a centímetros (× 100).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-300 dark:border-blue-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white border-2 border-[#1E1E24] flex items-center justify-center font-black text-lg shrink-0">
                ➗
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 dark:text-blue-300 block">
                  Regla Práctica 2
                </span>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  Unidad más grande → <span className="text-blue-600 underline">División</span>
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Ej: De centímetros a metros (÷ 100).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* VIEW 1: Card Guided Mode */}
        {viewMode === 'card' && (
          <motion.div
            key={currentExercise.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border-3 border-[#1E1E24] shadow-[6px_6px_0px_0px_#1E1E24] p-5 sm:p-8 space-y-6"
          >
            {/* Exercise Title and Operation Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] flex items-center justify-center font-black text-base shadow-xs">
                  {currentExercise.id}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Ejercicio {currentExercise.id} de 10
                  </span>
                  <h2 className="text-lg sm:text-xl font-black uppercase text-slate-900 dark:text-white">
                    {currentExercise.title}
                  </h2>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full border-2 border-[#1E1E24] font-black text-xs uppercase tracking-wider shadow-xs ${
                  currentExercise.operationType === 'multiplicacion'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-blue-100 text-blue-900'
                }`}
              >
                {currentExercise.ruleBadge}
              </span>
            </div>

            {/* Statement */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
              <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                {currentExercise.statement}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {currentExercise.ruleExplanation}
              </p>
            </div>

            {/* Regla de Tres Proportion Table (Table representation requested) */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                1. Planteamiento en Tabla de Proporción:
              </span>

              <div className="overflow-x-auto">
                <table className="w-full max-w-md mx-auto text-center border-collapse border-2 border-[#1E1E24] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#1E1E24]">
                  <thead>
                    <tr className="bg-[#1E1E24] text-white">
                      <th className="py-2.5 px-4 font-black text-xs uppercase tracking-wider border-r border-slate-600">
                        {currentExercise.tableHeaders[0]}
                      </th>
                      <th className="py-2.5 px-4 font-black text-xs uppercase tracking-wider">
                        {currentExercise.tableHeaders[1]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-sm">
                    <tr className="border-b border-[#1E1E24]/20">
                      <td className="py-2.5 px-4 border-r border-[#1E1E24]/20">
                        {currentExercise.tableRows[0][0]}
                      </td>
                      <td className="py-2.5 px-4">
                        {currentExercise.tableRows[0][1]}
                      </td>
                    </tr>
                    <tr className="bg-amber-50/50 dark:bg-amber-950/20">
                      <td className="py-2.5 px-4 border-r border-[#1E1E24]/20 font-black text-blue-600 dark:text-blue-400">
                        {currentExercise.tableRows[1][0]}
                      </td>
                      <td className="py-2.5 px-4 font-black text-[#EC4899]">
                        {currentExercise.tableRows[1][1]}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Input adjustment ("Ajustando las entradas") */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                2. Ajustando las entradas (Calcula el valor de x):
              </span>

              {/* Direct numeric input row */}
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      setSelectedKey(null);
                      setHasChecked(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleVerify();
                    }}
                    placeholder={`Ingresa el valor numérico`}
                    className="w-full px-4 py-3.5 rounded-2xl border-3 border-[#1E1E24] bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-base shadow-[3px_3px_0px_0px_#1E1E24] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 uppercase">
                    {currentExercise.symbolTo}
                  </span>
                </div>

                <button
                  onClick={() => handleVerify()}
                  className="px-6 py-3.5 bg-[#1E1E24] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-2xl border-3 border-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Comprobar</span>
                </button>
              </div>

              {/* Multiple Choice quick pick */}
              <div className="space-y-1.5 max-w-lg mx-auto pt-1">
                <span className="text-[10px] font-black text-slate-400 uppercase block text-center">
                  O selecciona entre las opciones:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentExercise.options.map((opt) => {
                    const isSelected = selectedKey === opt.key;
                    let btnStyle = 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200';

                    if (isSelected && !hasChecked) {
                      btnStyle = 'border-[#1E1E24] bg-[#F7CA38] text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] font-black';
                    } else if (hasChecked) {
                      if (opt.key === currentExercise.correctKey) {
                        btnStyle = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-[2px_2px_0px_0px_#059669] font-black';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-600 bg-rose-50 text-rose-900 shadow-none font-bold';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          playSound('click');
                          setSelectedKey(opt.key);
                          setInputVal('');
                          handleVerify(undefined, opt.key);
                        }}
                        className={`p-2 rounded-xl border-2 transition-all cursor-pointer text-xs font-bold flex items-center justify-center gap-1.5 ${btnStyle}`}
                      >
                        <span className="text-[10px] font-black opacity-60">{opt.key})</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Feedback & Procedure Display */}
            <AnimatePresence>
              {hasChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="space-y-3 pt-3 border-t-2 border-slate-200 dark:border-slate-800"
                >
                  {isCorrect ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm font-black uppercase tracking-wide">
                            ¡Correcto! Procedimiento verificado.
                          </span>
                        </div>
                        <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                      </div>

                      {/* Rule of Three Formula */}
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-emerald-300 dark:border-emerald-700 text-center space-y-1">
                        <span className="text-[10px] font-black uppercase text-slate-400 block">
                          Fórmula de Regla de Tres:
                        </span>
                        <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                          <MathView latex={currentExercise.ruleOfThreeLatex} />
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 font-medium">
                          Regla práctica directa: <span className="font-black">{currentExercise.practicalRuleLatex}</span>
                        </p>
                      </div>

                      <p className="text-xs text-emerald-800 dark:text-emerald-300">
                        {currentExercise.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 text-rose-800 dark:text-rose-200 flex items-center gap-3 text-xs font-bold">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <div>
                        <p className="font-black uppercase">¡Inténtalo nuevamente!</p>
                        <p className="mt-0.5">
                          Recuerda: si pasas a una {currentExercise.ruleBadge.toLowerCase()}.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t-2 border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  if (currentIdx > 0) {
                    playSound('click');
                    setCurrentIdx((prev) => prev - 1);
                  }
                }}
                disabled={currentIdx === 0}
                className={`px-4 sm:px-5 py-3 border-2 border-[#1E1E24] rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                  currentIdx === 0
                    ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              {/* Jumper Dots */}
              <div className="hidden sm:flex items-center gap-1.5">
                {CONVERSION_EXERCISES.map((ex, idx) => {
                  const isDone = completedMap[ex.id] ?? false;
                  const isCurrent = idx === currentIdx;

                  return (
                    <button
                      key={ex.id}
                      onClick={() => {
                        playSound('click');
                        setCurrentIdx(idx);
                      }}
                      className={`w-7 h-7 rounded-lg font-black text-xs border transition-all cursor-pointer flex items-center justify-center ${
                        isCurrent
                          ? 'bg-[#1E1E24] text-white border-[#1E1E24] scale-110 shadow-xs'
                          : isDone
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {ex.id}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  if (currentIdx < CONVERSION_EXERCISES.length - 1) {
                    playSound('click');
                    setCurrentIdx((prev) => prev + 1);
                  }
                }}
                disabled={currentIdx === CONVERSION_EXERCISES.length - 1}
                className={`px-4 sm:px-5 py-3 border-2 border-[#1E1E24] rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                  currentIdx === CONVERSION_EXERCISES.length - 1
                    ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed'
                    : 'bg-[#1E1E24] hover:bg-slate-800 text-white shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 cursor-pointer'
                }`}
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: Table Mode (10 Ejercicios en una tabla interactiva) */}
        {viewMode === 'table' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border-3 border-[#1E1E24] shadow-[6px_6px_0px_0px_#1E1E24] p-5 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black uppercase text-slate-900 dark:text-white">
                  Tabla de los 10 Ejercicios Básicos de Conversión
                </h3>
                <p className="text-xs text-slate-500">
                  Revisa los 10 planteamientos de regla de tres y resuelve directamente en la tabla.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#1E1E24] bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                    <th className="p-3 font-black">#</th>
                    <th className="p-3 font-black">Conversión</th>
                    <th className="p-3 font-black">Regla Práctica</th>
                    <th className="p-3 font-black">Fórmula Regla de Tres</th>
                    <th className="p-3 font-black">Resultado</th>
                    <th className="p-3 font-black text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {CONVERSION_EXERCISES.map((ex) => {
                    const isDone = completedMap[ex.id] ?? false;

                    return (
                      <tr
                        key={ex.id}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                          isDone ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                        }`}
                      >
                        <td className="p-3 font-black">{ex.id}</td>
                        <td className="p-3 font-extrabold text-slate-900 dark:text-white">
                          {ex.title}
                          <span className="block text-[10px] text-slate-400 font-bold">
                            {ex.givenValue} {ex.symbolFrom} → {ex.symbolTo}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                              ex.operationType === 'multiplicacion'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-blue-50 text-blue-800 border-blue-300'
                            }`}
                          >
                            {ex.operationType === 'multiplicacion' ? 'Multiplicar (×)' : 'Dividir (÷)'}
                          </span>
                        </td>
                        <td className="p-3 font-bold">
                          <MathView latex={ex.ruleOfThreeLatex} inline />
                        </td>
                        <td className="p-3 font-black text-emerald-700 dark:text-emerald-300">
                          {ex.targetValue} {ex.symbolTo}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => {
                              playSound('click');
                              setCurrentIdx(ex.id - 1);
                              setViewMode('card');
                            }}
                            className={`px-3 py-1.5 rounded-xl border-2 border-[#1E1E24] font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                              isDone
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-600'
                                : 'bg-[#F7CA38] text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5'
                            }`}
                          >
                            {isDone ? 'Resuelto ✓' : 'Resolver'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Victory Celebration Modal */}
      <AnimatePresence>
        {showVictory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border-4 border-[#1E1E24] shadow-[8px_8px_0px_0px_#1E1E24] rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#F7CA38] border-3 border-[#1E1E24] flex items-center justify-center mx-auto text-3xl shadow-[3px_3px_0px_0px_#1E1E24]">
                ⚡
              </div>

              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#1E1E24] dark:text-white">
                ¡Dominio de Conversión Logrado!
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Has completado los 10 ejercicios de conversión métrica aplicando con éxito la regla de tres y las reglas nemotécnicas de multiplicación y división.
              </p>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border-2 border-emerald-500 font-black text-emerald-800 dark:text-emerald-200 text-sm">
                +100 XP Ganados en la Arena
              </div>

              <button
                onClick={() => {
                  playSound('click');
                  setShowVictory(false);
                }}
                className="w-full py-3.5 bg-[#1E1E24] text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] cursor-pointer"
              >
                Continuar Practicando
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
