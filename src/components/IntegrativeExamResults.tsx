import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, CheckCircle2, XCircle, Award } from 'lucide-react';
import { PUENTE_EXAM_DATA } from '../data/puenteBachilleratoData';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';

interface IntegrativeExamResultsProps {
  answers: string[]; // 0-indexed array mapping to PUENTE_EXAM_DATA
  timeElapsed: number; // in seconds
  onClose: () => void;
  onAwardXp: (amount: number) => void;
}

export const IntegrativeExamResults: React.FC<IntegrativeExamResultsProps> = ({
  answers,
  timeElapsed,
  onClose,
  onAwardXp
}) => {
  const [hasAwarded, setHasAwarded] = useState(false);

  // Compute stats
  const correctCount = PUENTE_EXAM_DATA.reduce((acc, q, idx) => {
    // Normalizing strings (trim, handle basic spaces) to compare
    const userAns = (answers[idx] || '').trim().replace(/\s+/g, '');
    const correctAns = q.correctAnswer.trim().replace(/\s+/g, '');
    return acc + (userAns === correctAns ? 1 : 0);
  }, 0);

  const percentage = Math.round((correctCount / PUENTE_EXAM_DATA.length) * 100);
  const xpEarned = Math.floor(correctCount * 10); // 10 XP per correct question

  useEffect(() => {
    if (!hasAwarded && xpEarned > 0) {
      playSound('level_up');
      onAwardXp(xpEarned);
      setHasAwarded(true);
    }
  }, [hasAwarded, xpEarned, onAwardXp]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 bg-[#F2F3F7] flex flex-col font-poppins text-[#1E1E24] overflow-hidden z-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#1E1E24] p-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <button 
          onClick={() => { playSound('click'); onClose(); }}
          className="w-10 h-10 border-2 border-[#1E1E24] rounded-xl flex items-center justify-center hover:bg-[#F2F3F7] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="font-black text-sm px-3 py-1 bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-lg flex items-center gap-2">
          <Trophy size={16} className="text-[#F59E0B]" />
          <span>Resultados</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {/* Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-[#1E1E24] rounded-3xl p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_#9333EA_2px,_transparent_2px)]" style={{ backgroundSize: '16px 16px' }}></div>
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-2 uppercase tracking-tight text-[#9333EA]">Puente al Bachillerato</h2>
            <div className="text-6xl font-black tracking-tighter mb-4 text-[#1E1E24]">
              {percentage}%
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-4">
              <div className="bg-[#F0FDF4] border-2 border-[#1E1E24] rounded-2xl p-3 shadow-xs">
                <p className="text-xs font-bold text-[#166534] mb-1">Aciertos</p>
                <p className="text-2xl font-black text-[#15803D]">{correctCount} <span className="text-sm">/ 50</span></p>
              </div>
              <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-3 shadow-xs">
                <p className="text-xs font-bold text-[#475569] mb-1">Tiempo</p>
                <p className="text-2xl font-black text-[#334155]">{formatTime(timeElapsed)}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#FFF9E6] border-2 border-[#1E1E24] px-4 py-2 rounded-xl font-black text-[#92400E] shadow-[2px_2px_0px_0px_#1E1E24]">
              <Award className="w-5 h-5 text-[#F59E0B]" />
              <span>+{xpEarned} XP</span>
            </div>
          </div>
        </motion.div>

        {/* Detailed Review */}
        <div className="space-y-4">
          <h3 className="font-black text-lg tracking-tight">Revisión Detallada</h3>
          
          <div className="space-y-3">
            {PUENTE_EXAM_DATA.map((q, idx) => {
              const userAns = (answers[idx] || '').trim();
              const correctAns = q.correctAnswer.trim();
              const isCorrect = userAns.replace(/\s+/g, '') === correctAns.replace(/\s+/g, '');

              return (
                <div key={q.id} className={`bg-white border-2 border-[#1E1E24] rounded-2xl p-4 shadow-xs relative overflow-hidden`}>
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${isCorrect ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`}></div>
                  
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase text-[#8A909F] bg-[#F2F3F7] px-2 py-0.5 rounded-full">
                        {q.competency}
                      </span>
                      <p className="font-bold text-sm mt-2">{q.instruction}</p>
                      {q.questionLatex.length > 0 && (
                        <div className="mt-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg inline-block">
                          {q.questionLatex.map((line, i) => (
                            <div key={i}><MathView latex={line} /></div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 mt-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
                      ) : (
                        <XCircle className="w-6 h-6 text-[#EF4444]" />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#E2E8F0]">
                    <div>
                      <p className="text-[10px] font-bold text-[#8A909F] uppercase mb-1">Tu respuesta</p>
                      <div className={`p-2 rounded-lg border-2 ${isCorrect ? 'border-[#22C55E] bg-[#F0FDF4] text-[#166534]' : 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]'} font-black text-sm`}>
                        {userAns ? (
                          q.inputType === 'keypad' ? userAns : <MathView latex={userAns} inline />
                        ) : (
                          <span className="opacity-50 italic">Sin respuesta</span>
                        )}
                      </div>
                    </div>
                    {!isCorrect && (
                      <div>
                        <p className="text-[10px] font-bold text-[#8A909F] uppercase mb-1">Respuesta correcta</p>
                        <div className="p-2 rounded-lg border-2 border-[#1E1E24] bg-white font-black text-sm text-[#1E1E24]">
                          {q.inputType === 'keypad' ? correctAns : <MathView latex={correctAns} inline />}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
