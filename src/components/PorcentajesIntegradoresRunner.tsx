import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  RotateCcw,
  ShieldCheck,
  Trophy,
  ArrowLeftRight,
  Percent,
  PieChart,
  Sparkles,
  HelpCircle,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { EJERCICIOS_INTEGRADORES, EjercicioIntegrador } from '../data/porcentajesIntegradoresData';
import { EtapaModal } from './EtapaModal';
import { PorcentajesAuditModal } from './PorcentajesAuditModal';
import { playSound } from '../utils/sound';

interface PorcentajesIntegradoresRunnerProps {
  onClose: () => void;
  onAwardXp: (amount: number, reason?: string, entityId?: string, metadata?: any) => void;
}

export const PorcentajesIntegradoresRunner: React.FC<PorcentajesIntegradoresRunnerProps> = ({
  onClose,
  onAwardXp,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [activeModalStage, setActiveModalStage] = useState<1 | 2 | 3 | null>(null);
  const [isAuditOpen, setIsAuditOpen] = useState<boolean>(false);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);

  // Completed map: { [exerciseId]: { etapa1: boolean, etapa2: boolean, etapa3: boolean } }
  const [completedMap, setCompletedMap] = useState<
    Record<number, { etapa1: boolean; etapa2: boolean; etapa3: boolean }>
  >(() => {
    try {
      const saved = localStorage.getItem('porcentajes_integradores_progress_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentExercise: EjercicioIntegrador = EJERCICIOS_INTEGRADORES[currentIdx];
  const currentStatus = completedMap[currentExercise.id] || {
    etapa1: false,
    etapa2: false,
    etapa3: false,
  };

  // Save to localStorage whenever completedMap updates
  useEffect(() => {
    try {
      localStorage.setItem('porcentajes_integradores_progress_v1', JSON.stringify(completedMap));
    } catch {}
  }, [completedMap]);

  // Total stages completed across all 10 exercises (out of 30 total)
  const totalStagesCompleted = Object.values(completedMap).reduce((acc, st) => {
    return acc + (st.etapa1 ? 1 : 0) + (st.etapa2 ? 1 : 0) + (st.etapa3 ? 1 : 0);
  }, 0);

  // Fully completed exercises (all 3 stages done)
  const fullyCompletedExercisesCount = EJERCICIOS_INTEGRADORES.filter((ex) => {
    const st = completedMap[ex.id];
    return st && st.etapa1 && st.etapa2 && st.etapa3;
  }).length;

  const progressPercent = Math.round((totalStagesCompleted / 30) * 100);

  const handleStageSuccess = (stage: 1 | 2 | 3) => {
    const currentForEx = completedMap[currentExercise.id] || {
      etapa1: false,
      etapa2: false,
      etapa3: false,
    };

    const updated = {
      ...currentForEx,
      [`etapa${stage}`]: true,
    };

    const newMap = {
      ...completedMap,
      [currentExercise.id]: updated,
    };

    setCompletedMap(newMap);

    // If this completes all 3 stages for the exercise
    if (updated.etapa1 && updated.etapa2 && updated.etapa3 && !(currentForEx.etapa1 && currentForEx.etapa2 && currentForEx.etapa3)) {
      onAwardXp(30, 'INTEGRADOR_EXERCISE_COMPLETED', `integrador-${currentExercise.id}`);
      
      // Check if all 10 are completed
      const allDone = EJERCICIOS_INTEGRADORES.every((ex) => {
        const s = newMap[ex.id];
        return s && s.etapa1 && s.etapa2 && s.etapa3;
      });

      if (allDone) {
        onAwardXp(120, 'ALL_INTEGRADORES_COMPLETED', 'porcentajes-integradores-master');
        setTimeout(() => setShowVictoryModal(true), 800);
      }
    }
  };

  const handleReset = () => {
    playSound('click');
    if (window.confirm('¿Deseas reiniciar el progreso de los 10 ejercicios integradores?')) {
      setCompletedMap({});
      try {
        localStorage.removeItem('porcentajes_integradores_progress_v1');
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
          {/* Audit Button */}
          <button
            onClick={() => {
              playSound('click');
              setIsAuditOpen(true);
            }}
            className="px-3.5 py-2.5 bg-[#F7CA38] hover:bg-[#F59E0B] text-[#1E1E24] border-2 border-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Auditoría Docente</span>
            <span className="sm:hidden">Auditoría</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="p-2.5 bg-white dark:bg-slate-800 border-2 border-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 rounded-xl text-slate-600 hover:text-slate-900 cursor-pointer transition-all"
            title="Reiniciar progreso"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col space-y-4">
        {/* Progress & Title Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-3 border-[#1E1E24] shadow-[5px_5px_0px_0px_#1E1E24] p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#EC4899] bg-[#FDF2F8] dark:bg-[#EC4899]/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Matemáticas · Reto Integrador
              </span>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Porcentajes en Tres Etapas
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                  Ejercicio actual
                </span>
                <span className="text-base sm:text-lg font-black text-[#1E1E24] dark:text-white">
                  {currentIdx + 1} <span className="text-xs text-slate-400 font-bold">de 10</span>
                </span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#EC4899] text-white border-2 border-[#1E1E24] flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_#1E1E24]">
                %
              </div>
            </div>
          </div>

          {/* Progress Bar & Badges */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400">
              <span>Avance global ({fullyCompletedExercisesCount} de 10 ejercicios resueltos)</span>
              <span className="font-black text-[#1E1E24] dark:text-white">{progressPercent}%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full border-2 border-[#1E1E24] overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#3B82F6] via-[#F59E0B] to-[#EC4899] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Central Exercise Card (As requested in design wireframe) */}
        <motion.div
          key={currentExercise.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border-3 border-[#1E1E24] shadow-[6px_6px_0px_0px_#1E1E24] p-5 sm:p-8 space-y-6"
        >
          {/* Situation Title & Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] flex items-center justify-center font-black text-base shadow-xs">
                {currentExercise.id}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                  Situación {currentExercise.id < 10 ? `0${currentExercise.id}` : currentExercise.id}
                </span>
                <h2 className="text-lg sm:text-2xl font-black uppercase text-slate-900 dark:text-white">
                  {currentExercise.title}
                </h2>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full border-2 border-[#1E1E24] bg-[#EC4899] text-white font-black text-xs uppercase tracking-wider shadow-xs">
              {currentExercise.badge}
            </span>
          </div>

          {/* Statement / Enunciado del problema */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-300 dark:border-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Enunciado de la situación cotidiana:
            </span>
            <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-relaxed">
              {currentExercise.statement}
            </p>
          </div>

          {/* ¿Qué necesitas resolver? (Checklist) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              ¿Qué necesitas resolver? (Tu misión)
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              {currentExercise.whatYouNeedToSolve.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Datos importantes */}
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              Datos importantes del problema:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentExercise.importantData.map((d, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex flex-col"
                >
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {d.label}
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Three Main Action Buttons (Etapas) */}
          <div className="space-y-3 pt-2 border-t-2 border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block text-center">
              Accede a cada etapa para resolver el ejercicio paso a paso:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Etapa 1 Button: Conversión */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound('click');
                  setActiveModalStage(1);
                }}
                className={`p-4 rounded-2xl border-3 border-[#1E1E24] transition-all cursor-pointer flex flex-col items-center text-center justify-between gap-2 ${
                  currentStatus.etapa1
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 shadow-[3px_3px_0px_0px_#059669]'
                    : 'bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-[#1E1E24] dark:text-white shadow-[4px_4px_0px_0px_#1E1E24]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 border-2 border-[#1E1E24] flex items-center justify-center font-black">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Etapa 1
                  </span>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-tight block">
                    Conversión de Unidades
                  </span>
                </div>
                {currentStatus.etapa1 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" /> Completada
                  </span>
                ) : (
                  <span className="inline-block text-[11px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                    Pendiente
                  </span>
                )}
              </motion.button>

              {/* Etapa 2 Button: Porcentajes */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound('click');
                  setActiveModalStage(2);
                }}
                className={`p-4 rounded-2xl border-3 border-[#1E1E24] transition-all cursor-pointer flex flex-col items-center text-center justify-between gap-2 ${
                  currentStatus.etapa2
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 shadow-[3px_3px_0px_0px_#059669]'
                    : 'bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-[#1E1E24] dark:text-white shadow-[4px_4px_0px_0px_#1E1E24]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 border-2 border-[#1E1E24] flex items-center justify-center font-black">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                    Etapa 2
                  </span>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-tight block">
                    Cálculo de Porcentajes
                  </span>
                </div>
                {currentStatus.etapa2 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" /> Completada
                  </span>
                ) : (
                  <span className="inline-block text-[11px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                    Pendiente
                  </span>
                )}
              </motion.button>

              {/* Etapa 3 Button: Gráfica de pastel */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSound('click');
                  setActiveModalStage(3);
                }}
                className={`p-4 rounded-2xl border-3 border-[#1E1E24] transition-all cursor-pointer flex flex-col items-center text-center justify-between gap-2 ${
                  currentStatus.etapa3
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 shadow-[3px_3px_0px_0px_#059669]'
                    : 'bg-white dark:bg-slate-800 hover:bg-pink-50 dark:hover:bg-pink-950/20 text-[#1E1E24] dark:text-white shadow-[4px_4px_0px_0px_#1E1E24]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 border-2 border-[#1E1E24] flex items-center justify-center font-black">
                  <PieChart className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-600 dark:text-pink-400 block">
                    Etapa 3
                  </span>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-tight block">
                    Gráfica de Pastel
                  </span>
                </div>
                {currentStatus.etapa3 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" /> Completada
                  </span>
                ) : (
                  <span className="inline-block text-[11px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                    Pendiente
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          {/* Bottom Navigation: Anterior / Siguiente */}
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
              <span>Ejercicio Anterior</span>
            </button>

            {/* Pagination Quick Jumper dots */}
            <div className="hidden md:flex items-center gap-1.5">
              {EJERCICIOS_INTEGRADORES.map((ex, idx) => {
                const st = completedMap[ex.id];
                const allDone = st?.etapa1 && st?.etapa2 && st?.etapa3;
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
                        : allDone
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
                if (currentIdx < EJERCICIOS_INTEGRADORES.length - 1) {
                  playSound('click');
                  setCurrentIdx((prev) => prev + 1);
                }
              }}
              disabled={currentIdx === EJERCICIOS_INTEGRADORES.length - 1}
              className={`px-4 sm:px-5 py-3 border-2 border-[#1E1E24] rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                currentIdx === EJERCICIOS_INTEGRADORES.length - 1
                  ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed'
                  : 'bg-[#1E1E24] hover:bg-slate-800 text-white shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 cursor-pointer'
              }`}
            >
              <span>Siguiente Ejercicio</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stage Popup Modal */}
      {activeModalStage && (
        <EtapaModal
          isOpen={true}
          onClose={() => setActiveModalStage(null)}
          stageNumber={activeModalStage}
          exercise={currentExercise}
          isAlreadyCompleted={currentStatus[`etapa${activeModalStage}`]}
          onStageSuccess={handleStageSuccess}
          onGoToNextStage={(nextStage) => setActiveModalStage(nextStage)}
          onGoToNextExercise={() => {
            setActiveModalStage(null);
            if (currentIdx < EJERCICIOS_INTEGRADORES.length - 1) {
              setCurrentIdx((prev) => prev + 1);
            }
          }}
        />
      )}

      {/* Audit Modal */}
      <PorcentajesAuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        onSelectExercise={(idx) => setCurrentIdx(idx)}
        completedMap={completedMap}
      />

      {/* All Completed Victory Modal */}
      <AnimatePresence>
        {showVictoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border-4 border-[#1E1E24] shadow-[8px_8px_0px_0px_#1E1E24] rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#F7CA38] border-3 border-[#1E1E24] flex items-center justify-center mx-auto text-3xl shadow-[3px_3px_0px_0px_#1E1E24]">
                🏆
              </div>

              <h2 className="text-xl sm:text-2xl font-black uppercase text-[#1E1E24] dark:text-white">
                ¡Misión Cumplida!
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Has resuelto con éxito los 10 ejercicios integradores dominando la conversión de unidades, cálculo de porcentajes y representación en gráfica circular.
              </p>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border-2 border-emerald-500 font-black text-emerald-800 dark:text-emerald-200 text-sm">
                +150 XP Ganados en la Arena
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    playSound('click');
                    setShowVictoryModal(false);
                    setIsAuditOpen(true);
                  }}
                  className="flex-1 py-3 bg-[#F7CA38] text-[#1E1E24] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] cursor-pointer"
                >
                  Ver Auditoría
                </button>
                <button
                  onClick={() => {
                    playSound('click');
                    setShowVictoryModal(false);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-[#1E1E24] text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] cursor-pointer"
                >
                  Finalizar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
