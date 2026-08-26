import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Combine, Scissors, XSquare, Divide, AlertTriangle, Zap, SplitSquareHorizontal, ChevronDown } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

export const OperacionesAlgebraicasModule: React.FC = () => {
  const [showReduction, setShowReduction] = useState(false);
  const [activeSign, setActiveSign] = useState<'+' | '-'>('+');
  const [activeMult, setActiveMult] = useState<'mono-mono' | 'mono-poli' | 'poli-poli'>('mono-mono');
  const [openDivConcept, setOpenDivConcept] = useState<string | null>(null);

  const toggleDivConcept = (concept: string) => {
    playSound('click');
    setOpenDivConcept(openDivConcept === concept ? null : concept);
  };

  return (
    <div className="space-y-6">
      {/* CARD 1: Reducción de Términos Semejantes */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#6F78DB] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Combine className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Reducción de Términos
          </h2>
        </div>
        
        <p className="text-xs sm:text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          <strong>Regla de Oro:</strong> Solo puedes sumar o restar coeficientes si la parte literal es idéntica (mismas letras con los mismos exponentes). La base y exponente pasan igual.
        </p>

        {/* Interactive Grouping */}
        <div className="bg-[#1E1E24] rounded-2xl p-4 sm:p-5 mb-4 text-center">
          {!showReduction ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-white font-black text-lg sm:text-xl flex flex-wrap justify-center items-center gap-x-2 gap-y-3"
            >
              <span className="text-[#38bdf8]"><MathView latex="4x^2y" inline /></span>
              <span><MathView latex="-" inline /></span>
              <span className="text-[#22C55E]"><MathView latex="5x" inline /></span>
              <span><MathView latex="+" inline /></span>
              <span className="text-[#38bdf8]"><MathView latex="2x^2y" inline /></span>
              <span><MathView latex="+" inline /></span>
              <span className="text-[#22C55E]"><MathView latex="8x" inline /></span>
              <span><MathView latex="-" inline /></span>
              <span className="text-[#F7CA38]"><MathView latex="3" inline /></span>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="text-white font-black text-lg sm:text-2xl flex flex-wrap justify-center items-center gap-x-3 gap-y-3"
            >
              <span className="bg-[#38bdf8]/20 px-3 py-1 rounded-lg border border-[#38bdf8]/30 text-[#38bdf8]">
                <MathView latex="6x^2y" inline />
              </span>
              <span><MathView latex="+" inline /></span>
              <span className="bg-[#22C55E]/20 px-3 py-1 rounded-lg border border-[#22C55E]/30 text-[#22C55E]">
                <MathView latex="3x" inline />
              </span>
              <span><MathView latex="-" inline /></span>
              <span className="bg-[#F7CA38]/20 px-3 py-1 rounded-lg border border-[#F7CA38]/30 text-[#F7CA38]">
                <MathView latex="3" inline />
              </span>
            </motion.div>
          )}

          <button
            onClick={() => {
              playSound('pop');
              setShowReduction(!showReduction);
            }}
            className="mt-5 bg-white text-[#1E1E24] px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider border-2 border-transparent hover:border-white/20 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {showReduction ? 'Desagrupar' : 'Agrupar Semejantes'}
          </button>
        </div>

        {/* Info Table */}
        <div className="bg-[#f8faf9] rounded-xl border-2 border-[#1E1E24] overflow-hidden">
          <div className="grid grid-cols-3 bg-[#1E1E24] text-white text-[10px] font-black uppercase tracking-wider p-2 text-center">
            <div>Operación</div>
            <div>Ejemplo</div>
            <div>Resultado</div>
          </div>
          <div className="grid grid-cols-3 text-[10px] sm:text-xs font-bold text-[#1E1E24] p-3 items-center divide-x-2 divide-[#1E1E24]/10 text-center gap-y-3">
            <div className="font-black text-[#1E1E24]">Mismo signo</div>
            <div className="flex justify-center"><MathView latex="-3a^2 - 5a^2" inline /></div>
            <div className="px-1"><MathView latex="-8a^2" inline /> <span className="block text-[9px] mt-0.5 text-gray-500">(suman)</span></div>

            <div className="font-black text-[#1E1E24] border-t-2 border-[#1E1E24]/10 pt-3">Distinto signo</div>
            <div className="flex justify-center border-t-2 border-[#1E1E24]/10 pt-3"><MathView latex="+9x - 14x" inline /></div>
            <div className="px-1 border-t-2 border-[#1E1E24]/10 pt-3"><MathView latex="-5x" inline /> <span className="block text-[9px] mt-0.5 text-gray-500">(restan)</span></div>

            <div className="font-black text-[#1E1E24] border-t-2 border-[#1E1E24]/10 pt-3">No semejantes</div>
            <div className="flex justify-center border-t-2 border-[#1E1E24]/10 pt-3"><MathView latex="2x^3 + 5x^2" inline /></div>
            <div className="px-1 border-t-2 border-[#1E1E24]/10 pt-3 text-[#EF4444]">No reducible</div>
          </div>
        </div>
      </motion.div>

      {/* CARD 2: Supresión de Paréntesis */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Scissors className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Supresión de Paréntesis
          </h2>
        </div>

        <div className="text-center mb-4">
          <div className="inline-block bg-[#1E1E24] text-white font-black text-[10px] sm:text-xs px-4 py-1.5 rounded-full uppercase tracking-widest border-2 border-[#1E1E24] shadow-sm">
            El Guardián de los Signos (+ / -)
          </div>
        </div>

        {/* Interactive Switcher */}
        <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl p-4 sm:p-5 mb-4 relative overflow-hidden">
          <div className="flex justify-center mb-4 relative z-10">
            <div className="bg-white p-1 rounded-full border-2 border-[#1E1E24] flex shadow-xs">
              <button
                onClick={() => { playSound('tap'); setActiveSign('+'); }}
                className={`w-12 h-10 rounded-full flex items-center justify-center font-black text-xl transition-all cursor-pointer ${
                  activeSign === '+' ? 'bg-[#38bdf8] text-white shadow-sm' : 'text-[#1E1E24]/40 hover:bg-gray-100'
                }`}
              >
                +
              </button>
              <button
                onClick={() => { playSound('tap'); setActiveSign('-'); }}
                className={`w-12 h-10 rounded-full flex items-center justify-center font-black text-xl transition-all cursor-pointer ${
                  activeSign === '-' ? 'bg-[#EF4444] text-white shadow-sm' : 'text-[#1E1E24]/40 hover:bg-gray-100'
                }`}
              >
                -
              </button>
            </div>
          </div>

          <div className="relative z-10 bg-white border-2 border-[#1E1E24] rounded-xl p-4 text-center min-h-[100px] flex flex-col justify-center shadow-xs">
            {activeSign === '+' ? (
              <motion.div key="pos" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-[11px] sm:text-xs font-bold text-[#1E1E24]/70 mb-3">
                  Los términos interiores <strong>conservan</strong> su signo original.
                </p>
                <div className="font-black text-base sm:text-lg text-[#1E1E24] overflow-x-auto no-scrollbar pb-1">
                  <MathView latex="+(3a - 5b + 2) \implies 3a - 5b + 2" inline />
                </div>
              </motion.div>
            ) : (
              <motion.div key="neg" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-[11px] sm:text-xs font-bold text-[#EF4444] mb-3">
                  Todos los signos dentro del paréntesis <strong>se invierten</strong>.
                </p>
                <div className="font-black text-base sm:text-lg text-[#1E1E24] overflow-x-auto no-scrollbar pb-1">
                  <MathView latex="-(5x^2 - 7x + 4) \implies -5x^2 + 7x - 4" inline />
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Decorative background split */}
          <div className={`absolute inset-0 transition-colors duration-500 opacity-10 ${activeSign === '+' ? 'bg-[#38bdf8]' : 'bg-[#EF4444]'}`} />
        </div>

        <div className="bg-[#FEF2F2] border-2 border-[#EF4444] rounded-xl p-3 flex items-start gap-3 shadow-xs relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-[#EF4444]"><AlertTriangle size={60} /></div>
          <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0 relative z-10" />
          <p className="text-[11px] sm:text-xs font-bold text-[#991B1B] relative z-10">
            <strong>ERROR COMÚN:</strong> Olvidar cambiar el signo de los términos del final dentro del paréntesis:<br />
            <span className="inline-block mt-1 bg-white px-2 py-0.5 rounded border border-[#EF4444]/30"><MathView latex="-(x - 3) = -x + 3" inline /></span> (NO <MathView latex="-x - 3" inline />)
          </p>
        </div>
      </motion.div>

      {/* CARD 3: Multiplicación Algebraica */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#38bdf8] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <XSquare className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Multiplicación
          </h2>
        </div>
        
        {/* Rules */}
        <div className="flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-bold text-[#1E1E24]/80 mb-4 bg-[#F1F5F9] p-3 rounded-xl border border-[#1E1E24]/10">
          <div className="w-full font-black text-[#1E1E24] uppercase tracking-wider mb-1">Pasos:</div>
          <div className="flex items-center gap-1.5"><span className="bg-[#1E1E24] text-white w-4 h-4 rounded-full flex justify-center items-center">1</span> Signos (Ley de signos)</div>
          <div className="flex items-center gap-1.5"><span className="bg-[#1E1E24] text-white w-4 h-4 rounded-full flex justify-center items-center">2</span> Coeficientes (Se multiplican)</div>
          <div className="flex items-center gap-1.5 w-full"><span className="bg-[#1E1E24] text-white w-4 h-4 rounded-full flex justify-center items-center shrink-0">3</span> Literales (Exponentes de bases iguales se suman: <MathView latex="x^a \cdot x^b = x^{a+b}" inline />)</div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(['mono-mono', 'mono-poli', 'poli-poli'] as const).map(type => (
            <button
              key={type}
              onClick={() => { playSound('tap'); setActiveMult(type); }}
              className={`px-3 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer flex-1 min-w-[100px] flex items-center justify-center ${
                activeMult === type 
                  ? 'bg-[#1E1E24] text-white border-[#1E1E24] shadow-sm' 
                  : 'bg-white text-[#1E1E24]/60 border-[#1E1E24]/20 hover:border-[#1E1E24]/50'
              }`}
            >
              {type === 'mono-mono' && 'Mono × Mono'}
              {type === 'mono-poli' && 'Mono × Poli'}
              {type === 'poli-poli' && 'Poli × Poli'}
            </button>
          ))}
        </div>

        <div className="bg-[#f8faf9] rounded-xl border-2 border-[#1E1E24] p-4 text-center overflow-x-auto no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMult}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-4"
            >
              {activeMult === 'mono-mono' && (
                <>
                  <div className="font-bold text-xs text-[#8A909F] uppercase tracking-widest">Multiplicación Directa</div>
                  <div className="font-black text-lg text-[#1E1E24]"><MathView latex="(-3a^2b^3)(4ab^2)" inline /></div>
                  <div className="flex justify-center text-[#1E1E24]/40"><ChevronDown className="w-4 h-4" /></div>
                  <div className="font-bold text-sm text-[#38bdf8]"><MathView latex="(-3 \cdot 4)(a^{2+1})(b^{3+2})" inline /></div>
                  <div className="flex justify-center text-[#1E1E24]/40"><ChevronDown className="w-4 h-4" /></div>
                  <div className="font-black text-xl text-[#22C55E]"><MathView latex="-12a^3b^5" inline /></div>
                </>
              )}
              {activeMult === 'mono-poli' && (
                <>
                  <div className="font-bold text-xs text-[#8A909F] uppercase tracking-widest">Propiedad Distributiva</div>
                  <div className="font-black text-lg text-[#1E1E24]"><MathView latex="2x(3x^2 - 5x + 4)" inline /></div>
                  <div className="flex justify-center text-[#1E1E24]/40"><ChevronDown className="w-4 h-4" /></div>
                  <div className="font-bold text-sm text-[#38bdf8]"><MathView latex="(2x \cdot 3x^2) + (2x \cdot -5x) + (2x \cdot 4)" inline /></div>
                  <div className="flex justify-center text-[#1E1E24]/40"><ChevronDown className="w-4 h-4" /></div>
                  <div className="font-black text-xl text-[#22C55E]"><MathView latex="6x^3 - 10x^2 + 8x" inline /></div>
                </>
              )}
              {activeMult === 'poli-poli' && (
                <>
                  <div className="font-bold text-xs text-[#8A909F] uppercase tracking-widest">Binomio × Binomio</div>
                  <div className="font-black text-lg text-[#1E1E24]"><MathView latex="(x + 3)(2x - 1)" inline /></div>
                  <div className="flex justify-center text-[#1E1E24]/40"><ChevronDown className="w-4 h-4" /></div>
                  <div className="font-bold text-sm text-[#38bdf8]"><MathView latex="2x^2 - x + 6x - 3" inline /></div>
                  <div className="flex justify-center text-[#1E1E24]/40"><ChevronDown className="w-4 h-4" /></div>
                  <div className="font-black text-xl text-[#22C55E]"><MathView latex="2x^2 + 5x - 3" inline /></div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CARD 4: División Algebraica */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F7CA38] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <Divide className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            División
          </h2>
        </div>

        <div className="space-y-3">
          {/* Ley de Exponentes */}
          <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleDivConcept('leyes')}
              className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-xs sm:text-sm text-[#1E1E24] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>➗</span> Ley de Exponentes en Cocientes
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openDivConcept === 'leyes' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openDivConcept === 'leyes' && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-white text-xs sm:text-sm font-bold text-[#1E1E24]/80 space-y-3 border-t-2 border-[#1E1E24]/10">
                    <p>En la división de bases iguales, los exponentes se restan:</p>
                    <div className="bg-[#F8FAFC] border-2 border-[#1E1E24]/10 p-3 rounded-lg flex items-center justify-center text-[#1E1E24] font-black text-lg">
                      <MathView latex="\frac{x^a}{x^b} = x^{a-b}" inline />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Monomio entre Monomio */}
          <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleDivConcept('monomio')}
              className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-xs sm:text-sm text-[#1E1E24] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <SplitSquareHorizontal className="w-4 h-4 text-[#38bdf8]" /> Monomio entre Monomio
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openDivConcept === 'monomio' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openDivConcept === 'monomio' && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-white space-y-3 border-t-2 border-[#1E1E24]/10 overflow-x-auto no-scrollbar">
                    <div className="flex justify-center text-[#1E1E24]">
                      <MathView latex="\frac{-18x^5y^3}{6x^2y} = \left(\frac{-18}{6}\right) x^{5-2} y^{3-1} = \mathbf{-3x^3y^2}" inline />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Polinomio entre Monomio */}
          <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleDivConcept('polinomio')}
              className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-xs sm:text-sm text-[#1E1E24] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#22C55E]" /> Polinomio entre Monomio
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openDivConcept === 'polinomio' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openDivConcept === 'polinomio' && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-white text-xs font-bold text-[#1E1E24]/80 space-y-3 border-t-2 border-[#1E1E24]/10">
                    <p>Se separa en fracciones individuales dividiendo cada término del numerador:</p>
                    <div className="flex justify-center text-[#1E1E24] overflow-x-auto no-scrollbar pb-2 pt-2">
                      <MathView latex="\frac{6x^4 - 9x^3 + 3x^2}{3x^2} = \frac{6x^4}{3x^2} - \frac{9x^3}{3x^2} + \frac{3x^2}{3x^2}" inline />
                    </div>
                    <div className="flex justify-center font-black text-base text-[#22C55E]">
                      <MathView latex="= 2x^2 - 3x + 1" inline />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-4 bg-[#FFFDF5] border-2 border-[#F7CA38] rounded-xl p-3 flex items-start gap-3 shadow-xs">
          <Zap className="w-5 h-5 fill-[#F7CA38] text-[#F7CA38] shrink-0" />
          <p className="text-[11px] font-bold text-[#1E1E24]/80">
            <strong>DATO CLAVE:</strong> <MathView latex="\frac{3x^2}{3x^2} = 1" inline /> (nunca se elimina a cero, deja un término '1').
          </p>
        </div>
      </motion.div>
    </div>
  );
};
