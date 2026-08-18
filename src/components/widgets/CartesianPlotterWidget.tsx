import React, { useState } from 'react';
import { Compass, Sparkles, Move, Target } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

interface CartesianPlotterWidgetProps {
  onAwardXp?: (amount: number) => void;
}

export const CartesianPlotterWidget: React.FC<CartesianPlotterWidgetProps> = ({ onAwardXp }) => {
  const [pointX, setPointX] = useState<number>(3);
  const [pointY, setPointY] = useState<number>(4);
  const [selectedPointTarget, setSelectedPointTarget] = useState<{ x: number; y: number } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const getQuadrant = (x: number, y: number): string => {
    if (x > 0 && y > 0) return 'Cuadrante I (+, +)';
    if (x < 0 && y > 0) return 'Cuadrante II (-, +)';
    if (x < 0 && y < 0) return 'Cuadrante III (-, -)';
    if (x > 0 && y < 0) return 'Cuadrante IV (+, -)';
    if (x === 0 && y === 0) return 'Origen (0, 0)';
    if (x === 0) return 'Eje Y (Ordenadas)';
    return 'Eje X (Abscisas)';
  };

  const distanceToOrigin = Math.sqrt(pointX * pointX + pointY * pointY).toFixed(2);

  const handleRandomChallenge = () => {
    playSound('click');
    const targetX = Math.floor(Math.random() * 9) - 4; // -4 to 4
    const targetY = Math.floor(Math.random() * 9) - 4;
    setSelectedPointTarget({ x: targetX, y: targetY });
    setFeedback(`Ubica el punto objetivo: P(${targetX}, ${targetY})`);
  };

  const handleCheckTarget = () => {
    if (!selectedPointTarget) return;
    if (pointX === selectedPointTarget.x && pointY === selectedPointTarget.y) {
      playSound('correct');
      setScore((prev) => prev + 1);
      if (onAwardXp) onAwardXp(100);
      setFeedback('¡CORRECTO! +100 XP por ubicar las coordenadas exactas.');
      setSelectedPointTarget(null);
    } else {
      playSound('error');
      setFeedback(`Aún no estás ahí. Mueve X a ${selectedPointTarget.x} e Y a ${selectedPointTarget.y}.`);
    }
  };

  return (
    <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-3xl p-5 text-white shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#2C2C30]">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#38B6FF] border border-[#2C2C30] rounded-xl text-gray-900">
            <Compass className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-tight">
              Plano Cartesiano Dinámico (VOL-03)
            </h3>
            <p className="text-xs font-bold text-gray-400">
              Coordenadas P(x, y), Cuadrantes y Distancia al Origen
            </p>
          </div>
        </div>

        <button
          onClick={handleRandomChallenge}
          className="px-3.5 py-1.5 bg-[#BAFF29] hover:bg-[#a3e61c] text-gray-900 font-black text-xs uppercase rounded-xl pill-btn cursor-pointer flex items-center gap-1.5 shadow-xs"
        >
          <Target className="w-3.5 h-3.5" />
          <span>Nuevo Reto P(x,y)</span>
        </button>
      </div>

      {/* Sliders for X and Y */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-[#121214] p-3 border border-[#2C2C30] rounded-2xl space-y-1">
          <div className="flex justify-between text-xs font-black">
            <span className="text-gray-300 uppercase">Eje X (Abscisa):</span>
            <span className="text-[#38B6FF] font-black font-mono text-sm">{pointX}</span>
          </div>
          <input
            type="range"
            min="-5"
            max="5"
            value={pointX}
            onChange={(e) => {
              playSound('click');
              setPointX(Number(e.target.value));
            }}
            className="w-full accent-[#38B6FF] cursor-pointer"
          />
        </div>

        <div className="bg-[#121214] p-3 border border-[#2C2C30] rounded-2xl space-y-1">
          <div className="flex justify-between text-xs font-black">
            <span className="text-gray-300 uppercase">Eje Y (Ordenada):</span>
            <span className="text-[#BAFF29] font-black font-mono text-sm">{pointY}</span>
          </div>
          <input
            type="range"
            min="-5"
            max="5"
            value={pointY}
            onChange={(e) => {
              playSound('click');
              setPointY(Number(e.target.value));
            }}
            className="w-full accent-[#BAFF29] cursor-pointer"
          />
        </div>
      </div>

      {/* Coordinate Canvas */}
      <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[220px]">
        {/* Grid Display */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 border border-[#2C2C30] bg-[#18181B] rounded-xl flex items-center justify-center overflow-hidden">
          {/* Axis X and Y */}
          <div className="absolute w-full h-0.5 bg-gray-500 top-1/2 -translate-y-1/2" />
          <div className="absolute h-full w-0.5 bg-gray-500 left-1/2 -translate-x-1/2" />

          {/* Target Point if active */}
          {selectedPointTarget && (
            <div
              className="absolute w-4 h-4 bg-amber-400 rounded-full border-2 border-white animate-ping"
              style={{
                left: `${50 + (selectedPointTarget.x / 5) * 40}%`,
                top: `${50 - (selectedPointTarget.y / 5) * 40}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}

          {/* Current Point Marker */}
          <div
            className="absolute w-5 h-5 bg-[#BAFF29] rounded-full border-2 border-gray-900 shadow-lg transition-all duration-200 flex items-center justify-center text-[8px] font-black text-gray-900"
            style={{
              left: `${50 + (pointX / 5) * 40}%`,
              top: `${50 - (pointY / 5) * 40}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            P
          </div>
        </div>

        {/* Current State Info */}
        <div className="mt-3 text-center space-y-1 w-full overflow-hidden">
          <div className="inline-block max-w-full overflow-x-auto px-3 py-1.5 bg-[#1C1C1E] border border-[#BAFF29] rounded-xl text-xs sm:text-base font-black text-[#BAFF29] font-mono shadow-xs scrollbar-none">
            <MathView latex={`P(${pointX}, ${pointY}) \\implies d = \\sqrt{${pointX}^2 + ${pointY}^2} = ${distanceToOrigin}`} />
          </div>
          <p className="text-xs font-bold text-gray-300 uppercase">
            Ubicación: <span className="text-white font-black">{getQuadrant(pointX, pointY)}</span>
          </p>
        </div>
      </div>

      {/* Challenge Feedback Box */}
      {selectedPointTarget && (
        <div className="bg-[#121214] border border-[#2C2C30] p-3 rounded-2xl flex items-center justify-between">
          <p className="text-xs font-bold text-amber-300">{feedback}</p>
          <button
            onClick={handleCheckTarget}
            className="px-3 py-1 bg-[#BAFF29] text-gray-900 font-black text-xs uppercase rounded-xl pill-btn cursor-pointer"
          >
            Verificar P(x,y)
          </button>
        </div>
      )}

      {/* Insight */}
      <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-3 text-xs font-medium text-gray-300 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#BAFF29] shrink-0" />
        <p>
          En el Plano Cartesiano, el primer número <strong className="text-[#38B6FF]">x</strong> indica el avance horizontal y el segundo <strong className="text-[#BAFF29]">y</strong> el vertical.
        </p>
      </div>
    </div>
  );
};
