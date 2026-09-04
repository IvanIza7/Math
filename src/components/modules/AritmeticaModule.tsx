import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Hash, Zap, Search, ArrowLeft, RefreshCw, CheckCircle2, Play } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

type TokenType = { id: string; latex: string; target: string; placed: boolean };
const INITIAL_TOKENS: TokenType[] = [
  { id: 't1', latex: '\\sqrt{2}', target: 'I', placed: false },
  { id: 't2', latex: '0.33\\dots', target: 'Frac', placed: false },
  { id: 't3', latex: '-5', target: 'Neg', placed: false },
  { id: 't4', latex: '7', target: 'N', placed: false },
  { id: 't5', latex: '\\pi', target: 'I', placed: false },
  { id: 't6', latex: '\\frac{1}{2}', target: 'Frac', placed: false },
];

export const ClasificacionNumerosModule: React.FC = () => {
  // --- Estado: La Aduana ---
  const [zoomLevel, setZoomLevel] = useState<'R' | 'Q' | 'Z'>('R');
  const [tokens, setTokens] = useState<TokenType[]>(INITIAL_TOKENS);
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  const [errorBox, setErrorBox] = useState<string | null>(null);

  const handleBoxClick = (boxId: string) => {
    if (selectedTokenId) {
      // Intentar colocar
      const token = tokens.find(t => t.id === selectedTokenId);
      if (token && token.target === boxId) {
        playSound('correct');
        setTokens(prev => prev.map(t => t.id === selectedTokenId ? { ...t, placed: true } : t));
        setSelectedTokenId(null);
      } else {
        playSound('error');
        setErrorBox(boxId);
        setTimeout(() => setErrorBox(null), 500);
        setSelectedTokenId(null);
      }
    } else {
      // Zoom
      if (boxId === 'Q') { playSound('click'); setZoomLevel('Q'); }
      if (boxId === 'Z') { playSound('click'); setZoomLevel('Z'); }
    }
  };

  // --- Estado: Odómetro ---
  const odoDigits = [
    { val: '3', name: 'Unidades de Millar', weight: '3000' },
    { val: '4', name: 'Centenas', weight: '400' },
    { val: '2', name: 'Decenas', weight: '20' },
    { val: '1', name: 'Unidades', weight: '1' },
    { val: '.', name: 'Punto Decimal', weight: '.' },
    { val: '7', name: 'Décimos', weight: '0.7' },
    { val: '9', name: 'Centésimos', weight: '0.09' },
  ];
  const [inspectedDigit, setInspectedDigit] = useState<number | null>(null);

  // --- Estado: Explosión ---
  const [isExpanded, setIsExpanded] = useState(false);
  const [flippedBlock, setFlippedBlock] = useState<number | null>(null);

  // --- Estado: Rompecabezas ---
  const PUZZLE_WORDS = ['Nueve enteros', 'con', 'setenta y nueve', 'centésimos'];
  const [bank, setBank] = useState<string[]>(['setenta y nueve', 'centésimos', 'con', 'Nueve enteros'].sort(() => Math.random() - 0.5));
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null, null]);
  const isPuzzleComplete = slots.every((s, i) => s === PUZZLE_WORDS[i]);

  const handleBankClick = (word: string) => {
    const emptyIndex = slots.findIndex(s => s === null);
    if (emptyIndex !== -1) {
      playSound('tap');
      const newSlots = [...slots];
      newSlots[emptyIndex] = word;
      setSlots(newSlots);
      setBank(bank.filter(w => w !== word));
    }
  };

  const handleSlotClick = (word: string, index: number) => {
    playSound('tap');
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    setBank([...bank, word]);
  };

  useEffect(() => {
    if (isPuzzleComplete && slots.length > 0) {
      playSound('success');
    }
  }, [isPuzzleComplete]);


  return (
    <div className="space-y-6">

      {/* CARD 1: La Aduana */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#00e676] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            La Aduana de los Reales
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Toca una ficha y luego toca su caja correcta. Toca una caja sin ficha para hacer zoom adentro.
        </p>

        {/* Zona de Fichas */}
        <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/20 rounded-xl p-3 mb-4 min-h-[70px] flex flex-wrap gap-2 items-center">
          {tokens.filter(t => !t.placed).length === 0 ? (
            <div className="w-full text-center text-sm font-black text-[#22C55E]">¡Todas las fichas clasificadas! 🎉</div>
          ) : (
            tokens.filter(t => !t.placed).map(token => (
              <button
                key={token.id}
                onClick={() => { playSound('tap'); setSelectedTokenId(selectedTokenId === token.id ? null : token.id); }}
                className={`px-3 py-1.5 rounded-lg border-2 font-black text-sm flex items-center justify-center transition-transform ${
                  selectedTokenId === token.id
                    ? 'bg-[#1E1E24] text-white border-[#1E1E24] scale-110 shadow-lg'
                    : 'bg-white text-[#1E1E24] border-[#1E1E24] hover:bg-gray-50'
                }`}
              >
                <MathView latex={token.latex} inline />
              </button>
            ))
          )}
        </div>

        {/* Cajas de La Aduana */}
        <div className="relative bg-[#1E1E24] rounded-2xl p-4 overflow-hidden min-h-[220px] flex flex-col">
          {/* Header Zoom */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-black text-white text-sm tracking-widest uppercase">
              {zoomLevel === 'R' ? 'NÚMEROS REALES (ℝ)' : zoomLevel === 'Q' ? 'RACIONALES (ℚ)' : 'ENTEROS (ℤ)'}
            </span>
            {zoomLevel !== 'R' && (
              <button
                onClick={() => { playSound('click'); setZoomLevel(zoomLevel === 'Z' ? 'Q' : 'R'); }}
                className="bg-white/10 hover:bg-white/20 text-white rounded-lg p-1.5 border border-white/20 flex items-center gap-1 text-xs font-bold transition-colors"
              >
                <ArrowLeft size={14} /> Volver
              </button>
            )}
          </div>

          {/* View: Reales */}
          <AnimatePresence mode="wait">
            {zoomLevel === 'R' && (
              <motion.div key="view-R" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }} className="flex-1 grid grid-cols-2 gap-3">
                <motion.button
                  animate={errorBox === 'Q' ? { x: [-5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleBoxClick('Q')}
                  className="bg-[#38bdf8] rounded-xl border-2 border-[#1E1E24] p-3 text-left relative overflow-hidden group cursor-pointer hover:brightness-110 shadow-[2px_2px_0px_0px_#1E1E24]"
                >
                  <div className="font-black text-[#1E1E24] text-lg mb-1">ℚ</div>
                  <div className="text-[10px] font-bold text-[#1E1E24]/80 leading-tight">Racionales<br/>(Fracciones y Enteros)</div>
                  <div className="absolute right-2 bottom-2 text-[#1E1E24]/30">🔍</div>
                </motion.button>
                <motion.button
                  animate={errorBox === 'I' ? { x: [-5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleBoxClick('I')}
                  className="bg-[#F7CA38] rounded-xl border-2 border-[#1E1E24] p-3 text-left relative overflow-hidden group cursor-pointer shadow-[2px_2px_0px_0px_#1E1E24]"
                >
                  <div className="font-black text-[#1E1E24] text-lg mb-1">𝕀</div>
                  <div className="text-[10px] font-bold text-[#1E1E24]/80 leading-tight">Irracionales<br/>(Decimales infinitos locos)</div>
                  <div className="mt-2 text-[10px] bg-white/40 rounded px-1 inline-block">
                    {tokens.filter(t => t.placed && t.target === 'I').length} fichas
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* View: Racionales */}
            {zoomLevel === 'Q' && (
              <motion.div key="view-Q" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }} className="flex-1 grid grid-cols-2 gap-3">
                <motion.button
                  animate={errorBox === 'Z' ? { x: [-5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleBoxClick('Z')}
                  className="bg-[#22C55E] rounded-xl border-2 border-[#1E1E24] p-3 text-left relative overflow-hidden group cursor-pointer hover:brightness-110 shadow-[2px_2px_0px_0px_#1E1E24]"
                >
                  <div className="font-black text-[#1E1E24] text-lg mb-1">ℤ</div>
                  <div className="text-[10px] font-bold text-[#1E1E24]/80 leading-tight">Enteros<br/>(Positivos, Cero, Negativos)</div>
                  <div className="absolute right-2 bottom-2 text-[#1E1E24]/30">🔍</div>
                </motion.button>
                <motion.button
                  animate={errorBox === 'Frac' ? { x: [-5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleBoxClick('Frac')}
                  className="bg-[#38bdf8]/50 rounded-xl border-2 border-[#1E1E24] p-3 text-left relative overflow-hidden group cursor-pointer shadow-[2px_2px_0px_0px_#1E1E24]"
                >
                  <div className="font-black text-white text-sm mb-1">Fraccionarios</div>
                  <div className="text-[10px] font-bold text-white/80 leading-tight">Decimales exactos y periódicos</div>
                  <div className="mt-2 text-[10px] bg-black/20 text-white rounded px-1 inline-block">
                    {tokens.filter(t => t.placed && t.target === 'Frac').length} fichas
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* View: Enteros */}
            {zoomLevel === 'Z' && (
              <motion.div key="view-Z" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }} className="flex-1 grid grid-cols-2 gap-3">
                <motion.button
                  animate={errorBox === 'N' ? { x: [-5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleBoxClick('N')}
                  className="bg-white rounded-xl border-2 border-[#1E1E24] p-3 text-left relative overflow-hidden group cursor-pointer shadow-[2px_2px_0px_0px_#1E1E24]"
                >
                  <div className="font-black text-[#1E1E24] text-lg mb-1">ℕ</div>
                  <div className="text-[10px] font-bold text-[#1E1E24]/80 leading-tight">Naturales<br/>(Para contar: 1, 2, 3...)</div>
                  <div className="mt-2 text-[10px] bg-[#1E1E24]/10 rounded px-1 inline-block">
                    {tokens.filter(t => t.placed && t.target === 'N').length} fichas
                  </div>
                </motion.button>
                <motion.button
                  animate={errorBox === 'Neg' ? { x: [-5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleBoxClick('Neg')}
                  className="bg-[#EF4444] rounded-xl border-2 border-[#1E1E24] p-3 text-left relative overflow-hidden group cursor-pointer shadow-[2px_2px_0px_0px_#1E1E24]"
                >
                  <div className="font-black text-white text-sm mb-1">Negativos</div>
                  <div className="text-[10px] font-bold text-white/80 leading-tight">Bajo cero (-1, -2, -3...)</div>
                  <div className="mt-2 text-[10px] bg-black/20 text-white rounded px-1 inline-block">
                    {tokens.filter(t => t.placed && t.target === 'Neg').length} fichas
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* CARD 2: El Odómetro */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#38bdf8] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Hash className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            El Odómetro Posicional
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Toca cualquier dígito para inspeccionar su "peso" real en el número.
        </p>

        <div className="bg-[#1E1E24] rounded-2xl p-4 sm:p-6 flex flex-col items-center">
          <div className="flex bg-[#0f0f13] border-4 border-[#38bdf8] rounded-xl overflow-hidden shadow-inner">
            {odoDigits.map((digit, i) => (
              <button
                key={i}
                onClick={() => { playSound('tap'); setInspectedDigit(i); }}
                className={`w-8 sm:w-12 h-12 sm:h-16 flex items-center justify-center font-mono font-black text-2xl sm:text-3xl border-r border-white/10 last:border-0 transition-colors ${
                  inspectedDigit === i ? 'bg-white text-[#1E1E24]' : 'bg-transparent text-white hover:bg-white/10'
                } ${digit.val === '.' ? 'bg-[#EF4444]/20 text-[#EF4444]' : ''}`}
              >
                {digit.val}
              </button>
            ))}
          </div>

          <div className="h-[80px] mt-4 w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {inspectedDigit !== null ? (
                <motion.div
                  key="inspected"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white border-2 border-[#1E1E24] rounded-xl p-3 w-full max-w-[250px] shadow-[2px_2px_0px_0px_#1E1E24] text-center"
                >
                  <div className="text-[10px] font-black text-[#1E1E24]/50 uppercase tracking-widest mb-1">
                    {odoDigits[inspectedDigit].name}
                  </div>
                  <div className="text-sm font-bold text-[#1E1E24]">
                    Dígito nominal: <span className="font-black text-xl text-[#38bdf8]">{odoDigits[inspectedDigit].val}</span>
                  </div>
                  {odoDigits[inspectedDigit].val !== '.' && (
                    <div className="text-xs font-bold text-[#1E1E24]/80 mt-1">
                      Peso real: <span className="font-black text-[#22C55E]">{odoDigits[inspectedDigit].weight}</span>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/40 text-xs font-bold flex items-center gap-2">
                  <span>👆</span> Toca un número
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* CARD 3: Explosión de Bloques */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F7CA38] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <Zap className="w-5 h-5 fill-[#1E1E24]" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Descomposición Aditiva
          </h2>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-bold text-[#1E1E24]/80">3421.79</p>
          <button
            onClick={() => { playSound('click'); setIsExpanded(!isExpanded); setFlippedBlock(null); }}
            className="px-4 py-2 bg-[#1E1E24] text-white rounded-xl font-black text-xs uppercase flex items-center gap-2 hover:bg-[#1E1E24]/90 transition-colors shadow-[2px_2px_0px_0px_#1E1E24]"
          >
            <RefreshCw size={14} className={isExpanded ? 'rotate-180 transition-transform' : 'transition-transform'} />
            {isExpanded ? 'Colapsar' : 'Explotar'}
          </button>
        </div>

        <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-4 min-h-[140px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div key="compact" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.2, opacity: 0 }} className="text-4xl font-black font-mono tracking-widest text-[#1E1E24]">
                3421.79
              </motion.div>
            ) : (
              <motion.div key="expanded" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { v: '3000', e: '3×10³', c: '#6F78DB' },
                  { v: '+', e: '+', c: '#1E1E24' },
                  { v: '400', e: '4×10²', c: '#38bdf8' },
                  { v: '+', e: '+', c: '#1E1E24' },
                  { v: '20', e: '2×10¹', c: '#22C55E' },
                  { v: '+', e: '+', c: '#1E1E24' },
                  { v: '1', e: '1×10⁰', c: '#F7CA38' },
                  { v: '+', e: '+', c: '#1E1E24' },
                  { v: '0.7', e: '7×10⁻¹', c: '#FB923C' },
                  { v: '+', e: '+', c: '#1E1E24' },
                  { v: '0.09', e: '9×10⁻²', c: '#EF4444' }
                ].map((blk, i) => (
                  blk.v === '+' ? (
                    <span key={i} className="font-black text-xl text-[#1E1E24]/30">{blk.v}</span>
                  ) : (
                    <motion.button
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => { playSound('tap'); setFlippedBlock(flippedBlock === i ? null : i); }}
                      className="px-3 py-2 rounded-lg border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] font-mono font-black text-sm relative overflow-hidden group hover:translate-y-[-2px] transition-transform"
                      style={{ backgroundColor: flippedBlock === i ? '#1E1E24' : 'white', color: flippedBlock === i ? 'white' : blk.c }}
                    >
                      {flippedBlock === i ? blk.e : blk.v}
                    </motion.button>
                  )
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-[10px] font-bold text-center text-[#1E1E24]/50 mt-3">
          {isExpanded ? 'Toca los bloques para ver su notación exponencial' : ''}
        </p>
      </motion.div>

      {/* CARD 4: Rompecabezas de Lectura */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Rompecabezas de Lectura
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Ordena las palabras para leer correctamente el número <span className="font-black text-lg bg-[#F7CA38]/30 px-2 rounded">9.79</span>.
        </p>

        {/* Slots */}
        <div className="flex flex-wrap gap-2 mb-6">
          {slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => slot && handleSlotClick(slot, i)}
              disabled={!slot || isPuzzleComplete}
              className={`flex-1 min-w-[80px] h-12 rounded-xl border-2 border-dashed flex items-center justify-center text-xs font-black transition-colors ${
                slot
                  ? isPuzzleComplete ? 'bg-[#22C55E] text-white border-[#1E1E24] border-solid shadow-[2px_2px_0px_0px_#1E1E24]' : 'bg-[#1E1E24] text-white border-[#1E1E24] border-solid shadow-[2px_2px_0px_0px_#1E1E24] cursor-pointer hover:bg-[#1E1E24]/80'
                  : 'border-[#1E1E24]/30 bg-[#f8faf9] text-[#1E1E24]/30'
              }`}
            >
              {slot || '?'}
            </button>
          ))}
        </div>

        {/* Word Bank */}
        <div className="bg-[#f8faf9] border-2 border-[#1E1E24]/10 rounded-xl p-4 min-h-[80px] flex flex-wrap gap-2 justify-center items-center">
          {isPuzzleComplete ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-[#22C55E] font-black">
              <CheckCircle2 size={24} /> ¡Lectura Correcta!
            </motion.div>
          ) : (
            bank.map((word, i) => (
              <button
                key={i}
                onClick={() => handleBankClick(word)}
                className="px-3 py-2 bg-white rounded-lg border-2 border-[#1E1E24] font-black text-xs text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] hover:bg-[#F7CA38]/20 transition-colors cursor-pointer"
              >
                {word}
              </button>
            ))
          )}
        </div>
      </motion.div>

    </div>
  );
};
