import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, GitFork, SlidersHorizontal, Sparkles, ChevronDown, Play, Info } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

export const ClasificacionNumerosModule: React.FC = () => {
  // Estado Card 1
  const [showAnalogy, setShowAnalogy] = useState(false);

  // Estado Card 2
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodeInfo: Record<string, { title: string, examples: string, rule: string }> = {
    'R': { title: 'Reales (ℝ)', examples: 'Todos los números', rule: 'Cualquier número en la recta numérica continua.' },
    'Q': { title: 'Racionales (ℚ)', examples: '\\frac{3}{4}, -5, 0.33\\dots', rule: 'Pueden expresarse como fracción exacta \\frac{a}{b}.' },
    'I': { title: 'Irracionales (𝕀)', examples: '\\sqrt{2}, \\;\\pi, \\;\\phi, \\;e', rule: 'Decimales infinitos sin periodo repetitivo. Imposibles de escribir como \\frac{a}{b}.' },
    'Z': { title: 'Enteros (ℤ)', examples: '-3, 0, 42', rule: 'Números sin parte fraccionaria ni decimal.' },
    'Frac': { title: 'Fraccionarios', examples: '0.5, \\frac{1}{3}, 0.\\overline{7}', rule: 'Partes de un entero, decimales exactos o periódicos.' },
    'N': { title: 'Naturales (ℕ)', examples: '1, 2, 3, 4\\dots', rule: 'Los números que usas para contar (enteros positivos).' },
    'Neg': { title: 'Negativos', examples: '-1, -2, -100', rule: 'Enteros menores que cero.' }
  };

  const handleNodeClick = (node: string) => {
    playSound('tap');
    setActiveNode(node);
  };

  // Estado Card 3
  type ClassType = 'Millones' | 'Millares' | 'Unidades' | 'Decimales';
  const [activePill, setActivePill] = useState<ClassType>('Millares');

  // Estado Card 4
  const [openConcept, setOpenConcept] = useState<string | null>(null);

  const toggleConcept = (concept: string) => {
    playSound('click');
    setOpenConcept(openConcept === concept ? null : concept);
  };

  return (
    <div className="space-y-6">
      {/* CARD 1: El Universo de los Números Reales */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 border-2 border-[#1E1E24]">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            ¿Qué son los Números Reales (ℝ)?
          </h2>
        </div>
        
        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Todos los números que existen en la recta continua: desde los enteros que usas para contar hasta decimales infinitos que describen el cosmos. Se dividen en dos reinos: Racionales e Irracionales.
        </p>

        <button
          onClick={() => { playSound('click'); setShowAnalogy(!showAnalogy); }}
          className={`w-full py-3 px-4 rounded-xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${showAnalogy
              ? 'bg-[#FFF9E6] border-[#F7CA38] text-[#1E1E24]'
              : 'bg-[#f8faf9] border-[#1E1E24] text-[#1E1E24] hover:bg-[#F7CA38]/10'
            }`}
        >
          <span>💡 Ver analogía rápida</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAnalogy ? 'rotate-180 text-[#F7CA38]' : ''}`} />
        </button>

        <AnimatePresence>
          {showAnalogy && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <div className="bg-[#FFF9E6] border-2 border-[#F7CA38]/30 p-4 rounded-xl text-sm font-bold text-[#1E1E24]/80 leading-relaxed">
                "Imagina una regla infinita: los Racionales son todas las marcas exactas que puedes medir doblando tiras de papel (mitades, cuartos, tercios). Los Irracionales son los huecos invisibles entre esas marcas (como <MathView latex="\pi" inline /> o <MathView latex="\sqrt{2}" inline />) que ninguna fracción puede tocar con exactitud."
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CARD 2: El Árbol Interactivo de Conjuntos */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-500 border-2 border-[#1E1E24]">
            <GitFork className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            El Árbol Interactivo
          </h2>
        </div>

        {/* Visor Táctil */}
        <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl p-4 sm:p-6 mb-4 overflow-x-auto relative">
          <div className="min-w-[300px] flex flex-col items-center gap-4 text-xs font-black uppercase text-[#1E1E24]">
            {/* Reales */}
            <button onClick={() => handleNodeClick('R')} className={`px-4 py-2 rounded-xl border-2 transition-all cursor-pointer ${activeNode === 'R' ? 'bg-[#22C55E] text-white border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] hover:bg-[#FFFDF5]'}`}>
              [ ℝ Reales ]
            </button>
            <div className="w-px h-4 bg-[#1E1E24]/30" />
            
            {/* Q e I */}
            <div className="flex w-full justify-around relative">
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-[#1E1E24]/30" />
              
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-[#1E1E24]/30" />
                <button onClick={() => handleNodeClick('Q')} className={`px-4 py-2 rounded-xl border-2 transition-all cursor-pointer ${activeNode === 'Q' ? 'bg-[#22C55E] text-white border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] hover:bg-[#FFFDF5]'}`}>
                  [ ℚ Racionales ]
                </button>
                <div className="w-px h-4 bg-[#1E1E24]/30" />
                
                {/* Z y Frac */}
                <div className="flex gap-4 relative">
                  <div className="absolute top-0 left-1/4 right-1/4 h-px bg-[#1E1E24]/30" />
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4 bg-[#1E1E24]/30" />
                    <button onClick={() => handleNodeClick('Z')} className={`px-3 py-2 rounded-xl border-2 transition-all cursor-pointer ${activeNode === 'Z' ? 'bg-[#22C55E] text-white border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] hover:bg-[#FFFDF5]'}`}>
                      [ ℤ Enteros ]
                    </button>
                    <div className="w-px h-4 bg-[#1E1E24]/30" />
                    
                    {/* N y Neg */}
                    <div className="flex gap-2 relative">
                      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-[#1E1E24]/30" />
                      <div className="flex flex-col items-center">
                        <div className="w-px h-4 bg-[#1E1E24]/30" />
                        <button onClick={() => handleNodeClick('N')} className={`px-2 py-2 rounded-xl border-2 transition-all cursor-pointer ${activeNode === 'N' ? 'bg-[#22C55E] text-white border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] hover:bg-[#FFFDF5]'}`}>
                          [ ℕ Nat ]
                        </button>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-px h-4 bg-[#1E1E24]/30" />
                        <button onClick={() => handleNodeClick('Neg')} className={`px-2 py-2 rounded-xl border-2 transition-all cursor-pointer ${activeNode === 'Neg' ? 'bg-[#22C55E] text-white border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] hover:bg-[#FFFDF5]'}`}>
                          [ Negativos ]
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4 bg-[#1E1E24]/30" />
                    <button onClick={() => handleNodeClick('Frac')} className={`px-3 py-2 rounded-xl border-2 transition-all cursor-pointer ${activeNode === 'Frac' ? 'bg-[#22C55E] text-white border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] hover:bg-[#FFFDF5]'}`}>
                      [ Fracciones ]
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-[#1E1E24]/30" />
                <button onClick={() => handleNodeClick('I')} className={`px-4 py-2 rounded-xl border-2 transition-all cursor-pointer ${activeNode === 'I' ? 'bg-[#22C55E] text-white border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] hover:bg-[#FFFDF5]'}`}>
                  [ 𝕀 Irracionales ]
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ficha Técnica */}
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border-2 border-[#1E1E24] rounded-2xl overflow-hidden mb-4 shadow-[2px_2px_0px_0px_#1E1E24]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#1E1E24]">
                <div className="p-3">
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">Conjunto</span>
                  <div className="font-black text-[#22C55E] text-sm">{nodeInfo[activeNode].title}</div>
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">Ejemplos</span>
                  <div className="font-bold text-sm text-[#1E1E24]"><MathView latex={nodeInfo[activeNode].examples} inline /></div>
                </div>
                <div className="p-3 sm:col-span-1">
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">Regla Clave</span>
                  <div className="font-bold text-xs leading-tight text-[#1E1E24]/80">{nodeInfo[activeNode].rule}</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-xs font-black uppercase text-[#1E1E24]/40 mb-4 py-4 border-2 border-dashed border-[#1E1E24]/20 rounded-2xl">
              Toca un nodo para inspeccionarlo
            </div>
          )}
        </AnimatePresence>

        {/* Banner TIP */}
        <div className="bg-blue-600 text-white p-3 rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] flex gap-2 items-start">
          <span className="text-xl leading-none">⚡</span>
          <p className="text-xs font-bold leading-tight">
            <span className="font-black">DATO CLAVE:</span> El cero (<MathView latex="0" inline />) no es positivo ni negativo; es la frontera neutra que separa los naturales de los enteros negativos.
          </p>
        </div>
      </motion.div>

      {/* CARD 3: Tablero de Valor Posicional */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/10 flex items-center justify-center text-cyan-500 border-2 border-[#1E1E24]">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Valor Posicional
          </h2>
        </div>

        {/* Píldoras */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-2 no-scrollbar">
          {(['Millones', 'Millares', 'Unidades', 'Decimales'] as ClassType[]).map((pill) => (
            <button
              key={pill}
              onClick={() => { playSound('tap'); setActivePill(pill); }}
              className={`px-4 py-2 rounded-full font-black text-xs uppercase tracking-wider shrink-0 transition-all border-2 cursor-pointer ${
                activePill === pill 
                  ? 'bg-cyan-400 text-[#1E1E24] border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]' 
                  : 'bg-white text-[#1E1E24]/60 border-transparent hover:bg-gray-100'
              }`}
            >
              [ {pill} ]
            </button>
          ))}
        </div>

        {/* Pantalla Guía */}
        <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl p-4 sm:p-6 mb-4 text-center overflow-hidden">
          <div className="font-mono text-2xl sm:text-4xl font-black tracking-widest flex justify-center gap-2">
            <span className={activePill === 'Millones' ? 'text-[#38bdf8] scale-110 transition-transform' : 'text-[#1E1E24]/20'}>3 000</span>
            <span className={activePill === 'Millares' ? 'text-[#38bdf8] scale-110 transition-transform' : 'text-[#1E1E24]/20'}>785</span>
            <span className={activePill === 'Unidades' ? 'text-[#38bdf8] scale-110 transition-transform' : 'text-[#1E1E24]/20'}>199</span>
            <span className={activePill === 'Decimales' ? 'text-[#38bdf8] scale-110 transition-transform' : 'text-[#1E1E24]/20'}>. 79</span>
          </div>
        </div>

        {/* Info Dinámica */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePill}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="bg-white rounded-xl border-2 border-[#1E1E24] p-4 shadow-sm"
          >
            {activePill === 'Millones' && (
              <div className="space-y-4 text-sm font-bold">
                <p><span className="text-[10px] font-black uppercase text-[#1E1E24]/50">Términos iluminados:</span> <span className="font-black text-lg text-[#1E1E24]">3 000</span></p>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-2">Orden y Valor:</span>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-white border-2 border-[#1E1E24] px-2 py-1.5 rounded-xl text-xs font-black text-[#1E1E24] flex gap-2 items-center shadow-[2px_2px_0px_0px_#1E1E24]">
                      <span>Unidades de millón</span>
                      <span className="bg-[#6F78DB] border-2 border-[#1E1E24] text-white px-1.5 py-0.5 rounded font-black"><MathView latex="3\,000\,000" inline /></span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-2">Potencias base 10:</span>
                  <div className="flex flex-wrap gap-2 items-center text-lg font-black text-[#1E1E24]">
                    <span className="text-[#6F78DB]"><MathView latex="3 \times 10^6" inline /></span>
                  </div>
                </div>
              </div>
            )}
            {activePill === 'Millares' && (
              <div className="space-y-4 text-sm font-bold">
                <p><span className="text-[10px] font-black uppercase text-[#1E1E24]/50">Términos iluminados:</span> <span className="font-black text-lg text-[#1E1E24]">785</span></p>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-2">Orden y Valor:</span>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-white border-2 border-[#1E1E24] px-2 py-1.5 rounded-xl text-xs font-black text-[#1E1E24] flex gap-2 items-center shadow-[2px_2px_0px_0px_#1E1E24]">
                      <span>Centenas de millar</span>
                      <span className="bg-[#38bdf8] border-2 border-[#1E1E24] text-[#1E1E24] px-1.5 py-0.5 rounded font-black"><MathView latex="700\,000" inline /></span>
                    </div>
                    <div className="bg-white border-2 border-[#1E1E24] px-2 py-1.5 rounded-xl text-xs font-black text-[#1E1E24] flex gap-2 items-center shadow-[2px_2px_0px_0px_#1E1E24]">
                      <span>Decenas de millar</span>
                      <span className="bg-[#22C55E] border-2 border-[#1E1E24] text-white px-1.5 py-0.5 rounded font-black"><MathView latex="80\,000" inline /></span>
                    </div>
                    <div className="bg-white border-2 border-[#1E1E24] px-2 py-1.5 rounded-xl text-xs font-black text-[#1E1E24] flex gap-2 items-center shadow-[2px_2px_0px_0px_#1E1E24]">
                      <span>Unidades de millar</span>
                      <span className="bg-[#ec4899] border-2 border-[#1E1E24] text-white px-1.5 py-0.5 rounded font-black"><MathView latex="5\,000" inline /></span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-2">Potencias base 10:</span>
                  <div className="flex flex-wrap gap-2 items-center text-lg font-black text-[#1E1E24]">
                    <span className="text-[#38bdf8]"><MathView latex="7 \times 10^5" inline /></span>
                    <span className="text-[#1E1E24]/30">+</span>
                    <span className="text-[#22C55E]"><MathView latex="8 \times 10^4" inline /></span>
                    <span className="text-[#1E1E24]/30">+</span>
                    <span className="text-[#ec4899]"><MathView latex="5 \times 10^3" inline /></span>
                  </div>
                </div>
              </div>
            )}
            {activePill === 'Unidades' && (
              <div className="space-y-4 text-sm font-bold">
                <p><span className="text-[10px] font-black uppercase text-[#1E1E24]/50">Términos iluminados:</span> <span className="font-black text-lg text-[#1E1E24]">199</span></p>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-2">Orden y Valor:</span>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-white border-2 border-[#1E1E24] px-2 py-1.5 rounded-xl text-xs font-black text-[#1E1E24] flex gap-2 items-center shadow-[2px_2px_0px_0px_#1E1E24]">
                      <span>Centenas</span>
                      <span className="bg-[#F7CA38] border-2 border-[#1E1E24] text-[#1E1E24] px-1.5 py-0.5 rounded font-black"><MathView latex="100" inline /></span>
                    </div>
                    <div className="bg-white border-2 border-[#1E1E24] px-2 py-1.5 rounded-xl text-xs font-black text-[#1E1E24] flex gap-2 items-center shadow-[2px_2px_0px_0px_#1E1E24]">
                      <span>Decenas</span>
                      <span className="bg-[#FB923C] border-2 border-[#1E1E24] text-[#1E1E24] px-1.5 py-0.5 rounded font-black"><MathView latex="90" inline /></span>
                    </div>
                    <div className="bg-white border-2 border-[#1E1E24] px-2 py-1.5 rounded-xl text-xs font-black text-[#1E1E24] flex gap-2 items-center shadow-[2px_2px_0px_0px_#1E1E24]">
                      <span>Unidades</span>
                      <span className="bg-[#EF4444] border-2 border-[#1E1E24] text-white px-1.5 py-0.5 rounded font-black"><MathView latex="9" inline /></span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-2">Potencias base 10:</span>
                  <div className="flex flex-wrap gap-2 items-center text-lg font-black text-[#1E1E24]">
                    <span className="text-[#F7CA38]"><MathView latex="1 \times 10^2" inline /></span>
                    <span className="text-[#1E1E24]/30">+</span>
                    <span className="text-[#FB923C]"><MathView latex="9 \times 10^1" inline /></span>
                    <span className="text-[#1E1E24]/30">+</span>
                    <span className="text-[#EF4444]"><MathView latex="9 \times 10^0" inline /></span>
                  </div>
                </div>
              </div>
            )}
            {activePill === 'Decimales' && (
              <div className="space-y-4 text-sm font-bold">
                <p><span className="text-[10px] font-black uppercase text-[#1E1E24]/50">Términos iluminados:</span> <span className="font-black text-lg text-[#1E1E24]">.79</span></p>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-2">Orden y Valor:</span>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-white border-2 border-[#1E1E24] px-2 py-1.5 rounded-xl text-xs font-black text-[#1E1E24] flex gap-2 items-center shadow-[2px_2px_0px_0px_#1E1E24]">
                      <span>Décimos</span>
                      <span className="bg-[#22d3ee] border-2 border-[#1E1E24] text-[#1E1E24] px-1.5 py-0.5 rounded font-black"><MathView latex="0.7" inline /></span>
                    </div>
                    <div className="bg-white border-2 border-[#1E1E24] px-2 py-1.5 rounded-xl text-xs font-black text-[#1E1E24] flex gap-2 items-center shadow-[2px_2px_0px_0px_#1E1E24]">
                      <span>Centésimos</span>
                      <span className="bg-[#a855f7] border-2 border-[#1E1E24] text-white px-1.5 py-0.5 rounded font-black"><MathView latex="0.09" inline /></span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-[#1E1E24]/80 mt-3 bg-[#f8faf9] p-3 border-2 border-[#1E1E24]/20 rounded-xl">
                    Pronunciación: <span className="italic font-black text-[#1E1E24]">"Setenta y nueve centésimos"</span>
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-2">Potencias base 10:</span>
                  <div className="flex flex-wrap gap-2 items-center text-lg font-black text-[#1E1E24]">
                    <span className="text-[#22d3ee] drop-shadow-[1px_1px_0px_rgba(30,30,36,0.3)]"><MathView latex="7 \times 10^{-1}" inline /></span>
                    <span className="text-[#1E1E24]/30">+</span>
                    <span className="text-[#a855f7]"><MathView latex="9 \times 10^{-2}" inline /></span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* CARD 4: Conceptos Clave */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-500 border-2 border-[#1E1E24]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Conceptos Clave
          </h2>
        </div>

        <div className="space-y-3">
          {/* Acordeón 1: Descomposición Aditiva */}
          <div className="border-2 border-[#1E1E24] rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => toggleConcept('descomp')}
              className="w-full p-4 flex items-center justify-between bg-[#f8faf9] hover:bg-[#FFFDF5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">💥</span>
                <span className="font-black text-[#1E1E24] uppercase tracking-wider text-sm text-left">Descomposición Aditiva</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${openConcept === 'descomp' ? 'rotate-180 text-amber-500' : 'text-[#1E1E24]/40'}`} />
            </button>
            <AnimatePresence>
              {openConcept === 'descomp' && (
                <motion.div layout initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t-2 border-[#1E1E24]/10">
                  <div className="p-4 space-y-4">
                    <div className="text-center font-black text-2xl text-[#1E1E24]">3421.79</div>
                    <div className="flex justify-center text-xl font-black text-[#1E1E24] flex-wrap gap-2 text-center">
                      <MathView latex="3000 + 400 + 20 + 1 + 0.7 + 0.09" inline />
                    </div>
                    <div className="bg-[#1E1E24] border-2 border-[#1E1E24] rounded-xl p-3 text-white font-mono text-xs overflow-x-auto text-center">
                      <MathView latex="3 \times 10^3 + 4 \times 10^2 + 2 \times 10^1 + 1 \times 10^0 + 7 \times 10^{-1} + 9 \times 10^{-2}" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Acordeón 2: Lector Numérico */}
          <div className="border-2 border-[#1E1E24] rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => toggleConcept('lector')}
              className="w-full p-4 flex items-center justify-between bg-[#f8faf9] hover:bg-[#FFFDF5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🗣️</span>
                <span className="font-black text-[#1E1E24] uppercase tracking-wider text-sm text-left">Lector y Transcriptor Numérico</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${openConcept === 'lector' ? 'rotate-180 text-amber-500' : 'text-[#1E1E24]/40'}`} />
            </button>
            <AnimatePresence>
              {openConcept === 'lector' && (
                <motion.div layout initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t-2 border-[#1E1E24]/10">
                  <div className="p-4 space-y-3">
                    <div className="bg-white border-2 border-[#1E1E24] rounded-xl p-4 flex gap-3 shadow-[2px_2px_0px_0px_#1E1E24]">
                      <button className="w-10 h-10 rounded-full bg-[#1E1E24] text-white flex items-center justify-center shrink-0 hover:bg-black cursor-pointer">
                        <Play className="w-4 h-4 fill-white ml-1" />
                      </button>
                      <div>
                        <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">Cifra: 4 100 378</span>
                        <p className="font-bold text-[#1E1E24]">"Cuatro millones cien mil trescientos setenta y ocho."</p>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-800 p-3 rounded-xl border border-green-300 flex items-start gap-2">
                      <span className="text-sm">✅</span>
                      <p className="text-xs font-bold leading-relaxed">
                        Identifica el punto final como el nombre del orden (ej. 305.3274 termina en <strong>diezmilésimos</strong>).
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Acordeón 3: Finitos vs Periódicos */}
          <div className="border-2 border-[#1E1E24] rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => toggleConcept('racionales')}
              className="w-full p-4 flex items-center justify-between bg-[#f8faf9] hover:bg-[#FFFDF5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">⚖️</span>
                <span className="font-black text-[#1E1E24] uppercase tracking-wider text-sm text-left">Racionales: Finitos vs. Periódicos</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${openConcept === 'racionales' ? 'rotate-180 text-amber-500' : 'text-[#1E1E24]/40'}`} />
            </button>
            <AnimatePresence>
              {openConcept === 'racionales' && (
                <motion.div layout initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t-2 border-[#1E1E24]/10">
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-emerald-100 border-2 border-emerald-400 p-3 rounded-xl text-center">
                      <span className="text-[10px] font-black uppercase text-emerald-700 block mb-2">Decimal Exacto</span>
                      <div className="text-xl font-black text-emerald-900">
                        <MathView latex="\frac{3}{4} = 0.75" inline />
                      </div>
                      <p className="text-[10px] font-bold text-emerald-700 mt-2">Los decimales se detienen.</p>
                    </div>
                    <div className="bg-blue-100 border-2 border-blue-400 p-3 rounded-xl text-center">
                      <span className="text-[10px] font-black uppercase text-blue-700 block mb-2">Decimal Periódico</span>
                      <div className="text-xl font-black text-blue-900">
                        <MathView latex="\frac{1}{3} = 0.333\dots = 0.\overline{3}" inline />
                      </div>
                      <p className="text-[10px] font-bold text-blue-700 mt-2">El arquito marca la repetición infinita.</p>
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
