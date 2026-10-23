import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Network, FileText, Scale, Layers, Monitor, ScanSearch, Blocks, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
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

// Datos Clasificación
const SET_DATA: Record<string, any> = {
  'R': {
    name: 'Números Reales (ℝ)',
    definition: 'El conjunto universal continuo. Incluye todo punto en la recta.',
    elements: '-\\infty \\dots 0 \\dots +\\infty',
    behavior: 'Llenan la recta numérica sin huecos.',
  },
  'Q': {
    name: 'Números Racionales (ℚ)',
    definition: 'Todo valor expresable en la forma \\frac{a}{b}, donde a, b \\in \\mathbb{Z} y b \\neq 0',
    elements: '-12, \\quad 0, \\quad \\frac{3}{5}, \\quad 0.75, \\quad 0.\\overline{333}',
    behavior: 'Decimal finito exacto o infinito con periodo regular repetitivo.',
  },
  'I': {
    name: 'Números Irracionales (𝕀)',
    definition: 'Valores continuos que NO pueden expresarse como cociente de enteros.',
    elements: '\\sqrt{2}, \\quad \\pi, \\quad e, \\quad \\phi',
    behavior: 'Decimal infinito aperiódico (sin patrón que se repita).',
  },
  'Z': {
    name: 'Números Enteros (ℤ)',
    definition: 'Números exactos sin parte fraccionaria ni decimal.',
    elements: '\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots',
    behavior: 'Saltos discretos y exactos en la recta.',
  },
  'N': {
    name: 'Números Naturales (ℕ)',
    definition: 'Enteros estrictamente positivos usados para conteo.',
    elements: '1, 2, 3, 4, 5, \\dots',
    behavior: 'Empiezan en 1 y crecen infinitamente.',
  }
};

const BALANZA_DATA: Record<string, any> = {
  '-8': { R: true, Q: true, Z: true, N: false, msg: 'Es un entero negativo. Por transitividad, es también racional y real.' },
  '0': { R: true, Q: true, Z: true, N: false, msg: 'El cero es entero neutro. Es racional (0/1) y real.' },
  '3/4': { R: true, Q: true, Z: false, N: false, msg: 'Fracción pura. Es racional y real, pero no entero.' },
  '\\sqrt{5}': { R: true, Q: false, Z: false, N: false, msg: 'Raíz inexacta. Es irracional, por ende real, pero nada más.' }
};

export const ClasificacionNumerosModule: React.FC = () => {
  const [showRealAnalogy, setShowRealAnalogy] = useState(false);
  const [activeSet, setActiveSet] = useState<string>('Q');
  
  const [activeBalanzaNum, setActiveBalanzaNum] = useState<string>('-8');
  const [balanzaStep, setBalanzaStep] = useState<number>(0);
  
  const [showPosAnalogy, setShowPosAnalogy] = useState(false);
  const [activePeriod, setActivePeriod] = useState<string>('Millares');
  const [expMode, setExpMode] = useState<'sum' | 'pow'>('sum');

  useEffect(() => {
    setBalanzaStep(0);
    const timer1 = setTimeout(() => { setBalanzaStep(1); playSound('pop'); }, 500);
    const timer2 = setTimeout(() => { setBalanzaStep(2); playSound('pop'); }, 1000);
    const timer3 = setTimeout(() => { setBalanzaStep(3); playSound('pop'); }, 1500);
    const timer4 = setTimeout(() => { setBalanzaStep(4); playSound('pop'); }, 2000);
    const timer5 = setTimeout(() => { setBalanzaStep(5); playSound('pop'); }, 2500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4); clearTimeout(timer5); };
  }, [activeBalanzaNum]);

  const renderCheck = (val: boolean, stepReq: number) => {
    if (balanzaStep < stepReq) return <div className="w-6 h-6 border-2 border-[#1E1E24]/20 rounded-full animate-pulse bg-slate-100" />;
    return val 
      ? <div className="flex items-center gap-1 text-[#22C55E] font-black"><CheckCircle2 className="w-6 h-6 fill-[#22C55E]/20" /> OK</div>
      : <div className="flex items-center gap-1 text-[#EF4444] font-black"><XCircle className="w-6 h-6 fill-[#EF4444]/20" /> NO</div>;
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-12 max-w-4xl mx-auto pb-10">
      
      {/* SECCIÓN 1: CLASIFICACIÓN */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b-4 border-[#1E1E24] pb-2">
          <h1 className="text-3xl font-black text-[#1E1E24] uppercase tracking-tighter">I. Clasificación Numérica (ℝ)</h1>
        </div>

        {/* Tarjeta 1: Marco Conceptual */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#38bdf8] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
              Dimensión del Conjunto Real
            </h2>
          </div>
          <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
            «Los Números Reales (ℝ) representan la totalidad de magnitudes continuas medibles en una dimensión. Garantizan que a cada punto geométrico de la recta le corresponda un valor numérico exacto, integrando dos dominios fundamentales: lo conmensurable mediante fracciones (Racionales) y lo continuo no periódico (Irracionales).»
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => { playSound('pop'); setShowRealAnalogy(!showRealAnalogy); }}
            className="w-full bg-[#f8faf9] border-2 border-[#1E1E24] text-[#1E1E24] font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-[2px_2px_0px_0px_#1E1E24]"
          >
            <HelpCircle className="w-5 h-5 text-[#38bdf8]" /> {showRealAnalogy ? 'Ocultar Perspectiva' : 'Perspectiva conceptual'}
          </motion.button>

          <AnimatePresence>
            {showRealAnalogy && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-4">
                <div className="bg-white border-l-4 border-l-[#38bdf8] border-2 border-[#1E1E24] p-4 rounded-r-xl shadow-[2px_2px_0px_0px_#1E1E24]">
                  <p className="text-sm font-bold text-[#1E1E24] leading-relaxed">
                    «Visualiza la recta numérica como una regla milimétrica de precisión infinita. Los números racionales son todas las marcas exactas que puedes calibrar mediante proporciones (mitades, tercios, centésimos). Los irracionales son los valores continuos entre esas marcas que no admiten una división exacta, como la diagonal de un cuadrado unitario (√2) o la relación de la circunferencia (π). Juntos cubren la recta sin dejar un solo vacío.»
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tarjeta 2: Matriz de Clasificación Estructurada */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#ec4899] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
              <Network className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
              Matriz de Clasificación Estructurada
            </h2>
          </div>
          
          <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl p-4 shadow-[inset_0_4px_6px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col gap-3">
              <button onClick={() => { playSound('tap'); setActiveSet('R'); }} className={`w-full py-2 border-2 font-black text-sm uppercase rounded-xl transition-all ${activeSet === 'R' ? 'bg-[#ec4899] text-white border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] scale-[1.02]' : 'bg-white border-[#1E1E24] text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]'}`}>
                ℝ SISTEMA REAL
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { playSound('tap'); setActiveSet('Q'); }} className={`py-2 border-2 font-black text-xs uppercase rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${activeSet === 'Q' ? 'bg-[#38bdf8] text-[#1E1E24] border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] scale-[1.02] z-10' : 'bg-white border-[#1E1E24] text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]'}`}>
                  <span>ℚ Racionales</span>
                  <span className="text-[9px] opacity-80">(Conmensurables)</span>
                </button>
                <button onClick={() => { playSound('tap'); setActiveSet('I'); }} className={`py-2 border-2 font-black text-xs uppercase rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${activeSet === 'I' ? 'bg-[#a855f7] text-white border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] scale-[1.02] z-10' : 'bg-white border-[#1E1E24] text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]'}`}>
                  <span>𝕀 Irracionales</span>
                  <span className="text-[9px] opacity-80">(Trascendentes/Rad)</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="flex gap-2">
                  <button onClick={() => { playSound('tap'); setActiveSet('Z'); }} className={`flex-1 py-2 border-2 font-black text-[10px] sm:text-xs uppercase rounded-xl transition-all ${activeSet === 'Z' ? 'bg-[#22C55E] text-[#1E1E24] border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] scale-[1.02] z-10' : 'bg-white border-[#1E1E24] text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]'}`}>
                    ℤ Enteros
                  </button>
                  <button onClick={() => { playSound('tap'); setActiveSet('N'); }} className={`flex-1 py-2 border-2 font-black text-[10px] sm:text-xs uppercase rounded-xl transition-all ${activeSet === 'N' ? 'bg-[#F7CA38] text-[#1E1E24] border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] scale-[1.02] z-10' : 'bg-white border-[#1E1E24] text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]'}`}>
                    ℕ Naturales
                  </button>
                </div>
                <button className={`py-2 border-2 font-black text-xs uppercase rounded-xl transition-all bg-slate-100 text-[#1E1E24]/50 border-[#1E1E24]/20 cursor-not-allowed`}>
                  Fraccionarios
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tarjeta 3: Ficha Técnica */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#F7CA38] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
              Ficha Técnica del Dominio
            </h2>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div key={activeSet} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="bg-white border-2 border-[#1E1E24] rounded-xl shadow-[4px_4px_0px_0px_#1E1E24] overflow-hidden">
              <div className="bg-[#1E1E24] text-white font-black px-4 py-2 uppercase text-sm border-b-2 border-[#1E1E24]">Registro Activo: {SET_DATA[activeSet].name}</div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">Definición Rigurosa</span>
                  <div className="font-bold text-sm text-[#1E1E24]"><MathView latex={SET_DATA[activeSet].definition} /></div>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">Elementos Representativos</span>
                  <div className="font-black text-lg text-[#1E1E24] bg-[#f8faf9] border-2 border-[#1E1E24] px-2 py-1 rounded shadow-[2px_2px_0px_0px_#1E1E24]"><MathView latex={SET_DATA[activeSet].elements} /></div>
                </div>
                <div className="md:col-span-2 border-t-2 border-[#1E1E24]/10 pt-3">
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">Comportamiento Decimal</span>
                  <div className="font-bold text-sm text-[#1E1E24]/80">{SET_DATA[activeSet].behavior}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {(activeSet === 'Q' || activeSet === 'Z' || activeSet === 'R') && (
            <motion.div initial={{ opacity: 0, mt: 0 }} animate={{ opacity: 1, mt: 16 }} className="bg-[#FFFDF5] border-2 border-[#1E1E24] p-4 rounded-xl flex gap-3 shadow-[2px_2px_0px_0px_#1E1E24]">
              <span className="text-2xl">📌</span>
              <div>
                <strong className="text-[#1E1E24] block uppercase font-black text-xs mb-1">PRINCIPIO CLAVE: El Cero (0)</strong>
                <p className="text-sm font-bold text-[#1E1E24]/80 leading-snug">
                  Funciona como elemento neutro aditivo. No posee signo (ni positivo ni negativo); es el origen simétrico que delimita los enteros positivos de los negativos.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Tarjeta 4: Verificador Diagnóstico */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#22C55E] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
              La Balanza de Pertenencia
            </h2>
          </div>

          <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl p-4 md:p-6 shadow-[inset_0_4px_6px_rgba(0,0,0,0.05)]">
            <div className="text-xs font-black uppercase text-[#1E1E24] mb-3">Selecciona un número para auditar:</div>
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(BALANZA_DATA).map(num => (
                <button
                  key={num}
                  onClick={() => { playSound('click'); setActiveBalanzaNum(num); }}
                  className={`px-4 py-2 font-black text-lg rounded-xl border-2 transition-all ${activeBalanzaNum === num ? 'bg-[#1E1E24] text-white border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] scale-[1.02]' : 'bg-white text-[#1E1E24] border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] hover:bg-slate-100'}`}
                >
                  <MathView latex={num} inline />
                </button>
              ))}
            </div>

            <div className="bg-white border-2 border-[#1E1E24] rounded-xl p-4 shadow-[4px_4px_0px_0px_#1E1E24]">
              <div className="font-black text-sm text-[#1E1E24] border-b-2 border-[#1E1E24]/10 pb-2 mb-3">
                Trayectoria en el sistema para: <span className="text-[#38bdf8] text-xl ml-2"><MathView latex={activeBalanzaNum} inline /></span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center font-bold text-sm bg-[#f8faf9] p-2 rounded-lg border-2 border-[#1E1E24]/10">
                  <span>• Pertenece a ℝ (Reales)</span>
                  {renderCheck(BALANZA_DATA[activeBalanzaNum].R, 1)}
                </div>
                <div className="flex justify-between items-center font-bold text-sm bg-[#f8faf9] p-2 rounded-lg border-2 border-[#1E1E24]/10">
                  <span>• Pertenece a ℚ (Racional)</span>
                  {renderCheck(BALANZA_DATA[activeBalanzaNum].Q, 2)}
                </div>
                <div className="flex justify-between items-center font-bold text-sm bg-[#f8faf9] p-2 rounded-lg border-2 border-[#1E1E24]/10">
                  <span>• Pertenece a ℤ (Entero relativo)</span>
                  {renderCheck(BALANZA_DATA[activeBalanzaNum].Z, 3)}
                </div>
                <div className="flex justify-between items-center font-bold text-sm bg-[#f8faf9] p-2 rounded-lg border-2 border-[#1E1E24]/10">
                  <span>• Pertenece a ℕ (Natural)</span>
                  {renderCheck(BALANZA_DATA[activeBalanzaNum].N, 4)}
                </div>
              </div>

              {balanzaStep >= 5 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t-2 border-[#1E1E24]/10">
                  <div className="font-black text-xs text-[#1E1E24]/50 uppercase mb-1">Diagnóstico Final</div>
                  <p className="font-bold text-[#1E1E24] text-sm leading-snug">{BALANZA_DATA[activeBalanzaNum].msg}</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* SECCIÓN 2: VALOR POSICIONAL */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-3 border-b-4 border-[#1E1E24] pb-2">
          <h1 className="text-3xl font-black text-[#1E1E24] uppercase tracking-tighter">II. Sistema Métrico Posicional</h1>
        </div>

        {/* Tarjeta 1: Principio */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#a855f7] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
              Principio de Valor Posicional
            </h2>
          </div>
          <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
            «El sistema decimal es de base 10 y de naturaleza estrictamente posicional: una misma cifra no tiene un valor estático, sino que multiplica su magnitud por potencias de diez según el lugar exacto que ocupa respecto al punto decimal.»
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => { playSound('pop'); setShowPosAnalogy(!showPosAnalogy); }}
            className="w-full bg-[#f8faf9] border-2 border-[#1E1E24] text-[#1E1E24] font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-[2px_2px_0px_0px_#1E1E24]"
          >
            <HelpCircle className="w-5 h-5 text-[#a855f7]" /> {showPosAnalogy ? 'Ocultar Perspectiva' : 'Perspectiva conceptual'}
          </motion.button>

          <AnimatePresence>
            {showPosAnalogy && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-4">
                <div className="bg-white border-l-4 border-l-[#a855f7] border-2 border-[#1E1E24] p-4 rounded-r-xl shadow-[2px_2px_0px_0px_#1E1E24]">
                  <p className="text-sm font-bold text-[#1E1E24] leading-relaxed">
                    «Imagina que cada dígito es una persona que sube a un edificio. El número 7 en la planta baja (Unidades) vale 7 pesos. Pero si ese mismo 7 sube al ático de las Centenas de Millar, su peso financiero se multiplica automáticamente a 700 000. El dibujo del número no cambió, lo que cambió fue su piso.»
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tarjeta 2 & 3: Consola y Radiografía */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#ec4899] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
              <Monitor className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
              La Consola de Periodos
            </h2>
          </div>

          <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl p-4 shadow-[inset_0_4px_6px_rgba(0,0,0,0.05)]">
            <div className="text-xs font-black uppercase text-[#1E1E24]/50 mb-2">Valor Analizado:</div>
            
            <div className="flex overflow-x-auto gap-2 pb-2 mb-4 no-scrollbar">
              {(['Millones', 'Millares', 'Unidades', 'Decimales']).map(pill => (
                <button
                  key={pill}
                  onClick={() => { playSound('tap'); setActivePeriod(pill); }}
                  className={`px-4 py-2 rounded-xl font-black text-sm uppercase transition-all border-2 cursor-pointer ${
                    activePeriod === pill 
                      ? 'bg-[#ec4899] text-white border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] z-10 scale-[1.02]' 
                      : 'bg-white text-[#1E1E24]/60 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] hover:bg-slate-100'
                  }`}
                >
                  [ {pill} ]
                </button>
              ))}
            </div>

            <div className="font-mono text-3xl sm:text-5xl font-black tracking-widest flex justify-center gap-2 mb-4 bg-white border-2 border-[#1E1E24] py-4 rounded-xl shadow-[4px_4px_0px_0px_#1E1E24]">
              <span className={activePeriod === 'Millones' ? 'text-[#ec4899] scale-110 transition-transform' : 'text-[#1E1E24]/20'}>3 000</span>
              <span className={activePeriod === 'Millares' ? 'text-[#ec4899] scale-110 transition-transform' : 'text-[#1E1E24]/20'}>785</span>
              <span className={activePeriod === 'Unidades' ? 'text-[#ec4899] scale-110 transition-transform' : 'text-[#1E1E24]/20'}>199</span>
              <span className={activePeriod === 'Decimales' ? 'text-[#ec4899] scale-110 transition-transform' : 'text-[#1E1E24]/20'}>.79</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activePeriod} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="bg-white rounded-xl border-2 border-[#1E1E24] p-4 shadow-[4px_4px_0px_0px_#1E1E24]">
                <div className="text-sm font-black uppercase text-[#1E1E24] mb-4 border-b-2 border-[#1E1E24]/10 pb-2">Radiografía de la Clase Activa</div>
                <div className="space-y-2">
                  {activePeriod === 'Millares' && (
                    <>
                      <div className="grid grid-cols-4 font-black text-xs uppercase text-[#1E1E24]/50 mb-2">
                        <span>Cifra</span><span className="col-span-2">Valor Relativo</span><span>Notación Base 10</span>
                      </div>
                      <div className="grid grid-cols-4 items-center bg-[#f8faf9] border-2 border-[#1E1E24] p-2 rounded-lg font-bold text-sm">
                        <span className="text-xl font-black relative group cursor-help">7
                          <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#1E1E24] text-white text-[10px] p-2 rounded-lg z-20">El exponente 5 indica los lugares desde esta posición hasta las unidades simples.</div>
                        </span>
                        <span className="col-span-2 flex flex-col"><span>700 000</span><span className="text-[10px] uppercase text-[#1E1E24]/50">Centenas de millar</span></span><span className="font-black text-[#ec4899]"><MathView latex="7 \times 10^5" inline/></span>
                      </div>
                      <div className="grid grid-cols-4 items-center bg-[#f8faf9] border-2 border-[#1E1E24] p-2 rounded-lg font-bold text-sm">
                        <span className="text-xl font-black relative group cursor-help">8
                          <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#1E1E24] text-white text-[10px] p-2 rounded-lg z-20">El exponente 4 indica exactamente la cantidad de lugares (ceros) que hay desde esta posición hasta las unidades simples.</div>
                        </span>
                        <span className="col-span-2 flex flex-col"><span>80 000</span><span className="text-[10px] uppercase text-[#1E1E24]/50">Decenas de millar</span></span><span className="font-black text-[#ec4899]"><MathView latex="8 \times 10^4" inline/></span>
                      </div>
                      <div className="grid grid-cols-4 items-center bg-[#f8faf9] border-2 border-[#1E1E24] p-2 rounded-lg font-bold text-sm">
                        <span className="text-xl font-black relative group cursor-help">5
                          <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#1E1E24] text-white text-[10px] p-2 rounded-lg z-20">El exponente 3 indica los lugares desde esta posición hasta las unidades simples.</div>
                        </span>
                        <span className="col-span-2 flex flex-col"><span>5 000</span><span className="text-[10px] uppercase text-[#1E1E24]/50">Unidades de millar</span></span><span className="font-black text-[#ec4899]"><MathView latex="5 \times 10^3" inline/></span>
                      </div>
                    </>
                  )}
                  {activePeriod === 'Millones' && (
                    <>
                      <div className="grid grid-cols-4 font-black text-xs uppercase text-[#1E1E24]/50 mb-2"><span>Cifra</span><span className="col-span-2">Valor Relativo</span><span>Base 10</span></div>
                      <div className="grid grid-cols-4 items-center bg-[#f8faf9] border-2 border-[#1E1E24] p-2 rounded-lg font-bold text-sm"><span className="text-xl font-black">3</span><span className="col-span-2 flex flex-col"><span>3 000 000</span><span className="text-[10px] uppercase text-[#1E1E24]/50">Unidades de millón</span></span><span className="font-black text-[#ec4899]"><MathView latex="3 \times 10^6" inline/></span></div>
                    </>
                  )}
                  {activePeriod === 'Unidades' && (
                    <>
                      <div className="grid grid-cols-4 font-black text-xs uppercase text-[#1E1E24]/50 mb-2"><span>Cifra</span><span className="col-span-2">Valor Relativo</span><span>Base 10</span></div>
                      <div className="grid grid-cols-4 items-center bg-[#f8faf9] border-2 border-[#1E1E24] p-2 rounded-lg font-bold text-sm"><span className="text-xl font-black">1</span><span className="col-span-2 flex flex-col"><span>100</span><span className="text-[10px] uppercase text-[#1E1E24]/50">Centenas</span></span><span className="font-black text-[#ec4899]"><MathView latex="1 \times 10^2" inline/></span></div>
                      <div className="grid grid-cols-4 items-center bg-[#f8faf9] border-2 border-[#1E1E24] p-2 rounded-lg font-bold text-sm"><span className="text-xl font-black">9</span><span className="col-span-2 flex flex-col"><span>90</span><span className="text-[10px] uppercase text-[#1E1E24]/50">Decenas</span></span><span className="font-black text-[#ec4899]"><MathView latex="9 \times 10^1" inline/></span></div>
                      <div className="grid grid-cols-4 items-center bg-[#f8faf9] border-2 border-[#1E1E24] p-2 rounded-lg font-bold text-sm"><span className="text-xl font-black">9</span><span className="col-span-2 flex flex-col"><span>9</span><span className="text-[10px] uppercase text-[#1E1E24]/50">Unidades</span></span><span className="font-black text-[#ec4899]"><MathView latex="9 \times 10^0" inline/></span></div>
                    </>
                  )}
                  {activePeriod === 'Decimales' && (
                    <>
                      <div className="grid grid-cols-4 font-black text-xs uppercase text-[#1E1E24]/50 mb-2"><span>Cifra</span><span className="col-span-2">Valor Relativo</span><span>Base 10</span></div>
                      <div className="grid grid-cols-4 items-center bg-[#f8faf9] border-2 border-[#1E1E24] p-2 rounded-lg font-bold text-sm"><span className="text-xl font-black">7</span><span className="col-span-2 flex flex-col"><span>0.7</span><span className="text-[10px] uppercase text-[#1E1E24]/50">Décimos</span></span><span className="font-black text-[#ec4899]"><MathView latex="7 \times 10^{-1}" inline/></span></div>
                      <div className="grid grid-cols-4 items-center bg-[#f8faf9] border-2 border-[#1E1E24] p-2 rounded-lg font-bold text-sm"><span className="text-xl font-black">9</span><span className="col-span-2 flex flex-col"><span>0.09</span><span className="text-[10px] uppercase text-[#1E1E24]/50">Centésimos</span></span><span className="font-black text-[#ec4899]"><MathView latex="9 \times 10^{-2}" inline/></span></div>
                    </>
                  )}
                </div>

                {activePeriod === 'Millares' && (
                  <div className="mt-4 bg-[#FFFDF5] border-2 border-[#1E1E24] p-3 rounded-xl shadow-[2px_2px_0px_0px_#1E1E24] text-sm">
                    <strong className="font-black text-[#1E1E24] block mb-1">📐 SUMATORIA POLINÓMICA DEL BLOQUE:</strong>
                    <div className="font-mono font-bold text-[#1E1E24]/80">(7 × 10⁵) + (8 × 10⁴) + (5 × 10³)</div>
                    <div className="font-mono font-bold text-[#1E1E24]/80">= 700 000 + 80 000 + 5 000 = <span className="font-black text-[#1E1E24]">785 000</span></div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tarjeta 4: Laboratorio de Desglose */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1E24] flex items-center justify-center text-[#F7CA38] shadow-[2px_2px_0px_0px_#1E1E24] shrink-0">
              <Blocks className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1E1E24] uppercase tracking-tight leading-none">
              El Expansor Polinómico
            </h2>
          </div>

          <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl p-4 shadow-[inset_0_4px_6px_rgba(0,0,0,0.05)] mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <span className="text-xs font-black uppercase text-[#1E1E24]">Modo de visualización:</span>
              <div className="flex bg-white border-2 border-[#1E1E24] rounded-lg overflow-hidden shadow-[2px_2px_0px_0px_#1E1E24]">
                <button onClick={() => { playSound('tap'); setExpMode('sum'); }} className={`px-3 py-1.5 font-black text-xs transition-colors ${expMode === 'sum' ? 'bg-[#1E1E24] text-white' : 'text-[#1E1E24]'}`}>Notación Sumatoria</button>
                <button onClick={() => { playSound('tap'); setExpMode('pow'); }} className={`px-3 py-1.5 font-black text-xs transition-colors ${expMode === 'pow' ? 'bg-[#1E1E24] text-white' : 'text-[#1E1E24]'}`}>Notación 10ⁿ</button>
              </div>
            </div>

            <div className="font-mono font-bold text-sm bg-white border-2 border-[#1E1E24] p-4 rounded-xl shadow-[4px_4px_0px_0px_#1E1E24] leading-loose text-[#1E1E24]">
              <div className="font-black text-xl mb-2">785 000</div>
              {expMode === 'sum' ? (
                <>
                  <div>├── 700 000  (7 × 100 000)</div>
                  <div>├──  80 000  (8 × 10 000)</div>
                  <div>└──   5 000  (5 × 1 000)</div>
                </>
              ) : (
                <>
                  <div>├── <MathView latex="7 \times 10^5" inline/></div>
                  <div>├── <MathView latex="8 \times 10^4" inline/></div>
                  <div>└── <MathView latex="5 \times 10^3" inline/></div>
                </>
              )}
            </div>
          </div>

          <div className="bg-[#FFFDF5] border-2 border-[#1E1E24] p-4 rounded-xl flex gap-3 shadow-[2px_2px_0px_0px_#1E1E24]">
            <span className="text-2xl">📌</span>
            <div>
              <strong className="text-[#1E1E24] block uppercase font-black text-xs mb-1">CRITERIO CLAVE: La frontera del Punto</strong>
              <p className="text-sm font-bold text-[#1E1E24]/80 leading-snug">
                A la izquierda del punto, los exponentes crecen positivamente: 10⁰, 10¹, 10²... <br/>
                A la derecha (decimales), decrecen de forma negativa: 10⁻¹ (décimos), 10⁻² (centésimos)...
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SECCIÓN 3: CONCEPTOS CLAVE GLOBALES */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-3 border-b-4 border-[#1E1E24] pb-2">
          <h1 className="text-3xl font-black text-[#1E1E24] uppercase tracking-tighter">III. Conceptos Clave</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta Reales en 3 Golpes */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
            <h3 className="font-black text-xl text-[#1E1E24] uppercase mb-4 flex items-center gap-2">
              <span className="text-2xl">🎴</span> Números Reales en 3 Golpes
            </h3>
            <ul className="space-y-4 text-sm font-bold text-[#1E1E24]/80">
              <li className="bg-[#f8faf9] p-4 rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]">
                <strong className="text-[#1E1E24] block mb-2 uppercase text-xs">La prueba de fuego ℚ vs. 𝕀:</strong>
                <div className="space-y-2">
                  <div><span className="text-[#38bdf8] font-black uppercase text-xs">Racional (ℚ):</span> Si lo puedes escribir como fracción limpia a/b, es racional. Su decimal termina (0.75) o se repite en bucle infinito (0.333...).</div>
                  <div><span className="text-[#a855f7] font-black uppercase text-xs">Irracional (𝕀):</span> Decimal infinito y caótico sin ningún patrón (√2, √3, π, e). Jamás se puede hacer fracción exacta.</div>
                </div>
              </li>
              <li className="bg-[#f8faf9] p-4 rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]">
                <strong className="text-[#1E1E24] block mb-2 uppercase text-xs">El Cero no tiene bando:</strong>
                No es positivo ni negativo. Es entero (ℤ), racional (ℚ) y real (ℝ).<br/><br/>
                <MathView latex="\frac{0}{5} = 0" inline/> (repartir nada es válido), pero <MathView latex="\frac{5}{0}" inline/> explota el universo (indefinido).
              </li>
              <li className="bg-[#f8faf9] p-4 rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]">
                <strong className="text-[#1E1E24] block mb-2 uppercase text-xs">La regla de las muñecas rusas (ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ):</strong>
                Si un número es Natural (5), en automático también es Entero (+5), Racional (5/1) y Real. Pertenecer al círculo de adentro te da pase libre a todos los de afuera.
              </li>
            </ul>
          </motion.div>

          {/* Tarjeta Valor Posicional */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl border-2 border-[#1E1E24] p-5 shadow-[4px_4px_0px_0px_#1E1E24]">
            <h3 className="font-black text-xl text-[#1E1E24] uppercase mb-4 flex items-center gap-2">
              <span className="text-2xl">🎴</span> Valor Posicional y Potencias
            </h3>
            <ul className="space-y-4 text-sm font-bold text-[#1E1E24]/80">
              <li className="bg-[#f8faf9] p-4 rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]">
                <strong className="text-[#1E1E24] block mb-2 uppercase text-xs">Mismo dibujo, distinto piso:</strong>
                En 785 714, el primer 7 vale 700 000 (7 × 10⁵) y el segundo vale solo 700 (7 × 10²). Su poder cambia según la silla donde se sienta.
              </li>
              <li className="bg-[#f8faf9] p-4 rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]">
                <strong className="text-[#1E1E24] block mb-2 uppercase text-xs">La frontera del punto:</strong>
                <div className="space-y-2">
                  <div><span className="text-[#22C55E] font-black uppercase text-xs">Hacia la izquierda (←):</span> Multiplicas por 10. Exponentes positivos (10¹, 10², 10³). Cuentas cuántos ceros agregas.</div>
                  <div><span className="text-[#EF4444] font-black uppercase text-xs">Hacia la derecha (→):</span> Divides entre 10. Exponentes negativos (10⁻¹ décimos, 10⁻² centésimos). Cuentas cuántos lugares avanzas tras el punto.</div>
                </div>
              </li>
              <li className="bg-[#f8faf9] p-4 rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]">
                <strong className="text-[#1E1E24] block mb-2 uppercase text-xs">Los ceros son guardaespaldas:</strong>
                En 3 000 785, los ceros del centro no suman nada por sí solos, pero si los quitas conviertes 3 millones en 3 mil. Su trabajo es sostener la distancia al punto decimal.
              </li>
              <li className="bg-[#FFFDF5] p-4 rounded-xl border-2 border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]">
                <strong className="text-[#1E1E24] block mb-2 uppercase text-xs">Truco visual para descomponer rápido:</strong>
                En 3 421.79:<br/>
                <div className="font-mono text-[10px] sm:text-xs mt-2 bg-white border border-[#1E1E24]/20 p-2 rounded-lg">
                  <div className="mb-1"><MathView latex="\mathbf{3}000 + \mathbf{4}00 + \mathbf{2}0 + \mathbf{1} + \mathbf{0.7} + \mathbf{0.09}" inline/></div>
                  <div className="text-[#ec4899]"><MathView latex="= (3 \times 10^3) + (4 \times 10^2) + (2 \times 10^1) + (1 \times 10^0) + (7 \times 10^{-1}) + (9 \times 10^{-2})" inline/></div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
};
