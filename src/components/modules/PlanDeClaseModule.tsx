import React from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Swords, Calendar as CalendarIcon, CheckCircle2, Sparkles, GraduationCap, Flame } from 'lucide-react';
import { AttendanceRecord } from '../../types';
import { getPlanForSession } from '../../data/classPlan';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

interface PlanDeClaseModuleProps {
  attendanceRecords: AttendanceRecord[];
  onOpenAttendanceModal: () => void;
  onNavigateToTab: (tab: 'guia' | 'trials' | 'arena') => void;
}

export const PlanDeClaseModule: React.FC<PlanDeClaseModuleProps> = ({
  attendanceRecords,
  onOpenAttendanceModal,
  onNavigateToTab,
}) => {
  const currentSessionNumber = attendanceRecords.length + 1;
  const currentPlan = getPlanForSession(currentSessionNumber);
  const lastAttendance = attendanceRecords[attendanceRecords.length - 1];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7CA38] text-[#1E1E24] pb-16 font-jakarta relative overflow-hidden">
      {/* Top Yellow Header Section */}
      <motion.div
        initial={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          scaleY: 0.9,
          y: -15,
        }}
        animate={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scaleY: 1,
          y: 0,
        }}
        transition={{
          duration: 0.38,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: 'top center' }}
        className="w-full bg-[#F7CA38] pt-4 pb-7 px-5 flex flex-col items-center relative z-10"
      >
        {/* Background Memphis Accents */}
        <div className="absolute top-3 left-6 w-6 h-6 rounded-full border-2 border-[#1E1E24]/20 pointer-events-none" />
        <div className="absolute top-10 left-16 w-2 h-2 rounded-full bg-[#1E1E24]/30 pointer-events-none" />
        <div className="absolute top-6 right-8 text-[#1E1E24]/20 font-black text-lg pointer-events-none select-none">
          ✦
        </div>

        {/* Header Content */}
        <div className="w-full flex items-center justify-between mb-2 max-w-md">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-2xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-lg shadow-xs">
              📋
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1E1E24]/80 block">
                Estructura de 60 Minutos
              </span>
              <h1 className="text-xl font-black uppercase tracking-tight text-[#1E1E24]">
                PLAN DE CLASE
              </h1>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound('click');
              onOpenAttendanceModal();
            }}
            className="px-3.5 py-1.5 bg-white border-2 border-[#1E1E24] hover:bg-[#F8FAFC] text-[#1E1E24] font-black text-xs uppercase tracking-wider rounded-full shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-[#1E1E24]" />
            <span>Asistencia ({attendanceRecords.length})</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main White Card with Rounded Top Corners */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.35 }}
        className="relative z-20 w-full max-w-md mx-auto bg-white rounded-t-[36px] border-t-2 border-x-2 border-[#1E1E24] shadow-2xl p-5 pt-6 pb-24 space-y-4 flex-1"
      >
        {/* Next Session Progress Hero Card */}
        <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-3xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#6F78DB] flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              Sesión Impartida Siguiente
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white border border-[#1E1E24] text-[10px] font-black text-[#1E1E24]">
              Sesión #{currentSessionNumber}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border-2 border-[#1E1E24]">
            <div className="w-11 h-11 rounded-xl bg-[#F7CA38] border-2 border-[#1E1E24] text-[#1E1E24] font-black text-lg flex items-center justify-center shrink-0 shadow-2xs">
              #{currentSessionNumber}
            </div>
            <div>
              <h3 className="text-sm font-black text-[#1E1E24] leading-snug">
                {currentPlan.topicTitle}
              </h3>
              <span className="text-xs font-bold text-[#6F78DB]">
                {currentPlan.moduleTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            {lastAttendance ? (
              <div className="inline-flex items-center gap-1.5 bg-[#DCFCE7] border border-[#1E1E24] px-3 py-1 rounded-full text-xs font-black text-[#166534]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Última Asistencia: {lastAttendance.timestamp}</span>
              </div>
            ) : (
              <span className="text-xs font-bold text-[#1E1E24] bg-white border border-[#1E1E24] px-3 py-1 rounded-full">
                Sin registros previos
              </span>
            )}
          </div>
        </div>

        {/* 4 Modular Stages Timeline */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-[#8A909F] tracking-wider">
              Desglose de la Sesión (60 Minutos):
            </h3>
            <span className="text-xs font-bold text-[#6F78DB]">
              4 Fases Gamificadas
            </span>
          </div>

          <div className="space-y-3">
            {currentPlan.stages.map((stage, idx) => {
              const isWarmup = stage.type === 'warmup';
              const isDemo = stage.type === 'demo';
              const isAutonomous = stage.type === 'autonomous';
              const isBoss = stage.type === 'boss';

              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white border-2 border-[#1E1E24] p-4 rounded-3xl shadow-xs space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full bg-[#F7CA38] text-[#1E1E24] border border-[#1E1E24]">
                        {stage.timeRange}
                      </span>
                      <div className="flex items-center gap-1 text-[#8A909F] text-xs font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Fase {idx + 1}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-black text-[#1E1E24] mb-1">
                      {stage.title}
                    </h4>
                    <p className="text-xs font-medium text-[#4A4E69] leading-relaxed">
                      {stage.description}
                    </p>

                    {stage.latexExample && (
                      <div className="bg-[#F8FAFC] p-2.5 rounded-xl border-2 border-[#1E1E24] text-center text-xs font-bold my-2 text-[#1E1E24]">
                        <MathView latex={stage.latexExample} inline />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-1 border-t border-[#1E1E24]/10">
                    <div className="text-[11px] font-semibold text-[#4A4E69] bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                      {stage.actionHint}
                    </div>

                    {isWarmup && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          playSound('click');
                          onNavigateToTab('guia');
                        }}
                        className="w-full py-2.5 bg-[#F4F7FC] hover:bg-[#E8EEF8] border-2 border-[#1E1E24] text-[#1E1E24] font-black text-xs uppercase rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#6F78DB]" />
                        <span>Ir a la Enciclopedia</span>
                      </motion.button>
                    )}

                    {(isDemo || isAutonomous || isBoss) && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          playSound('click');
                          onNavigateToTab('trials');
                        }}
                        className="w-full py-2.5 bg-[#F7CA38] hover:bg-[#ffce38] border-2 border-[#1E1E24] text-[#1E1E24] font-black text-xs uppercase rounded-full shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Swords className="w-3.5 h-3.5 text-[#1E1E24]" />
                        <span>Ir a los Daily Trials</span>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
