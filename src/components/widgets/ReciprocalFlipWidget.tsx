import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

export const ReciprocalFlipWidget: React.FC = () => {
  const [num, setNum] = useState<number>(3);
  const [den, setDen] = useState<number>(4);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlip = () => {
    playSound('flip');
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-3xl p-5 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2C2C30]">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#93E1FF] border border-[#2C2C30] rounded-xl text-gray-900">
            <RotateCcw className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Recíproco e Inverso Multiplicativo (El Bloque Invertido)
            </h3>
            <p className="text-xs font-bold text-gray-400">
              Demostración visual de por qué <MathView latex="\frac{a}{b} \cdot \frac{b}{a} = 1" inline />
            </p>
          </div>
        </div>

        <button
          onClick={handleFlip}
          className="px-3.5 py-2 bg-[#BAFF29] text-gray-900 font-black text-xs uppercase border border-[#2C2C30] rounded-xl pill-btn cursor-pointer flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4 text-gray-900" />
          Voltear Bloque (Girar)
        </button>
      </div>

      {/* Sliders to choose numerator and denominator */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#121214] p-3 border border-[#2C2C30] rounded-2xl">
          <label className="text-xs font-black text-gray-300 block mb-1 flex justify-between">
            <span>Numerador (a):</span>
            <span className="text-[#38B6FF] font-extrabold">{num}</span>
          </label>
          <input
            type="range"
            min="1"
            max="9"
            value={num}
            onChange={(e) => {
              playSound('click');
              setNum(Number(e.target.value));
            }}
            className="w-full accent-[#38B6FF] cursor-pointer"
          />
        </div>

        <div className="bg-[#121214] p-3 border border-[#2C2C30] rounded-2xl">
          <label className="text-xs font-black text-gray-300 block mb-1 flex justify-between">
            <span>Denominador (b):</span>
            <span className="text-[#BAFF29] font-extrabold">{den}</span>
          </label>
          <input
            type="range"
            min="1"
            max="9"
            value={den}
            onChange={(e) => {
              playSound('click');
              setDen(Number(e.target.value));
            }}
            className="w-full accent-[#BAFF29] cursor-pointer"
          />
        </div>
      </div>

      {/* Flipping Blocks Area */}
      <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-6 flex flex-col items-center justify-center mb-6">
        <div className="flex items-center gap-4 flex-wrap justify-center my-4">
          {/* Original Block */}
          <div className="bg-[#38B6FF] border border-[#2C2C30] rounded-2xl p-4 text-center shadow-md w-28 h-28 flex flex-col justify-center items-center">
            <span className="text-xs font-black text-gray-900 block uppercase">Bloque A</span>
            <span className="text-2xl font-black text-gray-900">
              <MathView latex={`\\frac{${num}}{${den}}`} />
            </span>
          </div>

          <span className="text-3xl font-black text-white">×</span>

          {/* Flipped Reciprocal Block */}
          <motion.div
            animate={{ rotateX: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#BAFF29] border border-[#2C2C30] rounded-2xl p-4 text-center shadow-md w-28 h-28 flex flex-col justify-center items-center cursor-pointer"
            onClick={handleFlip}
          >
            <span className="text-xs font-black text-gray-900 block uppercase">
              {isFlipped ? '¡Recíproco!' : 'Toca p/ girar'}
            </span>
            <span
              className="text-2xl font-black text-gray-900"
              style={{ transform: isFlipped ? 'rotateX(180deg)' : 'none' }}
            >
              <MathView latex={`\\frac{${den}}{${num}}`} />
            </span>
          </motion.div>

          <span className="text-3xl font-black text-white">=</span>

          {/* Result Block = 1 */}
          <div className="bg-[#FFDE59] border border-[#2C2C30] rounded-2xl p-4 text-center shadow-md w-28 h-28 flex flex-col justify-center items-center">
            <span className="text-xs font-black text-gray-900 block uppercase">Resultado</span>
            <span className="text-2xl font-black text-gray-900">
              <MathView latex={`\\frac{${num * den}}{${num * den}} = 1`} />
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-3 text-xs font-medium text-gray-300 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[#BAFF29] shrink-0" />
        <p>
          ¡Invertir la posición numéricamente es como girar una ficha de encaje modular! Al multiplicar cualquier fracción por su recíproco, el numerador y denominador se cancelan dejando exactamente el neutro multiplicativo <strong className="text-[#BAFF29]">1</strong>.
        </p>
      </div>
    </div>
  );
};
