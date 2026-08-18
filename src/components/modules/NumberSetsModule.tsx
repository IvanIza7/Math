import React from 'react';
import { Box, Layers, Sparkles } from 'lucide-react';
import { NumberSetsWidget } from '../widgets/NumberSetsWidget';

interface NumberSetsModuleProps {
  onAwardXp: (amount: number) => void;
}

export const NumberSetsModule: React.FC<NumberSetsModuleProps> = ({ onAwardXp }) => {
  return (
    <div className="space-y-6 text-[#1E1E24] font-jakarta">
      {/* Title Banner */}
      <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-3xl p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] rounded-2xl shrink-0 shadow-2xs">
            <Box className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#6F78DB] text-white font-black text-[10px] uppercase rounded-full">
                Módulo 2
              </span>
              <span className="text-xs font-bold text-[#8A909F]">Teoría de Conjuntos</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1E1E24] mt-0.5">
              Los Conjuntos Numéricos
            </h2>
            <p className="text-xs font-semibold text-[#4A4E69]">
              Cajas anidadas interactivas para ℕ, ℤ, ℚ, I y ℝ
            </p>
          </div>
        </div>
      </div>

      {/* Main Classification Widget */}
      <NumberSetsWidget onAwardXp={onAwardXp} />

      {/* Visual Hierarchy Diagram */}
      <div className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 sm:p-6 shadow-xs">
        <h3 className="text-base font-black text-[#1E1E24] uppercase mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#6F78DB]" /> Jerarquía Visual de las Cajas
        </h3>

        <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-5 flex items-center justify-center">
          <div className="w-full max-w-xl bg-white border-2 border-[#6F78DB] rounded-3xl p-4 text-[#1E1E24] shadow-xs">
            <span className="font-black text-xs uppercase block mb-3 px-3 py-1 bg-[#EEF2FF] text-[#4338CA] border border-[#6F78DB]/30 rounded-full w-fit">
              REALES (ℝ) - La Caja Mayor
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Q Branch */}
              <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-2xl p-3.5 text-[#1E1E24]">
                <span className="font-black text-xs uppercase block mb-2 text-[#92400E]">
                  RACIONALES (ℚ) - Fracciones
                </span>

                <div className="bg-[#E0F2FE] border-2 border-[#0EA5E9] rounded-xl p-2.5 my-1 text-[#1E1E24]">
                  <span className="font-black text-xs uppercase block mb-1 text-[#0369A1]">
                    ENTEROS (ℤ) - Con Cero y Negativos
                  </span>

                  <div className="bg-[#DCFCE7] text-[#166534] border-2 border-[#22C55E] rounded-lg p-2 text-center shadow-2xs">
                    <span className="font-black text-xs uppercase">
                      NATURALES (ℕ) - Conteo (≥ 1)
                    </span>
                  </div>
                </div>
              </div>

              {/* I Branch */}
              <div className="bg-[#FCE7F3] border-2 border-[#EC4899] rounded-2xl p-3.5 flex flex-col justify-between text-[#1E1E24]">
                <div>
                  <span className="font-black text-xs uppercase block text-[#9D174D] mb-1">
                    IRRACIONALES (I)
                  </span>
                  <p className="text-xs font-semibold text-[#831843] leading-relaxed">
                    Decimales infinitos no periódicos que jamás pueden convertirse en fracción.
                  </p>
                </div>
                <div className="mt-3 bg-white border border-[#EC4899]/30 rounded-xl p-2 text-center text-xs font-black text-[#9D174D]">
                  Ejemplos: π, e, √2, √3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
