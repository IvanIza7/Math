import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Layers,
  ArrowUpDown,
  Binary,
  Compass,
  Lightbulb,
  AlertTriangle,
  Zap,
  CheckCircle2,
  XCircle,
  Hash,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

interface LawItem {
  id: number;
  name: string;
  formula: string;
  rule: string;
  example: string;
  resultLatex: string;
  details: string;
}

const LAWS_DATA: LawItem[] = [
  {
    id: 1,
    name: 'Producto de bases iguales',
    formula: 'a^m \\cdot a^n = a^{m+n}',
    rule: 'Se conserva la misma base y se suman los exponentes.',
    example: '2^3 \\cdot 2^4 = 2^{3+4} = 2^7',
    resultLatex: '= \\mathbf{128}',
    details: 'Al multiplicar potencias de igual base, se totaliza la repetición del factor sumando los exponentes.'
  },
  {
    id: 2,
    name: 'Cociente de bases iguales',
    formula: '\\frac{a^m}{a^n} = a^{m-n}',
    rule: 'Se conserva la base y al exponente de arriba se le resta el de abajo.',
    example: '\\frac{5^6}{5^4} = 5^{6-4} = 5^2',
    resultLatex: '= \\mathbf{25}',
    details: 'Se cancelan los factores idénticos entre numerador y denominador restando sus cantidades.'
  },
  {
    id: 3,
    name: 'Potencia de una potencia',
    formula: '(a^m)^n = a^{m \\cdot n}',
    rule: 'Se conserva la base y se multiplican los exponentes entre sí.',
    example: '(3^2)^3 = 3^{2 \\cdot 3} = 3^6',
    resultLatex: '= \\mathbf{729}',
    details: 'El exponente exterior multiplica las capas de repetición del bloque interno.'
  },
  {
    id: 4,
    name: 'Potencia de un producto',
    formula: '(a \\cdot b)^n = a^n \\cdot b^n',
    rule: 'El exponente exterior se reparte a cada factor dentro del paréntesis.',
    example: '(2x)^3 = 2^3 \\cdot x^3',
    resultLatex: '= \\mathbf{8x^3}',
    details: 'Distribuye la potencia a cada factor individual multiplicado dentro del paréntesis.'
  },
  {
    id: 5,
    name: 'Potencia de un cociente',
    formula: '\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}',
    rule: 'El exponente afecta tanto al numerador como al denominador (b \\neq 0).',
    example: '\\left(\\frac{3}{4}\\right)^2 = \\frac{3^2}{4^2}',
    resultLatex: '= \\mathbf{\\frac{9}{16}}',
    details: 'Eleva numerador y denominador por separado antes de simplificar la fracción resultante.'
  },
  {
    id: 6,
    name: 'Exponente Cero',
    formula: 'a^0 = 1',
    rule: 'Toda base distinta de cero elevada a la cero siempre vale 1.',
    example: '15^0 = 1, \\quad (-8)^0 = 1',
    resultLatex: '= \\mathbf{1}',
    details: 'Nace del cociente de un número entre sí mismo: a^n / a^n = a^{n-n} = a^0 = 1.'
  },
  {
    id: 7,
    name: 'Exponente Negativo',
    formula: 'a^{-n} = \\frac{1}{a^n}',
    rule: 'Indica el recíproco (inverso multiplicativo). Baja al denominador con signo positivo.',
    example: '4^{-2} = \\frac{1}{4^2}',
    resultLatex: '= \\mathbf{\\frac{1}{16}}',
    details: 'El signo menos en el exponente NO crea un número negativo; es una instrucción de cambio de piso.'
  },
  {
    id: 8,
    name: 'Fracción con exp. negativo',
    formula: '\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n',
    rule: 'Se invierte la fracción (numerador por denominador) y el exponente pasa a positivo.',
    example: '\\left(\\frac{2}{5}\\right)^{-3} = \\left(\\frac{5}{2}\\right)^3 = \\frac{5^3}{2^3}',
    resultLatex: '= \\mathbf{\\frac{125}{8}}',
    details: 'Invertir la fracción completa cancela el signo negativo del exponente exterior instantáneamente.'
  },
  {
    id: 9,
    name: 'Exponente Fraccionario',
    formula: 'a^{\\frac{m}{n}} = \\sqrt[n]{a^m}',
    rule: 'Puente hacia la radicación: El denominador es el índice y el numerador el exponente interno.',
    example: '8^{\\frac{2}{3}} = \\sqrt[3]{8^2} = \\sqrt[3]{64}',
    resultLatex: '= \\mathbf{4}',
    details: 'El denominador divide al exponente interno, transformando la potencia en radical.'
  }
];

export const PotenciacionFactorizacionModule: React.FC = () => {
  // Card 1: Anatomía interactiva
  const [activeAnatomy, setActiveAnatomy] = useState<'base' | 'exponente' | 'potencia'>('base');
  const [showAnalogy1, setShowAnalogy1] = useState(false);
  const [testBase, setTestBase] = useState<number>(-3);
  const [testExp, setTestExp] = useState<number>(2);

  // Card 2: Leyes
  const [selectedLawId, setSelectedLawId] = useState<number>(1);
  const [showAllLawsTable, setShowAllLawsTable] = useState(false);

  // Card 3: Exponentes Negativos (Ascensor)
  const [elevatorActive, setElevatorActive] = useState<boolean>(false);

  // Card 4: Factorización Prima
  const [ladderExample, setLadderExample] = useState<'72' | '216'>('72');
  const [ladderStep, setLadderStep] = useState<number>(5);

  // Card 6: Acordeón errores
  const [openError, setOpenError] = useState<string | null>(null);

  const ladder72 = [
    { num: 72, div: 2, label: 'mitad' },
    { num: 36, div: 2, label: 'mitad' },
    { num: 18, div: 2, label: 'mitad' },
    { num: 9, div: 3, label: 'tercia' },
    { num: 3, div: 3, label: 'tercia' },
    { num: 1, div: null, label: 'fin' }
  ];

  const ladder216 = [
    { num: 216, div: 2, label: 'mitad' },
    { num: 108, div: 2, label: 'mitad' },
    { num: 54, div: 2, label: 'mitad' },
    { num: 27, div: 3, label: 'tercia' },
    { num: 9, div: 3, label: 'tercia' },
    { num: 3, div: 3, label: 'tercia' },
    { num: 1, div: null, label: 'fin' }
  ];

  const currentLadder = ladderExample === '72' ? ladder72 : ladder216;

  // Sign tester calculation
  const withParens = Math.pow(testBase, testExp);
  const withoutParens = -Math.pow(Math.abs(testBase), testExp);

  return (
    <div className="space-y-6">
      {/* ============================================================= */}
      {/* CARD 1: ¿QUÉ ES UNA POTENCIA? ANATOMÍA Y SIGNOS */}
      {/* ============================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#6F78DB] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
            ¿Qué es una Potencia? Anatomía y Signos
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Una potencia es una forma abreviada de escribir una multiplicación donde un mismo factor se repite varias veces. Elevar a una potencia construye magnitudes por multiplicación repetida.
        </p>

        {/* Visual Anatomy Block */}
        <div className="bg-[#1E1E24] rounded-2xl p-5 mb-4 text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#FFE600] mb-2">
            Toca cada elemento de la potencia
          </div>

          <div className="flex items-center justify-center text-4xl sm:text-5xl font-black text-white gap-2 font-mono py-2">
            <button
              onClick={() => { playSound('tap'); setActiveAnatomy('base'); }}
              className={`transition-all px-2 py-1 rounded-xl cursor-pointer border-2 ${
                activeAnatomy === 'base'
                  ? 'border-[#38bdf8] bg-[#38bdf8]/20 text-[#38bdf8]'
                  : 'border-transparent text-white hover:text-[#38bdf8]'
              }`}
            >
              4
            </button>
            <button
              onClick={() => { playSound('tap'); setActiveAnatomy('exponente'); }}
              className={`text-2xl sm:text-3xl mb-4 transition-all px-2 py-0.5 rounded-lg cursor-pointer border-2 ${
                activeAnatomy === 'exponente'
                  ? 'border-[#FFE600] bg-[#FFE600]/20 text-[#FFE600]'
                  : 'border-transparent text-[#FFE600] hover:scale-110'
              }`}
            >
              3
            </button>
            <span className="text-gray-400">=</span>
            <span className="text-xl sm:text-2xl text-gray-300 font-sans tracking-wide">4×4×4 =</span>
            <button
              onClick={() => { playSound('tap'); setActiveAnatomy('potencia'); }}
              className={`transition-all px-2 py-1 rounded-xl cursor-pointer border-2 ${
                activeAnatomy === 'potencia'
                  ? 'border-[#22C55E] bg-[#22C55E]/20 text-[#22C55E]'
                  : 'border-transparent text-white hover:text-[#22C55E]'
              }`}
            >
              64
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 text-xs font-bold text-gray-300">
            {activeAnatomy === 'base' && (
              <span className="text-[#38bdf8]">
                <strong>Base (4):</strong> Es el factor que se multiplica por sí mismo.
              </span>
            )}
            {activeAnatomy === 'exponente' && (
              <span className="text-[#FFE600]">
                <strong>Exponente (3):</strong> Indica cuántas veces aparece la base como factor.
              </span>
            )}
            {activeAnatomy === 'potencia' && (
              <span className="text-[#22C55E]">
                <strong>Potencia / Resultado (64):</strong> Es el resultado numérico final desarrollado.
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Sign Rules Comparison */}
        <div className="bg-[#f8faf9] rounded-2xl border-2 border-[#1E1E24] p-4 space-y-3">
          <div className="flex items-center justify-between border-b-2 border-[#1E1E24]/10 pb-2">
            <span className="text-xs font-black uppercase text-[#1E1E24] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F7CA38]" />
              Probador Interactivo: Paréntesis vs Sin Paréntesis
            </span>
            <div className="flex gap-1">
              {[-3, -2, -4].map(b => (
                <button
                  key={b}
                  onClick={() => setTestBase(b)}
                  className={`px-2 py-0.5 rounded text-[10px] font-black border ${testBase === b ? 'bg-[#1E1E24] text-white' : 'bg-white text-[#1E1E24]'}`}
                >
                  {b}
                </button>
              ))}
              {[2, 3].map(e => (
                <button
                  key={e}
                  onClick={() => setTestExp(e)}
                  className={`px-2 py-0.5 rounded text-[10px] font-black border ${testExp === e ? 'bg-[#F7CA38] text-[#1E1E24]' : 'bg-white text-[#1E1E24]'}`}
                >
                  n={e}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
            <div className="bg-white border-2 border-[#22C55E] rounded-xl p-3 shadow-xs">
              <span className="text-[10px] font-black uppercase text-[#22C55E] block mb-1">
                Con Paréntesis: ({testBase})^{testExp}
              </span>
              <div className="text-base font-black text-[#1E1E24] font-mono">
                <MathView latex={`(${testBase})^{${testExp}} = ${withParens}`} inline />
              </div>
              <span className="text-[10px] text-[#1E1E24]/60 font-bold block mt-1">
                {testExp % 2 === 0 ? 'Exponente par = Positivo (+)' : 'Exponente impar = Conserva (-) '}
              </span>
            </div>

            <div className="bg-white border-2 border-[#EF4444] rounded-xl p-3 shadow-xs">
              <span className="text-[10px] font-black uppercase text-[#EF4444] block mb-1">
                Sin Paréntesis: -{Math.abs(testBase)}^{testExp}
              </span>
              <div className="text-base font-black text-[#1E1E24] font-mono">
                <MathView latex={`-${Math.abs(testBase)}^{${testExp}} = ${withoutParens}`} inline />
              </div>
              <span className="text-[10px] text-[#1E1E24]/60 font-bold block mt-1">
                Sin paréntesis el exponente solo toca al número, no al signo.
              </span>
            </div>
          </div>
        </div>

        {/* Analogy toggle button */}
        <button
          onClick={() => {
            playSound('click');
            setShowAnalogy1(!showAnalogy1);
          }}
          className={`w-full mt-4 py-2.5 px-4 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            showAnalogy1
              ? 'bg-[#FFF9E6] border-[#F7CA38] text-[#1E1E24]'
              : 'bg-[#f8faf9] border-[#1E1E24] text-[#1E1E24] hover:bg-[#F7CA38]/10'
          }`}
        >
          <Lightbulb className={showAnalogy1 ? 'fill-[#F7CA38]' : ''} size={16} />
          {showAnalogy1 ? 'Ocultar regla nemotécnica' : 'Ver regla nemotécnica de signos'}
        </button>

        <AnimatePresence>
          {showAnalogy1 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-3.5 bg-[#FFF9E6] rounded-xl border-2 border-[#F7CA38]/40 text-xs font-bold text-[#1E1E24]/90 space-y-1">
                <div><strong>Regla de oro:</strong> Si el signo menos no está blindado con paréntesis <MathView latex="(-3)^2" inline />, el exponente <strong className="text-[#EF4444]">no tiene poder sobre el signo</strong>. Por eso <MathView latex="-3^2 = -(3 \\times 3) = -9" inline />.</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ============================================================= */}
      {/* CARD 2: LEYES DE LOS EXPONENTES */}
      {/* ============================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#F7CA38] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Leyes de los Exponentes y Cómo se Aplican
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Permiten transformar y simplificar expresiones complejas sin desarrollar multiplicaciones gigantescas.
        </p>

        {/* Laws selector pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {LAWS_DATA.map((law) => (
            <button
              key={law.id}
              onClick={() => {
                playSound('tap');
                setSelectedLawId(law.id);
              }}
              className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${
                selectedLawId === law.id
                  ? 'bg-[#1E1E24] text-white border-[#1E1E24] shadow-sm'
                  : 'bg-white text-[#1E1E24]/70 border-[#1E1E24]/20 hover:border-[#1E1E24]/60'
              }`}
            >
              Ley {law.id}
            </button>
          ))}
        </div>

        {/* Active Law Spotlight Card */}
        {(() => {
          const law = LAWS_DATA.find((l) => l.id === selectedLawId) || LAWS_DATA[0];
          return (
            <div className="bg-[#f8faf9] rounded-2xl border-2 border-[#1E1E24] p-4 space-y-3">
              <div className="flex items-center justify-between border-b-2 border-[#1E1E24]/10 pb-2">
                <span className="text-xs font-black uppercase text-[#1E1E24]">
                  Ley {law.id}: {law.name}
                </span>
                <span className="text-[10px] font-black uppercase bg-[#F7CA38] text-[#1E1E24] px-2 py-0.5 rounded border border-[#1E1E24]">
                  Regla Práctica
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border-2 border-[#1E1E24] text-center">
                  <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-1">
                    Fórmula
                  </span>
                  <div className="text-lg font-black text-[#1E1E24] py-1 font-mono">
                    <MathView latex={law.formula} inline />
                  </div>
                  <p className="text-xs font-bold text-[#1E1E24]/80 mt-1">
                    {law.rule}
                  </p>
                </div>

                <div className="bg-[#1E1E24] text-white p-3 rounded-xl border-2 border-[#1E1E24] text-center">
                  <span className="text-[10px] font-black uppercase text-[#FFE600] block mb-1">
                    Ejemplo Resuelto
                  </span>
                  <div className="text-base font-black text-[#FFE600] py-1 font-mono">
                    <MathView latex={`${law.example} ${law.resultLatex}`} inline />
                  </div>
                  <p className="text-xs font-bold text-gray-300 mt-1">
                    {law.details}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Table expand toggle */}
        <button
          onClick={() => {
            playSound('click');
            setShowAllLawsTable(!showAllLawsTable);
          }}
          className="w-full mt-3 py-2 px-3 bg-white border-2 border-[#1E1E24] rounded-xl text-xs font-black text-[#1E1E24] flex items-center justify-center gap-1.5 hover:bg-gray-50 cursor-pointer"
        >
          <span>{showAllLawsTable ? 'Ocultar tabla completa' : 'Ver tabla consolidada de las 9 leyes'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllLawsTable ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showAllLawsTable && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <div className="overflow-x-auto rounded-xl border-2 border-[#1E1E24]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#1E1E24] text-white">
                      <th className="p-2.5 font-black uppercase">Ley</th>
                      <th className="p-2.5 font-black uppercase">Fórmula</th>
                      <th className="p-2.5 font-black uppercase">Regla Práctica</th>
                      <th className="p-2.5 font-black uppercase">Ejemplo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E1E24]/20 font-bold">
                    {LAWS_DATA.map((l, i) => (
                      <tr
                        key={l.id}
                        onClick={() => setSelectedLawId(l.id)}
                        className={`cursor-pointer ${i % 2 === 0 ? 'bg-white' : 'bg-[#f8faf9]'} hover:bg-[#F7CA38]/15`}
                      >
                        <td className="p-2.5 font-black whitespace-nowrap">{l.id}. {l.name}</td>
                        <td className="p-2.5 font-mono whitespace-nowrap"><MathView latex={l.formula} inline /></td>
                        <td className="p-2.5 text-[#1E1E24]/80">{l.rule}</td>
                        <td className="p-2.5 font-mono whitespace-nowrap"><MathView latex={`${l.example} ${l.resultLatex}`} inline /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ============================================================= */}
      {/* CARD 3: EXPONENTES NEGATIVOS Y EL MÉTODO DEL ASCENSOR */}
      {/* ============================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#38bdf8] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <ArrowUpDown className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            ¿Qué pasa con los Exponentes Negativos?
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Un exponente negativo <strong className="text-[#EF4444] font-black">no vuelve negativo al número ni significa que debas restar</strong>; es una instrucción de ubicación (recíproco / inverso multiplicativo). Indica que la base está en el piso equivocado de la fracción y debe cambiar de posición para que su exponente se vuelva positivo.
        </p>

        {/* Formula Banner */}
        <div className="bg-[#1E1E24] text-white rounded-2xl p-4 text-center mb-4">
          <div className="text-xl sm:text-2xl font-black text-[#FFE600] font-mono">
            <MathView latex="a^{-n} = \frac{1}{a^n} \qquad \text{y} \qquad \frac{1}{a^{-n}} = a^n \quad (a \neq 0)" inline />
          </div>
        </div>

        {/* Los 4 Casos Prácticos */}
        <div className="space-y-2 mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-[#1E1E24] block">
            Los 4 Casos Prácticos para Operarlos
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl p-3 space-y-1">
              <span className="text-[11px] font-black text-[#1E1E24] block">
                1. Entero con exp. negativo (<MathView latex="a^{-n}" inline />)
              </span>
              <p className="text-[11px] font-bold text-[#1E1E24]/70">
                Pone un 1 arriba y la potencia baja con exponente positivo.
              </p>
              <div className="bg-white p-1.5 rounded-lg border border-[#1E1E24] text-center font-mono font-black text-xs">
                <MathView latex="3^{-4} = \frac{1}{3^4} = \mathbf{\frac{1}{81}}" inline />
              </div>
            </div>

            <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl p-3 space-y-1">
              <span className="text-[11px] font-black text-[#1E1E24] block">
                2. Negativo en el denominador (<MathView latex="\frac{1}{a^{-n}}" inline />)
              </span>
              <p className="text-[11px] font-bold text-[#1E1E24]/70">
                Sube al numerador con exponente positivo.
              </p>
              <div className="bg-white p-1.5 rounded-lg border border-[#1E1E24] text-center font-mono font-black text-xs">
                <MathView latex="\frac{1}{5^{-2}} = 5^2 = \mathbf{25}" inline />
              </div>
            </div>

            <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl p-3 space-y-1">
              <span className="text-[11px] font-black text-[#1E1E24] block">
                3. Fracción con exp. negativo (<MathView latex="(a/b)^{-n}" inline />)
              </span>
              <p className="text-[11px] font-bold text-[#1E1E24]/70">
                Se invierte la fracción completa y el exponente cambia a $+$.
              </p>
              <div className="bg-white p-1.5 rounded-lg border border-[#1E1E24] text-center font-mono font-black text-xs">
                <MathView latex="\left(\frac{2}{3}\right)^{-3} = \left(\frac{3}{2}\right)^3 = \mathbf{\frac{27}{8}}" inline />
              </div>
            </div>

            <div className="bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl p-3 space-y-1">
              <span className="text-[11px] font-black text-[#1E1E24] block">
                4. Coeficiente acompañando (<MathView latex="k \cdot x^{-n}" inline />)
              </span>
              <p className="text-[11px] font-bold text-[#1E1E24]/70">
                Solo baja la base afectada, el coeficiente se queda arriba.
              </p>
              <div className="bg-white p-1.5 rounded-lg border border-[#1E1E24] text-center font-mono font-black text-xs">
                <MathView latex="4x^{-2} = \frac{4}{x^2} \quad \neq \quad (4x)^{-2} = \frac{1}{16x^2}" inline />
              </div>
            </div>
          </div>
        </div>

        {/* Elevator Method Interactive Box */}
        <div className="bg-[#1E1E24] text-white rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-black uppercase text-[#FFE600] flex items-center gap-1.5">
              <ArrowUpDown className="w-4 h-4 text-[#FFE600]" />
              El Método del Ascensor (Simplificación Mixta)
            </span>
            <button
              onClick={() => {
                playSound('click');
                setElevatorActive(!elevatorActive);
              }}
              className="px-2.5 py-1 bg-[#FFE600] text-[#1E1E24] rounded-lg text-[10px] font-black uppercase border border-[#1E1E24] cursor-pointer"
            >
              {elevatorActive ? 'Reiniciar' : 'Mover Ascensor'}
            </button>
          </div>

          <p className="text-xs font-bold text-gray-300">
            En una fracción con factores multiplicándose, traslada únicamente las piezas con exponente negativo al piso contrario:
          </p>

          <div className="bg-[#2A2B36] p-3 rounded-xl border border-white/20 text-center font-mono text-base font-black">
            <MathView latex="\frac{2a^{-3}b^4}{c^{-2}}" inline />
            <span className="mx-3 text-[#FFE600]">──►</span>
            <span className="text-[#22C55E]"><MathView latex="\mathbf{\frac{2b^4c^2}{a^3}}" inline /></span>
          </div>
          <p className="text-[10px] text-gray-400 text-center">
            El 2 y <MathView latex="b^4" inline /> permanecen arriba; <MathView latex="a^{-3}" inline /> baja como <MathView latex="a^3" inline />; <MathView latex="c^{-2}" inline /> sube como <MathView latex="c^2" inline />.
          </p>
        </div>
      </motion.div>

      {/* ============================================================= */}
      {/* CARD 4: FACTORIZACIÓN PRIMA */}
      {/* ============================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Binary className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Factorización Prima: Desarmando Números
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          Para resolver raíces exactas o simplificar radicales sin calculadora, descomponemos cualquier número compuesto en una multiplicación de números primos (<MathView latex="2, 3, 5, 7, 11\dots" inline />) expresada en forma de potencias.
        </p>

        {/* Stepper controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <button
              onClick={() => { playSound('tap'); setLadderExample('72'); setLadderStep(5); }}
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${
                ladderExample === '72' ? 'bg-[#1E1E24] text-white border-[#1E1E24]' : 'bg-white text-[#1E1E24]/60 border-[#1E1E24]/20'
              }`}
            >
              Factorizar 72
            </button>
            <button
              onClick={() => { playSound('tap'); setLadderExample('216'); setLadderStep(6); }}
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${
                ladderExample === '216' ? 'bg-[#1E1E24] text-white border-[#1E1E24]' : 'bg-white text-[#1E1E24]/60 border-[#1E1E24]/20'
              }`}
            >
              Factorizar 216
            </button>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setLadderStep(s => Math.max(1, s - 1))}
              disabled={ladderStep <= 1}
              className="px-2 py-1 bg-[#f8faf9] border border-[#1E1E24] rounded text-[10px] font-black disabled:opacity-30"
            >
              Ant
            </button>
            <button
              onClick={() => setLadderStep(s => Math.min(currentLadder.length - 1, s + 1))}
              disabled={ladderStep >= currentLadder.length - 1}
              className="px-2 py-1 bg-[#FFE600] border border-[#1E1E24] rounded text-[10px] font-black disabled:opacity-30"
            >
              Sig
            </button>
          </div>
        </div>

        {/* Ladder Visualizer */}
        <div className="bg-[#1E1E24] rounded-2xl p-4 text-white font-mono text-xs max-w-sm mx-auto space-y-1">
          {currentLadder.slice(0, ladderStep + 1).map((row, i) => (
            <div key={i} className="flex items-center justify-between py-1 border-b border-white/10 last:border-none">
              <span className="w-16 text-right font-black text-[#FFE600]">{row.num}</span>
              <span className="text-gray-400 font-black">│</span>
              <span className="w-12 text-left font-black text-[#22C55E]">{row.div !== null ? row.div : ''}</span>
              <span className="text-[10px] text-gray-400 font-sans italic">{row.label !== 'fin' ? `(${row.label})` : '✓ 1'}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 bg-[#f8faf9] border-2 border-[#1E1E24] rounded-xl p-3 text-center">
          <span className="text-[10px] font-black uppercase text-[#1E1E24]/50 block mb-0.5">
            Resultado en potencias
          </span>
          <div className="text-base font-black text-[#1E1E24] font-mono">
            {ladderExample === '72' ? (
              <MathView latex="72 = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 3 = \mathbf{2^3 \cdot 3^2}" inline />
            ) : (
              <MathView latex="216 = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 3 \cdot 3 = \mathbf{2^3 \cdot 3^3}" inline />
            )}
          </div>
        </div>
      </motion.div>

      {/* ============================================================= */}
      {/* CARD 5: CONEXIÓN CON LA RADICACIÓN */}
      {/* ============================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center text-white border-2 border-[#1E1E24]">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Conexión con la Radicación
          </h2>
        </div>

        <p className="text-sm font-bold text-[#1E1E24]/80 leading-relaxed mb-4">
          La radicación es la operación inversa a la potenciación. Al descomponer en factores primos, cualquier raíz se resuelve dividiendo el exponente interno entre el índice de la raíz:
        </p>

        <div className="bg-[#1E1E24] text-white rounded-2xl p-3 text-center mb-4">
          <div className="text-xl font-black text-[#FFE600] font-mono">
            <MathView latex="\mathbf{\sqrt[n]{a^m} = a^{\frac{m}{n}}}" inline />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-[#f8faf9] border-2 border-[#22C55E] rounded-xl p-3.5 space-y-2">
            <span className="text-[10px] font-black uppercase text-[#22C55E] block">
              Caso 1: Raíz Exacta
            </span>
            <div className="text-xs font-mono font-black text-[#1E1E24] bg-white p-2 rounded-lg border border-[#1E1E24]">
              <MathView latex="\sqrt[3]{216} = \sqrt[3]{2^3 \cdot 3^3} = 2^1 \cdot 3^1 = \mathbf{6}" inline />
            </div>
            <p className="text-[11px] font-bold text-[#1E1E24]/70">
              Todos los exponentes se dividen exactamente entre 3, saliendo libres de la raíz.
            </p>
          </div>

          <div className="bg-[#f8faf9] border-2 border-[#a78bfa] rounded-xl p-3.5 space-y-2">
            <span className="text-[10px] font-black uppercase text-[#a78bfa] block">
              Caso 2: Simplificación (Sobra Factor)
            </span>
            <div className="text-xs font-mono font-black text-[#1E1E24] bg-white p-2 rounded-lg border border-[#1E1E24]">
              <MathView latex="\sqrt{72} = \sqrt{2^2 \cdot 2^1 \cdot 3^2} = 2 \cdot 3 \sqrt{2} = \mathbf{6\sqrt{2}}" inline />
            </div>
            <p className="text-[11px] font-bold text-[#1E1E24]/70">
              Formas parejas (<MathView latex="2^2, 3^2" inline />) que salen multiplicadas como 6; el factor sobrante queda dentro.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ============================================================= */}
      {/* CARD 6: ERRORES COMUNES & TIPS NEMOTÉCNICOS */}
      {/* ============================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFE600] flex items-center justify-center text-[#1E1E24] border-2 border-[#1E1E24]">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight leading-tight">
            Errores Comunes que Debes Evitar & Tips
          </h2>
        </div>

        <div className="space-y-2.5">
          {/* Error 1 */}
          <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
            <button
              onClick={() => {
                playSound('click');
                setOpenError(openError === 'signo' ? null : 'signo');
              }}
              className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-xs sm:text-sm text-[#1E1E24] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#EF4444]" />
                <span>1. Confundir signo del exponente con signo del número</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openError === 'signo' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openError === 'signo' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-3 bg-white border-t-2 border-[#1E1E24] text-xs font-bold text-[#1E1E24]/80 space-y-1"
                >
                  <div>❌ <strong>Incorrecto:</strong> <MathView latex="2^{-3} = -8" inline /> (un exponente negativo jamás produce un número negativo).</div>
                  <div>✅ <strong>Correcto:</strong> <MathView latex="2^{-3} = \frac{1}{2^3} = \mathbf{\frac{1}{8}}" inline />.</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error 2 */}
          <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
            <button
              onClick={() => {
                playSound('click');
                setOpenError(openError === 'coef' ? null : 'coef');
              }}
              className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-xs sm:text-sm text-[#1E1E24] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#EF4444]" />
                <span>2. Bajar el coeficiente sin paréntesis</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openError === 'coef' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openError === 'coef' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-3 bg-white border-t-2 border-[#1E1E24] text-xs font-bold text-[#1E1E24]/80 space-y-1"
                >
                  <div>En <MathView latex="5x^{-1}" inline />, el exponente solo toca a la <MathView latex="x" inline />. Resulta <MathView latex="\mathbf{\frac{5}{x}}" inline />, <strong className="text-[#EF4444]">nunca</strong> <MathView latex="\frac{1}{5x}" inline />.</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error 3 */}
          <div className="border-2 border-[#1E1E24] rounded-xl overflow-hidden">
            <button
              onClick={() => {
                playSound('click');
                setOpenError(openError === 'sumas' ? null : 'sumas');
              }}
              className="w-full bg-[#f8faf9] hover:bg-[#FFFDF5] p-3 flex items-center justify-between font-black text-xs sm:text-sm text-[#1E1E24] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#EF4444]" />
                <span>3. Aplicar el traslado en sumas o restas</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${openError === 'sumas' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openError === 'sumas' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-3 bg-white border-t-2 border-[#1E1E24] text-xs font-bold text-[#1E1E24]/80 space-y-1"
                >
                  <div>❌ <MathView latex="\frac{1}{x^{-2} + y^{-2}} \neq x^2 + y^2" inline />. El truco de subir o bajar directamente solo funciona con factores que multiplican o dividen, jamás con términos sumados o restados.</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tip Box */}
        <div className="mt-4 bg-[#FFFDF5] border-2 border-[#F7CA38] rounded-xl p-3.5 flex items-start gap-3 shadow-xs">
          <Zap className="w-5 h-5 fill-[#F7CA38] text-[#F7CA38] shrink-0 mt-0.5" />
          <p className="text-xs font-bold text-[#1E1E24]/80 leading-relaxed">
            <strong>TRUCO PARA RADICALES:</strong> Factoriza siempre formando <strong>parejas (<MathView latex="a^2" inline />)</strong> para raíces cuadradas o <strong>tercias (<MathView latex="a^3" inline />)</strong> para raíces cúbicas. Todo grupo completo sale libre multiplicando fuera del radical.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
