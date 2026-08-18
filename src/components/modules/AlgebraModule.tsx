import React, { useState } from 'react';
import { Scale, MessageSquare, Sparkles } from 'lucide-react';
import { AlgebraBalanceWidget } from '../widgets/AlgebraBalanceWidget';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

export const AlgebraModule: React.FC = () => {
  const translations = [
    { text: 'Un número aumentado en 5', latex: 'x + 5' },
    { text: 'El doble de un número menos 3', latex: '2x - 3' },
    { text: 'La suma de dos números consecutivos', latex: 'x + (x + 1)' },
    { text: 'El triple del cuadrado de un número', latex: '3x^2' },
    { text: 'La mitad de la diferencia de dos números', latex: '\\frac{a - b}{2}' },
  ];

  const exponentRules = [
    { name: 'Producto de potencias de igual base', formula: 'x^a \\cdot x^b = x^{a+b}' },
    { name: 'Cociente de potencias de igual base', formula: '\\frac{x^a}{x^b} = x^{a-b}' },
    { name: 'Potencia de una potencia', formula: '(x^a)^b = x^{a \\cdot b}' },
    { name: 'Exponente negativo', formula: 'x^{-a} = \\frac{1}{x^a}' },
  ];

  const [selectedTransIdx, setSelectedTransIdx] = useState<number>(0);

  return (
    <div className="space-y-6 text-[#1E1E24] font-jakarta">
      {/* Title Banner */}
      <div className="bg-white border-2 border-[#1E1E24] rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] rounded-2xl shrink-0 shadow-2xs">
            <Scale className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1E1E24]">
              Módulo 5: "Álgebra para Bachillerato"
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#8A909F]">
              Traducción de lenguaje, leyes de exponentes y balanzas en equilibrio
            </p>
          </div>
        </div>
      </div>

      {/* Main Balance Scale & Notable Area Widget */}
      <AlgebraBalanceWidget />

      {/* Language Translator Showcase */}
      <div className="bg-white border-2 border-[#1E1E24] rounded-3xl p-6 shadow-xs">
        <h3 className="text-lg font-black text-[#1E1E24] uppercase mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#6F78DB]" /> Traductor de Lenguaje Común a Algebraico
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {translations.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playSound('click');
                  setSelectedTransIdx(idx);
                }}
                className={`w-full text-left p-3.5 border-2 rounded-2xl font-black text-xs cursor-pointer transition-all shadow-2xs ${
                  selectedTransIdx === idx
                    ? 'bg-[#6F78DB] text-white border-[#1E1E24]'
                    : 'bg-[#F8FAFC] text-[#1E1E24] border-[#1E1E24]/20 hover:border-[#1E1E24] hover:bg-white'
                }`}
              >
                {item.text}
              </button>
            ))}
          </div>

          <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xs">
            <span className="text-xs font-black uppercase text-[#8A909F] block mb-2">
              Traducción Simbólica Matemática:
            </span>
            <div className="px-6 py-4 bg-white border-2 border-[#1E1E24] rounded-2xl text-2xl font-black text-[#1E1E24] my-2 shadow-xs">
              <MathView latex={translations[selectedTransIdx].latex} />
            </div>
          </div>
        </div>
      </div>

      {/* Exponent Laws Cards */}
      <div className="bg-white border-2 border-[#1E1E24] rounded-3xl p-6 shadow-xs">
        <h3 className="text-lg font-black text-[#1E1E24] uppercase mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#F7CA38]" /> Leyes de los Exponentes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exponentRules.map((rule, idx) => (
            <div key={idx} className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-3.5 shadow-2xs">
              <span className="text-xs font-black text-[#1E1E24] block mb-1">{rule.name}</span>
              <div className="p-2.5 bg-white border border-[#1E1E24]/20 rounded-xl text-center font-bold text-sm text-[#1E1E24] shadow-2xs">
                <MathView latex={rule.formula} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
