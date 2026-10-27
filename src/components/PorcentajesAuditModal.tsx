import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ShieldCheck, ChevronRight, PieChart, Sparkles, AlertCircle } from 'lucide-react';
import { EJERCICIOS_INTEGRADORES, EjercicioIntegrador } from '../data/porcentajesIntegradoresData';
import { playSound } from '../utils/sound';

interface PorcentajesAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (index: number) => void;
  completedMap?: Record<number, { etapa1: boolean; etapa2: boolean; etapa3: boolean }>;
}

export const PorcentajesAuditModal: React.FC<PorcentajesAuditModalProps> = ({
  isOpen,
  onClose,
  onSelectExercise,
  completedMap = {},
}) => {
  const [selectedExId, setSelectedExId] = useState<number>(1);

  if (!isOpen) return null;

  const activeEx = EJERCICIOS_INTEGRADORES.find((e) => e.id === selectedExId) || EJERCICIOS_INTEGRADORES[0];

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

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative z-10 w-full max-w-4xl bg-[#F8FAFC] dark:bg-[#12141D] rounded-[32px] border-4 border-[#1E1E24] shadow-[8px_8px_0px_0px_#1E1E24] overflow-hidden flex flex-col my-auto max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#1E1E24] px-6 py-4 border-b-4 border-[#1E1E24] flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] flex items-center justify-center font-black shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F7CA38] inline-block">
                  Control Pedagógico
                </span>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                  Auditoría Docente · Clave Verificada
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

          {/* Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            {/* Criteria Banner */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-500/30 rounded-2xl p-3.5 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 dark:text-emerald-200">
                <span className="font-black uppercase tracking-wide block mb-0.5">
                  Criterios de Verificación Matemática:
                </span>
                Todas las conversiones usan factores equivalentes; cada precio final se obtiene con{' '}
                <span className="font-bold underline">(100 − descuento)%</span>; los ángulos suman{' '}
                <span className="font-bold underline">360° exactos</span> en los 10 ejercicios.
              </div>
            </div>

            {/* Split layout: Exercise list & Detail Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Exercise Selector Column */}
              <div className="lg:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-1">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Selecciona un ejercicio (1 - 10):
                </p>
                {EJERCICIOS_INTEGRADORES.map((ex, idx) => {
                  const isSelected = ex.id === selectedExId;
                  const st = completedMap[ex.id];
                  const allDone = st?.etapa1 && st?.etapa2 && st?.etapa3;

                  return (
                    <motion.button
                      key={ex.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        playSound('click');
                        setSelectedExId(ex.id);
                      }}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#1E1E24] bg-[#F7CA38] text-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24]'
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-md border border-[#1E1E24] flex items-center justify-center text-xs font-black shrink-0 ${
                            isSelected ? 'bg-white text-[#1E1E24]' : 'bg-slate-100 dark:bg-slate-700'
                          }`}
                        >
                          {ex.id}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-black truncate">{ex.title}</p>
                          <p className="text-[10px] font-bold opacity-80">{ex.badge}</p>
                        </div>
                      </div>

                      {allDone && (
                        <span className="shrink-0 text-emerald-600 bg-white/80 rounded-full p-1 border border-emerald-500">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Detail Table Card */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl border-3 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] p-5 space-y-4">
                <div className="flex items-start justify-between gap-3 border-b-2 border-slate-200 dark:border-slate-700 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#EC4899] bg-[#FDF2F8] dark:bg-[#EC4899]/20 px-2 py-0.5 rounded-full inline-block mb-1">
                      Ejercicio {activeEx.id} de 10
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {activeEx.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      playSound('click');
                      onSelectExercise(activeEx.id - 1);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Ir a resolver</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Audit Grid Table */}
                <div className="space-y-1.5 text-xs">
                  <div className="grid grid-cols-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 dark:text-slate-400">Conversión de unidades:</span>
                    <span className="font-black text-slate-900 dark:text-white text-right">
                      {activeEx.audit.conversion}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 dark:text-slate-400">Precio original:</span>
                    <span className="font-black text-slate-900 dark:text-white text-right">
                      {activeEx.audit.precioOriginal}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 dark:text-slate-400">Descuento aplicado:</span>
                    <span className="font-black text-[#EC4899] text-right">
                      {activeEx.audit.descuento} ({activeEx.audit.importeDescontado})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">Precio final a pagar:</span>
                    <span className="font-black text-emerald-700 dark:text-emerald-400 text-right text-sm">
                      {activeEx.audit.precioFinal}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 dark:text-slate-400">Ángulo del descuento:</span>
                    <span className="font-black text-[#EC4899] text-right">
                      {activeEx.audit.anguloDescuento}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 dark:text-slate-400">Ángulo del importe pagado:</span>
                    <span className="font-black text-[#3B82F6] text-right">
                      {activeEx.audit.anguloPago}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 p-2.5 rounded-xl bg-[#F7CA38]/20 border-2 border-[#1E1E24]">
                    <span className="font-black text-slate-900 dark:text-white flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Comprobación angular:
                    </span>
                    <span className="font-black text-slate-900 dark:text-white text-right">
                      {activeEx.audit.comprobacionAngular}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-100 dark:bg-slate-900/80 p-4 border-t-2 border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              Total: 10 ejercicios con clave verificada matemáticamente.
            </span>
            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="px-5 py-2 bg-white text-[#1E1E24] border-2 border-[#1E1E24] rounded-xl font-black text-xs uppercase shadow-[2px_2px_0px_0px_#1E1E24] hover:bg-slate-50 active:translate-y-0.5 active:translate-x-0.5 transition-all cursor-pointer"
            >
              Cerrar Auditoría
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
