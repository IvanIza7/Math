import React, { useState } from 'react';
import { Triangle, Sparkles, RotateCw, CheckCircle2 } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

interface TrigCircleWidgetProps {
  onAwardXp?: (amount: number) => void;
}

export const TrigCircleWidget: React.FC<TrigCircleWidgetProps> = ({ onAwardXp }) => {
  const [angleDeg, setAngleDeg] = useState<number>(45);

  const angleRad = (angleDeg * Math.PI) / 180;
  const sinVal = Math.sin(angleRad).toFixed(3);
  const cosVal = Math.cos(angleRad).toFixed(3);
  const tanVal = angleDeg === 90 ? 'Indefinido' : Math.tan(angleRad).toFixed(3);

  const notableAngles = [0, 30, 45, 60, 90, 180, 270, 360];

  return (
    <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-3xl p-5 text-white shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#2C2C30]">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#BAFF29] border border-[#2C2C30] rounded-xl text-gray-900">
            <Triangle className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-tight">
              Círculo Unitario & Razones (VOL-05)
            </h3>
            <p className="text-xs font-bold text-gray-400">
              Seno, Coseno y Tangente con Ángulos Notables
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-[#121214] border border-[#2C2C30] text-[#BAFF29] font-black text-xs uppercase rounded-xl">
          θ = {angleDeg}°
        </span>
      </div>

      {/* Notable Angle Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-black uppercase text-gray-400 shrink-0 mr-1">
          Ángulos Notables:
        </span>
        {notableAngles.map((ang) => (
          <button
            key={ang}
            onClick={() => {
              playSound('click');
              setAngleDeg(ang);
            }}
            className={`px-2.5 py-1 text-xs font-black rounded-xl cursor-pointer border transition-all ${
              angleDeg === ang
                ? 'bg-[#BAFF29] text-gray-900 border-[#BAFF29] shadow-xs'
                : 'bg-[#121214] text-gray-300 border-[#2C2C30] hover:text-white'
            }`}
          >
            {ang}°
          </button>
        ))}
      </div>

      {/* Slider for custom angle */}
      <div className="bg-[#121214] p-3 border border-[#2C2C30] rounded-2xl space-y-1">
        <div className="flex justify-between text-xs font-black">
          <span className="text-gray-300 uppercase">Ajustar Ángulo θ:</span>
          <span className="text-[#BAFF29] font-mono text-sm">{angleDeg}° ({((angleDeg * Math.PI) / 180).toFixed(2)} rad)</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          step="5"
          value={angleDeg}
          onChange={(e) => {
            playSound('click');
            setAngleDeg(Number(e.target.value));
          }}
          className="w-full accent-[#BAFF29] cursor-pointer"
        />
      </div>

      {/* Visual Unit Circle Canvas */}
      <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[220px]">
        {/* Circle Graphic */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 border-2 border-[#38B6FF] rounded-full bg-[#18181B] flex items-center justify-center">
          {/* Axis */}
          <div className="absolute w-full h-0.5 bg-gray-600 top-1/2 -translate-y-1/2" />
          <div className="absolute h-full w-0.5 bg-gray-600 left-1/2 -translate-x-1/2" />

          {/* Hypotenuse radius vector */}
          <div
            className="absolute h-0.5 bg-[#BAFF29] origin-left transition-all duration-200"
            style={{
              width: '50%',
              left: '50%',
              top: '50%',
              transform: `rotate(${-angleDeg}deg)`,
            }}
          />

          {/* Point on circle */}
          <div
            className="absolute w-4 h-4 bg-[#BAFF29] rounded-full border-2 border-gray-900 shadow-lg"
            style={{
              left: `${50 + 50 * Math.cos(angleRad)}%`,
              top: `${50 - 50 * Math.sin(angleRad)}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        {/* Calculated Values Table */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 w-full mt-4">
          <div className="p-2.5 bg-[#1C1C1E] border border-[#2C2C30] rounded-xl text-center overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-black uppercase text-gray-400 block">Seno (Y)</span>
            <span className="text-xs sm:text-sm font-black text-[#BAFF29] font-mono">
              <MathView latex={`\\sin(${angleDeg}^\\circ) = ${sinVal}`} />
            </span>
          </div>

          <div className="p-2.5 bg-[#1C1C1E] border border-[#2C2C30] rounded-xl text-center overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-black uppercase text-gray-400 block">Coseno (X)</span>
            <span className="text-xs sm:text-sm font-black text-[#38B6FF] font-mono">
              <MathView latex={`\\cos(${angleDeg}^\\circ) = ${cosVal}`} />
            </span>
          </div>

          <div className="p-2.5 bg-[#1C1C1E] border border-[#2C2C30] rounded-xl text-center overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-black uppercase text-gray-400 block">Tangente</span>
            <span className="text-xs sm:text-sm font-black text-[#FFDE59] font-mono">
              <MathView latex={`\\tan(${angleDeg}^\\circ) = ${tanVal}`} />
            </span>
          </div>
        </div>
      </div>

      {/* Golden Trick Banner */}
      <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-3 text-xs font-medium text-gray-300 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#BAFF29] shrink-0" />
        <p>
          En el círculo unitario de radio r = 1, la coordenada <strong className="text-[#38B6FF]">X es el Coseno</strong> y la coordenada <strong className="text-[#BAFF29]">Y es el Seno</strong>. ¡Así de directo!
        </p>
      </div>
    </div>
  );
};
