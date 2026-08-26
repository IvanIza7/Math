import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, AlertTriangle, Zap, Hash } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

export const TeoriaNumeosModule: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState<'multiplo' | 'divisor' | 'primo'>('multiplo');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (key: string) => {
    playSound('click');
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div className="space-y-6">

      {/* CARD 1: Múltiplos, Divisores y Primos */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#6F78DB] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Hash className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            Múltiplos, Divisores y Primos
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Tres conceptos fundamentales para entender cómo se relacionan los números entre sí.
        </p>

        {/* Selector */}
        <div className="flex gap-2 mb-4">
          {([
            { key: 'multiplo', label: 'Múltiplo' },
            { key: 'divisor', label: 'Divisor' },
            { key: 'primo', label: 'Primo' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => { playSound('tap'); setActiveConcept(tab.key); }}
              className={`flex-1 py-2.5 rounded-xl border-2 font-black text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                activeConcept === tab.key
                  ? 'bg-[#1E1E24] text-white border-[#1E1E24]'
                  : 'bg-[#f8faf9] border-[#1E1E24]/20 text-[#1E1E24]/60 hover:border-[#1E1E24]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeConcept === 'multiplo' && (
            <motion.div key="multiplo" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-3">
              <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-4">
                <p className="text-sm font-bold text-[#1E1E24]/80">Contiene a otro número una cantidad entera exacta de veces.</p>
              </div>
              <div className="bg-[#1E1E24] rounded-xl p-3 text-xs font-bold text-white">
                <span className="text-[#38bdf8]">Ejemplo: </span>3 495 es múltiplo de 5 porque <MathView latex="5 \times 699 = 3\,495" inline />
              </div>
            </motion.div>
          )}
          {activeConcept === 'divisor' && (
            <motion.div key="divisor" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-3">
              <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-4">
                <p className="text-sm font-bold text-[#1E1E24]/80">Divide a otro número con residuo exactamente igual a cero.</p>
              </div>
              <div className="bg-[#1E1E24] rounded-xl p-3 text-xs font-bold text-white">
                <span className="text-[#22C55E]">Ejemplo: </span>6 es divisor de 42 porque <MathView latex="42 \div 6 = 7" inline /> (residuo 0)
              </div>
            </motion.div>
          )}
          {activeConcept === 'primo' && (
            <motion.div key="primo" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-3">
              <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-4">
                <p className="text-sm font-bold text-[#1E1E24]/80">Solo posee exactamente <strong>2 divisores</strong>: el 1 y él mismo.</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47].map(n => (
                    <span key={n} className="bg-[#F7CA38]/20 border border-[#F7CA38]/50 text-[#1E1E24] font-black text-xs px-2 py-0.5 rounded-lg">{n}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 bg-[#FEF2F2] border-2 border-[#EF4444] rounded-xl p-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-[#991B1B]">
            El número <strong>1 NO es primo</strong> ni compuesto (solo tiene 1 divisor). El <strong>2</strong> es el ÚNICO primo que es par.
          </p>
        </div>
      </motion.div>

      {/* CARD 2: Criterios de Divisibilidad */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Criterios de Divisibilidad Rápida
          </h2>
        </div>

        <div className="bg-[#f8faf9] rounded-xl border-2 border-[#1E1E24] overflow-hidden">
          <div className="grid grid-cols-3 bg-[#1E1E24] text-white text-[10px] font-black uppercase tracking-wider p-2 text-center">
            <div>Entre</div><div>Regla Práctica</div><div>Ejemplo</div>
          </div>
          {[
            { div: '2', rule: 'Termina en cifra par o 0', ex: '380, 76 942' },
            { div: '3', rule: 'Suma de cifras múltiplo de 3', ex: '12 369 → 1+2+3+6+9 = 21' },
            { div: '5', rule: 'Última cifra es 0 o 5', ex: '85 900, 1 315' },
            { div: '6', rule: 'Cumple regla del 2 y del 3', ex: '12 432 (par, suma 12)' },
            { div: '9', rule: 'Suma de cifras múltiplo de 9', ex: '99 306 → 9+9+3+0+6 = 27' },
            { div: '10, 100', rule: 'Termina en 1, 2 o 3 ceros', ex: '35 000, 12 100' },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-3 text-[10px] sm:text-xs font-bold text-[#1E1E24] p-2.5 items-start border-t border-[#1E1E24]/10">
              <div className="font-black text-[#6F78DB] text-center">{row.div}</div>
              <div className="text-[#1E1E24]/80 px-1">{row.rule}</div>
              <div className="text-[#1E1E24]/60 text-[9px] sm:text-[10px]">{row.ex}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CARD 3: MCD y mcm */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#38bdf8] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Hash className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            M.C.D. y m.c.m.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#38bdf8]/10 border-2 border-[#38bdf8]/30 rounded-xl p-3 text-center">
            <div className="font-black text-xs text-[#38bdf8] uppercase mb-1">M.C.D.</div>
            <div className="text-xs font-bold text-[#1E1E24]/80">Mayor divisor que divide a <strong>todos</strong></div>
          </div>
          <div className="bg-[#22C55E]/10 border-2 border-[#22C55E]/30 rounded-xl p-3 text-center">
            <div className="font-black text-xs text-[#22C55E] uppercase mb-1">m.c.m.</div>
            <div className="text-xs font-bold text-[#1E1E24]/80">Menor múltiplo común a <strong>todos</strong></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* MCD */}
          <div className="bg-[#1E1E24] rounded-xl p-3">
            <div className="font-black text-[10px] text-[#38bdf8] uppercase mb-2">M.C.D. de (36, 54)</div>
            <div className="font-mono text-[10px] text-white space-y-0.5">
              <div className="flex justify-between"><span>36 · 54</span><span className="text-[#38bdf8]">│ 2</span></div>
              <div className="flex justify-between"><span>18 · 27</span><span className="text-[#38bdf8]">│ 3</span></div>
              <div className="flex justify-between"><span> 6 · 9</span><span className="text-[#38bdf8]">│ 3</span></div>
              <div className="flex justify-between"><span> 2 · 3</span><span className="text-white/30">│</span></div>
              <div className="text-white/30 text-[9px] mt-1">Factores simultáneos</div>
              <div className="text-[#38bdf8] font-black mt-1">
                <MathView latex="2 \times 3^2 = 18" inline />
              </div>
            </div>
          </div>
          {/* mcm */}
          <div className="bg-[#1E1E24] rounded-xl p-3">
            <div className="font-black text-[10px] text-[#22C55E] uppercase mb-2">m.c.m. de (18, 24)</div>
            <div className="font-mono text-[10px] text-white space-y-0.5">
              <div className="flex justify-between"><span>18 · 24</span><span className="text-[#22C55E]">│ 2</span></div>
              <div className="flex justify-between"><span> 9 · 12</span><span className="text-[#22C55E]">│ 2</span></div>
              <div className="flex justify-between"><span> 9 · 6</span><span className="text-[#22C55E]">│ 2</span></div>
              <div className="flex justify-between"><span> 9 · 3</span><span className="text-[#22C55E]">│ 3</span></div>
              <div className="flex justify-between"><span> 3 · 1</span><span className="text-[#22C55E]">│ 3</span></div>
              <div className="flex justify-between"><span> 1 · 1</span><span className="text-white/30">│</span></div>
              <div className="text-[#22C55E] font-black mt-1">
                <MathView latex="2^3 \times 3^2 = 72" inline />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CARD 4: Notación Científica */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F7CA38] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <Zap className="w-5 h-5 fill-[#1E1E24]" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Notación Científica
          </h2>
        </div>

        <div className="text-sm font-bold text-[#1E1E24]/80 mb-4 text-center overflow-x-auto no-scrollbar pb-1">
          <MathView latex="N \times 10^n \quad \text{donde } 1 \le N < 10" inline />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#22C55E]/10 border-2 border-[#22C55E]/30 rounded-xl p-3 text-center">
            <div className="font-black text-xs text-[#22C55E] uppercase mb-1">Números GRANDES</div>
            <div className="font-black text-sm text-[#1E1E24]">Exponente <span className="text-[#22C55E]">POSITIVO</span></div>
          </div>
          <div className="bg-[#EF4444]/10 border-2 border-[#EF4444]/30 rounded-xl p-3 text-center">
            <div className="font-black text-xs text-[#EF4444] uppercase mb-1">Números PEQUEÑOS</div>
            <div className="font-black text-sm text-[#1E1E24]">Exponente <span className="text-[#EF4444]">NEGATIVO</span></div>
          </div>
        </div>

        {/* Accordion */}
        <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
          <button
            onClick={() => toggleAccordion('notacion')}
            className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-sm text-[#1E1E24] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">🔬 Ejemplos de Transformación</div>
            <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'notacion' ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openAccordion === 'notacion' && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="p-4 bg-white border-t-2 border-[#1E1E24]/10 space-y-4">
                  <div className="bg-[#f8faf9] rounded-xl p-3">
                    <div className="font-black text-xs text-[#1E1E24] mb-1">45 000 000 000 000</div>
                    <div className="text-xs font-bold text-[#1E1E24]/60 mb-1">Punto se recorre 13 lugares a la izquierda:</div>
                    <div className="font-black text-base text-[#22C55E] overflow-x-auto no-scrollbar pb-1">
                      <MathView latex="4.5 \times 10^{13}" inline />
                    </div>
                  </div>
                  <div className="bg-[#f8faf9] rounded-xl p-3">
                    <div className="font-black text-xs text-[#1E1E24] mb-1">0.00000008</div>
                    <div className="text-xs font-bold text-[#1E1E24]/60 mb-1">Punto se recorre 8 lugares a la derecha:</div>
                    <div className="font-black text-base text-[#EF4444] overflow-x-auto no-scrollbar pb-1">
                      <MathView latex="8.0 \times 10^{-8}" inline />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

    </div>
  );
};
