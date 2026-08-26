import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Zap, AlertTriangle, Calculator } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

export const OperacionesBasicasModule: React.FC = () => {
  const [activeOp, setActiveOp] = useState<'suma-resta-mult' | 'div-pot-raiz'>('suma-resta-mult');
  const [openVerif, setOpenVerif] = useState(false);

  return (
    <div className="space-y-6">

      {/* CARD 1: Anatomía de las 6 Operaciones */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#6F78DB] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Calculator className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            Anatomía de las 6 Operaciones
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Cada operación tiene sus propias partes con nombres específicos. Identifícalas con el selector.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {([
            { key: 'suma-resta-mult', label: 'Suma · Resta · ×' },
            { key: 'div-pot-raiz', label: 'Div · Pot · Raíz' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => { playSound('tap'); setActiveOp(tab.key); }}
              className={`flex-1 py-2.5 rounded-xl border-2 font-black text-xs sm:text-sm flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeOp === tab.key
                  ? 'bg-[#1E1E24] text-white border-[#1E1E24]'
                  : 'bg-[#f8faf9] border-[#1E1E24]/20 text-[#1E1E24]/60 hover:border-[#1E1E24]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeOp === 'suma-resta-mult' && (
            <motion.div key="srm" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {[
                {
                  title: 'SUMA', color: '#38bdf8',
                  lines: [
                    { val: '3179', tag: 'Sumando' },
                    { val: '+1815', tag: 'Sumando' },
                    { val: '────', tag: '' },
                    { val: '4994', tag: 'Total', bold: true },
                  ]
                },
                {
                  title: 'RESTA', color: '#22C55E',
                  lines: [
                    { val: '4001', tag: 'Minuendo' },
                    { val: '−1786', tag: 'Sustraendo' },
                    { val: '────', tag: '' },
                    { val: '2215', tag: 'Diferencia', bold: true },
                  ]
                },
                {
                  title: 'MULTIPLICACIÓN', color: '#F7CA38',
                  lines: [
                    { val: '35', tag: 'Multiplicando' },
                    { val: '×12', tag: 'Multiplicador' },
                    { val: '───', tag: '' },
                    { val: '70', tag: 'Prod. parcial' },
                    { val: '35', tag: 'Prod. parcial' },
                    { val: '───', tag: '' },
                    { val: '420', tag: 'Prod. final', bold: true },
                  ]
                },
              ].map(op => (
                <div key={op.title} className="bg-[#1E1E24] rounded-xl p-3">
                  <div className="font-black text-[10px] uppercase tracking-widest mb-2" style={{ color: op.color }}>{op.title}</div>
                  {op.lines.map((line, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 font-mono text-xs">
                      <span className={`text-white ${line.bold ? 'font-black' : ''}`}>{line.val}</span>
                      {line.tag && <span className="text-white/40 text-[9px] text-right">{line.tag}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          )}
          {activeOp === 'div-pot-raiz' && (
            <motion.div key="dpr" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="bg-[#1E1E24] rounded-xl p-3">
                <div className="font-black text-[10px] uppercase tracking-widest text-[#38bdf8] mb-2">DIVISIÓN</div>
                <div className="font-mono text-xs text-white space-y-0.5">
                  <div className="flex justify-between"><span>6</span><span className="text-white/40">Cociente</span></div>
                  <div className="text-white/30">────</div>
                  <div className="flex justify-between"><span>6 │ <span className="text-[#F7CA38]">40</span></span><span className="text-white/40">Dividendo</span></div>
                  <div className="pl-4">36</div>
                  <div className="pl-2 text-white/30">────</div>
                  <div className="flex justify-between pl-4"><span>4</span><span className="text-white/40">Residuo</span></div>
                </div>
              </div>
              <div className="bg-[#1E1E24] rounded-xl p-3">
                <div className="font-black text-[10px] uppercase tracking-widest text-[#22C55E] mb-2">POTENCIA</div>
                <div className="font-mono text-xs text-white space-y-1 text-center">
                  <div className="text-2xl font-black"><MathView latex="5^3 = 125" inline /></div>
                  <div className="text-white/50 text-[10px]">base → 5 · exponente → 3</div>
                  <div className="text-[#22C55E] font-bold text-xs">potencia → 125</div>
                </div>
              </div>
              <div className="bg-[#1E1E24] rounded-xl p-3">
                <div className="font-black text-[10px] uppercase tracking-widest text-[#F7CA38] mb-2">RADICACIÓN</div>
                <div className="font-mono text-xs text-white space-y-1 text-center">
                  <div className="text-xl font-black text-[#F7CA38]"><MathView latex="\sqrt{16} = 4" inline /></div>
                  <div className="text-white/50 text-[10px]">índice · radicando · raíz</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CARD 2: Leyes de Signos en Suma y Resta */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Leyes de Signos: Suma y Resta
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#38bdf8]/10 border-2 border-[#38bdf8]/30 rounded-xl p-3 text-center">
            <div className="font-black text-xs text-[#38bdf8] uppercase mb-1">Mismo signo</div>
            <div className="text-xs font-bold text-[#1E1E24]/80">Se <strong>suman</strong> y se mantiene el signo</div>
          </div>
          <div className="bg-[#EF4444]/10 border-2 border-[#EF4444]/30 rounded-xl p-3 text-center">
            <div className="font-black text-xs text-[#EF4444] uppercase mb-1">Distinto signo</div>
            <div className="text-xs font-bold text-[#1E1E24]/80">Se <strong>restan</strong> y gana el mayor</div>
          </div>
        </div>

        <div className="bg-[#f8faf9] rounded-xl border-2 border-[#1E1E24] overflow-hidden mb-4">
          <div className="grid grid-cols-4 bg-[#1E1E24] text-white text-[10px] font-black uppercase tracking-wider p-2 text-center">
            <div>Tipo</div><div>Operación</div><div>Paso a paso</div><div>Resultado</div>
          </div>
          {[
            { tipo: '(+)+(+)', op: '+6+2', desc: 'Ambos +, suman', res: '+8', color: '#22C55E' },
            { tipo: '(−)+(−)', op: '−5−7', desc: '5+7=12, signo −', res: '−12', color: '#EF4444' },
            { tipo: '(−)+(+)', op: '−8+2', desc: '8−2=6, gana −8', res: '−6', color: '#EF4444' },
            { tipo: '(+)+(−)', op: '+8−2', desc: '8−2=6, gana +8', res: '+6', color: '#22C55E' },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-4 text-[10px] sm:text-xs font-bold text-[#1E1E24] p-2 items-center border-t border-[#1E1E24]/10 text-center">
              <div className="font-mono">{row.tipo}</div>
              <div className="font-mono font-black">{row.op}</div>
              <div className="text-[#1E1E24]/60 text-[9px] sm:text-[10px]">{row.desc}</div>
              <div className="font-black" style={{ color: row.color }}>{row.res}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#EFF6FF] border-2 border-[#38bdf8] rounded-xl p-3 flex items-start gap-2">
          <span className="text-lg shrink-0">🔄</span>
          <div className="text-xs font-bold text-[#1E1E24]/80">
            <strong>RESTA (Sumar el simétrico):</strong>
            <div className="mt-1 space-y-0.5 font-mono">
              <div>4 − (−3) → 4 + 3 = <strong>7</strong></div>
              <div>−8 − (+5) → −8 − 5 = <strong>−13</strong></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CARD 3: Leyes de Signos en × y ÷ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#38bdf8] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Calculator className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Leyes de Signos: × y ÷
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#22C55E]/10 border-2 border-[#22C55E]/30 rounded-xl p-3 text-center">
            <div className="font-black text-sm text-[#22C55E] mb-1">Signos iguales</div>
            <div className="font-black text-xl text-[#22C55E]">→ + </div>
          </div>
          <div className="bg-[#EF4444]/10 border-2 border-[#EF4444]/30 rounded-xl p-3 text-center">
            <div className="font-black text-sm text-[#EF4444] mb-1">Signos distintos</div>
            <div className="font-black text-xl text-[#EF4444]">→ − </div>
          </div>
        </div>

        <div className="bg-[#f8faf9] rounded-xl border-2 border-[#1E1E24] overflow-hidden">
          <div className="grid grid-cols-4 bg-[#1E1E24] text-white text-[10px] font-black uppercase tracking-wider p-2 text-center">
            <div>Op.</div><div>Signos</div><div>Ejemplo</div><div>Resultado</div>
          </div>
          {[
            { op: '×', sig: '(+)·(+)', ex: '(+5)(+3)', res: '+15', color: '#22C55E' },
            { op: '×', sig: '(−)·(−)', ex: '(−5)(−9)', res: '+45', color: '#22C55E' },
            { op: '×', sig: '(+)·(−)', ex: '(+4)(−7)', res: '−28', color: '#EF4444' },
            { op: '×', sig: '(−)·(+)', ex: '(−6)(+2)', res: '−12', color: '#EF4444' },
            { op: '÷', sig: '(+)/(+)', ex: '+8/+4', res: '+2', color: '#22C55E' },
            { op: '÷', sig: '(−)/(−)', ex: '−6/−3', res: '+2', color: '#22C55E' },
            { op: '÷', sig: '(+)/(−)', ex: '+10/−5', res: '−2', color: '#EF4444' },
            { op: '÷', sig: '(−)/(+)', ex: '−8/+2', res: '−4', color: '#EF4444' },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-4 text-[10px] sm:text-xs font-bold text-[#1E1E24] p-2 items-center border-t border-[#1E1E24]/10 text-center">
              <div className="font-black text-base">{row.op}</div>
              <div className="font-mono text-[9px] sm:text-[10px]">{row.sig}</div>
              <div className="font-mono">{row.ex}</div>
              <div className="font-black" style={{ color: row.color }}>{row.res}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CARD 4: Potenciación y Raíz */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F7CA38] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <Zap className="w-5 h-5 fill-[#1E1E24]" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Potenciación y Raíz Cuadrada
          </h2>
        </div>

        <div className="bg-[#1E1E24] rounded-xl p-4 text-center mb-4">
          <div className="text-[#F7CA38] font-black text-xs uppercase tracking-widest mb-2">RAÍZ CUADRADA EXACTA</div>
          <div className="text-white font-black text-base sm:text-lg overflow-x-auto no-scrollbar pb-1">
            <MathView latex="\sqrt{a} = b \iff b \times b = a" inline />
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
            <button
              onClick={() => { playSound('click'); setOpenVerif(!openVerif); }}
              className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-sm text-[#1E1E24] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">🔍 Verificando Raíces Rápidas</div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openVerif ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openVerif && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-white border-t-2 border-[#1E1E24]/10 grid grid-cols-2 gap-2">
                    {[
                      ['√16 = 4', '4 × 4 = 16'],
                      ['√25 = 5', '5 × 5 = 25'],
                      ['√49 = 7', '7 × 7 = 49'],
                      ['√64 = 8', '8 × 8 = 64'],
                      ['√81 = 9', '9 × 9 = 81'],
                      ['√100 = 10', '10 × 10 = 100'],
                    ].map(([r, v], i) => (
                      <div key={i} className="bg-[#f8faf9] rounded-lg p-2 text-center">
                        <div className="font-black text-sm text-[#1E1E24]">{r}</div>
                        <div className="text-[10px] font-bold text-[#1E1E24]/50">{v}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-[#FEF2F2] border-2 border-[#EF4444] rounded-xl p-3 flex items-start gap-3 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-[#EF4444]"><AlertTriangle size={60} /></div>
          <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0 relative z-10" />
          <div className="text-xs font-bold text-[#991B1B] relative z-10 space-y-1">
            <strong>CUIDADO CON LAS POTENCIAS DE NEGATIVOS:</strong>
            <div className="font-mono space-y-0.5 mt-1">
              <div><MathView latex="(-3)^2 = (-3)(-3) = +9" inline /> <span className="text-[#1E1E24]/50">(exp. par)</span></div>
              <div><MathView latex="(-2)^3 = (-2)(-2)(-2) = -8" inline /> <span className="text-[#1E1E24]/50">(exp. impar)</span></div>
              <div><MathView latex="-3^2 = -(3 \times 3) = -9" inline /> <span className="text-[#1E1E24]/50">(sin paréntesis)</span></div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};
