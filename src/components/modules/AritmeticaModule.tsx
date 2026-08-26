import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, ChevronDown, Globe, BookOpen, Zap, Hash } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

export const ClasificacionNumerosModule: React.FC = () => {
  const [activeSet, setActiveSet] = useState<'racionales' | 'irracionales'>('racionales');
  const [openConcept, setOpenConcept] = useState<string | null>(null);

  const toggleConcept = (key: string) => {
    playSound('click');
    setOpenConcept(openConcept === key ? null : key);
  };

  return (
    <div className="space-y-6">

      {/* CARD 1: El Mapa de los Números Reales */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#00e676] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            El Mapa de los Números Reales
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Los Números Reales (<strong>ℝ</strong>) se dividen en dos grandes familias: los <strong>Racionales</strong> y los <strong>Irracionales</strong>.
        </p>

        {/* Selector */}
        <div className="flex gap-2 mb-4">
          {([
            { key: 'racionales', label: 'ℚ Racionales' },
            { key: 'irracionales', label: '𝕀 Irracionales' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => { playSound('tap'); setActiveSet(tab.key); }}
              className={`flex-1 py-2.5 rounded-xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeSet === tab.key
                  ? 'bg-[#1E1E24] text-white border-[#1E1E24] shadow-sm'
                  : 'bg-[#f8faf9] border-[#1E1E24]/20 text-[#1E1E24]/60 hover:border-[#1E1E24]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeSet === 'racionales' && (
            <motion.div key="racionales" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
              <p className="text-sm font-bold text-[#1E1E24]/80 mb-3">
                Todo número que se puede escribir como fracción <MathView latex="\frac{a}{b}" inline /> (con <MathView latex="b \neq 0" inline />).
              </p>
              <div className="bg-[#1E1E24] rounded-xl p-4 font-mono text-xs leading-relaxed space-y-1">
                <div className="text-[#38bdf8] font-black">├── ℤ Enteros</div>
                <div className="text-white/80 pl-4">│ ├── ℕ Naturales (contar): <span className="text-[#00e676]">0, 1, 2, 3…</span></div>
                <div className="text-white/80 pl-4">│ └── Negativos: <span className="text-[#EF4444]">-1, -2, -3…</span></div>
                <div className="text-[#F7CA38] font-black">└── Fraccionarios</div>
                <div className="text-white/80 pl-4">├── Fracciones comunes: <span className="text-[#F7CA38]">3/5, -1/2, 2/7</span></div>
                <div className="text-white/80 pl-4">└── Decimales:</div>
                <div className="text-white/60 pl-8">├── Finitos: 0.8, 0.125</div>
                <div className="text-white/60 pl-8">└── Periódicos: 0.333… (1/3)</div>
              </div>
            </motion.div>
          )}
          {activeSet === 'irracionales' && (
            <motion.div key="irracionales" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
              <p className="text-sm font-bold text-[#1E1E24]/80 mb-3">
                Decimales infinitos que <strong>no tienen patrón</strong> ni se pueden expresar como fracción.
              </p>
              <div className="grid gap-2">
                <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-3">
                  <div className="text-xs font-black text-[#1E1E24]/50 uppercase mb-1">Raíces no exactas</div>
                  <div className="font-bold text-sm text-[#1E1E24]">
                    <MathView latex="\sqrt{2} \approx 1.4142\dots \qquad \sqrt{3} \approx 1.7320\dots" inline />
                  </div>
                </div>
                <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-3">
                  <div className="text-xs font-black text-[#1E1E24]/50 uppercase mb-1">Constantes trascendentes</div>
                  <div className="font-bold text-sm text-[#1E1E24]">
                    <MathView latex="\pi \approx 3.14159\dots \qquad e \approx 2.71828\dots" inline />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CARD 2: Tablero de Valor Posicional */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#38bdf8] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Hash className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            Tablero de Valor Posicional
          </h2>
        </div>

        <div className="bg-[#1E1E24] text-white text-center rounded-xl p-3 mb-4 font-black text-base tracking-widest">
          3 000 785 199 . 79
        </div>

        <div className="grid gap-2">
          {[
            { clase: 'Miles de Millón', orden: 'Unidades de millar de millón', cifra: '3', color: '#6F78DB' },
            { clase: 'Millones', orden: 'Centenas, decenas, unidades de millón', cifra: '000', color: '#38bdf8' },
            { clase: 'Millares', orden: 'Centenas, decenas, unidades de millar', cifra: '785', color: '#22C55E' },
            { clase: 'Unidades', orden: 'Centenas, decenas, unidades', cifra: '199', color: '#F7CA38' },
            { clase: 'Punto', orden: 'Separador decimal', cifra: '.', color: '#1E1E24' },
            { clase: 'Decimales', orden: 'Décimos, centésimos', cifra: '79', color: '#EF4444' },
          ].map((row, i) => (
            <div key={i} className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-2.5 flex items-center gap-3">
              <div
                className="w-12 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 text-white border border-white/20"
                style={{ backgroundColor: row.color }}
              >
                {row.cifra}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-[11px] text-[#1E1E24] uppercase tracking-wider">{row.clase}</div>
                <div className="text-[10px] font-bold text-[#1E1E24]/60 leading-tight">{row.orden}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 bg-[#FFFDF5] border-2 border-[#F7CA38] rounded-xl p-3 flex items-start gap-2">
          <Zap className="w-4 h-4 fill-[#F7CA38] text-[#F7CA38] shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-[#1E1E24]/80">
            <strong>REGLA RÁPIDA:</strong> El valor de un dígito depende de su posición (base 10). En 3421: el 3 vale 3000 y el 4 vale 400.
          </p>
        </div>
      </motion.div>

      {/* CARD 3: Descomposición Aditiva */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F7CA38] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            Descomposición Aditiva
          </h2>
        </div>

        <div className="bg-[#1E1E24] rounded-xl p-4 mb-4 font-mono text-xs leading-relaxed">
          <div className="text-white font-black text-center text-base mb-3 tracking-widest">3 4 2 1 . 7 9</div>
          {[
            { label: '3000', power: '3 × 10³', color: '#6F78DB' },
            { label: '400', power: '4 × 10²', color: '#38bdf8' },
            { label: '20', power: '2 × 10¹', color: '#22C55E' },
            { label: '1', power: '1 × 10⁰', color: '#F7CA38' },
            { label: '0.7', power: '7 × 10⁻¹', color: '#FB923C' },
            { label: '0.09', power: '9 × 10⁻²', color: '#EF4444' },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-0.5">
              <span className="font-black" style={{ color: row.color }}>{row.label}</span>
              <span className="text-white/30 text-[10px]">────────</span>
              <span className="text-white/60">{row.power}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl p-4 overflow-x-auto no-scrollbar text-center">
          <MathView latex="\mathbf{3421.79} = 3000 + 400 + 20 + 1 + 0.7 + 0.09" inline />
        </div>
      </motion.div>

      {/* CARD 4: Lector y Conversor */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            Lector de Números
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              key: 'n1', num: '4 100 378',
              text: '"Cuatro millones cien mil trescientos setenta y ocho."'
            },
            {
              key: 'n2', num: '3 000 785 199',
              text: '"Tres mil millones setecientos ochenta y cinco mil ciento noventa y nueve."'
            },
            {
              key: 'n3', num: '9.79',
              text: '"Nueve enteros, setenta y nueve centésimos."'
            },
            {
              key: 'n4', num: '305.3274',
              text: '"Trescientos cinco enteros, tres mil doscientos setenta y cuatro diezmilésimos."'
            },
          ].map(item => (
            <div key={item.key} className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
              <button
                onClick={() => toggleConcept(item.key)}
                className="w-full bg-[#f8faf9] hover:bg-[#f1f5f9] p-3 flex items-center justify-between font-black text-sm text-[#1E1E24] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  🗣️ <span className="font-black tracking-wider">{item.num}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform shrink-0 ${openConcept === item.key ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openConcept === item.key && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="p-4 bg-white text-sm font-bold text-[#1E1E24]/80 border-t-2 border-[#1E1E24]/10 italic">
                      {item.text}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
};
