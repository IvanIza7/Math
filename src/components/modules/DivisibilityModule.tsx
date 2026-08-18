import React from 'react';
import { Layers } from 'lucide-react';
import { DivisibilityTowersWidget } from '../widgets/DivisibilityTowersWidget';

export const DivisibilityModule: React.FC = () => {
  return (
    <div className="space-y-6 text-white">
      {/* Title Banner */}
      <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#BAFF29] text-gray-900 rounded-2xl shrink-0">
            <Layers className="w-8 h-8 text-gray-900" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Módulo 3: "Divisibilidad y Bloques"
            </h2>
            <p className="text-xs sm:text-sm font-bold text-gray-400">
              Torres de factores primos para dominar el MCD y el MCM
            </p>
          </div>
        </div>
      </div>

      {/* Factor Towers Widget */}
      <DivisibilityTowersWidget />

      {/* Rules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#1C1C1E] border border-[#2C2C30] border-t-4 border-t-[#BAFF29] rounded-2xl p-5 shadow-sm">
          <h4 className="text-sm font-black text-[#BAFF29] uppercase mb-2">
            🔑 Máximo Común Divisor (MCD)
          </h4>
          <p className="text-xs font-medium text-gray-300 leading-relaxed">
            Es el número más grande que divide exactamente a dos o más números. En tus torres modulares, equivale a los bloques primos que coinciden exactamente en ambas estructuras.
          </p>
        </div>

        <div className="bg-[#1C1C1E] border border-[#2C2C30] border-t-4 border-t-[#BAFF29] rounded-2xl p-5 shadow-sm">
          <h4 className="text-sm font-black text-[#BAFF29] uppercase mb-2">
            🚀 Mínimo Común Múltiplo (MCM)
          </h4>
          <p className="text-xs font-medium text-gray-300 leading-relaxed">
            Es el múltiplo positivo más pequeño que comparten dos o más números. Es la torre mínima requerida para alojar los factores de ambos números simultáneamente.
          </p>
        </div>
      </div>
    </div>
  );
};
