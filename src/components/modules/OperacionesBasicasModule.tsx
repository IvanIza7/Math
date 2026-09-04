import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles, Activity, SlidersHorizontal, BookmarkCheck, ChevronDown, AlertTriangle } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

type OpKey = 'suma' | 'resta' | 'mult' | 'div' | 'pot' | 'raiz';

interface PartInfo {
  name: string;
  val: string;
  role: string;
}

const OP_DATA: Record<OpKey, { parts: Record<string, PartInfo>, tip?: string }> = {
  'suma': {
    parts: {
      'sum1': { name: 'Sumando', val: '15', role: 'Cantidad a la que se le añade otra.' },
      'sum2': { name: 'Sumando', val: '27', role: 'Cantidad que se añade.' },
      'total': { name: 'Suma o Total', val: '42', role: 'El resultado final de combinar las cantidades.' }
    }
  },
  'resta': {
    parts: {
      'minuendo': { name: 'Minuendo', val: '50', role: 'Cantidad inicial de la que se va a restar.' },
      'sustraendo': { name: 'Sustraendo', val: '18', role: 'Cantidad que se quita o sustrae.' },
      'dif': { name: 'Diferencia', val: '32', role: 'Resultado de la resta; lo que queda.' }
    }
  },
  'mult': {
    parts: {
      'factor1': { name: 'Factor (Multiplicando)', val: '8', role: 'El número que será sumado repetidamente.' },
      'factor2': { name: 'Factor (Multiplicador)', val: '5', role: 'Indica cuántas veces sumar el multiplicando.' },
      'prod': { name: 'Producto', val: '40', role: 'El resultado de la multiplicación.' }
    }
  },
  'div': {
    parts: {
      'dividendo': { name: 'Dividendo', val: '40', role: 'La cantidad total que se va a repartir.' },
      'divisor': { name: 'Divisor', val: '6', role: 'El número de partes iguales en las que se reparte.' },
      'cociente': { name: 'Cociente', val: '6', role: 'El resultado: cuánto le toca a cada parte.' },
      'residuo': { name: 'Residuo', val: '4', role: 'Lo que sobra y no alcanza a formar un entero más.' }
    }
  },
  'pot': {
    parts: {
      'base': { name: 'Base', val: '5', role: 'El número que se va a multiplicar por sí mismo.' },
      'exp': { name: 'Exponente', val: '3', role: 'Las veces que la base aparece como factor.' },
      'potencia': { name: 'Potencia', val: '125', role: 'El resultado de multiplicar la base las veces indicadas.' }
    },
    tip: "⚡ Potencia al cuadrado: Cuando el exponente es 2 se lee 'al cuadrado' porque representa el área de un cuadrado."
  },
  'raiz': {
    parts: {
      'indice': { name: 'Índice', val: '2', role: 'Indica el grado de la raíz (cuántas veces debe multiplicarse el resultado por sí mismo).' },
      'radical': { name: 'Radical', val: '√', role: 'El símbolo matemático de la operación.' },
      'radicando': { name: 'Radicando / Subradical', val: '16', role: 'La cantidad a la cual se le extrae la raíz.' },
      'raiz': { name: 'Raíz', val: '4', role: 'El resultado que, elevado al índice, da el radicando.' }
    },
    tip: "⚡ Raíz Cuadrada Secreta: Si el radical no lleva número en el índice (√a), el índice siempre es 2. ¡No existe la raíz con índice 1 o 0!"
  }
};

export const OperacionesBasicasModule: React.FC = () => {
  const [showAnalogy, setShowAnalogy] = useState(false);
  const [activeOp, setActiveOp] = useState<OpKey>('suma');
  const [activePart, setActivePart] = useState<string>('sum1');
  const [signosTab, setSignosTab] = useState<'sr' | 'md'>('sr');
  const [openAcc, setOpenAcc] = useState<string | null>(null);

  const handleOpChange = (op: OpKey, defaultPart: string) => {
    playSound('click');
    setActiveOp(op);
    setActivePart(defaultPart);
  };

  const currentOpData = OP_DATA[activeOp];
  const currentPartData = currentOpData.parts[activePart];

  const renderOpVisualizer = () => {
    const isSelected = (part: string) => activePart === part;
    const btnClass = (part: string) => `
      cursor-pointer px-3 py-1 md:py-2 rounded-xl border-2 font-black text-lg md:text-2xl md:px-4 flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#1E1E24]
      ${isSelected(part) ? 'bg-[#22C55E] border-[#1E1E24] text-white scale-110 z-10 shadow-[4px_4px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] text-[#1E1E24] hover:bg-slate-100'}
    `;

    switch (activeOp) {
      case 'suma':
        return (
          <div className="flex items-center justify-center gap-2 md:gap-4 font-black text-2xl md:text-4xl text-[#1E1E24]">
            <button onClick={() => { playSound('tap'); setActivePart('sum1'); }} className={btnClass('sum1')}>15</button>
            <span className="text-[#22C55E]">+</span>
            <button onClick={() => { playSound('tap'); setActivePart('sum2'); }} className={btnClass('sum2')}>27</button>
            <span className="text-[#22C55E]">=</span>
            <button onClick={() => { playSound('tap'); setActivePart('total'); }} className={btnClass('total')}>42</button>
          </div>
        );
      case 'resta':
        return (
          <div className="flex items-center justify-center gap-2 md:gap-4 font-black text-2xl md:text-4xl text-[#1E1E24]">
            <button onClick={() => { playSound('tap'); setActivePart('minuendo'); }} className={btnClass('minuendo')}>50</button>
            <span className="text-[#22C55E]">-</span>
            <button onClick={() => { playSound('tap'); setActivePart('sustraendo'); }} className={btnClass('sustraendo')}>18</button>
            <span className="text-[#22C55E]">=</span>
            <button onClick={() => { playSound('tap'); setActivePart('dif'); }} className={btnClass('dif')}>32</button>
          </div>
        );
      case 'mult':
        return (
          <div className="flex items-center justify-center gap-2 md:gap-4 font-black text-2xl md:text-4xl text-[#1E1E24]">
            <button onClick={() => { playSound('tap'); setActivePart('factor1'); }} className={btnClass('factor1')}>8</button>
            <span className="text-[#22C55E]">×</span>
            <button onClick={() => { playSound('tap'); setActivePart('factor2'); }} className={btnClass('factor2')}>5</button>
            <span className="text-[#22C55E]">=</span>
            <button onClick={() => { playSound('tap'); setActivePart('prod'); }} className={btnClass('prod')}>40</button>
          </div>
        );
      case 'div':
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-end gap-2 md:gap-4 font-black text-2xl md:text-4xl text-[#1E1E24] mb-4">
               <button onClick={() => { playSound('tap'); setActivePart('cociente'); }} className={btnClass('cociente')}>6</button>
            </div>
            <div className="flex items-center gap-2 md:gap-4 font-black text-2xl md:text-4xl text-[#1E1E24]">
               <button onClick={() => { playSound('tap'); setActivePart('divisor'); }} className={btnClass('divisor')}>6</button>
               <span className="text-[#22C55E]">│</span>
               <button onClick={() => { playSound('tap'); setActivePart('dividendo'); }} className={btnClass('dividendo')}>40</button>
            </div>
            <div className="flex flex-col items-end gap-1 font-black text-xl md:text-2xl text-[#1E1E24] mt-4 pr-4">
              <span className="text-[#22C55E] border-b-4 border-[#22C55E] pb-1">- 36</span>
              <button onClick={() => { playSound('tap'); setActivePart('residuo'); }} className={btnClass('residuo')}>4</button>
            </div>
          </div>
        );
      case 'pot':
        return (
          <div className="flex items-center justify-center gap-4 font-black text-[#1E1E24]">
            <div className="flex items-start">
               <button onClick={() => { playSound('tap'); setActivePart('base'); }} className={btnClass('base')}>5</button>
               <div className="-mt-4 -ml-2 z-20">
                 <button onClick={() => { playSound('tap'); setActivePart('exp'); }} className={`cursor-pointer px-2 py-1 rounded-lg border-2 font-black text-sm md:text-lg flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#1E1E24] ${isSelected('exp') ? 'bg-[#22C55E] border-[#1E1E24] text-white scale-110 shadow-[4px_4px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] text-[#1E1E24] hover:bg-slate-100'}`}>3</button>
               </div>
            </div>
            <span className="text-[#22C55E] text-2xl md:text-4xl">=</span>
            <button onClick={() => { playSound('tap'); setActivePart('potencia'); }} className={btnClass('potencia')}>125</button>
          </div>
        );
      case 'raiz':
        return (
          <div className="flex items-center justify-center gap-4 font-black text-[#1E1E24]">
             <div className="flex items-start">
                 <div className="mt-2 -mr-3 z-20">
                   <button onClick={() => { playSound('tap'); setActivePart('indice'); }} className={`cursor-pointer px-2 py-1 rounded-lg border-2 font-black text-xs md:text-sm flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#1E1E24] ${isSelected('indice') ? 'bg-[#22C55E] border-[#1E1E24] text-white scale-110 shadow-[4px_4px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] text-[#1E1E24] hover:bg-slate-100'}`}>2</button>
                 </div>
                 <button onClick={() => { playSound('tap'); setActivePart('radical'); }} className={`cursor-pointer px-2 py-1 rounded-xl border-2 font-black text-2xl md:text-4xl flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#1E1E24] ${isSelected('radical') ? 'bg-[#22C55E] border-[#1E1E24] text-white scale-110 z-10 shadow-[4px_4px_0px_0px_#1E1E24]' : 'bg-white border-[#1E1E24] text-[#1E1E24] hover:bg-slate-100'}`}>√</button>
                 <div className="-ml-2 mt-4 z-0">
                    <button onClick={() => { playSound('tap'); setActivePart('radicando'); }} className={btnClass('radicando')}>16</button>
                 </div>
             </div>
             <span className="text-[#22C55E] text-2xl md:text-4xl">=</span>
             <button onClick={() => { playSound('tap'); setActivePart('raiz'); }} className={btnClass('raiz')}>4</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-4xl mx-auto pb-10"
    >
      {/* 1. Tarjeta: El Motor de las Operaciones (Introducción) */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#F7CA38] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
            <Zap className="w-6 h-6 fill-[#F7CA38]" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
            El Motor de las<br/>Operaciones
          </h2>
        </div>
        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Las 6 operaciones aritméticas fundamentales (adición, sustracción, multiplicación, división, potenciación y radicación) son las reglas de transformación numérica. Su comportamiento está regido por la jerarquía operativa y las leyes de signos.
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => { playSound('pop'); setShowAnalogy(!showAnalogy); }}
          className="w-full bg-[#FFF9E6] border-2 border-[#F7CA38] text-[#D97706] font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#FFF3C2] transition-colors"
        >
          <Sparkles className="w-5 h-5" /> {showAnalogy ? 'Ocultar analogía' : 'Ver analogía rápida'}
        </motion.button>

        <AnimatePresence>
          {showAnalogy && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-[#FFFDF5] border-l-4 border-l-[#F7CA38] border-2 border-[#1E1E24] p-4 rounded-r-xl shadow-[2px_2px_0px_0px_#1E1E24]">
                <p className="text-sm font-bold text-[#1E1E24] leading-relaxed">
                  Imagina una cuenta bancaria y un termómetro: los números positivos son depósitos de dinero o grados sobre cero (calor); los negativos son deudas que debes pagar o grados bajo cero (frío). Restar un número negativo no es quitar dinero: ¡es que te perdonen una deuda, por lo que mágicamente tu saldo sube como si fuera una suma positiva!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2. Tarjeta: Anatomía de las Operaciones (Visualizador Táctil) */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#22C55E] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
            Anatomía de las<br/>Operaciones
          </h2>
        </div>

        {/* Tabs Selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { id: 'suma', label: 'Suma', p: 'sum1' },
            { id: 'resta', label: 'Resta', p: 'minuendo' },
            { id: 'mult', label: 'Multiplicación', p: 'factor1' },
            { id: 'div', label: 'División', p: 'dividendo' },
            { id: 'pot', label: 'Potencia', p: 'base' },
            { id: 'raiz', label: 'Raíz', p: 'radicando' }
          ].map(op => (
            <button
              key={op.id}
              onClick={() => handleOpChange(op.id as OpKey, op.p)}
              className={`px-3 py-1.5 rounded-lg border-2 font-black text-xs md:text-sm flex-1 sm:flex-none transition-colors ${
                activeOp === op.id
                  ? 'bg-[#1E1E24] border-[#1E1E24] text-white'
                  : 'bg-[#f8faf9] border-[#1E1E24]/20 text-[#1E1E24]/60 hover:border-[#1E1E24]/50 hover:bg-slate-100'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>

        {/* Consola */}
        <div className="bg-[#f8faf9] p-8 rounded-2xl border-2 border-[#1E1E24] shadow-[inset_0_4px_6px_rgba(0,0,0,0.05)] flex items-center justify-center min-h-[200px] mb-4">
          {renderOpVisualizer()}
        </div>

        {/* Tabla Info Dinámica */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePart}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="bg-white rounded-xl border-2 border-[#1E1E24] p-4 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">Elemento</span>
                <span className="font-black text-[#1E1E24] bg-white border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] px-2 py-1 rounded-md">{currentPartData.name}</span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">En el Ejemplo</span>
                <span className="font-black text-xl text-[#1E1E24]">{currentPartData.val}</span>
              </div>
              <div className="md:col-span-3 border-t-2 border-[#1E1E24]/10 pt-2">
                <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">Rol Matemático</span>
                <span className="font-bold text-[#1E1E24]/80 leading-snug">{currentPartData.role}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {currentOpData.tip && (
          <div className="mt-4 bg-[#f8faf9] p-3 border-2 border-[#1E1E24]/20 rounded-xl text-xs font-bold text-[#1E1E24]/80">
            {currentOpData.tip}
          </div>
        )}
      </motion.div>

      {/* 3. Tarjeta: El Semáforo de los Signos (Pestañas tipo Píldora) */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#38bdf8] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
            El Semáforo de<br/>los Signos
          </h2>
        </div>

        <div className="flex bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl p-1 mb-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => { playSound('click'); setSignosTab('sr'); }}
            className={`flex-1 py-2 font-black text-xs md:text-sm rounded-lg transition-all ${
              signosTab === 'sr' ? 'bg-[#38bdf8] text-white border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]' : 'text-[#1E1E24]/50 hover:text-[#1E1E24]'
            }`}
          >
            Suma y Resta
          </button>
          <button
            onClick={() => { playSound('click'); setSignosTab('md'); }}
            className={`flex-1 py-2 font-black text-xs md:text-sm rounded-lg transition-all ${
              signosTab === 'md' ? 'bg-[#ec4899] text-white border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]' : 'text-[#1E1E24]/50 hover:text-[#1E1E24]'
            }`}
          >
            Multiplicación y División
          </button>
        </div>

        <div className="bg-white border-2 border-[#1E1E24] rounded-xl p-4 md:p-6 shadow-[2px_2px_0px_0px_#1E1E24] min-h-[220px]">
          <AnimatePresence mode="wait">
            {signosTab === 'sr' && (
              <motion.div key="sr" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded bg-[#22C55E] flex items-center justify-center font-black text-white text-xs border-2 border-[#1E1E24]">1</span>
                    <span className="font-black text-[#1E1E24] text-sm uppercase">Mismo Signo</span>
                  </div>
                  <p className="text-xs md:text-sm font-bold text-[#1E1E24]/80 mb-2 pl-8">Se suman los valores absolutos y se conserva el signo.</p>
                  <div className="flex flex-wrap gap-4 pl-8">
                    <div className="bg-[#f8faf9] px-3 py-1.5 rounded-lg border-2 border-[#1E1E24] font-black text-sm text-[#1E1E24]"><MathView latex="(-5) + (-7) = -12" inline /></div>
                    <div className="bg-[#f8faf9] px-3 py-1.5 rounded-lg border-2 border-[#1E1E24] font-black text-sm text-[#1E1E24]"><MathView latex="(+6) + (+2) = +8" inline /></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded bg-[#EF4444] flex items-center justify-center font-black text-white text-xs border-2 border-[#1E1E24]">2</span>
                    <span className="font-black text-[#1E1E24] text-sm uppercase">Signos Contrarios</span>
                  </div>
                  <p className="text-xs md:text-sm font-bold text-[#1E1E24]/80 mb-2 pl-8">Se restan y predomina el signo del mayor en valor absoluto.</p>
                  <div className="flex flex-wrap gap-4 pl-8">
                    <div className="bg-[#f8faf9] px-3 py-1.5 rounded-lg border-2 border-[#1E1E24] font-black text-sm text-[#1E1E24]"><MathView latex="-8 + 2 = -6" inline /></div>
                    <div className="bg-[#f8faf9] px-3 py-1.5 rounded-lg border-2 border-[#1E1E24] font-black text-sm text-[#1E1E24]"><MathView latex="+8 - 2 = +6" inline /></div>
                  </div>
                </div>

                <div className="bg-[#FFFDF5] border-2 border-[#1E1E24] rounded-xl p-3 flex gap-3 text-sm">
                   <div className="text-lg">🔄</div>
                   <div>
                     <strong className="text-[#1E1E24] block mb-1">Regla 3 (Resta formal): Sumar el simétrico</strong>
                     <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#1E1E24]/20"><MathView latex="4 - (-3) = 4 + 3 = \mathbf{7}" inline /></span>
                   </div>
                </div>
              </motion.div>
            )}

            {signosTab === 'md' && (
              <motion.div key="md" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-[#1E1E24] rounded-xl p-4 shadow-[2px_2px_0px_0px_#1E1E24]">
                    <div className="font-black text-sm text-[#1E1E24] uppercase mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div> Signos Iguales
                    </div>
                    <p className="text-xs font-bold text-[#1E1E24]/80 mb-3">Dan siempre positivo (+).</p>
                    <div className="space-y-2">
                       <div className="bg-[#f8faf9] p-2 rounded-lg border-2 border-[#1E1E24]/10 font-black text-center text-sm text-[#22C55E]"><MathView latex="(+) \cdot (+) = \mathbf{+}" inline /></div>
                       <div className="bg-[#f8faf9] p-2 rounded-lg border-2 border-[#1E1E24]/10 font-black text-center text-sm text-[#22C55E]"><MathView latex="(-) \cdot (-) = \mathbf{+}" inline /></div>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-[#1E1E24] rounded-xl p-4 shadow-[2px_2px_0px_0px_#1E1E24]">
                    <div className="font-black text-sm text-[#1E1E24] uppercase mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div> Signos Distintos
                    </div>
                    <p className="text-xs font-bold text-[#1E1E24]/80 mb-3">Dan siempre negativo (-).</p>
                    <div className="space-y-2">
                       <div className="bg-[#f8faf9] p-2 rounded-lg border-2 border-[#1E1E24]/10 font-black text-center text-sm text-[#EF4444]"><MathView latex="(+) \cdot (-) = \mathbf{-}" inline /></div>
                       <div className="bg-[#f8faf9] p-2 rounded-lg border-2 border-[#1E1E24]/10 font-black text-center text-sm text-[#EF4444]"><MathView latex="(-) \cdot (+) = \mathbf{-}" inline /></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#f8faf9] border-2 border-[#1E1E24] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] rounded-xl p-4 text-center">
                   <div className="font-black text-[10px] text-[#1E1E24]/50 uppercase tracking-widest mb-2">Ejemplos Clave</div>
                   <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 font-black text-lg text-[#1E1E24]">
                      <div><MathView latex="(-6)(-3) = \mathbf{+18}" inline /></div>
                      <div className="hidden md:block w-[2px] h-8 bg-[#1E1E24]/20"></div>
                      <div><MathView latex="\frac{-20}{+5} = \mathbf{-4}" inline /></div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 4. Tarjeta: Propiedades y Conceptos Clave (Acordeones Expandibles) */}
      <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#a855f7] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
            Propiedades y<br/>Conceptos
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'prop1',
              title: '🔄 Propiedad Conmutativa vs. Asociativa',
              color: '#38bdf8',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-3">
                  <div className="bg-white border-2 border-[#1E1E24] rounded-xl p-4 shadow-[2px_2px_0px_0px_#1E1E24]">
                    <h3 className="font-black text-[#1E1E24] uppercase text-xs mb-2 text-[#38bdf8]">Conmutativa</h3>
                    <p className="font-bold text-[#1E1E24]/80 text-xs mb-3">El orden de los elementos no altera el resultado.</p>
                    <div className="bg-[#f8faf9] px-3 py-2 rounded-lg font-black text-center text-[#1E1E24]"><MathView latex="a + b = b + a" inline /></div>
                    <div className="bg-[#f8faf9] px-3 py-2 mt-2 rounded-lg font-black text-center text-[#1E1E24]"><MathView latex="a \cdot b = b \cdot a" inline /></div>
                  </div>
                  <div className="bg-white border-2 border-[#1E1E24] rounded-xl p-4 shadow-[2px_2px_0px_0px_#1E1E24]">
                     <h3 className="font-black text-[#1E1E24] uppercase text-xs mb-2 text-[#ec4899]">Asociativa</h3>
                     <p className="font-bold text-[#1E1E24]/80 text-xs mb-3">La agrupación con paréntesis no cambia el total.</p>
                     <div className="bg-[#f8faf9] px-3 py-2 rounded-lg font-black text-center text-[#1E1E24]"><MathView latex="(a + b) + c = a + (b + c)" inline /></div>
                  </div>
                </div>
              )
            },
            {
              id: 'prop2',
              title: '⚡ Ley Distributiva (La Repartidora)',
              color: '#F7CA38',
              content: (
                <div className="mt-3 space-y-4">
                  <p className="font-bold text-[#1E1E24]/80 text-sm">El factor exterior multiplica a cada término interior por separado.</p>
                  <div className="bg-white border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] rounded-xl p-4 text-center font-black text-[#1E1E24] text-lg overflow-x-auto no-scrollbar">
                    <MathView latex="a(b + c) = ab + ac \implies 3(2x + 5) = 6x + 15" inline />
                  </div>
                  <div className="bg-[#FEF2F2] border-2 border-[#EF4444] rounded-xl p-3 flex items-start gap-3 relative overflow-hidden text-sm">
                    <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                    <div className="font-bold text-[#991B1B]">
                      <strong>❌ Error típico:</strong> Multiplicar solo al primero:<br/>
                      <span className="font-mono font-black block mt-1"><MathView latex="3(2x + 5) \neq 6x + 5" inline /></span>
                    </div>
                  </div>
                </div>
              )
            },
            {
              id: 'prop3',
              title: '🎯 Elemento Neutro e Inverso',
              color: '#22C55E',
              content: (
                <div className="mt-3 bg-white border-2 border-[#1E1E24] rounded-xl shadow-[2px_2px_0px_0px_#1E1E24] overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#1E1E24]">
                    <div className="p-4 space-y-4">
                       <h3 className="font-black text-[#1E1E24] uppercase text-xs">Neutro</h3>
                       <div className="space-y-2 text-sm">
                         <div className="flex justify-between items-center"><span className="font-bold text-[#1E1E24]/80 text-xs">Suma:</span> <span className="font-black bg-[#f8faf9] px-2 py-1 rounded"><MathView latex="a + 0 = a" inline /></span></div>
                         <div className="flex justify-between items-center"><span className="font-bold text-[#1E1E24]/80 text-xs">Multiplicación:</span> <span className="font-black bg-[#f8faf9] px-2 py-1 rounded"><MathView latex="a \cdot 1 = a" inline /></span></div>
                       </div>
                    </div>
                    <div className="p-4 space-y-4">
                       <h3 className="font-black text-[#1E1E24] uppercase text-xs">Inverso</h3>
                       <div className="space-y-2 text-sm">
                         <div className="flex justify-between items-center"><span className="font-bold text-[#1E1E24]/80 text-xs">Aditivo (Simétrico):</span> <span className="font-black bg-[#f8faf9] px-2 py-1 rounded"><MathView latex="a + (-a) = 0" inline /></span></div>
                         <div className="flex justify-between items-center"><span className="font-bold text-[#1E1E24]/80 text-xs">Multiplicativo:</span> <span className="font-black bg-[#f8faf9] px-2 py-1 rounded"><MathView latex="a \cdot \frac{1}{a} = 1" inline /></span></div>
                       </div>
                    </div>
                  </div>
                </div>
              )
            },
            {
              id: 'prop4',
              title: '🪜 La Escalera de Jerarquía (PEMDAS)',
              color: '#a855f7',
              content: (
                <div className="mt-3 space-y-2 relative">
                  <div className="absolute top-0 bottom-0 left-4 w-1 bg-[#1E1E24]/10 rounded-full"></div>
                  {[
                    { num: '1', text: 'Paréntesis y signos de agrupación: ( ), [ ], { }' },
                    { num: '2', text: 'Potencias y Raíces', math: 'x^2, \\sqrt{x}' },
                    { num: '3', text: 'Multiplicaciones y Divisiones (izq. a der.)' },
                    { num: '4', text: 'Sumas y Restas (izq. a der.)' }
                  ].map((step, i) => (
                     <div key={i} className="flex items-center gap-3 relative z-10 bg-white border-2 border-[#1E1E24] rounded-xl p-3 shadow-[2px_2px_0px_0px_#1E1E24] ml-2 hover:-translate-y-1 transition-transform cursor-default">
                       <div className="w-8 h-8 rounded-lg bg-white border-2 border-[#1E1E24] text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] font-black flex items-center justify-center shrink-0">{step.num}</div>
                       <div className="font-bold text-[#1E1E24] text-sm">
                         {step.text} {step.math && <span className="ml-2 bg-[#f8faf9] px-2 py-0.5 rounded-md"><MathView latex={step.math} inline /></span>}
                       </div>
                     </div>
                  ))}
                </div>
              )
            }
          ].map((acc) => (
            <div key={acc.id} className="border-2 border-[#1E1E24] rounded-xl overflow-hidden bg-white shadow-[2px_2px_0px_0px_#1E1E24]">
              <button
                onClick={() => { playSound('tap'); setOpenAcc(openAcc === acc.id ? null : acc.id); }}
                className="w-full bg-[#f8faf9] hover:bg-slate-100 p-4 flex items-center justify-between font-black text-sm text-[#1E1E24] transition-colors"
              >
                <div className="flex items-center gap-2">{acc.title}</div>
                <ChevronDown className={`w-5 h-5 transition-transform ${openAcc === acc.id ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openAcc === acc.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="p-4 border-t-2 border-[#1E1E24]/10 bg-[#f8faf9]/50">
                      {acc.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
};
