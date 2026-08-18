import React from 'react';
import { Search, Eye, Sparkles } from 'lucide-react';
import { InvisibleScrewdriverWidget } from '../widgets/InvisibleScrewdriverWidget';

export const InvisibleMathModule: React.FC = () => {
  return (
    <div className="space-y-6 text-white">
      {/* Title Banner */}
      <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#BAFF29] text-gray-900 rounded-2xl shrink-0">
            <Search className="w-8 h-8 text-gray-900" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Módulo 1: "Lo Invisible en Mates"
            </h2>
            <p className="text-xs sm:text-sm font-bold text-gray-400">
              Aprende a ver los multiplicadores (-1), exponentes 1 y denominadores 1 ocultos
            </p>
          </div>
        </div>
      </div>

      {/* Main Screwdriver Widget */}
      <InvisibleScrewdriverWidget />

      {/* Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1C1C1E] border border-[#2C2C30] border-t-4 border-t-[#BAFF29] rounded-2xl p-5 shadow-sm">
          <h4 className="text-sm font-black text-[#BAFF29] uppercase mb-2 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#BAFF29]" /> El Coeficiente (-1)
          </h4>
          <p className="text-xs font-medium text-gray-300 leading-relaxed">
            Cuando ves un signo menos suelto como <code>-x</code> o <code>-4</code>, en realidad hay un multiplicador <code>(-1)</code> oculto esperando ser operado.
          </p>
        </div>

        <div className="bg-[#1C1C1E] border border-[#2C2C30] border-t-4 border-t-[#BAFF29] rounded-2xl p-5 shadow-sm">
          <h4 className="text-sm font-black text-[#BAFF29] uppercase mb-2 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#BAFF29]" /> El Exponente 1
          </h4>
          <p className="text-xs font-medium text-gray-300 leading-relaxed">
            Cualquier número o variable sin exponente visible tiene exponente 1. Por ejemplo, <code>x¹ = x</code> y <code>5¹ = 5</code>.
          </p>
        </div>

        <div className="bg-[#1C1C1E] border border-[#2C2C30] border-t-4 border-t-[#BAFF29] rounded-2xl p-5 shadow-sm">
          <h4 className="text-sm font-black text-[#BAFF29] uppercase mb-2 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#BAFF29]" /> El Denominador 1
          </h4>
          <p className="text-xs font-medium text-gray-300 leading-relaxed">
            Todo entero se puede escribir como fracción sobre 1. Por ejemplo, <code>8 = 8 / 1</code>. ¡Te servirá para multiplicar fracciones!
          </p>
        </div>
      </div>
    </div>
  );
};
