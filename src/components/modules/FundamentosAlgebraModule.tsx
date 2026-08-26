import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Info, CheckCircle2, XCircle, ChevronDown, BookOpen, Hash, Tag, Layers, Zap } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

export const FundamentosAlgebraModule: React.FC = () => {
  const [showAnalogy, setShowAnalogy] = useState(false);
  const [activeAnatomy, setActiveAnatomy] = useState<'signo' | 'coeficiente' | 'literales' | 'exponentes'>('signo');
  const [activeClass, setActiveClass] = useState<'monomio' | 'binomio' | 'trinomio' | 'polinomio'>('monomio');
  const [openConcept, setOpenConcept] = useState<string | null>(null);

  const toggleConcept = (concept: string) => {
    playSound('click');
    setOpenConcept(openConcept === concept ? null : concept);
  };

  return (
    <div className="space-y-6">
      {/* CARD 1: ¿Qué es el Álgebra? */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#6F78DB] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            ¿Qué es el Álgebra?
          </h2>
        </div>
        
        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Es la generalización de la aritmética. Usamos números, signos y letras (variables) para descubrir valores desconocidos y modelar patrones.
        </p>

        <button
          onClick={() => {
            playSound('click');
            setShowAnalogy(!showAnalogy);
          }}
          className={`w-full py-3 px-4 rounded-xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            showAnalogy 
              ? 'bg-[#FFF9E6] border-[#F7CA38] text-[#1E1E24]' 
              : 'bg-[#f8faf9] border-[#1E1E24] text-[#1E1E24] hover:bg-[#F7CA38]/10'
          }`}
        >
          <Lightbulb className={showAnalogy ? 'fill-[#F7CA38]' : ''} size={18} />
          {showAnalogy ? 'Ocultar analogía' : 'Ver analogía rápida'}
        </button>

        <AnimatePresence>
          {showAnalogy && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-4 bg-[#FFF9E6] rounded-xl border-2 border-[#F7CA38]/30 text-sm font-bold text-[#1E1E24]/80">
                Imagina una caja cerrada con una etiqueta <strong>'x'</strong>. Dentro hay un número exacto que descubriremos al resolver el acertijo.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CARD 2: Anatomía de un Término */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Hash className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Anatomía de un Término
          </h2>
        </div>

        {/* Visual Block */}
        <div className="bg-[#1E1E24] rounded-2xl p-6 mb-4 flex justify-center items-center">
          <div className="flex items-end text-5xl sm:text-6xl font-black text-white gap-0.5">
            <button 
              onClick={() => { playSound('tap'); setActiveAnatomy('signo'); }}
              className={`transition-colors px-1 rounded-lg cursor-pointer ${activeAnatomy === 'signo' ? 'text-[#F7CA38] bg-white/10' : 'hover:text-[#F7CA38]'}`}
            >
              -
            </button>
            <button 
              onClick={() => { playSound('tap'); setActiveAnatomy('coeficiente'); }}
              className={`transition-colors px-1 rounded-lg cursor-pointer ${activeAnatomy === 'coeficiente' ? 'text-[#38bdf8] bg-white/10' : 'hover:text-[#38bdf8]'}`}
            >
              5
            </button>
            <button 
              onClick={() => { playSound('tap'); setActiveAnatomy('literales'); }}
              className={`transition-colors px-1 rounded-lg cursor-pointer ${activeAnatomy === 'literales' ? 'text-[#22C55E] bg-white/10' : 'hover:text-[#22C55E]'}`}
            >
              x
            </button>
            <button 
              onClick={() => { playSound('tap'); setActiveAnatomy('exponentes'); }}
              className={`text-2xl sm:text-3xl mb-4 transition-colors px-1 rounded-lg cursor-pointer ${activeAnatomy === 'exponentes' ? 'text-[#ec4899] bg-white/10' : 'hover:text-[#ec4899]'}`}
            >
              3
            </button>
            <button 
              onClick={() => { playSound('tap'); setActiveAnatomy('literales'); }}
              className={`transition-colors px-1 rounded-lg cursor-pointer ${activeAnatomy === 'literales' ? 'text-[#22C55E] bg-white/10' : 'hover:text-[#22C55E]'}`}
            >
              y
            </button>
            <button 
              onClick={() => { playSound('tap'); setActiveAnatomy('exponentes'); }}
              className={`text-2xl sm:text-3xl mb-4 transition-colors px-1 rounded-lg cursor-pointer ${activeAnatomy === 'exponentes' ? 'text-[#ec4899] bg-white/10' : 'hover:text-[#ec4899]'}`}
            >
              2
            </button>
          </div>
        </div>

        {/* Info Table */}
        <div className="bg-[#f8faf9] rounded-xl border-2 border-[#1E1E24] overflow-hidden">
          <div className="grid grid-cols-3 bg-[#1E1E24] text-white text-[10px] font-black uppercase tracking-wider p-2 text-center">
            <div>Elemento</div>
            <div>Ejemplo</div>
            <div>Regla Oculta</div>
          </div>
          <div className="grid grid-cols-3 text-xs sm:text-sm font-bold text-[#1E1E24] p-3 text-center items-center divide-x-2 divide-[#1E1E24]/10">
            {activeAnatomy === 'signo' && (
              <>
                <div className="text-[#F7CA38] font-black uppercase">Signo</div>
                <div><MathView latex="-" inline /></div>
                <div className="text-left px-2">Si no se ve, es <MathView latex="+" inline /></div>
              </>
            )}
            {activeAnatomy === 'coeficiente' && (
              <>
                <div className="text-[#38bdf8] font-black uppercase text-[10px] sm:text-[12px] break-words">Coeficiente</div>
                <div>5</div>
                <div className="text-left px-2">Si no se ve, es <MathView latex="1" inline /></div>
              </>
            )}
            {activeAnatomy === 'literales' && (
              <>
                <div className="text-[#22C55E] font-black uppercase text-[10px] sm:text-[12px] break-words">Literales</div>
                <div><MathView latex="x, y" inline /></div>
                <div className="text-left px-2">Letras / Variables</div>
              </>
            )}
            {activeAnatomy === 'exponentes' && (
              <>
                <div className="text-[#ec4899] font-black uppercase text-[10px] sm:text-[12px] break-words">Exponentes</div>
                <div>3, 2</div>
                <div className="text-left px-2">Si no se ve, es <MathView latex="1" inline /></div>
              </>
            )}
          </div>
        </div>

        <div className="mt-3 bg-[#FFFDF5] border-2 border-[#F7CA38] rounded-xl p-3 flex items-start gap-3 shadow-xs">
          <Zap className="w-5 h-5 fill-[#F7CA38] text-[#F7CA38] shrink-0" />
          <p className="text-[11px] font-bold text-[#1E1E24]/80">
            <strong>TIP:</strong> Si ves solo <MathView latex="x" inline />, realmente es <MathView latex="+1x^1" inline /> (Signo +, Coef 1, Exponente 1).
          </p>
        </div>
      </motion.div>

      {/* CARD 3: Clasificación por Términos */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#38bdf8] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Clasificación
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {(['monomio', 'binomio', 'trinomio', 'polinomio'] as const).map(type => (
            <button
              key={type}
              onClick={() => { playSound('tap'); setActiveClass(type); }}
              className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${
                activeClass === type 
                  ? 'bg-[#1E1E24] text-white border-[#1E1E24] shadow-sm' 
                  : 'bg-white text-[#1E1E24]/60 border-[#1E1E24]/20 hover:border-[#1E1E24]/50'
              }`}
            >
              {type === 'polinomio' ? 'Polinomio (4+)' : type}
            </button>
          ))}
        </div>

        <div className="bg-[#f8faf9] rounded-xl border-2 border-[#1E1E24] p-4 text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#1E1E24]/50 mb-3">
            {activeClass === 'monomio' && '1 Término'}
            {activeClass === 'binomio' && '2 Términos'}
            {activeClass === 'trinomio' && '3 Términos'}
            {activeClass === 'polinomio' && '≥ 2 Términos'}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xl font-black text-[#1E1E24]">
            {activeClass === 'monomio' && (
              <><MathView latex="3x" inline /> <span className="hidden sm:inline text-[#1E1E24]/20">|</span> <MathView latex="-7a^2" inline /></>
            )}
            {activeClass === 'binomio' && (
              <><MathView latex="2x + 5" inline /> <span className="hidden sm:inline text-[#1E1E24]/20">|</span> <MathView latex="a^2 - b^2" inline /></>
            )}
            {activeClass === 'trinomio' && (
              <MathView latex="x^2 + 6x + 9" inline />
            )}
            {activeClass === 'polinomio' && (
              <MathView latex="4x^3 - 2x^2 + 5x - 7" inline />
            )}
          </div>
        </div>
      </motion.div>

      {/* CARD 4: Conceptos Clave */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F7CA38] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <Tag className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Conceptos Clave
          </h2>
        </div>

        <div className="space-y-3">
          {/* Semejantes */}
          <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleConcept('semejantes')}
              className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-xs sm:text-sm text-[#1E1E24] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>🍏</span> Términos Semejantes
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openConcept === 'semejantes' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openConcept === 'semejantes' && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-white text-xs font-bold text-[#1E1E24]/80 space-y-3 border-t-2 border-[#1E1E24]/10">
                    <p>Deben tener <strong>exactamente las mismas letras y exponentes</strong>.</p>
                    <div className="bg-[#DCFCE7] p-2 rounded-lg flex items-center gap-2 text-[#166534] border border-[#22C55E]/30">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Semejantes: <MathView latex="4x^2y" inline /> y <MathView latex="-9x^2y" inline /> (se pueden sumar)</span>
                    </div>
                    <div className="bg-[#FEE2E2] p-2 rounded-lg flex items-center gap-2 text-[#991B1B] border border-[#EF4444]/30">
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span>Diferentes: <MathView latex="4x^2y" inline /> y <MathView latex="4xy^2" inline /> (NO se pueden sumar)</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Valor Numérico */}
          <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleConcept('valor')}
              className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-xs sm:text-sm text-[#1E1E24] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>🎯</span> Valor Numérico
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openConcept === 'valor' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openConcept === 'valor' && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-white text-[11px] sm:text-xs font-bold text-[#1E1E24]/80 space-y-2 border-t-2 border-[#1E1E24]/10">
                    <p>Cambia las letras por números reales y resuelve:</p>
                    <div className="bg-[#1E1E24] p-3 rounded-lg font-mono text-[#F8FAFC]">
                      Si <MathView latex="P(x) = 2x^2 - 3x + 1" inline /> y <MathView latex="x = 2" inline /><br/>
                      <span className="text-[#38bdf8]">↳</span> <MathView latex="P(2) = 2(2)^2 - 3(2) + 1" inline /><br/>
                      <span className="text-[#1E1E24]">↳</span> <MathView latex="P(2) = 8 - 6 + 1 = 3" inline />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Grado */}
          <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleConcept('grado')}
              className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-xs sm:text-sm text-[#1E1E24] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>📐</span> Grado de un Término
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openConcept === 'grado' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openConcept === 'grado' && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-white text-xs font-bold text-[#1E1E24]/80 space-y-2 border-t-2 border-[#1E1E24]/10">
                    <p>Suma total de los exponentes de sus letras:</p>
                    <div className="bg-[#F8FAFC] border-2 border-[#1E1E24]/10 p-3 rounded-lg flex items-center justify-center text-[#1E1E24]">
                      <MathView latex="-5x^3y^2 \rightarrow 3 + 2 = \text{Grado } 5" inline />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
