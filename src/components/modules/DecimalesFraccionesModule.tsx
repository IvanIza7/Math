import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, AlertTriangle, Zap, Divide } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

export const DecimalesFraccionesModule: React.FC = () => {
  const [activeFracType, setActiveFracType] = useState<'propia' | 'impropia' | 'mixta'>('propia');
  const [activeFracOp, setActiveFracOp] = useState<'suma-resta' | 'mult' | 'div' | 'razon'>('suma-resta');
  const [openConversion, setOpenConversion] = useState(false);
  const [openDecimal, setOpenDecimal] = useState(false);

  return (
    <div className="space-y-6">

      {/* CARD 1: Tipos de Fracciones */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#6F78DB] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Divide className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            Tipos de Fracciones
          </h2>
        </div>
        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Selecciona el tipo para ver su definición y ejemplos.
        </p>

        <div className="flex gap-2 mb-4">
          {([
            { key: 'propia', label: 'Propia' },
            { key: 'impropia', label: 'Impropia' },
            { key: 'mixta', label: 'Mixta' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => { playSound('tap'); setActiveFracType(tab.key); }}
              className={`flex-1 py-2.5 rounded-xl border-2 font-black text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                activeFracType === tab.key
                  ? 'bg-[#1E1E24] text-white border-[#1E1E24]'
                  : 'bg-[#f8faf9] border-[#1E1E24]/20 text-[#1E1E24]/60 hover:border-[#1E1E24]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeFracType === 'propia' && (
            <motion.div key="propia" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-3">
              <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-3">
                <p className="text-sm font-bold text-[#1E1E24]/80">Numerador <strong>&lt;</strong> Denominador. Su valor es menor a 1.</p>
              </div>
              <div className="bg-[#1E1E24] rounded-xl p-3 flex justify-center gap-6 text-white font-black text-2xl">
                <MathView latex="\frac{3}{5}" inline />
                <MathView latex="\frac{7}{9}" inline />
              </div>
            </motion.div>
          )}
          {activeFracType === 'impropia' && (
            <motion.div key="impropia" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-3">
              <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-3">
                <p className="text-sm font-bold text-[#1E1E24]/80">Numerador <strong>≥</strong> Denominador. Su valor es mayor o igual a 1.</p>
              </div>
              <div className="bg-[#1E1E24] rounded-xl p-3 flex justify-center gap-6 text-white font-black text-2xl">
                <MathView latex="\frac{7}{3}" inline />
                <MathView latex="\frac{13}{4}" inline />
              </div>
            </motion.div>
          )}
          {activeFracType === 'mixta' && (
            <motion.div key="mixta" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-3">
              <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-3">
                <p className="text-sm font-bold text-[#1E1E24]/80">Número entero + fracción propia. Equivale a una impropia.</p>
              </div>
              <div className="bg-[#1E1E24] rounded-xl p-3 flex justify-center gap-6 text-white font-black text-2xl">
                <MathView latex="2\tfrac{1}{3}" inline />
                <MathView latex="3\tfrac{1}{4}" inline />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversión */}
        <div className="mt-4 border-2 border-[#1E1E24] rounded-xl overflow-hidden">
          <button
            onClick={() => { playSound('click'); setOpenConversion(!openConversion); }}
            className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-sm text-[#1E1E24] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">🔄 Algoritmos de Conversión Rápida</div>
            <ChevronDown className={`w-4 h-4 transition-transform ${openConversion ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openConversion && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="p-4 bg-white border-t-2 border-[#1E1E24]/10 space-y-3">
                  <div className="bg-[#f8faf9] rounded-xl p-3">
                    <div className="font-black text-xs text-[#38bdf8] uppercase mb-1">Mixta → Impropia</div>
                    <div className="text-xs font-bold text-[#1E1E24]/80 mb-1">Entero × denominador + numerador, sobre mismo denominador:</div>
                    <div className="font-black text-sm text-[#1E1E24] overflow-x-auto no-scrollbar pb-1">
                      <MathView latex="3\tfrac{1}{4} = \frac{3 \times 4 + 1}{4} = \frac{13}{4}" inline />
                    </div>
                  </div>
                  <div className="bg-[#f8faf9] rounded-xl p-3">
                    <div className="font-black text-xs text-[#22C55E] uppercase mb-1">Impropia → Mixta</div>
                    <div className="text-xs font-bold text-[#1E1E24]/80 mb-1">Divide y el residuo es el numerador:</div>
                    <div className="font-black text-sm text-[#1E1E24] overflow-x-auto no-scrollbar pb-1">
                      <MathView latex="\frac{9}{7} \rightarrow 9 \div 7 = 1 \text{ (residuo 2)} \Rightarrow 1\tfrac{2}{7}" inline />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CARD 2: Operaciones con Fracciones */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Divide className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            Operaciones con Fracciones
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {([
            { key: 'suma-resta', label: 'Suma / Resta' },
            { key: 'mult', label: 'Multiplicación' },
            { key: 'div', label: 'División' },
            { key: 'razon', label: 'Razón Geom.' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => { playSound('tap'); setActiveFracOp(tab.key); }}
              className={`px-3 py-2 rounded-xl border-2 font-black text-[10px] sm:text-xs flex items-center justify-center transition-all cursor-pointer flex-1 min-w-[80px] ${
                activeFracOp === tab.key
                  ? 'bg-[#1E1E24] text-white border-[#1E1E24]'
                  : 'bg-[#f8faf9] border-[#1E1E24]/20 text-[#1E1E24]/60 hover:border-[#1E1E24]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-[#f8faf9] rounded-xl border-2 border-[#1E1E24] p-4 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeFracOp} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="space-y-3">
              {activeFracOp === 'suma-resta' && (
                <>
                  <div className="space-y-1">
                    <div className="text-[11px] font-black text-[#38bdf8] uppercase">Mismo denominador → Directo</div>
                    <div className="text-sm font-black text-[#1E1E24] overflow-x-auto no-scrollbar pb-1"><MathView latex="\frac{3}{5} + \frac{2}{5} = \frac{5}{5} = \mathbf{1} \qquad \frac{8}{9} - \frac{3}{9} = \mathbf{\frac{5}{9}}" inline /></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-black text-[#6F78DB] uppercase">Distinto denominador → m.c.m.</div>
                    <div className="text-sm font-black text-[#1E1E24] overflow-x-auto no-scrollbar pb-1"><MathView latex="\frac{2}{8} + \frac{3}{4} + \frac{1}{2} = \frac{2+6+4}{8} = \frac{12}{8} = \mathbf{1\tfrac{1}{2}}" inline /></div>
                  </div>
                </>
              )}
              {activeFracOp === 'mult' && (
                <div className="flex flex-col items-center gap-3">
                  <div className="text-xs font-bold text-[#1E1E24]/80 text-center">Numerador × Numerador y Denominador × Denominador.</div>
                  <div className="font-black text-base text-[#1E1E24] overflow-x-auto no-scrollbar pb-1">
                    <MathView latex="\frac{3}{10} \times \frac{8}{5} = \frac{3 \times 8}{10 \times 5} = \frac{24}{50} = \mathbf{\frac{12}{25}}" inline />
                  </div>
                </div>
              )}
              {activeFracOp === 'div' && (
                <div className="flex flex-col items-center gap-3">
                  <div className="text-xs font-bold text-[#1E1E24]/80 text-center">Multiplica por el recíproco (voltea la segunda fracción).</div>
                  <div className="font-black text-base text-[#1E1E24] overflow-x-auto no-scrollbar pb-1">
                    <MathView latex="\frac{3}{4} \div \frac{1}{2} = \frac{3 \times 2}{4 \times 1} = \frac{6}{4} = \mathbf{1\tfrac{1}{2}}" inline />
                  </div>
                </div>
              )}
              {activeFracOp === 'razon' && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#1E1E24]/80">Comparación entre dos cantidades por cociente (<MathView latex="\frac{a}{b}" inline /> o a : b).</p>
                  <div className="bg-white border-2 border-[#1E1E24]/10 rounded-xl p-3 text-sm font-bold text-[#1E1E24]">
                    "3 de cada 5 estudiantes" → razón <MathView latex="\mathbf{\frac{3}{5}}" inline /> (0.60 o 60%)
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CARD 3: Operaciones con Punto Decimal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#38bdf8] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            Operaciones con Decimales
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { op: 'SUMA / RESTA', rule: 'Alinear el punto vertical', color: '#38bdf8' },
            { op: 'PRODUCTO', rule: 'Contar decimales al final', color: '#22C55E' },
            { op: 'DIVISIÓN', rule: 'Recorrer punto en divisor', color: '#F7CA38' },
          ].map(item => (
            <div key={item.op} className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-2.5 text-center">
              <div className="font-black text-[9px] uppercase mb-1" style={{ color: item.color }}>{item.op}</div>
              <div className="text-[9px] font-bold text-[#1E1E24]/60 leading-tight">{item.rule}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#1E1E24] rounded-xl p-3">
            <div className="font-black text-[10px] text-[#38bdf8] uppercase mb-2">Suma / Resta</div>
            <div className="font-mono text-xs text-white space-y-0.5 text-right">
              <div>12.450</div>
              <div>+ 3.182</div>
              <div className="text-white/30">────────</div>
              <div className="text-[#38bdf8] font-black">15.632</div>
            </div>
          </div>
          <div className="bg-[#1E1E24] rounded-xl p-3">
            <div className="font-black text-[10px] text-[#22C55E] uppercase mb-2">Multiplicación</div>
            <div className="font-mono text-xs text-white space-y-0.5 text-right">
              <div>3.25 <span className="text-white/40 text-[9px]">(2 dec)</span></div>
              <div>× 1.4 <span className="text-white/40 text-[9px]">(1 dec)</span></div>
              <div className="text-white/30">──────</div>
              <div>1300</div>
              <div>325</div>
              <div className="text-white/30">──────</div>
              <div className="text-[#22C55E] font-black">4.550 <span className="text-[10px]">(3 dec)</span></div>
            </div>
          </div>
        </div>

        <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
          <button
            onClick={() => { playSound('click'); setOpenDecimal(!openDecimal); }}
            className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-sm text-[#1E1E24] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">➗ División Decimal</div>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDecimal ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openDecimal && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="p-4 bg-white border-t-2 border-[#1E1E24]/10 space-y-2 text-xs font-bold text-[#1E1E24]/80">
                  <p>• <strong>Punto solo en dividendo:</strong> Sube directo al cociente. <MathView latex="49.3 \div 4 = \mathbf{12.325}" inline /></p>
                  <p>• <strong>Punto en el divisor:</strong> Se recorre a la derecha y se agregan ceros. <MathView latex="493 \div 0.2 \Rightarrow 4930 \div 2 = \mathbf{2465}" inline /></p>
                  <p>• <strong>Punto en ambos:</strong> Se recorre igual cantidad de posiciones. <MathView latex="614.82 \div 3.5 \Rightarrow 6148.2 \div 35 = \mathbf{175.66}" inline /></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CARD 4: Razón Geométrica y Espacios Muestrales */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F7CA38] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <Divide className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Razón y Espacios Muestrales
          </h2>
        </div>

        <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-3 mb-4 text-sm font-bold text-[#1E1E24]/80">
          <strong>Razón Geométrica:</strong> Comparación entre dos cantidades por cociente (<MathView latex="\frac{a}{b}" inline /> o a : b).
          <div className="mt-2 bg-[#1E1E24] text-white rounded-lg p-2 text-xs font-bold">
            "3 de cada 5 estudiantes" → <span className="text-[#F7CA38] font-black">3/5 = 0.60 = 60%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1E1E24] rounded-xl p-3">
            <div className="font-black text-[10px] text-[#38bdf8] uppercase mb-2">Diagrama de Árbol</div>
            <div className="font-mono text-[10px] text-white leading-relaxed">
              <div className="text-white/40 text-[9px] mb-1">M1 · M2 · Resultado</div>
              <div>┌─ A ─── A → <span className="text-[#22C55E]">(A,A)</span></div>
              <div>│  └─── S → <span className="text-[#F7CA38]">(A,S)</span></div>
              <div>└─ S ─── A → <span className="text-[#EF4444]">(S,A)</span></div>
              <div className="pl-4">└─── S → <span className="text-[#6F78DB]">(S,S)</span></div>
            </div>
          </div>
          <div className="bg-[#1E1E24] rounded-xl p-3">
            <div className="font-black text-[10px] text-[#22C55E] uppercase mb-2">Diagrama Cartesiano</div>
            <div className="font-mono text-[10px] text-white leading-relaxed">
              <div className="text-white/40 text-[9px] mb-1">M2 ▲</div>
              <div><span className="text-[#F7CA38]">S</span> │ (A,S)  (S,S)</div>
              <div><span className="text-[#22C55E]">A</span> │ (A,A)  (S,A)</div>
              <div className="text-white/30">  └──────────► M1</div>
              <div className="text-white/40">      A       S</div>
            </div>
          </div>
        </div>

        <div className="mt-3 bg-[#FFFDF5] border-2 border-[#F7CA38] rounded-xl p-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-[#F7CA38] shrink-0" />
          <p className="text-xs font-bold text-[#1E1E24]/80">
            2 monedas → 2 × 2 = <strong>4 resultados</strong> posibles en el espacio muestral.
          </p>
        </div>
      </motion.div>

    </div>
  );
};
