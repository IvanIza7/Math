import React from 'react';
import { X, Sparkles, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';
import { Mascot } from './widgets/Mascot';

interface ContextHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeContextTitle: string;
  invisibleTrick?: string;
  relevantFormulas?: { title: string; latex: string; explanation: string }[];
  onOpenArsenal: () => void;
}

export const ContextHelpModal: React.FC<ContextHelpModalProps> = ({
  isOpen,
  onClose,
  activeContextTitle,
  invisibleTrick,
  relevantFormulas,
  onOpenArsenal,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-all animate-fade-in font-jakarta"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl relative text-[#1E1E24]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 bg-[#F4F7FC] hover:bg-gray-200 text-[#1E1E24] border-2 border-[#1E1E24] rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
          title="Cerrar modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <Mascot mood="wizard" size={60} className="shrink-0" />
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#6F78DB] mb-0.5">
              <Sparkles className="w-4 h-4 text-[#F7CA38]" />
              <span>Ayuda Mágica Contextual</span>
            </div>
            <h3 className="text-xl font-black text-[#1E1E24] uppercase">
              {activeContextTitle}
            </h3>
          </div>
        </div>

        {/* Invisible Trick Card */}
        {invisibleTrick && (
          <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] p-4 rounded-2xl mb-5 shadow-2xs">
            <span className="text-[11px] font-black uppercase text-[#B45309] block mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              Truco Invisible Requerido:
            </span>
            <p className="text-xs font-bold text-[#78350F] leading-relaxed">
              {invisibleTrick}
            </p>
          </div>
        )}

        {/* Relevant Formulas */}
        {relevantFormulas && relevantFormulas.length > 0 && (
          <div className="mb-6 space-y-3">
            <h4 className="text-xs font-black uppercase text-[#8A909F] tracking-wider">
              Fórmulas y Propiedades Activas:
            </h4>

            {relevantFormulas.map((f, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border-2 border-[#1E1E24] p-3.5 rounded-2xl shadow-2xs">
                <span className="text-xs font-black text-[#1E1E24] block mb-1">
                  {f.title}
                </span>
                <div className="bg-white p-2.5 rounded-xl border border-[#1E1E24]/20 text-center font-mono my-2 text-sm font-bold text-[#1E1E24]">
                  <MathView latex={f.latex} inline />
                </div>
                <p className="text-xs font-semibold text-[#4A4E69]">
                  {f.explanation}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Open Arsenal Direct Action */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
            onOpenArsenal();
          }}
          className="w-full py-3.5 bg-[#F7CA38] hover:bg-[#eab308] text-[#1E1E24] border-2 border-[#1E1E24] rounded-full font-black text-xs uppercase shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          <ShieldCheck className="w-4 h-4 text-[#1E1E24]" />
          <span>Ver las 6 Leyes Universales del Arsenal</span>
        </button>
      </div>
    </div>
  );
};
