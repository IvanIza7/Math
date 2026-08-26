import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Book, Lightbulb, AlertTriangle, Play, ArrowLeft } from 'lucide-react';
import { EncyclopediaCard, ENCYCLOPEDIA_CARDS } from '../data/encyclopediaCards';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: EncyclopediaCard | null;
  onOpenLab?: (widgetType: string) => void;
  onAwardXp?: (amount: number, reason?: string, entityId?: string, metadata?: any) => void;
}

export const TopicModal: React.FC<TopicModalProps> = ({ isOpen, onClose, card, onOpenLab, onAwardXp }) => {
  React.useEffect(() => {
    if (isOpen && card && onAwardXp) {
      // Fire a generic 5 XP reward for opening/reading a topic, passing the topic ID
      onAwardXp(5, 'TOPIC_COMPLETED', card.id);
    }
  }, [isOpen, card, onAwardXp]);

  if (!isOpen || !card) return null;

  const match = card.id.match(/vol(\d+)-t(\d+)/);
  const volNum = match ? parseInt(match[1]) : 1;
  const topicNum = match ? parseInt(match[2]) : 1;
  const totalTopics = ENCYCLOPEDIA_CARDS.filter(c => c.categoria === card.categoria).length;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.15 }}
      className="flex flex-col min-h-screen bg-[#F4F7FC]"
    >
      {/* Header */}
      <div 
        className="w-full relative shrink-0"
        style={{ backgroundColor: card.color }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_#1E1E24_2px,_transparent_2px)]" style={{ backgroundSize: '16px 16px' }}></div>
        
        {/* Top Navbar */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-5">
          <button
            onClick={() => { playSound('click'); onClose(); }}
            className="w-11 h-11 bg-white rounded-full border-2 border-[#1E1E24] flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none hover:bg-gray-50 transition-all shrink-0"
          >
            <ArrowLeft size={22} className="text-[#1E1E24] stroke-[3]" />
          </button>
          
          <div className="px-4 py-1.5 bg-white rounded-full border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] flex items-center">
            <span className="font-black text-[11px] sm:text-xs text-[#1E1E24] uppercase tracking-widest whitespace-nowrap">
              VOL-{String(volNum).padStart(2, '0')} · {card.categoria}
            </span>
          </div>
          
          <div className="w-11 h-11 bg-white rounded-full border-2 border-[#1E1E24] flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
            <span className="font-black text-xs text-[#1E1E24]">
              #{String(topicNum).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Title Area */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pb-10 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-black/10 bg-black/5 text-[#1E1E24] font-black text-[10px] uppercase tracking-widest mb-4">
            <Book size={12} className="stroke-[3]" />
            TEMA {topicNum} DE {totalTopics}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1E1E24] leading-tight max-w-[320px] tracking-tight">
            {card.titulo}
          </h2>
          <p className="mt-3 font-bold text-[#1E1E24]/80 text-sm max-w-[280px]">
            {card.resumen}
          </p>
        </div>
        
        {/* Bottom curve decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#F4F7FC] rounded-t-[2rem] border-t-4 border-[#1E1E24]" />
      </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-8 scroll-smooth">
            
            {/* Teoría */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1E1E24] text-white flex items-center justify-center">
                  <Book size={16} />
                </div>
                <h3 className="font-black text-xl uppercase tracking-tight text-[#1E1E24]">Teoría</h3>
              </div>
              <div className="grid gap-3">
                {card.teoria.map((item, idx) => (
                  <div key={idx} className="bg-white border-2 border-[#1E1E24] rounded-2xl p-4 shadow-xs">
                    <h4 className="font-bold text-[#8A909F] text-xs uppercase mb-2">{item.title}</h4>
                    <div className="font-black text-base sm:text-lg text-[#1E1E24] overflow-x-auto overflow-y-hidden no-scrollbar">
                      {item.isLatex ? <MathView latex={item.content} /> : item.content}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Ejemplos */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#BAFF29] border-2 border-[#1E1E24] flex items-center justify-center">
                  <Lightbulb size={16} className="text-[#1E1E24]" />
                </div>
                <h3 className="font-black text-xl uppercase tracking-tight text-[#1E1E24]">Ejemplos Paso a Paso</h3>
              </div>
              
              <div className="space-y-4">
                {card.ejemplos.map((ej, idx) => (
                  <div key={idx} className="bg-white border-2 border-[#1E1E24] rounded-2xl overflow-hidden shadow-[2px_2px_0px_0px_#1E1E24]">
                    <div className="bg-[#1E1E24] text-white p-4 font-bold text-base flex flex-col gap-2 overflow-x-auto no-scrollbar">
                      <span className="text-[10px] text-[#BAFF29] uppercase tracking-widest">Ejemplo {idx + 1}</span>
                      <MathView latex={ej.problem} />
                    </div>
                    <div className="p-4 space-y-3 bg-[#f8faf9]">
                      {ej.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex gap-3 text-sm font-bold text-[#4A4E69]">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-white border-2 border-[#1E1E24] text-[#1E1E24] flex items-center justify-center text-[10px]">
                            {sIdx + 1}
                          </span>
                          <div className="flex-1 mt-0.5 overflow-x-auto no-scrollbar"><MathView latex={step} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tips / Errores */}
            <section>
              <div className="bg-[#FEF2F2] border-2 border-[#EF4444] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#EF4444] relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10 text-[#EF4444]">
                  <AlertTriangle size={100} />
                </div>
                <div className="flex gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#EF4444] text-white flex items-center justify-center shrink-0 border-2 border-[#991B1B]">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-base text-[#991B1B] uppercase mb-1">¡Ojo con esto!</h4>
                    <div className="text-sm font-bold text-[#7F1D1D] leading-relaxed overflow-x-auto no-scrollbar">
                      <MathView latex={card.tips.includes('\\') || card.tips.includes('^') || card.tips.includes('=') ? card.tips : `\\text{${card.tips}}`} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Botón Laboratorio (Opcional) */}
            {card.widgetType && onOpenLab && (
              <section className="pt-4 border-t-2 border-dashed border-[#E2E8F0]">
                <button
                  onClick={() => { playSound('click'); onOpenLab(card.widgetType!); }}
                  className="w-full bg-[#38bdf8] hover:bg-[#20a8e8] text-white border-4 border-[#1E1E24] rounded-2xl p-4 flex items-center justify-center gap-3 font-black shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
                >
                  <Play className="fill-current" />
                  ENTRAR AL LABORATORIO INTERACTIVO
                </button>
              </section>
            )}

          </div>
        </motion.div>
  );
};
