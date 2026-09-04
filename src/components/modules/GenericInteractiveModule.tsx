import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Lightbulb, Layers, Tag, ChevronDown, CheckCircle2, AlertTriangle, Zap, Check } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';
import { EncyclopediaCard } from '../../data/encyclopediaCards';

interface GenericInteractiveModuleProps {
  card: EncyclopediaCard;
}

export const GenericInteractiveModule: React.FC<GenericInteractiveModuleProps> = ({ card }) => {
  const [showIntroDetail, setShowIntroDetail] = useState(false);
  const [activeExampleIndex, setActiveExampleIndex] = useState<number>(0);
  const [activeTheoryTab, setActiveTheoryTab] = useState<number>(0);
  const [openConcept, setOpenConcept] = useState<number | null>(null);

  const toggleConcept = (idx: number) => {
    playSound('click');
    setOpenConcept(openConcept === idx ? null : idx);
  };

  // Safe checks for empty arrays
  const teoria = card.teoria || [];
  const ejemplos = card.ejemplos || [];
  
  // Distribution of theory items
  const theoryFirst = teoria.length > 0 ? teoria[0] : null;
  const theoryRemaining = teoria.slice(1);
  const splitIndex = Math.ceil(theoryRemaining.length / 2);
  const theoryTabs = theoryRemaining.slice(0, splitIndex);
  const theoryAccordions = theoryRemaining.slice(splitIndex);

  return (
    <div className="space-y-6">
      
      {/* CARD 1: Guía Esencial */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#6F78DB] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            Guía Esencial
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          {card.resumen}
        </p>

        {theoryFirst && (
          <>
            <button
              onClick={() => {
                playSound('click');
                setShowIntroDetail(!showIntroDetail);
              }}
              className={`w-full py-3 px-4 rounded-xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${showIntroDetail
                  ? 'bg-[#FFF9E6] border-[#F7CA38] text-[#1E1E24]'
                  : 'bg-[#f8faf9] border-[#1E1E24] text-[#1E1E24] hover:bg-[#F7CA38]/10'
                }`}
            >
              <Lightbulb className={showIntroDetail ? 'fill-[#F7CA38]' : ''} size={18} />
              {showIntroDetail ? 'Ocultar detalle' : `Profundizar: ${theoryFirst.title}`}
            </button>

            <AnimatePresence>
              {showIntroDetail && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 p-4 bg-[#FFF9E6] rounded-xl border-2 border-[#F7CA38]/30 text-sm font-bold text-[#1E1E24]/80 overflow-x-auto no-scrollbar">
                    {theoryFirst.isLatex ? <MathView latex={theoryFirst.content} /> : theoryFirst.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>

      {/* CARD 2: Ejemplos Interactivos */}
      {ejemplos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#BAFF29] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
              Ejemplos Paso a Paso
            </h2>
          </div>

          {/* Pestañas de Ejemplos */}
          <div className="flex flex-wrap gap-2 mb-4">
            {ejemplos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { playSound('tap'); setActiveExampleIndex(idx); }}
                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${activeExampleIndex === idx
                    ? 'bg-[#1E1E24] text-white border-[#1E1E24] shadow-sm'
                    : 'bg-white text-[#1E1E24]/60 border-[#1E1E24]/20 hover:border-[#1E1E24]/50'
                  }`}
              >
                Ejemplo {idx + 1}
              </button>
            ))}
          </div>

          {/* Visualizador de Ejemplo */}
          <div className="bg-[#1E1E24] rounded-2xl overflow-hidden shadow-inner">
            <div className="bg-[#1E1E24] text-white p-4 font-bold text-base flex flex-col gap-2 overflow-x-auto no-scrollbar border-b border-white/10">
              <span className="text-[10px] text-[#BAFF29] uppercase tracking-widest">Problema</span>
              <MathView latex={ejemplos[activeExampleIndex].problem} />
            </div>
            <div className="p-4 space-y-3 bg-[#f8faf9]">
              {ejemplos[activeExampleIndex].steps.map((step, sIdx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: sIdx * 0.1 }}
                  key={`${activeExampleIndex}-${sIdx}`} 
                  className="flex gap-3 text-sm font-bold text-[#1E1E24]"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-white border-2 border-[#1E1E24] text-[#1E1E24] flex items-center justify-center text-[10px]">
                    {sIdx + 1}
                  </span>
                  <div className="flex-1 mt-0.5 overflow-x-auto no-scrollbar">
                    <MathView latex={step} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* CARD 3: Conceptos Fundamentales (Pestañas) */}
      {theoryTabs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#38bdf8] flex items-center justify-center text-white border-2 border-[#1E1E24]">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
              Conceptos Fundamentales
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {theoryTabs.map((item, idx) => (
              <button
                key={idx}
                onClick={() => { playSound('tap'); setActiveTheoryTab(idx); }}
                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${activeTheoryTab === idx
                    ? 'bg-[#1E1E24] text-white border-[#1E1E24] shadow-sm'
                    : 'bg-white text-[#1E1E24]/60 border-[#1E1E24]/20 hover:border-[#1E1E24]/50'
                  }`}
              >
                {item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTheoryTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-[#f8faf9] rounded-xl border-2 border-[#1E1E24] p-4 text-center overflow-x-auto no-scrollbar"
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-[#1E1E24]/50 mb-3">
                {theoryTabs[activeTheoryTab].title}
              </div>
              <div className="text-lg sm:text-xl font-black text-[#1E1E24]">
                {theoryTabs[activeTheoryTab].isLatex 
                  ? <MathView latex={theoryTabs[activeTheoryTab].content} inline={false} /> 
                  : theoryTabs[activeTheoryTab].content
                }
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* CARD 4: Puntos Clave & Alertas */}
      {(theoryAccordions.length > 0 || card.tips) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F7CA38] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
              <Tag className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
              Puntos Clave
            </h2>
          </div>

          <div className="space-y-3">
            {theoryAccordions.map((item, idx) => (
              <div key={idx} className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleConcept(idx)}
                  className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-xs sm:text-sm text-[#1E1E24] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22C55E]" /> {item.title}
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openConcept === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openConcept === idx && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-4 bg-white text-[11px] sm:text-xs font-bold text-[#1E1E24]/80 space-y-2 border-t-2 border-[#1E1E24]/10 overflow-x-auto no-scrollbar">
                        {item.isLatex 
                          ? <MathView latex={item.content} /> 
                          : item.content
                        }
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Error/Tips Box */}
            {card.tips && (
              <div className="mt-4 bg-[#FEF2F2] border-2 border-[#EF4444] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#EF4444] relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10 text-[#EF4444]">
                  <AlertTriangle size={100} />
                </div>
                <div className="flex gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#EF4444] text-white flex items-center justify-center shrink-0 border-2 border-[#991B1B]">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-base text-[#991B1B] uppercase mb-1">¡Ojo con esto!</h4>
                    <div className="text-[11px] sm:text-xs font-bold text-[#7F1D1D] leading-relaxed overflow-x-auto no-scrollbar">
                      <MathView latex={card.tips.includes('\\') || card.tips.includes('^') || card.tips.includes('=') ? card.tips : `\\text{${card.tips}}`} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
