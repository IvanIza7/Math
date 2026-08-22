import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, Sparkles, BookOpen } from 'lucide-react';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';
import { useMagicFormulas } from '../hooks/useMagicFormulas';

interface MagicFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FORMULA_SECTIONS = [
  {
    id: 'propiedades',
    title: 'Propiedades Fundamentales',
    content: (
      <div className="space-y-2 text-sm font-bold text-gray-700">
        <p>Conmutativa: <MathView latex="a+b=b+a" inline /></p>
        <p>Asociativa: <MathView latex="(a+b)+c=a+(b+c)" inline /></p>
        <p>Distributiva: <MathView latex="a(b+c)=ab+ac" inline /></p>
      </div>
    )
  },
  {
    id: 'signos',
    title: 'Leyes de los Signos',
    content: (
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-[#FFF9E6] p-4 rounded-xl border-2 border-[#1E1E24]">
          <h4 className="font-black text-[#1E1E24] mb-2 uppercase text-xs">Multiplicación y División</h4>
          <ul className="space-y-1 font-bold text-sm">
            <li>(+) × (+) = (+)</li>
            <li>(-) × (-) = (+)</li>
            <li>(+) × (-) = (-)</li>
            <li>(-) × (+) = (-)</li>
          </ul>
        </div>
        <div className="bg-[#EEF2FF] p-4 rounded-xl border-2 border-[#1E1E24]">
          <h4 className="font-black text-[#1E1E24] mb-2 uppercase text-xs">Suma y Resta</h4>
          <p className="text-xs font-semibold mb-2 flex flex-wrap items-center gap-1">Mismo signo: Se suman y conservan signo. <MathView latex="-4-6=-10" inline /></p>
          <p className="text-xs font-semibold flex flex-wrap items-center gap-1">Distinto signo: Se restan y queda signo del mayor. <MathView latex="-9+4=-5" inline /></p>
        </div>
      </div>
    )
  },
  {
    id: 'jerarquia',
    title: 'Jerarquía de Operaciones',
    content: (
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-3 bg-white p-2 border-2 border-[#1E1E24] rounded-lg shadow-2xs">
          <div className="w-6 h-6 bg-[#1E1E24] text-white flex items-center justify-center font-black rounded-md">1</div>
          <p className="font-bold flex-1">Paréntesis y Corchetes</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 border-2 border-[#1E1E24] rounded-lg shadow-2xs">
          <div className="w-6 h-6 bg-[#1E1E24] text-white flex items-center justify-center font-black rounded-md">2</div>
          <p className="font-bold flex-1">Exponentes y Raíces</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 border-2 border-[#1E1E24] rounded-lg shadow-2xs">
          <div className="w-6 h-6 bg-[#1E1E24] text-white flex items-center justify-center font-black rounded-md">3</div>
          <p className="font-bold flex-1">Mult. y División (Izq a Der)</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 border-2 border-[#1E1E24] rounded-lg shadow-2xs">
          <div className="w-6 h-6 bg-[#1E1E24] text-white flex items-center justify-center font-black rounded-md">4</div>
          <p className="font-bold flex-1">Suma y Resta (Izq a Der)</p>
        </div>
      </div>
    )
  },
  {
    id: 'exponentes',
    title: 'Leyes de Exponentes',
    content: (
      <div className="space-y-3 font-bold text-sm">
        <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between">
          <span>Multiplicación:</span> <MathView latex="x^a \cdot x^b = x^{a+b}" inline />
        </div>
        <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between">
          <span>División:</span> <MathView latex="\frac{x^a}{x^b} = x^{a-b}" inline />
        </div>
        <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between">
          <span>Potencia:</span> <MathView latex="(x^a)^b = x^{ab}" inline />
        </div>
        <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between">
          <span>Negativo:</span> <MathView latex="x^{-n} = \frac{1}{x^n}" inline />
        </div>
      </div>
    )
  },
  {
    id: 'factorizacion',
    title: 'Productos Notables',
    content: (
      <div className="space-y-3 font-bold text-sm">
        <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between">
          <span>Binomio Cuadrado:</span> <MathView latex="(a \pm b)^2 = a^2 \pm 2ab + b^2" inline />
        </div>
        <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between">
          <span>Dif. Cuadrados:</span> <MathView latex="(a+b)(a-b) = a^2 - b^2" inline />
        </div>
      </div>
    )
  },
  {
    id: 'cuadratica',
    title: 'Fórmula Cuadrática',
    content: (
      <div className="flex justify-center p-4 bg-gray-50 rounded border border-gray-200">
        <MathView latex="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
      </div>
    )
  },
  {
    id: 'trig',
    title: 'Trigonometría (SOH CAH TOA)',
    content: (
      <div className="space-y-3 font-bold text-sm">
        <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between">
          <span>Sen:</span> <MathView latex="\sin\theta = \frac{\text{Op}}{\text{Hip}}" inline />
        </div>
        <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between">
          <span>Cos:</span> <MathView latex="\cos\theta = \frac{\text{Ady}}{\text{Hip}}" inline />
        </div>
        <div className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between">
          <span>Tan:</span> <MathView latex="\tan\theta = \frac{\text{Op}}{\text{Ady}}" inline />
        </div>
      </div>
    )
  }
];

export const MagicFormulaModal: React.FC<MagicFormulaModalProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { magicFormulas } = useMagicFormulas();

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    playSound('click');
    setExpandedSection(prev => (prev === id ? null : id));
  };

  const visibleSections = FORMULA_SECTIONS.filter(s => magicFormulas.includes(s.id));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#F4F7FC] w-full max-w-sm max-h-[80vh] rounded-3xl border-4 border-[#1E1E24] shadow-[8px_8px_0px_0px_#1E1E24] overflow-hidden flex flex-col font-jakarta"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#BAFF29] p-4 flex items-center justify-between border-b-4 border-[#1E1E24]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1E1E24] fill-current" />
            <h2 className="font-black text-lg text-[#1E1E24] tracking-tight">Fórmulas Rápidas</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[3] text-[#1E1E24]" />
          </button>
        </div>

        {/* Content - Accordion */}
        <div className="p-4 overflow-y-auto space-y-3 no-scrollbar">
          
          {visibleSections.length === 0 ? (
            <div className="bg-[#BAFF29] w-full rounded-3xl p-4 sm:p-5 border-2 border-[#1E1E24] shadow-xs flex items-center justify-between relative overflow-hidden transition-transform">
              <div className="flex-1 flex flex-col justify-between h-full z-10 pr-1">
                <div>
                  <h2 className="text-[15px] font-black leading-tight tracking-tight text-[#1E1E24]">
                    No hay fórmulas activas
                  </h2>
                  <p className="text-[11px] font-bold opacity-80 text-[#1E1E24] mt-0.5">
                    Toca la varita en tus fórmulas favoritas
                  </p>
                </div>
                
                <div className="mt-4">
                  <button
                    onClick={onClose}
                    className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-tight border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all cursor-pointer inline-flex items-center gap-1 bg-white text-[#1E1E24]"
                  >
                    <Wand2 className="w-3 h-3 stroke-[3]" />
                    <span>¡Ir a buscar!</span>
                  </button>
                </div>
              </div>
              
              <div className="w-24 h-24 flex items-center justify-center shrink-0 relative overflow-visible pr-1">
                <div className="w-full h-full bg-white rounded-full border-2 border-[#1E1E24] flex items-center justify-center shadow-xs rotate-12">
                   <BookOpen className="w-10 h-10 text-[#1E1E24]" />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs font-bold text-[#8A909F] mb-2 text-center">Referencia de bolsillo personalizada</p>
          )}
          
          {visibleSections.map((section) => {
            const isExpanded = expandedSection === section.id;
            return (
              <div key={section.id} className="bg-white border-2 border-[#1E1E24] rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 flex items-center justify-between bg-white hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <h3 className="font-black text-sm text-[#1E1E24]">{section.title}</h3>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-t-2 border-[#1E1E24]/10 bg-[#fdfdfd]">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
