import React, { useState } from 'react';
import { X, Box, Layers, Scale, Sparkles, Maximize2 } from 'lucide-react';
import { NumberSetsWidget } from './widgets/NumberSetsWidget';
import { DivisibilityTowersWidget } from './widgets/DivisibilityTowersWidget';
import { AlgebraBalanceWidget } from './widgets/AlgebraBalanceWidget';
import { playSound } from '../utils/sound';
import { Mascot } from './widgets/Mascot';

interface InteractiveLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardXp: (amount: number) => void;
  initialTab?: 'sets' | 'towers' | 'algebra';
}

export const InteractiveLabModal: React.FC<InteractiveLabModalProps> = ({
  isOpen,
  onClose,
  onAwardXp,
  initialTab = 'sets',
}) => {
  const [activeLabTab, setActiveLabTab] = useState<'sets' | 'towers' | 'algebra'>(initialTab);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-md transition-all animate-fade-in font-jakarta"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-4 sm:p-6 w-full max-w-6xl h-[94vh] flex flex-col justify-between shadow-2xl relative overflow-hidden text-[#1E1E24]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-[#1E1E24] shrink-0">
          <div className="flex items-center gap-3">
            <Mascot mood="wizard" size={44} className="shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#6F78DB] text-white font-black text-[10px] uppercase rounded-full shadow-2xs">
                  Pantalla Completa
                </span>
                <span className="text-xs font-bold text-[#8A909F]">Laboratorio Sin Desplazamiento</span>
              </div>
              <h3 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight mt-0.5">
                Laboratorio Visual Interactivo
              </h3>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => {
                playSound('click');
                setActiveLabTab('sets');
              }}
              className={`px-3.5 py-2 rounded-full font-black text-xs uppercase flex items-center gap-1.5 shrink-0 cursor-pointer border-2 transition-all ${
                activeLabTab === 'sets'
                  ? 'bg-[#F7CA38] text-[#1E1E24] border-[#1E1E24] shadow-xs'
                  : 'bg-white text-[#4A4E69] border-[#1E1E24]/20 hover:border-[#1E1E24] hover:text-[#1E1E24]'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>Conjuntos Numéricos</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                setActiveLabTab('towers');
              }}
              className={`px-3.5 py-2 rounded-full font-black text-xs uppercase flex items-center gap-1.5 shrink-0 cursor-pointer border-2 transition-all ${
                activeLabTab === 'towers'
                  ? 'bg-[#F7CA38] text-[#1E1E24] border-[#1E1E24] shadow-xs'
                  : 'bg-white text-[#4A4E69] border-[#1E1E24]/20 hover:border-[#1E1E24] hover:text-[#1E1E24]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Torres Primas</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                setActiveLabTab('algebra');
              }}
              className={`px-3.5 py-2 rounded-full font-black text-xs uppercase flex items-center gap-1.5 shrink-0 cursor-pointer border-2 transition-all ${
                activeLabTab === 'algebra'
                  ? 'bg-[#F7CA38] text-[#1E1E24] border-[#1E1E24] shadow-xs'
                  : 'bg-white text-[#4A4E69] border-[#1E1E24]/20 hover:border-[#1E1E24] hover:text-[#1E1E24]'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Balanza Algebraica</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="p-2 bg-[#F4F7FC] hover:bg-gray-200 border-2 border-[#1E1E24] text-[#1E1E24] rounded-full cursor-pointer shrink-0 ml-auto shadow-2xs transition-colors"
              title="Cerrar laboratorio"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Main Lab Body */}
        <div className="flex-1 overflow-y-auto py-4 pr-1 my-2 bg-[#F8FAFC] rounded-2xl p-4 border-2 border-[#1E1E24]">
          {activeLabTab === 'sets' && <NumberSetsWidget onAwardXp={onAwardXp} />}
          {activeLabTab === 'towers' && <DivisibilityTowersWidget onAwardXp={onAwardXp} />}
          {activeLabTab === 'algebra' && <AlgebraBalanceWidget onAwardXp={onAwardXp} />}
        </div>

        {/* Footer info bar */}
        <div className="pt-3 border-t-2 border-[#1E1E24] flex items-center justify-between text-xs font-bold text-[#8A909F] shrink-0">
          <span>💡 Experimentos visuales interactivos para Matemáticas de Bachillerato.</span>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="px-5 py-2.5 bg-[#F7CA38] hover:bg-[#eab308] text-[#1E1E24] border-2 border-[#1E1E24] rounded-full font-black text-xs uppercase cursor-pointer shadow-xs transition-all active:scale-95"
          >
            Volver a la Guía
          </button>
        </div>
      </div>
    </div>
  );
};

