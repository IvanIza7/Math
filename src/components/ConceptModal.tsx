import React from 'react';
import { X, Sparkles, BookOpen, ShieldCheck, Play, Check } from 'lucide-react';
import { SubTopic } from '../types';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';
import { Mascot } from './widgets/Mascot';

interface ConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtopic: SubTopic | null;
  moduleTitle: string;
  moduleNumber: number;
  onPracticar: (subtopicId: string) => void;
  onVerDemostracion: (subtopic: SubTopic) => void;
}

export const ConceptModal: React.FC<ConceptModalProps> = ({
  isOpen,
  onClose,
  subtopic,
  moduleTitle,
  moduleNumber,
  onPracticar,
  onVerDemostracion,
}) => {
  if (!isOpen || !subtopic) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-all animate-fade-in font-jakarta"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative space-y-6 text-[#1E1E24]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 bg-[#F4F7FC] hover:bg-gray-200 text-[#1E1E24] border-2 border-[#1E1E24] rounded-full flex items-center justify-center cursor-pointer shadow-2xs transition-colors"
          title="Cerrar modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4">
          <Mascot mood="wizard" size={64} className="shrink-0 hidden sm:block" />
          <div>
            <span className="px-3 py-1 bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full inline-block mb-1 shadow-2xs">
              Módulo {moduleNumber}: {moduleTitle}
            </span>
            <h2 className="text-2xl font-black text-[#1E1E24] uppercase leading-tight">
              {subtopic.title}
            </h2>
            <p className="text-xs font-bold text-[#8A909F] mt-0.5">
              {subtopic.badge} • Resumen Conceptual
            </p>
          </div>
        </div>

        {/* What does it mean? (Explicación Sencilla) */}
        <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] p-4 rounded-2xl shadow-2xs">
          <span className="text-xs font-black uppercase text-[#B45309] block mb-1">
            ¿Qué Significa? (Explicación Intuitiva):
          </span>
          <p className="text-xs font-bold text-[#78350F] leading-relaxed">
            {subtopic.summary}
          </p>
        </div>

        {/* Key Concept Cards */}
        <div>
          <h4 className="text-xs font-black uppercase text-[#8A909F] mb-2 tracking-wider">
            Conceptos Clave:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {subtopic.keyConcepts.map((kc, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border-2 border-[#1E1E24] p-3 rounded-2xl shadow-2xs">
                <span
                  className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full text-[#1E1E24] border border-[#1E1E24] inline-block mb-1 shadow-2xs"
                  style={{ backgroundColor: kc.bgPill }}
                >
                  {kc.term}
                </span>
                <p className="text-xs font-semibold text-[#4A4E69]">
                  {kc.definition}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* KaTeX Formulas */}
        <div>
          <h4 className="text-xs font-black uppercase text-[#8A909F] mb-2 tracking-wider">
            Fórmula / Expresión Matemática:
          </h4>
          <div className="space-y-2.5">
            {subtopic.latexFormulas.map((f, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border-2 border-[#1E1E24] p-4 rounded-2xl shadow-xs">
                <span className="text-xs font-black text-[#1E1E24] block mb-1">
                  {f.title}
                </span>
                <div className="bg-white p-3 rounded-xl border border-[#1E1E24]/20 text-center font-mono my-2 text-base font-black text-[#1E1E24] shadow-2xs">
                  <MathView latex={f.latex} />
                </div>
                <p className="text-xs font-medium text-[#4A4E69]">
                  {f.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Arsenal Real Property Card */}
        <div className="bg-[#EEF2FF] text-[#1E1E24] border-2 border-[#1E1E24] p-4 rounded-2xl shadow-xs flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-[#6F78DB] shrink-0 mt-0.5 stroke-[2.5]" />
          <div>
            <span className="text-xs font-black uppercase text-[#4338CA] block mb-0.5">
              La Ley del Arsenal Real Acompañante:
            </span>
            <p className="text-xs font-bold text-[#3730A3]">
              {subtopic.invisibleTrick}
            </p>
          </div>
        </div>

        {/* Action Buttons: Entendido, Practicar, Ver Demostración */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => {
              playSound('correct');
              onClose();
            }}
            className="py-3 px-4 bg-[#F7CA38] hover:bg-[#eab308] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <Check className="w-4 h-4 text-[#1E1E24] stroke-[2.5]" />
            <span>Entendido</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onClose();
              onPracticar(subtopic.id);
            }}
            className="py-3 px-4 bg-[#6F78DB] hover:bg-[#5B64C8] text-white border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <Play className="w-4 h-4 text-white fill-white" />
            <span>Practicar en Arena</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onClose();
              onVerDemostracion(subtopic);
            }}
            className="py-3 px-4 bg-white hover:bg-gray-100 text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#F7CA38]" />
            <span>Ver Demostración</span>
          </button>
        </div>
      </div>
    </div>
  );
};
