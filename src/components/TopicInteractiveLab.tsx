import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  Trophy,
  Sliders,
  Scale,
  Calculator,
  PieChart,
  Grid,
  Check,
  X,
  Compass,
  ArrowUpDown,
  BookOpen,
  Split,
  Binary,
  Flame,
  Zap,
} from 'lucide-react';
import { VolumeTopic, VolumeData } from '../data/curriculum';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';
import { MathFraction } from './MathFraction';
import { numberToSpanishWords } from '../utils/numberToWords';

interface TopicInteractiveLabProps {
  topic: VolumeTopic;
  volume: VolumeData;
  onAwardXp: (amount: number) => void;
}

export const TopicInteractiveLab: React.FC<TopicInteractiveLabProps> = ({
  topic,
  volume,
  onAwardXp,
}) => {
  const topicId = topic.id;

  // -------------------------------------------------------------
  // LAB 1: RECTA NUMÉRICA Y CLASIFICACIÓN (vol1-t1)
  // -------------------------------------------------------------
  const [vol1Tab, setVol1Tab] = useState<'sets' | 'positional' | 'quiz'>('sets');
  const [selectedSet, setSelectedSet] = useState<'ALL' | 'N' | 'Z' | 'Q' | 'I' | 'R'>('N');
  const [selectedTestNum, setSelectedTestNum] = useState<{
    label: string;
    value: number;
    latex?: string;
    num?: number;
    den?: number;
    sets: string[];
    explanation: string;
  }>({
    label: '3',
    value: 3,
    latex: '3',
    sets: ['N', 'Z', 'Q', 'R'],
    explanation: 'El 3 es un entero positivo para contar. Pertenece a Naturales (ℕ), Enteros (ℤ), Racionales (ℚ) y Reales (ℝ).',
  });

  const testNumbers = [
    { label: '4', value: 4, latex: '4', sets: ['N', 'Z', 'Q', 'R'], explanation: '4 es Natural (ℕ, inician en 1), Entero (ℤ), Racional (ℚ) y Real (ℝ).' },
    { label: '-3', value: -3, latex: '-3', sets: ['Z', 'Q', 'R'], explanation: '-3 es un Entero negativo (ℤ). No es natural (ℕ solo ≥ 1).' },
    { label: '0', value: 0, latex: '0', sets: ['Z', 'Q', 'R'], explanation: '0 es el origen neutro en Enteros (ℤ). ¡No es Natural!' },
    { label: '1/2', value: 0.5, num: 1, den: 2, sets: ['Q', 'R'], explanation: '1/2 es una fracción de enteros irreducible. Es Racional (ℚ).' },
    { label: '-3/2', value: -1.5, num: -3, den: 2, sets: ['Q', 'R'], explanation: '-3/2 = -1.5 es un número Racional negativo (ℚ).' },
    { label: '√2', value: 1.414, latex: '\\sqrt{2}', sets: ['I', 'R'], explanation: '√2 ≈ 1.414... decimal infinito no periódico. Es Irracional (I).' },
    { label: 'π', value: 3.1415, latex: '\\pi', sets: ['I', 'R'], explanation: 'π ≈ 3.14159... relación constante de la circunferencia. Es Irracional (I).' },
    { label: '7/4', value: 1.75, num: 7, den: 4, sets: ['Q', 'R'], explanation: '7/4 = 1.75 es una fracción exacta. Es Racional (ℚ).' },
  ];

  // Positional table interactive state
  const [posNumber, setPosNumber] = useState<number>(3450218);
  const posStr = posNumber.toString().padStart(9, '0');

  // Positional quiz state
  const positionalQuizQuestions = [
    { num: 4520318, answer: 'Cuatro millones quinientos veinte mil trescientos dieciocho', options: ['Cuatro millones quinientos veinte mil trescientos dieciocho', 'Cuatrocientos cincuenta y dos mil trescientos dieciocho', 'Cuatro millones doscientos cincuenta mil trescientos ochenta', 'Cuatro millones quinientos mil doscientos dieciocho'] },
    { num: 12005400, answer: 'Doce millones cinco mil cuatrocientos', options: ['Doce millones cinco mil cuatrocientos', 'Doce millones cincuenta mil cuatrocientos', 'Ciento veinte millones cinco mil cuatrocientos', 'Doce millones quinientos mil cuatrocientos'] },
    { num: 3040080, answer: 'Tres millones cuarenta mil ochenta', options: ['Tres millones cuarenta mil ochenta', 'Tres millones cuatrocientos mil ochenta', 'Treinta millones cuatrocientos mil ochenta', 'Tres millones cuatro mil ochenta'] },
    { num: 750000000, answer: 'Setecientos cincuenta millones', options: ['Setecientos cincuenta millones', 'Setenta y cinco millones', 'Setecientos cincuenta mil', 'Siete mil quinientos millones'] },
  ];
  const [posQuizIndex, setPosQuizIndex] = useState<number>(0);
  const [posQuizSelected, setPosQuizSelected] = useState<string | null>(null);
  const [posQuizFeedback, setPosQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  // -------------------------------------------------------------
  // LAB 2: JERARQUÍA Y OPERACIONES BÁSICAS (vol1-t2)
  // -------------------------------------------------------------
  const [jerarquiaStep, setJerarquiaStep] = useState<number>(0);
  const jerarquiaExample = {
    original: '6 + 2 \\times (4^2 - 10) \\div 3',
    steps: [
      {
        title: 'Expresión Inicial',
        latex: '6 + 2 \\times (4^2 - 10) \\div 3',
        action: 'Observamos la expresión completa para identificar los niveles de prioridad.',
        highlight: 'Todo',
        badge: 'Inicio',
      },
      {
        title: 'Paso 1: Paréntesis y Potencia Interior',
        latex: '6 + 2 \\times (\\mathbf{16} - 10) \\div 3',
        action: 'Dentro del paréntesis (4² - 10), resolvemos primero la potencia: 4² = 16.',
        highlight: '4² = 16',
        badge: 'Nivel 1 & 2',
      },
      {
        title: 'Paso 2: Resolver el Paréntesis',
        latex: '6 + 2 \\times \\mathbf{6} \\div 3',
        action: 'Terminamos la resta dentro del paréntesis: (16 - 10) = 6.',
        highlight: '(16 - 10) = 6',
        badge: 'Nivel 1',
      },
      {
        title: 'Paso 3: Multiplicación y División (Izq a Der)',
        latex: '6 + \\mathbf{12} \\div 3 \\rightarrow 6 + \\mathbf{4}',
        action: 'Resolvemos 2 × 6 = 12, y luego 12 ÷ 3 = 4.',
        highlight: '2 × 6 ÷ 3 = 4',
        badge: 'Nivel 3',
      },
      {
        title: 'Paso 4: Suma Final',
        latex: '\\mathbf{10}',
        action: 'Finalmente resolvemos la suma: 6 + 4 = 10.',
        highlight: '6 + 4 = 10',
        badge: 'Nivel 4 (Resultado)',
      },
    ],
  };

  const [signA, setSignA] = useState<'+' | '-'>('+');
  const [signB, setSignB] = useState<'+' | '-'>('-');
  const [signOp, setSignOp] = useState<'*' | '/'>('*');
  const signResult = (signA === '+' && signB === '+') || (signA === '-' && signB === '-') ? '+' : '-';

  // -------------------------------------------------------------
  // LAB 3: TEORÍA DE NÚMEROS (vol1-t3)
  // Factores Primos Paso a Paso + Primos vs Compuestos + Criterios
  // -------------------------------------------------------------
  const [primeTab, setPrimeTab] = useState<'factorization' | 'prime-vs-comp' | 'criteria'>('factorization');
  const [primeInput, setPrimeInput] = useState<number>(24);

  // Prime factorization ladder algorithm with explanation of each step
  const getFactorizationSteps = (n: number) => {
    const steps: { current: number; divisor: number; next: number; reason: string }[] = [];
    let temp = Math.abs(n);
    if (temp <= 1) return steps;

    let d = 2;
    while (temp > 1) {
      if (temp % d === 0) {
        const next = temp / d;
        let reason = '';
        if (d === 2) reason = `${temp} es par, dividimos entre el menor primo (2).`;
        else if (d === 3) reason = `${temp} es divisible entre 3 (suma de dígitos es múltiplo de 3).`;
        else if (d === 5) reason = `${temp} termina en 0 o 5, dividimos entre 5.`;
        else reason = `${temp} es divisible exactamente entre el primo ${d}.`;

        steps.push({ current: temp, divisor: d, next, reason });
        temp = next;
      } else {
        d++;
      }
    }
    return steps;
  };

  const primeSteps = getFactorizationSteps(primeInput);
  const primeFactorsList = primeSteps.map((s) => s.divisor);

  // Divisibility Criteria interactive test
  const [criteriaTestNum, setCriteriaTestNum] = useState<number>(354);

  const checkDivisibility = (num: number) => {
    const lastDigit = Math.abs(num) % 10;
    const digitsSum = Math.abs(num).toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);

    return {
      rule2: {
        pass: lastDigit % 2 === 0,
        reason: `Termina en ${lastDigit} (${lastDigit % 2 === 0 ? 'es cifra par' : 'es impar'}).`,
      },
      rule3: {
        pass: digitsSum % 3 === 0,
        reason: `Suma de dígitos: ${Math.abs(num).toString().split('').join(' + ')} = ${digitsSum} (${digitsSum % 3 === 0 ? `múltiplo de 3: 3×${digitsSum / 3}` : 'no es múltiplo de 3'}).`,
      },
      rule5: {
        pass: lastDigit === 0 || lastDigit === 5,
        reason: `Termina en ${lastDigit} (${lastDigit === 0 || lastDigit === 5 ? 'termina en 0 o 5' : 'no termina en 0 ni 5'}).`,
      },
      rule9: {
        pass: digitsSum % 9 === 0,
        reason: `Suma de dígitos: ${Math.abs(num).toString().split('').join(' + ')} = ${digitsSum} (${digitsSum % 9 === 0 ? `múltiplo de 9: 9×${digitsSum / 9}` : 'no es múltiplo de 9'}).`,
      },
    };
  };

  const criteriaResults = checkDivisibility(criteriaTestNum);

  // -------------------------------------------------------------
  // LAB 4: DECIMALES Y FRACCIONES (vol1-t4)
  // Operaciones: Mismo Denom, Distinto Denom, Mult, Div, Mixtas
  // -------------------------------------------------------------
  const [fracOperationMode, setFracOperationMode] = useState<
    'same-den' | 'diff-den' | 'mult' | 'div' | 'mixed-conversion'
  >('same-den');

  // Fractions inputs
  const [f1Num, setF1Num] = useState<number>(3);
  const [f1Den, setF1Den] = useState<number>(4);
  const [f2Num, setF2Num] = useState<number>(1);
  const [f2Den, setF2Den] = useState<number>(4);
  const [fracOp, setFracOp] = useState<'+' | '-'>('+');

  // Mixed Fraction Converter state
  const [improperNum, setImproperNum] = useState<number>(7);
  const [improperDen, setImproperDen] = useState<number>(3);
  const mixedWhole = Math.floor(improperNum / improperDen);
  const mixedRemainder = improperNum % improperDen;

  const [mixedInputWhole, setMixedInputWhole] = useState<number>(2);
  const [mixedInputNum, setMixedInputNum] = useState<number>(1);
  const [mixedInputDen, setMixedInputDen] = useState<number>(4);
  const improperConvertedNum = mixedInputWhole * mixedInputDen + mixedInputNum;

  // -------------------------------------------------------------
  // LAB 5: ÁLGEBRA Y PRODUCTOS NOTABLES (vol2)
  // -------------------------------------------------------------
  const [geomA, setGeomA] = useState<number>(3);
  const [geomB, setGeomB] = useState<number>(2);

  // -------------------------------------------------------------
  // LAB 6: GEOMETRÍA Y POLÍGONOS (vol3)
  // -------------------------------------------------------------
  const [polygonSides, setPolygonSides] = useState<number>(5);

  // -------------------------------------------------------------
  // LAB 7: PLANO CARTESIANO Y PENDIENTE (vol4)
  // -------------------------------------------------------------
  const [slopeM, setSlopeM] = useState<number>(2);
  const [interceptB, setInterceptB] = useState<number>(1);

  return (
    <div className="bg-white border-2 border-[#1E1E24] rounded-3xl p-4 sm:p-5 shadow-xs space-y-4 font-jakarta max-w-full overflow-hidden">
      {/* Header of the Lab */}
      <div className="flex items-center justify-between border-b border-[#1E1E24]/10 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#F7CA38] border-2 border-[#1E1E24] flex items-center justify-center text-lg shadow-xs shrink-0">
            🔬
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 bg-[#6F78DB] text-white font-black text-[10px] uppercase rounded-full">
                Laboratorio Interactivo
              </span>
              <span className="text-[11px] font-bold text-[#8A909F]">
                Simulador Visual y Experimental
              </span>
            </div>
            <h3 className="text-sm font-black text-[#1E1E24] uppercase tracking-tight">
              Aprende Experimentando con Datos en Vivo
            </h3>
          </div>
        </div>

        <button
          onClick={() => {
            playSound('correct');
            onAwardXp(25);
          }}
          className="px-3 py-1 bg-[#DCFCE7] hover:bg-[#bbf7d0] text-[#166534] border border-[#22C55E]/40 font-black text-[10px] uppercase rounded-full shadow-2xs cursor-pointer flex items-center gap-1 shrink-0"
        >
          <Sparkles className="w-3 h-3 text-[#22C55E]" />
          <span>+25 XP</span>
        </button>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* TOPIC 1: Clasificación de Números y Valor Posicional (vol1-t1) */}
      {/* ------------------------------------------------------------------- */}
      {(topicId === 'vol1-t1' || topic.widgetType === 'number-sets') && (
        <div className="space-y-4">
          {/* Sub-tabs within Topic 1 */}
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                playSound('click');
                setVol1Tab('sets');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-black uppercase whitespace-nowrap cursor-pointer transition-all ${
                vol1Tab === 'sets'
                  ? 'bg-[#6F78DB] text-white shadow-xs'
                  : 'bg-gray-100 text-[#4A4E69] hover:bg-gray-200'
              }`}
            >
              Recta Numérica y Conjuntos (ℝ)
            </button>
            <button
              onClick={() => {
                playSound('click');
                setVol1Tab('positional');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-black uppercase whitespace-nowrap cursor-pointer transition-all ${
                vol1Tab === 'positional'
                  ? 'bg-[#6F78DB] text-white shadow-xs'
                  : 'bg-gray-100 text-[#4A4E69] hover:bg-gray-200'
              }`}
            >
              Tabla de Valor Posicional
            </button>
            <button
              onClick={() => {
                playSound('click');
                setVol1Tab('quiz');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-black uppercase whitespace-nowrap cursor-pointer transition-all ${
                vol1Tab === 'quiz'
                  ? 'bg-[#F7CA38] text-[#1E1E24] shadow-xs'
                  : 'bg-gray-100 text-[#4A4E69] hover:bg-gray-200'
              }`}
            >
              Quiz: Número a Letra (Grandes Cantidades)
            </button>
          </div>

          {vol1Tab === 'sets' && (
            <div className="space-y-4">
              {/* Golden Rule Card - Image 2 Clean Card Design */}
              <div className="bg-[#E8F8EE] border-2 border-[#1E1E24] rounded-3xl p-4 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#22C55E] border-2 border-[#1E1E24] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8A909F] block">
                      Regla Fundamental de los Conjuntos
                    </span>
                    <h3 className="text-sm font-extrabold text-[#1E1E24]">
                      Jerarquía Matemática de Números Reales
                    </h3>
                  </div>
                </div>

                <div className="bg-white border-2 border-[#1E1E24] rounded-2xl p-3.5 space-y-2 text-xs text-[#1E1E24]">
                  <p className="font-semibold leading-relaxed">
                    Los <span className="font-black px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#22C55E]/40">Naturales (ℕ)</span> inician estrictamente en el <strong>1</strong> (números de conteo: 1, 2, 3...). El <strong>0</strong> y los negativos pertenecen a los <span className="font-black px-1.5 py-0.5 rounded bg-[#E0F2FE] text-[#0369A1] border border-[#0EA5E9]/40">Enteros (ℤ)</span>.
                  </p>
                  <p className="font-semibold leading-relaxed">
                    Las fracciones pertenecen a los <span className="font-black px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/40">Racionales (ℚ)</span> y los decimales infinitos no periódicos como <MathView latex="\pi" inline /> o <MathView latex="\sqrt{2}" inline /> son <span className="font-black px-1.5 py-0.5 rounded bg-[#FCE7F3] text-[#9D174D] border border-[#EC4899]/40">Irracionales (I)</span>.
                  </p>
                </div>
              </div>

              {/* Set Filter Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase text-[#8A909F] tracking-wider block">
                  Filtro de Conjuntos en la Recta:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {[
                    { key: 'N', label: 'ℕ Naturales (≥ 1)', color: '#22C55E', bg: 'bg-[#DCFCE7]', text: 'text-[#166534]' },
                    { key: 'Z', label: 'ℤ Enteros (±)', color: '#0EA5E9', bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]' },
                    { key: 'Q', label: 'ℚ Racionales', color: '#F59E0B', bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]' },
                    { key: 'I', label: 'I Irracionales', color: '#EC4899', bg: 'bg-[#FCE7F3]', text: 'text-[#9D174D]' },
                    { key: 'R', label: 'ℝ Reales', color: '#6F78DB', bg: 'bg-[#EEF2FF]', text: 'text-[#4338CA]' },
                    { key: 'ALL', label: '✦ Ver Todo', color: '#1E1E24', bg: 'bg-white', text: 'text-[#1E1E24]' },
                  ].map((s) => (
                    <button
                      key={s.key}
                      onClick={() => {
                        playSound('click');
                        setSelectedSet(s.key as any);
                      }}
                      className={`py-2 px-3 rounded-full text-[11px] font-black uppercase border-2 border-[#1E1E24] transition-all cursor-pointer text-center shadow-xs ${
                        selectedSet === s.key
                          ? `${s.bg} ${s.text} ring-2 ring-[#1E1E24]/20 scale-102`
                          : 'bg-white text-[#8A909F] hover:text-[#1E1E24] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number Line Visual SVG */}
              <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 relative overflow-hidden">
                <span className="text-[10px] font-black uppercase text-[#8A909F] block mb-2 text-center">
                  Recta Numérica Real Continua (<MathView latex="\mathbb{R}" inline />)
                </span>

                <div className="relative w-full h-24 flex items-center justify-center">
                  <svg viewBox="0 0 500 100" className="w-full h-full">
                    <defs>
                      <marker id="arr-l" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 10 0 L 0 5 L 10 10 z" fill="#1E1E24" />
                      </marker>
                      <marker id="arr-r" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#1E1E24" />
                      </marker>
                    </defs>

                    <line x1="20" y1="50" x2="480" y2="50" stroke="#1E1E24" strokeWidth="3" markerStart="url(#arr-l)" markerEnd="url(#arr-r)" />

                    {/* Shaded natural zone */}
                    {(selectedSet === 'N' || selectedSet === 'ALL') && (
                      <g>
                        <rect x="290" y="44" width="180" height="12" rx="6" fill="#10B981" fillOpacity="0.35" />
                        <text x="380" y="32" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="bold">
                          ℕ Naturales (≥ 1)
                        </text>
                      </g>
                    )}

                    {/* Ticks */}
                    {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((val) => {
                      const x = 250 + val * 40;
                      const isZero = val === 0;
                      const isNatural = val >= 1;

                      let tickColor = '#1E1E24';
                      let tickHeight = 12;
                      if (selectedSet === 'N' && isNatural) {
                        tickColor = '#10B981';
                        tickHeight = 18;
                      } else if (selectedSet === 'Z') {
                        tickColor = '#0EA5E9';
                        tickHeight = 16;
                      }

                      return (
                        <g key={val}>
                          <line x1={x} y1={50 - tickHeight / 2} x2={x} y2={50 + tickHeight / 2} stroke={tickColor} strokeWidth={isZero ? 3.5 : 2} />
                          <text
                            x={x}
                            y="72"
                            textAnchor="middle"
                            fill={isNatural && (selectedSet === 'N' || selectedSet === 'ALL') ? '#065F46' : isZero ? '#1E1E24' : '#64748B'}
                            fontSize={isZero ? '13' : '11'}
                            fontWeight={isNatural || isZero ? 'bold' : '600'}
                          >
                            {val}
                          </text>
                          {isNatural && (selectedSet === 'N' || selectedSet === 'ALL') && (
                            <circle cx={x} cy="50" r="4" fill="#10B981" stroke="#1E1E24" strokeWidth="1.5" />
                          )}
                          {val <= 0 && (selectedSet === 'Z' || selectedSet === 'ALL') && (
                            <circle cx={x} cy="50" r="4" fill="#0EA5E9" stroke="#1E1E24" strokeWidth="1.5" />
                          )}
                        </g>
                      );
                    })}

                    {/* Fractions on line */}
                    {(selectedSet === 'Q' || selectedSet === 'ALL') && (
                      <g>
                        <circle cx={250 + 0.5 * 40} cy="50" r="4.5" fill="#F59E0B" stroke="#1E1E24" strokeWidth="1.5" />
                        <text x={250 + 0.5 * 40} y="34" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="bold">
                          1/2
                        </text>
                        <circle cx={250 - 1.5 * 40} cy="50" r="4.5" fill="#F59E0B" stroke="#1E1E24" strokeWidth="1.5" />
                        <text x={250 - 1.5 * 40} y="34" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="bold">
                          -3/2
                        </text>
                        <circle cx={250 + 1.75 * 40} cy="50" r="4.5" fill="#F59E0B" stroke="#1E1E24" strokeWidth="1.5" />
                        <text x={250 + 1.75 * 40} y="34" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="bold">
                          7/4
                        </text>
                      </g>
                    )}

                    {/* Irrationals on line */}
                    {(selectedSet === 'I' || selectedSet === 'ALL') && (
                      <g>
                        <circle cx={250 + 1.414 * 40} cy="50" r="4.5" fill="#EC4899" stroke="#1E1E24" strokeWidth="1.5" />
                        <text x={250 + 1.414 * 40} y="34" textAnchor="middle" fill="#BE185D" fontSize="9" fontWeight="bold">
                          √2
                        </text>
                        <circle cx={250 + 3.1415 * 40} cy="50" r="4.5" fill="#EC4899" stroke="#1E1E24" strokeWidth="1.5" />
                        <text x={250 + 3.1415 * 40} y="34" textAnchor="middle" fill="#BE185D" fontSize="9" fontWeight="bold">
                          π
                        </text>
                      </g>
                    )}
                  </svg>
                </div>
              </div>

              {/* Test Numbers Quick Selector with MathFraction */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase text-[#8A909F] tracking-wider block">
                  Prueba un Número para Clasificarlo:
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {testNumbers.map((numItem, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playSound('click');
                        setSelectedTestNum(numItem);
                      }}
                      className={`p-2 rounded-2xl border-2 font-mono font-black text-xs transition-all cursor-pointer flex flex-col items-center justify-center min-h-[46px] ${
                        selectedTestNum.label === numItem.label
                          ? 'bg-[#F7CA38] border-[#1E1E24] text-[#1E1E24] shadow-xs scale-105'
                          : 'bg-white border-[#1E1E24]/20 hover:border-[#1E1E24] text-[#1E1E24]'
                      }`}
                    >
                      {numItem.num && numItem.den ? (
                        <MathFraction num={numItem.num} den={numItem.den} size="sm" />
                      ) : numItem.latex ? (
                        <MathView latex={numItem.latex} inline />
                      ) : (
                        <span>{numItem.label}</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Test Number Detail Result Banner */}
                <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase text-[#8A909F]">Número Analizado:</span>
                      <span className="px-3 py-1 bg-white border-2 border-[#1E1E24] rounded-xl font-mono font-black text-sm text-[#1E1E24] shadow-2xs inline-flex items-center">
                        {selectedTestNum.num && selectedTestNum.den ? (
                          <MathFraction num={selectedTestNum.num} den={selectedTestNum.den} size="sm" />
                        ) : selectedTestNum.latex ? (
                          <MathView latex={selectedTestNum.latex} inline />
                        ) : (
                          <span>{selectedTestNum.label}</span>
                        )}
                      </span>
                    </div>

                    {/* Included Sets Badges */}
                    <div className="flex items-center gap-1">
                      {['N', 'Z', 'Q', 'I', 'R'].map((setName) => {
                        const isMember = selectedTestNum.sets.includes(setName);
                        return (
                          <span
                            key={setName}
                            className={`w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center border ${
                              isMember
                                ? setName === 'N'
                                  ? 'bg-[#DCFCE7] text-[#065F46] border-[#10B981]'
                                  : setName === 'Z'
                                  ? 'bg-[#E0F2FE] text-[#0369A1] border-[#0EA5E9]'
                                  : setName === 'Q'
                                  ? 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]'
                                  : setName === 'I'
                                  ? 'bg-[#FCE7F3] text-[#9D174D] border-[#EC4899]'
                                  : 'bg-[#EDE9FE] text-[#5B21B6] border-[#8B5CF6]'
                                : 'bg-white/50 text-gray-300 border-gray-200'
                            }`}
                          >
                            {setName === 'N' ? 'ℕ' : setName === 'Z' ? 'ℤ' : setName === 'Q' ? 'ℚ' : setName}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <p className="text-xs font-medium text-[#4A4E69] leading-relaxed pl-1">
                    {selectedTestNum.explanation}
                  </p>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* ESTRUCTURA DEL CONJUNTO DE LOS NÚMEROS REALES (DEBAJO DEL LAB) */}
              {/* ------------------------------------------------------------- */}
              <div className="pt-2 space-y-2.5 border-t border-[#1E1E24]/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#1E1E24] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#6F78DB]" />
                    <span>Jerarquía del Conjunto de los Números Reales (<MathView latex="\mathbb{R}" inline />)</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Left Branch: Racionales */}
                  <div className="bg-[#FEF3C7]/40 border-2 border-[#F59E0B] rounded-2xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-[#F59E0B] text-white font-black text-xs rounded-lg uppercase">
                        ℚ Racionales
                      </span>
                      <span className="text-[11px] font-mono font-bold text-[#92400E]">
                        Fracciones <MathFraction num="a" den="b" size="xs" /> (b ≠ 0)
                      </span>
                    </div>

                    <p className="text-xs text-[#78350F] font-medium leading-tight">
                      Incluye decimales exactos (0.75) y periódicos (0.333...). Contiene a:
                    </p>

                    {/* Sub-box: Enteros Z */}
                    <div className="bg-[#E0F2FE]/70 border-2 border-[#0EA5E9] rounded-xl p-2.5 space-y-1.5 ml-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-[#0EA5E9] text-white font-black text-[10px] rounded-md uppercase">
                          ℤ Enteros
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#0369A1]">
                          ... -3, -2, -1, 0, 1, 2, 3 ...
                        </span>
                      </div>

                      {/* Sub-box: Naturales N */}
                      <div className="bg-[#DCFCE7] border-2 border-[#10B981] rounded-lg p-2 flex items-center justify-between ml-2">
                        <span className="px-2 py-0.5 bg-[#10B981] text-white font-black text-[10px] rounded-md uppercase">
                          ℕ Naturales (≥ 1)
                        </span>
                        <span className="text-[10px] font-bold text-[#065F46]">
                          {'{ 1, 2, 3, 4, 5 ... }'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Branch: Irracionales */}
                  <div className="bg-[#FCE7F3]/40 border-2 border-[#EC4899] rounded-2xl p-3.5 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="px-2.5 py-0.5 bg-[#EC4899] text-white font-black text-xs rounded-lg uppercase">
                          I Irracionales
                        </span>
                        <span className="text-[11px] font-mono font-bold text-[#9D174D]">
                          No expresables en fracción
                        </span>
                      </div>

                      <p className="text-xs text-[#831843] font-medium leading-relaxed">
                        Decimales infinitos <strong>no periódicos</strong> (sin patrón de repetición).
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="bg-white border border-[#EC4899]/40 rounded-xl p-2 text-center">
                        <span className="font-mono font-black text-xs text-[#BE185D] block">
                          <MathView latex="\pi \approx 3.14159..." inline />
                        </span>
                        <span className="text-[9px] text-gray-500">Circunferencia</span>
                      </div>
                      <div className="bg-white border border-[#EC4899]/40 rounded-xl p-2 text-center">
                        <span className="font-mono font-black text-xs text-[#BE185D] block">
                          <MathView latex="\sqrt{2} \approx 1.41421..." inline />
                        </span>
                        <span className="text-[9px] text-gray-500">Diagonal cuadrada</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Positional Table Tab */}
          {vol1Tab === 'positional' && (
            <div className="space-y-4">
              <div className="bg-[#EFF6FF] border-2 border-[#3B82F6] rounded-2xl p-3 text-xs font-bold text-[#1E3A8A]">
                <span className="font-black uppercase block mb-1">
                  📊 Descomposición Decimal y Periodos:
                </span>
                Cada posición multiplica su dígito por potencias de 10 (Unidades = 1, Decenas = 10, Centenas = 100, Millares = 1,000, Millones = 1,000,000).
              </div>

              {/* Number Input & Controls */}
              <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border-2 border-[#1E1E24] flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-[#8A909F]">Número a Explorar:</span>
                  <input
                    type="number"
                    min="1"
                    max="999999999"
                    value={posNumber}
                    onChange={(e) => setPosNumber(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-36 px-3 py-1 font-mono font-black text-sm bg-gray-50 border-2 border-[#1E1E24] rounded-xl text-center focus:bg-white"
                  />
                </div>

                <div className="flex gap-1.5">
                  {[4520318, 12005400, 750000000, 3040080].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        playSound('click');
                        setPosNumber(preset);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-black border cursor-pointer ${
                        posNumber === preset ? 'bg-[#F7CA38] border-[#1E1E24]' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Positional Breakdown Matrix */}
              <div className="border-2 border-[#1E1E24] rounded-2xl overflow-hidden shadow-2xs">
                {/* Period Headers */}
                <div className="grid grid-cols-9 bg-[#1E1E24] text-white text-center font-black text-[9px] uppercase tracking-wider py-1.5">
                  <div className="col-span-3 border-r border-white/20 bg-[#6366F1]">Periodo de Millones</div>
                  <div className="col-span-3 border-r border-white/20 bg-[#0EA5E9]">Periodo de Millares</div>
                  <div className="col-span-3 bg-[#10B981]">Periodo de Unidades</div>
                </div>

                {/* Sub-columns */}
                <div className="grid grid-cols-9 bg-gray-100 text-center font-black text-[9px] py-1 border-b border-[#1E1E24]">
                  <div>CMi</div>
                  <div>DMi</div>
                  <div className="border-r border-gray-300">UMi</div>
                  <div>CM</div>
                  <div>DM</div>
                  <div className="border-r border-gray-300">UM</div>
                  <div>C</div>
                  <div>D</div>
                  <div>U</div>
                </div>

                {/* Digits Display */}
                <div className="grid grid-cols-9 bg-white text-center font-mono font-black text-base py-3">
                  {posStr.split('').map((char, cIdx) => (
                    <div
                      key={cIdx}
                      className={`flex flex-col items-center justify-center ${
                        cIdx === 2 || cIdx === 5 ? 'border-r-2 border-dashed border-gray-200' : ''
                      } ${char !== '0' ? 'text-[#1E1E24]' : 'text-gray-300'}`}
                    >
                      <span>{char}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spanish Words Card */}
              <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] font-black uppercase text-[#B45309] block">
                  Lectura y Transcripción a Letra:
                </span>
                <p className="text-sm font-black text-[#1E1E24] capitalize leading-snug">
                  "{numberToSpanishWords(posNumber)}"
                </p>
              </div>
            </div>
          )}

          {/* Positional Quiz Tab */}
          {vol1Tab === 'quiz' && (
            <div className="space-y-4">
              <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#6F78DB]">
                    Pregunta {posQuizIndex + 1} de {positionalQuizQuestions.length}
                  </span>
                  <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full border border-[#22C55E]/30">
                    Grandes Cantidades
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border-2 border-[#1E1E24] text-center space-y-1">
                  <span className="text-[11px] font-bold text-[#8A909F] block">
                    ¿Cómo se escribe correctamente en letra la siguiente cantidad?
                  </span>
                  <span className="font-mono font-black text-2xl text-[#1E1E24] tracking-wider block">
                    {positionalQuizQuestions[posQuizIndex].num.toLocaleString()}
                  </span>
                </div>

                {/* Options 2x2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {positionalQuizQuestions[posQuizIndex].options.map((opt, optIdx) => {
                    const isSelected = posQuizSelected === opt;
                    const isCorrect = opt === positionalQuizQuestions[posQuizIndex].answer;

                    let btnClass = 'bg-white hover:bg-gray-50 border-[#1E1E24]/20 text-[#1E1E24]';
                    if (posQuizFeedback && isSelected) {
                      btnClass = isCorrect
                        ? 'bg-[#22C55E] text-white border-[#15803D]'
                        : 'bg-[#EF4444] text-white border-[#B91C1C]';
                    } else if (posQuizFeedback && isCorrect) {
                      btnClass = 'bg-[#DCFCE7] text-[#166534] border-[#22C55E] font-black';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={posQuizFeedback !== null}
                        onClick={() => {
                          setPosQuizSelected(opt);
                          if (isCorrect) {
                            playSound('correct');
                            setPosQuizFeedback('correct');
                            onAwardXp(15);
                          } else {
                            playSound('error');
                            setPosQuizFeedback('wrong');
                          }
                        }}
                        className={`p-3 rounded-2xl border-2 text-xs font-bold text-left transition-all cursor-pointer leading-snug ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Next button */}
                {posQuizFeedback && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        setPosQuizSelected(null);
                        setPosQuizFeedback(null);
                        setPosQuizIndex((i) => (i + 1) % positionalQuizQuestions.length);
                      }}
                      className="px-4 py-2 bg-[#1E1E24] text-white text-xs font-black uppercase rounded-full shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Siguiente Pregunta</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* TOPIC 2: Operaciones Básicas y Jerarquía (vol1-t2) */}
      {/* ------------------------------------------------------------------- */}
      {topicId === 'vol1-t2' && (
        <div className="space-y-4">
          {/* PEMDAS Cards Hierarchy */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-[#8A909F] block tracking-wider">
              Niveles de Prioridad en la Jerarquía de Operaciones (PEMDAS):
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-[#EFF6FF] border-2 border-[#3B82F6] rounded-2xl p-2.5 text-center">
                <span className="w-5 h-5 rounded-full bg-[#3B82F6] text-white font-black text-[10px] inline-flex items-center justify-center mb-1">
                  1
                </span>
                <h4 className="text-xs font-black text-[#1E3A8A] uppercase">Paréntesis</h4>
                <p className="text-[10px] text-[#2563EB] font-bold mt-0.5">( ), [ ], {'{ }'}</p>
              </div>

              <div className="bg-[#FAF5FF] border-2 border-[#A855F7] rounded-2xl p-2.5 text-center">
                <span className="w-5 h-5 rounded-full bg-[#A855F7] text-white font-black text-[10px] inline-flex items-center justify-center mb-1">
                  2
                </span>
                <h4 className="text-xs font-black text-[#581C87] uppercase">Potencias / Raíces</h4>
                <p className="text-[10px] text-[#7E22CE] font-bold mt-0.5">x², √x</p>
              </div>

              <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-2xl p-2.5 text-center">
                <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-white font-black text-[10px] inline-flex items-center justify-center mb-1">
                  3
                </span>
                <h4 className="text-xs font-black text-[#78350F] uppercase">Mult & Div</h4>
                <p className="text-[10px] text-[#B45309] font-bold mt-0.5">×, ÷ (Izq a Der)</p>
              </div>

              <div className="bg-[#DCFCE7] border-2 border-[#10B981] rounded-2xl p-2.5 text-center">
                <span className="w-5 h-5 rounded-full bg-[#10B981] text-white font-black text-[10px] inline-flex items-center justify-center mb-1">
                  4
                </span>
                <h4 className="text-xs font-black text-[#065F46] uppercase">Suma & Resta</h4>
                <p className="text-[10px] text-[#047857] font-bold mt-0.5">+, - (Izq a Der)</p>
              </div>
            </div>
          </div>

          {/* Interactive Stepper for Expression Solving */}
          <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-black uppercase text-[#6F78DB]">
                Resolución Paso a Paso Interactiva:
              </span>
              <div className="flex items-center gap-1">
                {jerarquiaExample.steps.map((_, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => {
                      playSound('click');
                      setJerarquiaStep(sIdx);
                    }}
                    className={`w-6 h-6 rounded-full font-black text-[10px] border cursor-pointer ${
                      jerarquiaStep === sIdx
                        ? 'bg-[#F7CA38] border-[#1E1E24] text-[#1E1E24]'
                        : 'bg-white border-gray-300 text-gray-600'
                    }`}
                  >
                    {sIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Step Card */}
            <div className="bg-white p-4 rounded-2xl border-2 border-[#1E1E24] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#1E1E24]">
                  {jerarquiaExample.steps[jerarquiaStep].title}
                </span>
                <span className="px-2.5 py-0.5 bg-[#EFF6FF] text-[#1D4ED8] text-[10px] font-black uppercase rounded-full border border-[#3B82F6]/30">
                  {jerarquiaExample.steps[jerarquiaStep].badge}
                </span>
              </div>

              <div className="py-2 text-center font-mono font-black text-xl text-[#1E1E24] bg-gray-50 rounded-xl border border-gray-200">
                <MathView latex={jerarquiaExample.steps[jerarquiaStep].latex} />
              </div>

              <p className="text-xs font-medium text-[#4A4E69] leading-relaxed">
                {jerarquiaExample.steps[jerarquiaStep].action}
              </p>
            </div>

            {/* Step Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  playSound('click');
                  setJerarquiaStep((s) => Math.max(0, s - 1));
                }}
                disabled={jerarquiaStep === 0}
                className="px-3 py-1.5 bg-gray-100 disabled:opacity-30 border rounded-xl text-xs font-bold cursor-pointer"
              >
                Paso Anterior
              </button>
              <button
                onClick={() => {
                  playSound('click');
                  setJerarquiaStep((s) => Math.min(jerarquiaExample.steps.length - 1, s + 1));
                }}
                disabled={jerarquiaStep === jerarquiaExample.steps.length - 1}
                className="px-4 py-1.5 bg-[#6F78DB] text-white disabled:opacity-30 rounded-xl text-xs font-black cursor-pointer shadow-xs"
              >
                Paso Siguiente →
              </button>
            </div>
          </div>

          {/* Interactive Sign Calculator */}
          <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-2xl p-4 space-y-3">
            <span className="text-xs font-black uppercase text-[#B45309] block">
              Simulador Rápido de Multiplicación y División con Signos:
            </span>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  playSound('click');
                  setSignA((s) => (s === '+' ? '-' : '+'));
                }}
                className={`w-11 h-11 rounded-2xl border-2 border-[#1E1E24] font-black text-xl flex items-center justify-center cursor-pointer shadow-xs ${
                  signA === '+' ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'
                }`}
              >
                ({signA})
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  setSignOp((op) => (op === '*' ? '/' : '*'));
                }}
                className="w-9 h-9 rounded-xl bg-white border-2 border-[#1E1E24] font-black text-base flex items-center justify-center cursor-pointer shadow-xs text-[#1E1E24]"
              >
                {signOp === '*' ? '×' : '÷'}
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  setSignB((s) => (s === '+' ? '-' : '+'));
                }}
                className={`w-11 h-11 rounded-2xl border-2 border-[#1E1E24] font-black text-xl flex items-center justify-center cursor-pointer shadow-xs ${
                  signB === '+' ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'
                }`}
              >
                ({signB})
              </button>

              <span className="text-lg font-black text-[#1E1E24]">=</span>

              <div
                className={`w-12 h-11 rounded-2xl border-2 border-[#1E1E24] font-black text-xl flex items-center justify-center shadow-xs ${
                  signResult === '+' ? 'bg-[#22C55E] text-white' : 'bg-[#EF4444] text-white'
                }`}
              >
                {signResult}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* TOPIC 3: Teoría de Números (vol1-t3) */}
      {/* Factores Primos Paso a Paso + Primos vs Compuestos + Criterios */}
      {/* ------------------------------------------------------------------- */}
      {topicId === 'vol1-t3' && (
        <div className="space-y-4">
          {/* Sub-tabs within Topic 3 */}
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                playSound('click');
                setPrimeTab('factorization');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-black uppercase whitespace-nowrap cursor-pointer transition-all ${
                primeTab === 'factorization'
                  ? 'bg-[#6F78DB] text-white shadow-xs'
                  : 'bg-gray-100 text-[#4A4E69] hover:bg-gray-200'
              }`}
            >
              Descomposición Prima Paso a Paso
            </button>
            <button
              onClick={() => {
                playSound('click');
                setPrimeTab('prime-vs-comp');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-black uppercase whitespace-nowrap cursor-pointer transition-all ${
                primeTab === 'prime-vs-comp'
                  ? 'bg-[#6F78DB] text-white shadow-xs'
                  : 'bg-gray-100 text-[#4A4E69] hover:bg-gray-200'
              }`}
            >
              ¿Por qué Primo vs Compuesto?
            </button>
            <button
              onClick={() => {
                playSound('click');
                setPrimeTab('criteria');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-black uppercase whitespace-nowrap cursor-pointer transition-all ${
                primeTab === 'criteria'
                  ? 'bg-[#F7CA38] text-[#1E1E24] shadow-xs'
                  : 'bg-gray-100 text-[#4A4E69] hover:bg-gray-200'
              }`}
            >
              Criterios de Divisibilidad (2, 3, 5, 9)
            </button>
          </div>

          {/* TAB 1: Descomposición Prima Paso a Paso */}
          {primeTab === 'factorization' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-black uppercase text-[#8A909F]">
                  Selecciona o escribe un número a descomponer:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[12, 18, 24, 36, 60, 84].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        playSound('click');
                        setPrimeInput(n);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black border cursor-pointer ${
                        primeInput === n ? 'bg-[#F7CA38] border-[#1E1E24] text-[#1E1E24]' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Division Ladder and Explanation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Visual Ladder Table */}
                <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 space-y-2">
                  <span className="text-[11px] font-black uppercase text-[#6F78DB] block">
                    Tabla de Descomposición Sucesiva:
                  </span>

                  <div className="bg-white border-2 border-[#1E1E24] rounded-xl overflow-hidden font-mono font-black text-sm">
                    {primeSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-4 py-2 border-b border-gray-100 last:border-b-0 hover:bg-amber-50/50"
                      >
                        <span className="text-[#1E1E24]">{step.current}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-300 font-normal">|</span>
                          <span className="text-[#F59E0B] bg-[#FEF3C7] px-2 py-0.5 rounded-md border border-[#F59E0B]/30">
                            {step.divisor}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 text-[#10B981]">
                      <span>1</span>
                      <span className="text-xs font-sans font-bold text-gray-400">Fin</span>
                    </div>
                  </div>

                  <div className="bg-[#DCFCE7] border border-[#22C55E]/40 p-2.5 rounded-xl text-center">
                    <span className="text-xs font-bold text-[#166534] block">
                      Factores Primos Resultantes:
                    </span>
                    <span className="font-mono font-black text-base text-[#15803D]">
                      {primeFactorsList.join(' × ')} = {primeInput}
                    </span>
                  </div>
                </div>

                {/* Step Explanations ("De dónde salió cada factor y por qué") */}
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase text-[#8A909F] block">
                    ¿De dónde salió cada factor y por qué?
                  </span>

                  <div className="space-y-2">
                    {primeSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="bg-white border-2 border-[#1E1E24] rounded-xl p-2.5 flex items-start gap-2.5 shadow-2xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#6F78DB] text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs text-[#1E1E24]">
                              {step.current} ÷ <strong className="text-[#F59E0B]">{step.divisor}</strong> = {step.next}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#4A4E69] font-medium leading-tight mt-0.5">
                            {step.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Primos vs Compuestos Intuitivo */}
          {primeTab === 'prime-vs-comp' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Card: Por qué el 4 NO es primo (Compuesto) */}
                <div className="bg-[#FEE2E2]/50 border-2 border-[#EF4444] rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-[#EF4444] text-white font-black text-xs uppercase rounded-lg">
                      El Número 4 (Compuesto)
                    </span>
                    <span className="text-xs font-bold text-[#991B1B]">3 Divisores</span>
                  </div>

                  <p className="text-xs font-medium text-[#7F1D1D] leading-relaxed">
                    El 4 <strong>NO es primo</strong> porque se puede dividir exactamente entre <strong>1, 2 y 4</strong>.
                  </p>

                  {/* 2x2 Grid Array Representation */}
                  <div className="bg-white p-3 rounded-xl border border-[#EF4444]/30 flex flex-col items-center justify-center gap-1.5">
                    <span className="text-[10px] font-black uppercase text-[#8A909F]">
                      Se puede formar un rectángulo 2×2:
                    </span>
                    <div className="grid grid-cols-2 gap-2 p-2 bg-[#FEE2E2]/30 rounded-lg">
                      <div className="w-6 h-6 rounded-md bg-[#EF4444] text-white font-black text-xs flex items-center justify-center">●</div>
                      <div className="w-6 h-6 rounded-md bg-[#EF4444] text-white font-black text-xs flex items-center justify-center">●</div>
                      <div className="w-6 h-6 rounded-md bg-[#EF4444] text-white font-black text-xs flex items-center justify-center">●</div>
                      <div className="w-6 h-6 rounded-md bg-[#EF4444] text-white font-black text-xs flex items-center justify-center">●</div>
                    </div>
                    <span className="text-[11px] font-bold text-[#991B1B]">2 filas × 2 columnas = 4</span>
                  </div>
                </div>

                {/* Card: Por qué el 7 SÍ es primo */}
                <div className="bg-[#DCFCE7]/60 border-2 border-[#10B981] rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-[#10B981] text-white font-black text-xs uppercase rounded-lg">
                      El Número 7 (Primo)
                    </span>
                    <span className="text-xs font-bold text-[#065F46]">Solo 2 Divisores</span>
                  </div>

                  <p className="text-xs font-medium text-[#065F46] leading-relaxed">
                    El 7 <strong>SÍ es primo</strong> porque únicamente tiene 2 divisores: el <strong>1</strong> y el <strong>7</strong>.
                  </p>

                  {/* 1x7 Linear Array */}
                  <div className="bg-white p-3 rounded-xl border border-[#10B981]/30 flex flex-col items-center justify-center gap-1.5">
                    <span className="text-[10px] font-black uppercase text-[#8A909F]">
                      Solo se puede formar una línea 1×7:
                    </span>
                    <div className="flex gap-1 p-2 bg-[#DCFCE7]/40 rounded-lg overflow-x-auto max-w-full">
                      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div key={i} className="w-5 h-5 rounded-md bg-[#10B981] text-white font-black text-[10px] flex items-center justify-center shrink-0">
                          ●
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[#065F46]">1 fila × 7 columnas = 7 (Irreducible)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Criterios de Divisibilidad (2, 3, 5, 9) */}
          {primeTab === 'criteria' && (
            <div className="space-y-4">
              {/* Tester bar */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-[#1E1E24] flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-[#8A909F]">
                    Probar Número en Vivo:
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="99999"
                    value={criteriaTestNum}
                    onChange={(e) => setCriteriaTestNum(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-24 px-3 py-1 font-mono font-black text-base bg-gray-50 border-2 border-[#1E1E24] rounded-xl text-center"
                  />
                </div>

                <div className="flex gap-1.5">
                  {[354, 450, 819, 1428, 2745].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        playSound('click');
                        setCriteriaTestNum(n);
                      }}
                      className={`px-2 py-1 rounded-xl text-xs font-black border cursor-pointer ${
                        criteriaTestNum === n ? 'bg-[#F7CA38] border-[#1E1E24]' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Colored Cards for 2, 3, 5, 9 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Regla del 2 */}
                <div
                  className={`p-3.5 rounded-2xl border-2 transition-all ${
                    criteriaResults.rule2.pass
                      ? 'bg-[#DCFCE7] border-[#10B981]'
                      : 'bg-white border-gray-200 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-[#6366F1] text-white font-black text-xs uppercase rounded-lg">
                      Divisible entre 2
                    </span>
                    {criteriaResults.rule2.pass ? (
                      <span className="text-xs font-black text-[#166534] flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> ¡Cumple!
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-gray-400">No cumple</span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-[#1E1E24] mt-2">
                    Regla: La última cifra debe ser par (0, 2, 4, 6, 8).
                  </p>
                  <p className="text-[11px] text-[#4A4E69] mt-1 font-medium">
                    {criteriaResults.rule2.reason}
                  </p>
                </div>

                {/* Regla del 3 */}
                <div
                  className={`p-3.5 rounded-2xl border-2 transition-all ${
                    criteriaResults.rule3.pass
                      ? 'bg-[#DCFCE7] border-[#10B981]'
                      : 'bg-white border-gray-200 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-[#10B981] text-white font-black text-xs uppercase rounded-lg">
                      Divisible entre 3
                    </span>
                    {criteriaResults.rule3.pass ? (
                      <span className="text-xs font-black text-[#166534] flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> ¡Cumple!
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-gray-400">No cumple</span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-[#1E1E24] mt-2">
                    Regla: La suma de sus dígitos debe ser múltiplo de 3.
                  </p>
                  <p className="text-[11px] text-[#4A4E69] mt-1 font-medium">
                    {criteriaResults.rule3.reason}
                  </p>
                </div>

                {/* Regla del 5 */}
                <div
                  className={`p-3.5 rounded-2xl border-2 transition-all ${
                    criteriaResults.rule5.pass
                      ? 'bg-[#DCFCE7] border-[#10B981]'
                      : 'bg-white border-gray-200 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-[#F59E0B] text-white font-black text-xs uppercase rounded-lg">
                      Divisible entre 5
                    </span>
                    {criteriaResults.rule5.pass ? (
                      <span className="text-xs font-black text-[#166534] flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> ¡Cumple!
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-gray-400">No cumple</span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-[#1E1E24] mt-2">
                    Regla: La última cifra debe ser 0 o 5.
                  </p>
                  <p className="text-[11px] text-[#4A4E69] mt-1 font-medium">
                    {criteriaResults.rule5.reason}
                  </p>
                </div>

                {/* Regla del 9 */}
                <div
                  className={`p-3.5 rounded-2xl border-2 transition-all ${
                    criteriaResults.rule9.pass
                      ? 'bg-[#DCFCE7] border-[#10B981]'
                      : 'bg-white border-gray-200 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-[#EC4899] text-white font-black text-xs uppercase rounded-lg">
                      Divisible entre 9
                    </span>
                    {criteriaResults.rule9.pass ? (
                      <span className="text-xs font-black text-[#166534] flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> ¡Cumple!
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-gray-400">No cumple</span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-[#1E1E24] mt-2">
                    Regla: La suma de sus dígitos debe ser múltiplo de 9.
                  </p>
                  <p className="text-[11px] text-[#4A4E69] mt-1 font-medium">
                    {criteriaResults.rule9.reason}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* TOPIC 4: Decimales y Fracciones (vol1-t4) */}
      {/* Mismo Denom, Distinto Denom, Mult, Div, Mixta <-> Impropia */}
      {/* ------------------------------------------------------------------- */}
      {topicId === 'vol1-t4' && (
        <div className="space-y-4">
          {/* Operations Mode Selector */}
          <div className="flex items-center gap-1.5 border-b border-gray-100 pb-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'same-den', label: '1. Mismo Denominador' },
              { id: 'diff-den', label: '2. Distinto Denominador' },
              { id: 'mult', label: '3. Multiplicación' },
              { id: 'div', label: '4. División' },
              { id: 'mixed-conversion', label: '5. Impropia ↔ Mixta' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  playSound('click');
                  setFracOperationMode(m.id as any);
                  if (m.id === 'same-den') {
                    setF2Den(f1Den);
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-black uppercase whitespace-nowrap cursor-pointer transition-all ${
                  fracOperationMode === m.id
                    ? 'bg-[#6F78DB] text-white shadow-xs'
                    : 'bg-gray-100 text-[#4A4E69] hover:bg-gray-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* MODE 1 & 2: Suma y Resta (Mismo o Distinto Denominador) */}
          {(fracOperationMode === 'same-den' || fracOperationMode === 'diff-den') && (
            <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#8A909F]">
                  {fracOperationMode === 'same-den'
                    ? 'Suma y Resta con Denominador Común'
                    : 'Suma y Resta con Distinto Denominador (Producto Cruzado)'}
                </span>

                {/* Operator toggle + / - */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-300">
                  <button
                    onClick={() => setFracOp('+')}
                    className={`w-7 h-7 rounded-lg text-sm font-black flex items-center justify-center cursor-pointer ${
                      fracOp === '+' ? 'bg-[#22C55E] text-white' : 'text-gray-500'
                    }`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => setFracOp('-')}
                    className={`w-7 h-7 rounded-lg text-sm font-black flex items-center justify-center cursor-pointer ${
                      fracOp === '-' ? 'bg-[#EF4444] text-white' : 'text-gray-500'
                    }`}
                  >
                    -
                  </button>
                </div>
              </div>

              {/* Main Fraction Equation View */}
              <div className="flex items-center justify-center gap-4 bg-white p-4 rounded-2xl border-2 border-[#1E1E24] flex-wrap">
                {/* Fraction 1 */}
                <div className="flex flex-col items-center">
                  <MathFraction num={f1Num} den={f1Den} size="lg" className="text-[#6F78DB]" />
                  <div className="flex items-center gap-1 mt-2">
                    <button
                      onClick={() => setF1Num((n) => Math.max(1, n - 1))}
                      className="w-5 h-5 rounded-md bg-gray-100 text-xs font-black flex items-center justify-center border cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setF1Num((n) => Math.min(9, n + 1))}
                      className="w-5 h-5 rounded-md bg-gray-100 text-xs font-black flex items-center justify-center border cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <span className="text-2xl font-black text-[#1E1E24]">{fracOp}</span>

                {/* Fraction 2 */}
                <div className="flex flex-col items-center">
                  <MathFraction
                    num={f2Num}
                    den={fracOperationMode === 'same-den' ? f1Den : f2Den}
                    size="lg"
                    className="text-[#F59E0B]"
                  />
                  <div className="flex items-center gap-1 mt-2">
                    <button
                      onClick={() => setF2Num((n) => Math.max(1, n - 1))}
                      className="w-5 h-5 rounded-md bg-gray-100 text-xs font-black flex items-center justify-center border cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setF2Num((n) => Math.min(9, n + 1))}
                      className="w-5 h-5 rounded-md bg-gray-100 text-xs font-black flex items-center justify-center border cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <span className="text-2xl font-black text-[#1E1E24]">=</span>

                {/* Result Fraction */}
                <div className="flex flex-col items-center">
                  {fracOperationMode === 'same-den' ? (
                    <MathFraction
                      num={fracOp === '+' ? f1Num + f2Num : f1Num - f2Num}
                      den={f1Den}
                      size="xl"
                      className="text-[#22C55E]"
                    />
                  ) : (
                    <MathFraction
                      num={fracOp === '+' ? f1Num * f2Den + f2Num * f1Den : f1Num * f2Den - f2Num * f1Den}
                      den={f1Den * f2Den}
                      size="xl"
                      className="text-[#22C55E]"
                    />
                  )}
                </div>
              </div>

              {/* Explanatory Formula Card */}
              <div className="p-3 bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-xl text-center text-xs font-bold text-[#1E1E24]">
                {fracOperationMode === 'same-den' ? (
                  <span>
                    El denominador permanece igual (<strong className="text-[#6F78DB]">{f1Den}</strong>) y solo operamos los numeradores:{' '}
                    <MathFraction
                      num={`${f1Num} ${fracOp} ${f2Num}`}
                      den={f1Den}
                      size="sm"
                    />{' '}
                    ={' '}
                    <MathFraction
                      num={fracOp === '+' ? f1Num + f2Num : f1Num - f2Num}
                      den={f1Den}
                      size="sm"
                    />
                  </span>
                ) : (
                  <span>
                    Producto Cruzado:{' '}
                    <MathFraction
                      num={`(${f1Num} \\cdot ${f2Den}) ${fracOp} (${f2Num} \\cdot ${f1Den})`}
                      den={`${f1Den} \\cdot ${f2Den}`}
                      size="sm"
                    />
                  </span>
                )}
              </div>
            </div>
          )}

          {/* MODE 3: Multiplicación de Fracciones */}
          {fracOperationMode === 'mult' && (
            <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 space-y-4">
              <span className="text-xs font-black uppercase text-[#8A909F] block">
                Multiplicación Directa: Numerador × Numerador y Denominador × Denominador
              </span>

              <div className="flex items-center justify-center gap-4 bg-white p-4 rounded-2xl border-2 border-[#1E1E24] flex-wrap">
                <MathFraction num={f1Num} den={f1Den} size="lg" className="text-[#6F78DB]" />
                <span className="text-2xl font-black text-[#1E1E24]">×</span>
                <MathFraction num={f2Num} den={f2Den} size="lg" className="text-[#F59E0B]" />
                <span className="text-2xl font-black text-[#1E1E24]">=</span>
                <MathFraction
                  num={`${f1Num} \\times ${f2Num}`}
                  den={`${f1Den} \\times ${f2Den}`}
                  size="md"
                  className="text-gray-600"
                />
                <span className="text-xl font-black text-[#1E1E24]">=</span>
                <MathFraction
                  num={f1Num * f2Num}
                  den={f1Den * f2Den}
                  size="xl"
                  className="text-[#22C55E]"
                />
              </div>

              <div className="p-3 bg-[#DCFCE7] border border-[#22C55E]/40 rounded-xl text-center text-xs font-bold text-[#166534]">
                ¡En la multiplicación no se necesita buscar común denominador! Se multiplica directo de forma horizontal.
              </div>
            </div>
          )}

          {/* MODE 4: División de Fracciones */}
          {fracOperationMode === 'div' && (
            <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 space-y-4">
              <span className="text-xs font-black uppercase text-[#8A909F] block">
                División Cruzada (o Multiplicación por el Recíproco)
              </span>

              <div className="flex items-center justify-center gap-4 bg-white p-4 rounded-2xl border-2 border-[#1E1E24] flex-wrap">
                <MathFraction num={f1Num} den={f1Den} size="lg" className="text-[#6F78DB]" />
                <span className="text-2xl font-black text-[#1E1E24]">÷</span>
                <MathFraction num={f2Num} den={f2Den} size="lg" className="text-[#F59E0B]" />
                <span className="text-2xl font-black text-[#1E1E24]">=</span>
                <MathFraction
                  num={`${f1Num} \\times ${f2Den}`}
                  den={`${f1Den} \\times ${f2Num}`}
                  size="md"
                  className="text-gray-600"
                />
                <span className="text-xl font-black text-[#1E1E24]">=</span>
                <MathFraction
                  num={f1Num * f2Den}
                  den={f1Den * f2Num}
                  size="xl"
                  className="text-[#22C55E]"
                />
              </div>

              <div className="p-3 bg-[#EFF6FF] border border-[#3B82F6]/40 rounded-xl text-center text-xs font-bold text-[#1E3A8A]">
                Regla de la división: <MathFraction num="a" den="b" size="xs" /> ÷ <MathFraction num="c" den="d" size="xs" /> = <MathFraction num="a · d" den="b · c" size="xs" />.
              </div>
            </div>
          )}

          {/* MODE 5: Transformación Impropia <-> Mixta */}
          {fracOperationMode === 'mixed-conversion' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Impropia a Mixta */}
                <div className="bg-white border-2 border-[#1E1E24] rounded-2xl p-4 space-y-3 shadow-xs">
                  <span className="px-2.5 py-0.5 bg-[#6F78DB] text-white font-black text-xs uppercase rounded-lg inline-block">
                    Fracción Impropia ➔ Mixta
                  </span>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">Impropia:</span>
                      <MathFraction num={improperNum} den={improperDen} size="lg" className="text-[#6F78DB]" />
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => setImproperNum((n) => Math.max(improperDen + 1, n - 1))}
                        className="w-6 h-6 rounded-lg bg-gray-100 font-black text-xs flex items-center justify-center border cursor-pointer"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setImproperNum((n) => n + 1)}
                        className="w-6 h-6 rounded-lg bg-gray-100 font-black text-xs flex items-center justify-center border cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Division breakdown */}
                  <div className="bg-gray-50 p-2.5 rounded-xl border text-xs font-mono text-center">
                    {improperNum} ÷ {improperDen} = <strong>{mixedWhole}</strong> enteros (residuo{' '}
                    <strong>{mixedRemainder}</strong>)
                  </div>

                  {/* Result as Mixed Fraction */}
                  <div className="bg-[#DCFCE7] border border-[#22C55E]/40 p-3 rounded-xl flex items-center justify-center gap-3">
                    <span className="text-xs font-bold text-[#166534]">Resultado Mixto:</span>
                    <MathFraction
                      whole={mixedWhole}
                      num={mixedRemainder}
                      den={improperDen}
                      size="lg"
                      className="text-[#15803D]"
                    />
                  </div>
                </div>

                {/* 2. Mixta a Impropia */}
                <div className="bg-white border-2 border-[#1E1E24] rounded-2xl p-4 space-y-3 shadow-xs">
                  <span className="px-2.5 py-0.5 bg-[#F59E0B] text-white font-black text-xs uppercase rounded-lg inline-block">
                    Fracción Mixta ➔ Impropia
                  </span>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">Mixta:</span>
                      <MathFraction
                        whole={mixedInputWhole}
                        num={mixedInputNum}
                        den={mixedInputDen}
                        size="lg"
                        className="text-[#F59E0B]"
                      />
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => setMixedInputWhole((w) => Math.max(1, w - 1))}
                        className="w-6 h-6 rounded-lg bg-gray-100 font-black text-xs flex items-center justify-center border cursor-pointer"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setMixedInputWhole((w) => w + 1)}
                        className="w-6 h-6 rounded-lg bg-gray-100 font-black text-xs flex items-center justify-center border cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Formula explanation */}
                  <div className="bg-gray-50 p-2.5 rounded-xl border text-xs font-mono text-center">
                    ({mixedInputWhole} × {mixedInputDen}) + {mixedInputNum} ={' '}
                    <strong>{improperConvertedNum}</strong>
                  </div>

                  {/* Result as Improper Fraction */}
                  <div className="bg-[#FEF3C7] border border-[#F59E0B]/40 p-3 rounded-xl flex items-center justify-center gap-3">
                    <span className="text-xs font-bold text-[#92400E]">Resultado Impropio:</span>
                    <MathFraction
                      num={improperConvertedNum}
                      den={mixedInputDen}
                      size="lg"
                      className="text-[#B45309]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOPICS IN ALGEBRA & OTHER MODULES */}
      {topicId.startsWith('vol2') && (
        <div className="space-y-4">
          <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 space-y-3">
            <span className="text-xs font-black uppercase text-[#8A909F] block">
              Modelo Geométrico de Áreas de Binomios <MathView latex="(a+b)^2 = a^2 + 2ab + b^2" inline />
            </span>

            <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span>Lado a:</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={geomA}
                  onChange={(e) => setGeomA(Number(e.target.value))}
                  className="w-20 accent-[#6F78DB]"
                />
                <span className="font-mono">{geomA}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <span>Lado b:</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={geomB}
                  onChange={(e) => setGeomB(Number(e.target.value))}
                  className="w-20 accent-[#F59E0B]"
                />
                <span className="font-mono">{geomB}</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border-2 border-[#1E1E24] text-center text-xs font-black text-[#1E1E24]">
              Área Total: ({geomA} + {geomB})² = ({geomA + geomB})² ={' '}
              <span className="text-[#22C55E]">{(geomA + geomB) ** 2}</span>
            </div>
          </div>
        </div>
      )}

      {/* TOPICS IN GEOMETRY (VOL-03) */}
      {topicId.startsWith('vol3') && (
        <div className="space-y-4">
          <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 space-y-3">
            <span className="text-xs font-black uppercase text-[#8A909F] block">
              Suma de Ángulos Internos en Polígonos Regulares: <MathView latex="S = (n-2) \\cdot 180^\\circ" inline />
            </span>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold">Lados (n): {polygonSides}</span>
              <div className="flex gap-1 flex-wrap">
                {[3, 4, 5, 6, 8].map((sides) => (
                  <button
                    key={sides}
                    onClick={() => setPolygonSides(sides)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black border ${
                      polygonSides === sides ? 'bg-[#F7CA38] border-[#1E1E24] text-[#1E1E24]' : 'bg-white'
                    }`}
                  >
                    {sides === 3 ? 'Triángulo' : sides === 4 ? 'Cuadrilátero' : sides === 5 ? 'Pentágono' : sides === 6 ? 'Hexágono' : 'Octágono'}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border-2 border-[#1E1E24] text-center text-xs font-bold text-[#1E1E24]">
              Suma de Ángulos:{' '}
              <strong className="text-[#6F78DB]">
                ({polygonSides} - 2) × 180° = {(polygonSides - 2) * 180}°
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* TOPICS IN ANALYTIC GEOMETRY & FUNCTIONS (VOL-04) */}
      {topicId.startsWith('vol4') && (
        <div className="space-y-4">
          <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 space-y-3">
            <span className="text-xs font-black uppercase text-[#8A909F] block">
              Ecuación de la Recta: <MathView latex="y = mx + b" inline />
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <div>
                <span>Pendiente (m): {slopeM}</span>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  value={slopeM}
                  onChange={(e) => setSlopeM(Number(e.target.value))}
                  className="w-full accent-[#6F78DB]"
                />
              </div>
              <div>
                <span>Ordenada al origen (b): {interceptB}</span>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  value={interceptB}
                  onChange={(e) => setInterceptB(Number(e.target.value))}
                  className="w-full accent-[#F59E0B]"
                />
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border-2 border-[#1E1E24] text-center text-sm font-black text-[#1E1E24]">
              Ecuación Resultante:{' '}
              <span className="text-[#6F78DB]">
                y = {slopeM}x {interceptB >= 0 ? `+ ${interceptB}` : `- ${Math.abs(interceptB)}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
