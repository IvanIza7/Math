import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, Sparkles } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

export const DistributiveAreaWidget: React.FC = () => {
  const [a, setA] = useState<number>(3);
  const [b, setB] = useState<number>(4);
  const [c, setC] = useState<number>(2);

  const abArea = a * b;
  const acArea = a * c;
  const totalArea = abArea + acArea;

  return (
    <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-3xl p-5 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2C2C30]">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#FF5757] border border-[#2C2C30] rounded-xl text-white">
            <LayoutGrid className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Modelo Geométrico de Área (Propiedad Distributiva)
            </h3>
            <p className="text-xs font-bold text-gray-400">
              Demostración visual de por qué <MathView latex="a(b + c) = ab + ac" inline />
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-[#BAFF29] border border-[#2C2C30] rounded-xl font-black text-xs text-gray-900">
          Modelado Interactivo
        </span>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#121214] p-3 border border-[#2C2C30] rounded-2xl">
          <label className="text-xs font-black text-gray-300 block mb-1 flex justify-between">
            <span>Ancho (a):</span>
            <span className="text-[#FF5757] font-extrabold">{a}</span>
          </label>
          <input
            type="range"
            min="1"
            max="6"
            value={a}
            onChange={(e) => {
              playSound('click');
              setA(Number(e.target.value));
            }}
            className="w-full accent-[#FF5757] cursor-pointer"
          />
        </div>

        <div className="bg-[#121214] p-3 border border-[#2C2C30] rounded-2xl">
          <label className="text-xs font-black text-gray-300 block mb-1 flex justify-between">
            <span>Alto Sub-Bloque 1 (b):</span>
            <span className="text-[#38B6FF] font-extrabold">{b}</span>
          </label>
          <input
            type="range"
            min="1"
            max="6"
            value={b}
            onChange={(e) => {
              playSound('click');
              setB(Number(e.target.value));
            }}
            className="w-full accent-[#38B6FF] cursor-pointer"
          />
        </div>

        <div className="bg-[#121214] p-3 border border-[#2C2C30] rounded-2xl">
          <label className="text-xs font-black text-gray-300 block mb-1 flex justify-between">
            <span>Alto Sub-Bloque 2 (c):</span>
            <span className="text-[#BAFF29] font-extrabold">{c}</span>
          </label>
          <input
            type="range"
            min="1"
            max="6"
            value={c}
            onChange={(e) => {
              playSound('click');
              setC(Number(e.target.value));
            }}
            className="w-full accent-[#BAFF29] cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Area Canvas */}
      <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-6 flex flex-col items-center justify-center mb-6 overflow-x-auto min-h-[220px]">
        <div className="text-center mb-3">
          <span className="text-sm font-black text-[#BAFF29] bg-[#1C1C1E] px-3 py-1 border border-[#BAFF29] rounded-xl inline-block mb-1">
            <MathView latex={`${a} \\cdot (${b} + ${c}) = ${a} \\cdot ${b} + ${a} \\cdot ${c}`} />
          </span>
        </div>

        {/* Modular Rectangles Grid Display */}
        <div className="flex gap-2 items-center justify-center">
          {/* Sub block 1: a x b */}
          <motion.div
            layout
            className="bg-[#38B6FF] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-center justify-center shadow-md text-gray-900 font-black"
            style={{
              width: `${Math.max(90, a * 24)}px`,
              height: `${Math.max(70, b * 22)}px`,
            }}
          >
            <span className="text-xs font-black uppercase text-gray-900">
              Bloque 1 ({a}×{b})
            </span>
            <span className="text-lg font-black text-gray-900 bg-[#FFDE59] px-2 py-0.5 rounded-lg border border-[#2C2C30] mt-1">
              Área = {abArea}
            </span>
          </motion.div>

          <span className="text-2xl font-black text-white">+</span>

          {/* Sub block 2: a x c */}
          <motion.div
            layout
            className="bg-[#BAFF29] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-center justify-center shadow-md text-gray-900 font-black"
            style={{
              width: `${Math.max(90, a * 24)}px`,
              height: `${Math.max(70, c * 22)}px`,
            }}
          >
            <span className="text-xs font-black uppercase text-gray-900">
              Bloque 2 ({a}×{c})
            </span>
            <span className="text-lg font-black text-gray-900 bg-white px-2 py-0.5 rounded-lg border border-[#2C2C30] mt-1">
              Área = {acArea}
            </span>
          </motion.div>

          <span className="text-2xl font-black text-white">=</span>

          {/* Total Combined Rectangle */}
          <motion.div
            layout
            className="bg-[#FFDE59] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-center justify-center shadow-md text-gray-900 font-black"
            style={{
              width: `${Math.max(90, a * 24)}px`,
              height: `${Math.max(100, (b + c) * 18)}px`,
            }}
          >
            <span className="text-xs font-black uppercase text-gray-900">
              Área Total {a}×({b}+{c})
            </span>
            <span className="text-xl font-black text-white bg-[#FF5757] px-3 py-1 rounded-xl border border-[#2C2C30] mt-1">
              {totalArea}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-2xl p-3 text-xs font-medium text-gray-300 flex items-start gap-2">
        <Sparkles className="w-5 h-5 text-[#BAFF29] shrink-0 mt-0.5" />
        <p>
          ¡El área no miente! Al multiplicar <MathView latex="a" inline /> por la suma <MathView latex="(b+c)" inline />, estás sumando exactamente el área de dos bloques de construcción rectangulares. ¡Por eso <MathView latex="a(b+c) = ab + ac" inline /> siempre se cumple!
        </p>
      </div>
    </div>
  );
};
