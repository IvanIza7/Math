import React from 'react';
import { ShieldCheck, BookMarked } from 'lucide-react';
import { REAL_NUMBER_PROPERTIES } from '../../data/arsenal';
import { MathView } from '../../utils/math';
import { DistributiveAreaWidget } from '../widgets/DistributiveAreaWidget';
import { ReciprocalFlipWidget } from '../widgets/ReciprocalFlipWidget';

export const ArsenalModule: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-[#FFDE59] text-black border-4 border-black rounded-3xl p-6 brutal-shadow-lg lego-studs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white border-3 border-black rounded-2xl brutal-shadow-sm">
            <ShieldCheck className="w-8 h-8 text-black" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
              Módulo 4: "El Arsenal de los Números Reales"
            </h2>
            <p className="text-xs sm:text-sm font-bold text-gray-800">
              Las 6 Reglas inviolables que rigen todo el álgebra de bachillerato
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Manipulable Widgets */}
      <DistributiveAreaWidget />
      <ReciprocalFlipWidget />

      {/* Property Cards Grid */}
      <div className="bg-white border-4 border-black rounded-3xl p-6 brutal-shadow-lg lego-studs">
        <h3 className="text-lg font-black text-black uppercase mb-4 flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-[#38B6FF]" /> Catálogo Completo de Propiedades
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REAL_NUMBER_PROPERTIES.map((prop) => (
            <div
              key={prop.id}
              className="bg-[#FAF6EE] border-3 border-black rounded-2xl p-4 brutal-shadow flex flex-col justify-between"
              style={{ borderTopWidth: '8px', borderTopColor: prop.color }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded-md border border-black bg-white text-black">
                    {prop.category}
                  </span>
                  <span className="text-xs font-mono font-black text-gray-600">
                    {prop.shortCode}
                  </span>
                </div>

                <h4 className="text-base font-black text-black mb-1">{prop.name}</h4>

                <div className="my-2 p-2.5 bg-white border-2 border-black rounded-xl text-center font-bold text-base text-black">
                  <MathView latex={prop.latexFormula} />
                </div>

                <p className="text-xs font-extrabold text-gray-700 leading-relaxed mb-2">
                  {prop.description}
                </p>
              </div>

              <div className="p-2 bg-[#FFDE59]/30 border border-black rounded-xl text-[11px] font-bold text-black">
                💡 Ejemplo: <MathView latex={prop.visualExample} inline />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
