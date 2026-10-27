import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PieChart as PieIcon, Check, Info } from 'lucide-react';

interface PieChartGraphicProps {
  descuentoPercent: number;
  descuentoAngle: number;
  descuentoAmount: number;
  pagoPercent: number;
  pagoAngle: number;
  pagoAmount: number;
  totalAmount: number;
  title?: string;
  size?: number;
}

export const PieChartGraphic: React.FC<PieChartGraphicProps> = ({
  descuentoPercent,
  descuentoAngle,
  descuentoAmount,
  pagoPercent,
  pagoAngle,
  pagoAmount,
  totalAmount,
  size = 280,
}) => {
  const [activeSlice, setActiveSlice] = useState<'descuento' | 'pago' | null>(null);

  const radius = size * 0.42;
  const center = size / 2;

  // Helper function: Convert polar to cartesian coordinates
  // Start from top (-90 degrees)
  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  // Helper function to describe an SVG arc path
  const describeArc = (
    centerX: number,
    centerY: number,
    r: number,
    startAngle: number,
    endAngle: number
  ) => {
    // If arc is full circle (or almost full)
    const span = endAngle - startAngle;
    if (span >= 359.99) {
      return `M ${centerX} ${centerY - r} A ${r} ${r} 0 1 0 ${centerX} ${centerY + r} A ${r} ${r} 0 1 0 ${centerX} ${centerY - r} Z`;
    }

    const start = polarToCartesian(centerX, centerY, r, endAngle);
    const end = polarToCartesian(centerX, centerY, r, startAngle);
    const largeArcFlag = span <= 180 ? '0' : '1';

    return [
      `M ${centerX} ${centerY}`,
      `L ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      'Z',
    ].join(' ');
  };

  // Sector 1: Descuento (0° to descuentoAngle)
  const dPath = describeArc(center, center, radius, 0, descuentoAngle);
  // Sector 2: Importe Pagado (descuentoAngle to 360°)
  const pPath = describeArc(center, center, radius, descuentoAngle, 360);

  // Mid-angle points for labels if needed
  const dMidAngle = descuentoAngle / 2;
  const pMidAngle = descuentoAngle + (360 - descuentoAngle) / 2;
  const dLabelPos = polarToCartesian(center, center, radius * 0.65, dMidAngle);
  const pLabelPos = polarToCartesian(center, center, radius * 0.65, pMidAngle);

  return (
    <div className="flex flex-col items-center select-none">
      {/* SVG Container */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-md overflow-visible"
        >
          {/* Base border background */}
          <circle
            cx={center}
            cy={center}
            r={radius + 3}
            fill="none"
            stroke="#1E1E24"
            strokeWidth="3"
          />

          {/* Sector: Importe Pagado */}
          <motion.path
            d={pPath}
            fill="#3B82F6"
            stroke="#1E1E24"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="cursor-pointer transition-colors"
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => setActiveSlice('pago')}
            onMouseLeave={() => setActiveSlice(null)}
          />

          {/* Sector: Descuento */}
          <motion.path
            d={dPath}
            fill="#EC4899"
            stroke="#1E1E24"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="cursor-pointer transition-colors"
            whileHover={{ scale: 1.04 }}
            onMouseEnter={() => setActiveSlice('descuento')}
            onMouseLeave={() => setActiveSlice(null)}
          />

          {/* Labels on Slices (only if space permits) */}
          {descuentoAngle >= 25 && (
            <text
              x={dLabelPos.x}
              y={dLabelPos.y}
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              textAnchor="middle"
              dominantBaseline="central"
              className="pointer-events-none drop-shadow-sm font-jakarta"
            >
              {descuentoPercent}%
            </text>
          )}

          {pagoAngle >= 35 && (
            <text
              x={pLabelPos.x}
              y={pLabelPos.y}
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="900"
              textAnchor="middle"
              dominantBaseline="central"
              className="pointer-events-none drop-shadow-sm font-jakarta"
            >
              {pagoPercent}%
            </text>
          )}

          {/* Center Pin */}
          <circle
            cx={center}
            cy={center}
            r="8"
            fill="#1E1E24"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
        </svg>

        {/* Hover Floating Details Card */}
        {activeSlice && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-white dark:bg-slate-900 border-2 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] rounded-xl px-3 py-1.5 text-center z-20">
            {activeSlice === 'descuento' ? (
              <div>
                <p className="text-[10px] font-black uppercase text-[#EC4899]">Descuento</p>
                <p className="text-sm font-black text-[#1E1E24] dark:text-white">
                  ${descuentoAmount.toFixed(2)}
                </p>
                <p className="text-[10px] font-bold text-gray-500">
                  {descuentoPercent}% · {descuentoAngle}°
                </p>
              </div>
            ) : (
              <div>
                <p className="text-[10px] font-black uppercase text-[#3B82F6]">Importe Pagado</p>
                <p className="text-sm font-black text-[#1E1E24] dark:text-white">
                  ${pagoAmount.toFixed(2)}
                </p>
                <p className="text-[10px] font-bold text-gray-500">
                  {pagoPercent}% · {pagoAngle}°
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend & Details */}
      <div className="mt-4 w-full max-w-sm space-y-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Descuento Item */}
          <div
            onMouseEnter={() => setActiveSlice('descuento')}
            onMouseLeave={() => setActiveSlice(null)}
            className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
              activeSlice === 'descuento'
                ? 'border-[#EC4899] bg-[#FDF2F8] dark:bg-[#EC4899]/10 shadow-[2px_2px_0px_0px_#EC4899]'
                : 'border-[#1E1E24]/20 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#EC4899] border border-[#1E1E24] shrink-0" />
              <span className="font-black text-[#1E1E24] dark:text-white uppercase tracking-wider text-[11px]">
                Descuento
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-extrabold text-[#EC4899]">{descuentoPercent}%</span>
              <span className="font-bold text-gray-600 dark:text-gray-300">${descuentoAmount.toFixed(2)}</span>
            </div>
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mt-0.5">
              Ángulo: <span className="font-black text-[#1E1E24] dark:text-white">{descuentoAngle}°</span>
            </p>
          </div>

          {/* Importe Pagado Item */}
          <div
            onMouseEnter={() => setActiveSlice('pago')}
            onMouseLeave={() => setActiveSlice(null)}
            className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
              activeSlice === 'pago'
                ? 'border-[#3B82F6] bg-blue-50 dark:bg-blue-900/20 shadow-[2px_2px_0px_0px_#3B82F6]'
                : 'border-[#1E1E24]/20 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#3B82F6] border border-[#1E1E24] shrink-0" />
              <span className="font-black text-[#1E1E24] dark:text-white uppercase tracking-wider text-[11px]">
                Importe Pagado
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-extrabold text-[#3B82F6]">{pagoPercent}%</span>
              <span className="font-bold text-gray-600 dark:text-gray-300">${pagoAmount.toFixed(2)}</span>
            </div>
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mt-0.5">
              Ángulo: <span className="font-black text-[#1E1E24] dark:text-white">{pagoAngle}°</span>
            </p>
          </div>
        </div>

        {/* Angular Check Badge */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-[11px]">
          <span className="font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-600" /> Comprobación angular:
          </span>
          <span className="font-black text-slate-800 dark:text-slate-100">
            {descuentoAngle}° + {pagoAngle}° = 360°
          </span>
        </div>
      </div>
    </div>
  );
};
