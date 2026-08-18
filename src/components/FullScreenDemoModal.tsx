import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, ChevronLeft, ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';
import { SubTopic } from '../types';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';
import { Mascot } from './widgets/Mascot';

interface FullScreenDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtopic: SubTopic | null;
  onOpenArsenal: () => void;
}

export const FullScreenDemoModal: React.FC<FullScreenDemoModalProps> = ({
  isOpen,
  onClose,
  subtopic,
  onOpenArsenal,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  if (!isOpen || !subtopic) return null;

  // Generate demo steps based on the subtopic's formulas
  const demoSteps = subtopic.latexFormulas.map((formula, idx) => ({
    stepNum: idx + 1,
    title: formula.title,
    latex: formula.latex,
    explanation: formula.explanation,
    propertyNeeded: subtopic.invisibleTrick,
  }));

  const activeStep = demoSteps[currentStepIdx] || demoSteps[0];

  const handleNext = () => {
    playSound('click');
    if (currentStepIdx + 1 < demoSteps.length) {
      setCurrentStepIdx(currentStepIdx + 1);
      setShowHint(false);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    playSound('click');
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
      setShowHint(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-lg transition-all animate-fade-in font-jakarta"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-6 sm:p-8 w-full max-w-4xl h-[92vh] flex flex-col justify-between shadow-2xl relative overflow-hidden text-[#1E1E24]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#1E1E24]">
          <div className="flex items-center gap-3">
            <Mascot mood="wizard" size={48} className="shrink-0" />
            <div>
              <span className="px-2.5 py-0.5 bg-[#6F78DB] text-white font-black text-[10px] uppercase rounded-full shadow-2xs">
                Demostración Matemática Guiada
              </span>
              <h3 className="text-lg font-black text-[#1E1E24] uppercase mt-0.5">
                {subtopic.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="w-9 h-9 bg-[#F4F7FC] hover:bg-gray-200 text-[#1E1E24] border-2 border-[#1E1E24] rounded-full flex items-center justify-center cursor-pointer shadow-2xs transition-colors"
            title="Cerrar demostración"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Center Prominent Math Display Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center my-4 space-y-6">
          <span className="px-3 py-1 bg-[#F4F7FC] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full shadow-2xs">
            Paso {activeStep.stepNum} de {demoSteps.length}: {activeStep.title}
          </span>

          {/* Centered Large Math Formula */}
          <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] p-6 sm:p-10 rounded-3xl w-full max-w-2xl shadow-xs my-2 flex items-center justify-center min-h-[140px]">
            <div className="text-2xl sm:text-4xl font-black text-[#1E1E24] font-mono">
              <MathView latex={activeStep.latex} />
            </div>
          </div>

          {/* Explanation Box */}
          <div className="max-w-xl text-center space-y-2">
            <p className="text-sm font-bold text-[#4A4E69] leading-relaxed">
              {activeStep.explanation}
            </p>

            {showHint && (
              <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] p-3.5 rounded-2xl text-xs font-bold text-[#78350F] animate-fade-in flex items-center justify-center gap-2 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Pista del Maestro: {activeStep.propertyNeeded}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="pt-4 border-t-2 border-[#1E1E24] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className={`px-4 py-2.5 rounded-full font-black text-xs uppercase flex items-center gap-1.5 border-2 transition-all ${
                currentStepIdx === 0
                  ? 'bg-[#F4F7FC] text-[#8A909F] border-[#1E1E24]/20 cursor-not-allowed opacity-50'
                  : 'bg-white hover:bg-[#F8FAFC] text-[#1E1E24] border-[#1E1E24] cursor-pointer shadow-2xs'
              }`}
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Anterior</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                setShowHint(!showHint);
              }}
              className="px-4 py-2.5 bg-white hover:bg-[#F8FAFC] text-[#1E1E24] border-2 border-[#1E1E24] rounded-full font-black text-xs uppercase cursor-pointer flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <HelpCircle className="w-4 h-4 text-[#6F78DB]" />
              <span>Pista</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                onOpenArsenal();
              }}
              className="px-4 py-2.5 bg-white hover:bg-[#F8FAFC] text-[#1E1E24] border-2 border-[#1E1E24] rounded-full font-black text-xs uppercase cursor-pointer flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#F7CA38]" />
              <span>Ver Propiedad</span>
            </button>
          </div>

          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3 bg-[#F7CA38] hover:bg-[#eab308] text-[#1E1E24] border-2 border-[#1E1E24] rounded-full font-black text-xs uppercase cursor-pointer shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>{currentStepIdx + 1 === demoSteps.length ? 'Finalizar Demostración' : 'Siguiente Paso'}</span>
            <ArrowRight className="w-4 h-4 text-[#1E1E24] stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
