import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Sparkles, CheckCircle2, HelpCircle, Trophy, ArrowRight, RefreshCw, Check } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';
import { Mascot } from './Mascot';

interface AlgebraBalanceWidgetProps {
  onAwardXp?: (amount: number) => void;
}

interface AlgebraQuizQuestion {
  id: string;
  question: string;
  latex?: string;
  options: { label: string; isCorrect: boolean; explanation: string }[];
}

export const AlgebraBalanceWidget: React.FC<AlgebraBalanceWidgetProps> = ({ onAwardXp }) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'quiz'>('demo');
  const [demoMode, setDemoMode] = useState<'balance' | 'notable'>('balance');

  // Balance State for 2x + 3 = 11 -> target x = 4
  const [leftXCount, setLeftXCount] = useState<number>(2);
  const [leftUnits, setLeftUnits] = useState<number>(3);
  const [rightUnits, setRightUnits] = useState<number>(11);

  // Notable Products Area state
  const [notableA, setNotableA] = useState<number>(3);
  const [notableB, setNotableB] = useState<number>(2);

  // Check if balance is physically in equilibrium (assuming true x = 4)
  const leftTotalWeight = leftXCount * 4 + leftUnits;
  const isBalanced = leftTotalWeight === rightUnits;
  const solved = leftXCount === 1 && leftUnits === 0 && rightUnits === 4;

  const handleSubtractUnits = (amount: number) => {
    playSound('click');
    if (leftUnits >= amount && rightUnits >= amount) {
      setLeftUnits(leftUnits - amount);
      setRightUnits(rightUnits - amount);
    }
  };

  const handleDivideByXCoeff = () => {
    playSound('correct');
    if (leftXCount === 2 && leftUnits === 0 && rightUnits % 2 === 0) {
      setLeftXCount(1);
      setRightUnits(rightUnits / 2);
    }
  };

  const handleResetBalance = () => {
    playSound('click');
    setLeftXCount(2);
    setLeftUnits(3);
    setRightUnits(11);
  };

  // 5 Algebra Questions Pool
  const questionPool: AlgebraQuizQuestion[] = [
    {
      id: 'aq1',
      question: 'En la ecuación 2x + 3 = 11, ¿cuál es el primer paso legal para aislar la variable x?',
      latex: '2x + 3 = 11',
      options: [
        { label: 'Restar 3 a ambos lados', isCorrect: true, explanation: '¡Correcto! Por la propiedad uniforme de la igualdad, restar 3 a ambos lados mantiene el equilibrio y elimina las unidades libres del lado izquierdo.' },
        { label: 'Dividir todo entre 2 primero', isCorrect: false, explanation: 'Incorrecto: Aunque es válido, dividir primero genera fracciones innecesarias en las unidades.' },
        { label: 'Sumar 3 a ambos lados', isCorrect: false, explanation: 'Incorrecto: Sumar 3 aumentaría las unidades a 2x + 6 = 14.' },
        { label: 'Multiplicar por 11', isCorrect: false, explanation: 'Incorrecto: Multiplicar rompería la simplificación.' },
      ],
    },
    {
      id: 'aq2',
      question: '¿Cuál es el desarrollo del binomio al cuadrado (x + 3)²?',
      latex: '(x + 3)^2',
      options: [
        { label: 'x² + 6x + 9', isCorrect: true, explanation: '¡Correcto! Aplicando la Ley del Trinomio Cuadrado Perfecto: a² + 2ab + b² = x² + 2(3)x + 3² = x² + 6x + 9.' },
        { label: 'x² + 9', isCorrect: false, explanation: '¡ALERTA DE MOVIMIENTO ILEGAL! Te falta el término del medio 2ab = 6x.' },
        { label: 'x² + 3x + 9', isCorrect: false, explanation: 'Incorrecto: El término central debe multiplicarse por 2, resultando en 6x.' },
        { label: '2x + 6', isCorrect: false, explanation: 'Incorrecto: Eso es multiplicar por 2, no elevar al cuadrado.' },
      ],
    },
    {
      id: 'aq3',
      question: 'Si en una balanza algebraica tenemos 3x = 15, ¿cuánto vale cada x?',
      latex: '3x = 15',
      options: [
        { label: 'x = 5', isCorrect: true, explanation: '¡Correcto! Dividiendo ambos platillos entre 3 se obtiene x = 15/3 = 5.' },
        { label: 'x = 12', isCorrect: false, explanation: 'Incorrecto: 12 es el resultado de restar 3, no de dividir entre 3.' },
        { label: 'x = 45', isCorrect: false, explanation: 'Incorrecto: Multiplicaste en lugar de dividir.' },
        { label: 'x = 3', isCorrect: false, explanation: 'Incorrecto: 3 × 3 = 9, no 15.' },
      ],
    },
    {
      id: 'aq4',
      question: '¿A qué equivale el producto de binomios conjugados (x + 4)(x - 4)?',
      latex: '(x + 4)(x - 4)',
      options: [
        { label: 'x² - 16', isCorrect: true, explanation: '¡Correcto! Es una Diferencia de Cuadrados: (a+b)(a-b) = a² - b² = x² - 16.' },
        { label: 'x² + 16', isCorrect: false, explanation: 'Incorrecto: El signo entre los cuadrados siempre es menos (-).' },
        { label: 'x² - 8x + 16', isCorrect: false, explanation: 'Incorrecto: Los términos centrales +4x y -4x se cancelan a 0.' },
        { label: '2x - 8', isCorrect: false, explanation: 'Incorrecto: No es una suma, sino multiplicación.' },
      ],
    },
    {
      id: 'aq5',
      question: 'En el rectángulo de áreas de (a + b)², ¿cuántos rectángulos "ab" se forman en el centro?',
      latex: '(a + b)^2 = a^2 + 2ab + b^2',
      options: [
        { label: '2 rectángulos de área ab', isCorrect: true, explanation: '¡Correcto! Por eso la fórmula tiene el término "2ab".' },
        { label: '1 rectángulo de área ab', isCorrect: false, explanation: 'Incorrecto: Se forman 2 rectángulos congruentes en la grilla visual.' },
        { label: '4 rectángulos', isCorrect: false, explanation: 'Incorrecto: En total hay 4 figuras (a², b² y 2 de ab).' },
        { label: 'Ninguno', isCorrect: false, explanation: 'Incorrecto: Los términos cruzados representan rectángulos ab.' },
      ],
    },
  ];

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<AlgebraQuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleStartQuiz = () => {
    playSound('click');
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuizQuestions(shuffled);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFeedback(null);
    setQuizFinished(false);
    setActiveTab('quiz');
  };

  const handleAnswerQuiz = (option: { label: string; isCorrect: boolean; explanation: string }) => {
    if (quizFeedback) return;

    if (option.isCorrect) {
      playSound('correct');
      setQuizScore((prev) => prev + 1);
      setQuizFeedback({ isCorrect: true, text: option.explanation });
    } else {
      playSound('error');
      setQuizFeedback({ isCorrect: false, text: option.explanation });
    }
  };

  const handleNextQuizQuestion = () => {
    playSound('click');
    setQuizFeedback(null);
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex(quizIndex + 1);
    } else {
      setQuizFinished(true);
      playSound('fanfare');
      if (onAwardXp) onAwardXp(100);
    }
  };

  return (
    <div className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 sm:p-6 shadow-xs space-y-6 text-[#1E1E24] font-jakarta">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#1E1E24]">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] rounded-2xl shrink-0 shadow-2xs">
            <Scale className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#6F78DB] text-white font-black text-[10px] uppercase rounded-full shadow-2xs">
                Laboratorio Interactivo
              </span>
              <span className="text-xs font-bold text-[#8A909F]">Álgebra & Productos Notables</span>
            </div>
            <h3 className="text-xl font-black text-[#1E1E24] uppercase tracking-tight">
              Balanza Algebraica: {activeTab === 'demo' ? 'Demostración Visual' : 'Prueba de 5 Ejercicios'}
            </h3>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-[#F4F7FC] p-1.5 rounded-full border-2 border-[#1E1E24] shadow-2xs">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('demo');
            }}
            className={`px-4 py-2 rounded-full font-black text-xs uppercase transition-all cursor-pointer ${
              activeTab === 'demo'
                ? 'bg-[#6F78DB] text-white border-2 border-[#1E1E24] shadow-2xs'
                : 'text-[#4A4E69] hover:text-[#1E1E24]'
            }`}
          >
            1. Demostración
          </button>
          <button
            onClick={handleStartQuiz}
            className={`px-4 py-2 rounded-full font-black text-xs uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] shadow-2xs'
                : 'text-[#4A4E69] hover:text-[#1E1E24]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1E1E24]" />
            <span>2. Prueba (5 Ejercicios)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DEMOSTRACIÓN GUIADA */}
      {activeTab === 'demo' && (
        <div className="space-y-6">
          {/* Sub-mode selector inside Demo */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                playSound('click');
                setDemoMode('balance');
              }}
              className={`px-4 py-2 text-xs font-black uppercase rounded-full transition-all cursor-pointer border-2 ${
                demoMode === 'balance'
                  ? 'bg-[#6F78DB] text-white border-[#1E1E24] shadow-2xs'
                  : 'bg-white text-[#1E1E24] border-[#1E1E24]/20 hover:border-[#1E1E24]'
              }`}
            >
              ⚖️ Balanza de Ecuaciones
            </button>

            <button
              onClick={() => {
                playSound('click');
                setDemoMode('notable');
              }}
              className={`px-4 py-2 text-xs font-black uppercase rounded-full transition-all cursor-pointer border-2 ${
                demoMode === 'notable'
                  ? 'bg-[#6F78DB] text-white border-[#1E1E24] shadow-2xs'
                  : 'bg-white text-[#1E1E24] border-[#1E1E24]/20 hover:border-[#1E1E24]'
              }`}
            >
              📐 Área Geométrica (a+b)²
            </button>
          </div>

          {demoMode === 'balance' ? (
            <div className="space-y-6">
              {/* Active Equation Display */}
              <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 text-center max-w-full overflow-hidden shadow-2xs">
                <span className="text-xs font-black text-[#8A909F] uppercase block mb-1">
                  Ecuación representada en la balanza:
                </span>
                <div className="inline-block max-w-full overflow-x-auto px-4 sm:px-6 py-2 bg-white border-2 border-[#1E1E24] rounded-xl text-xl sm:text-2xl font-black text-[#1E1E24] shadow-xs font-mono scrollbar-none">
                  <MathView latex={`${leftXCount}x + ${leftUnits} = ${rightUnits}`} />
                </div>
              </div>

              {/* Balance Scale Graphic */}
              <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden max-w-full shadow-xs">
                {/* Equilibrium Indicator */}
                <div className="mb-6">
                  {isBalanced ? (
                    <span className="px-3 py-1 bg-[#22C55E] border-2 border-[#1E1E24] rounded-full font-black text-xs text-white flex items-center gap-1 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0" /> BALANZA EN EQUILIBRIO
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-[#FEE2E2] text-[#991B1B] border-2 border-[#1E1E24] rounded-full font-black text-xs shadow-2xs">
                      ⚠️ DESEQUILIBRIO DETECTADO
                    </span>
                  )}
                </div>

                {/* Scale Bar */}
                <motion.div
                  animate={{
                    rotate: isBalanced ? 0 : leftTotalWeight > rightUnits ? -5 : 5,
                  }}
                  className="w-full max-w-xl bg-[#1E1E24] h-3 rounded-full relative flex flex-col sm:flex-row items-center justify-between px-2 sm:px-8 gap-12 sm:gap-0 mt-20 sm:mt-0"
                >
                  {/* Fulcrum Pyramid */}
                  <div className="hidden sm:block absolute left-1/2 -bottom-7 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[24px] border-b-[#1E1E24]" />

                  {/* Left Pan */}
                  <div className="bg-white border-2 border-[#1E1E24] rounded-2xl p-3 -mt-20 sm:-mt-24 shadow-xs w-36 sm:w-44 min-h-[90px] sm:min-h-[100px] flex flex-wrap gap-1.5 items-center justify-center">
                    <span className="w-full text-[10px] font-black uppercase text-[#8A909F] text-center block">
                      Platillo Izquierdo
                    </span>
                    {Array.from({ length: leftXCount }).map((_, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#6F78DB] text-white border border-[#1E1E24] rounded-lg text-xs font-black shadow-2xs"
                      >
                        [X]
                      </span>
                    ))}
                    {Array.from({ length: leftUnits }).map((_, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 sm:w-6 sm:h-6 bg-[#FCA5A5] text-[#1E1E24] border border-[#1E1E24] rounded-full text-xs font-black flex items-center justify-center shadow-2xs"
                      >
                        1
                      </span>
                    ))}
                  </div>

                  {/* Right Pan */}
                  <div className="bg-white border-2 border-[#1E1E24] rounded-2xl p-3 -mt-8 sm:-mt-24 shadow-xs w-36 sm:w-44 min-h-[90px] sm:min-h-[100px] flex flex-wrap gap-1.5 items-center justify-center">
                    <span className="w-full text-[10px] font-black uppercase text-[#8A909F] text-center block">
                      Platillo Derecho
                    </span>
                    {Array.from({ length: rightUnits }).map((_, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 sm:w-6 sm:h-6 bg-[#F7CA38] text-[#1E1E24] border border-[#1E1E24] rounded-full text-xs font-black flex items-center justify-center shadow-2xs"
                      >
                        1
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Legal Operations Controls */}
              <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between shadow-2xs">
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={leftUnits < 3 || rightUnits < 3}
                    onClick={() => handleSubtractUnits(3)}
                    className="px-4 py-2.5 bg-[#FCA5A5] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full cursor-pointer disabled:opacity-40 shadow-xs transition-all active:scale-95"
                  >
                    Resta 3 de Ambos Lados
                  </button>

                  <button
                    disabled={leftUnits !== 0 || leftXCount !== 2 || rightUnits % 2 !== 0}
                    onClick={handleDivideByXCoeff}
                    className="px-4 py-2.5 bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full cursor-pointer disabled:opacity-40 shadow-xs transition-all active:scale-95"
                  >
                    Divide Entre 2 Ambos Lados
                  </button>
                </div>

                <button
                  onClick={handleResetBalance}
                  className="px-4 py-2.5 bg-white text-[#1E1E24] font-black text-xs uppercase rounded-full border-2 border-[#1E1E24] hover:bg-[#F4F7FC] shadow-2xs cursor-pointer transition-all active:scale-95"
                >
                  Reiniciar Balanza
                </button>
              </div>

              {solved && (
                <div className="p-4 bg-[#22C55E] text-white border-2 border-[#1E1E24] rounded-2xl text-center font-black text-base shadow-xs animate-fade-in">
                  🎉 ¡ECUACIÓN RESUELTA CON ÉXITO! x = 4
                </div>
              )}
            </div>
          ) : (
            /* Notable Product Area Tab */
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F8FAFC] p-4 border-2 border-[#1E1E24] rounded-2xl shadow-2xs">
                  <label className="text-xs font-black text-[#1E1E24] block mb-1 flex justify-between">
                    <span>Lado 'a':</span>
                    <span className="text-[#6F78DB] font-black">{notableA}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={notableA}
                    onChange={(e) => {
                      playSound('click');
                      setNotableA(Number(e.target.value));
                    }}
                    className="w-full accent-[#6F78DB] cursor-pointer"
                  />
                </div>

                <div className="bg-[#F8FAFC] p-4 border-2 border-[#1E1E24] rounded-2xl shadow-2xs">
                  <label className="text-xs font-black text-[#1E1E24] block mb-1 flex justify-between">
                    <span>Lado 'b':</span>
                    <span className="text-[#F59E0B] font-black">{notableB}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={notableB}
                    onChange={(e) => {
                      playSound('click');
                      setNotableB(Number(e.target.value));
                    }}
                    className="w-full accent-[#F59E0B] cursor-pointer"
                  />
                </div>
              </div>

              {/* Area Square Visualizer */}
              <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-3xl p-6 flex flex-col items-center justify-center shadow-xs">
                <div className="text-center mb-4">
                  <span className="px-4 py-2 bg-white border-2 border-[#1E1E24] rounded-xl text-base sm:text-lg font-black text-[#1E1E24] font-mono shadow-xs">
                    <MathView latex={`(${notableA} + ${notableB})^2 = ${notableA}^2 + 2(${notableA} \\cdot ${notableB}) + ${notableB}^2`} />
                  </span>
                </div>

                {/* Geometric Grid */}
                <div className="border-2 border-[#1E1E24] rounded-2xl overflow-hidden flex flex-col shadow-xs bg-white p-2">
                  <div className="flex">
                    <div
                      className="bg-[#6F78DB] text-white p-3 text-center font-black text-xs flex flex-col items-center justify-center rounded-tl-xl border-r-2 border-b-2 border-[#1E1E24]"
                      style={{ width: `${notableA * 45}px`, height: `${notableA * 45}px` }}
                    >
                      <span>a²</span>
                      <span>({notableA * notableA})</span>
                    </div>
                    <div
                      className="bg-[#F7CA38] text-[#1E1E24] p-3 text-center font-black text-xs flex flex-col items-center justify-center rounded-tr-xl border-b-2 border-[#1E1E24]"
                      style={{ width: `${notableB * 45}px`, height: `${notableA * 45}px` }}
                    >
                      <span>ab</span>
                      <span>({notableA * notableB})</span>
                    </div>
                  </div>

                  <div className="flex">
                    <div
                      className="bg-[#F7CA38] text-[#1E1E24] p-3 text-center font-black text-xs flex flex-col items-center justify-center rounded-bl-xl border-r-2 border-[#1E1E24]"
                      style={{ width: `${notableA * 45}px`, height: `${notableB * 45}px` }}
                    >
                      <span>ab</span>
                      <span>({notableA * notableB})</span>
                    </div>
                    <div
                      className="bg-[#FCA5A5] text-[#1E1E24] p-3 text-center font-black text-xs flex flex-col items-center justify-center rounded-br-xl"
                      style={{ width: `${notableB * 45}px`, height: `${notableB * 45}px` }}
                    >
                      <span>b²</span>
                      <span>({notableB * notableB})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Golden Trick Box */}
          <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] p-4 rounded-2xl flex items-start gap-3 shadow-2xs">
            <Sparkles className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-black uppercase text-[#B45309] block mb-0.5">
                Regla del Equilibrio y Desarrollo Álgebraico:
              </span>
              <p className="text-xs font-bold text-[#78350F]">
                Lo que hagas en el platillo izquierdo, debes hacerlo obligatoriamente en el derecho para no romper la igualdad. Y en binomios al cuadrado: ¡nunca olvides el término del medio 2ab!
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleStartQuiz}
              className="px-6 py-3 bg-[#F7CA38] hover:bg-[#eab308] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full cursor-pointer shadow-xs flex items-center gap-2 transition-all active:scale-95"
            >
              <span>🚀 ¡Entendido! Hacer Prueba de 5 Ejercicios</span>
              <ArrowRight className="w-4 h-4 text-[#1E1E24] stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PRUEBA DE 5 EJERCICIOS */}
      {activeTab === 'quiz' && (
        <div>
          {!quizFinished ? (
            <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-3xl p-5 sm:p-6 space-y-6 shadow-xs">
              {/* Progress Bar */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#8A909F]">
                  Ejercicio {quizIndex + 1} de {quizQuestions.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#F7CA38]" />
                  <span className="text-xs font-black text-[#1E1E24]">
                    Aciertos: {quizScore}/{quizIndex}
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden border border-[#1E1E24]/20">
                <div
                  className="bg-[#F7CA38] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              {quizQuestions[quizIndex] && (
                <div className="bg-white border-2 border-[#1E1E24] rounded-2xl p-6 text-center shadow-xs space-y-3">
                  <span className="text-xs font-black uppercase text-[#8A909F] block">
                    Resuelve el siguiente ejercicio de Álgebra:
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-[#1E1E24]">
                    {quizQuestions[quizIndex].question}
                  </h4>
                  {quizQuestions[quizIndex].latex && (
                    <div className="inline-block px-6 py-2 bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-xl text-2xl font-black text-[#1E1E24] font-mono my-1 shadow-2xs">
                      <MathView latex={quizQuestions[quizIndex].latex} />
                    </div>
                  )}
                </div>
              )}

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQuestions[quizIndex]?.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={quizFeedback !== null}
                    onClick={() => handleAnswerQuiz(opt)}
                    className="p-4 rounded-2xl border-2 border-[#1E1E24]/20 bg-white hover:border-[#1E1E24] text-left cursor-pointer transition-all disabled:opacity-60 flex items-center justify-between shadow-2xs"
                  >
                    <span className="text-xs font-black text-[#1E1E24]">{opt.label}</span>
                    <span className="text-[10px] font-black text-[#6F78DB] uppercase">Seleccionar</span>
                  </button>
                ))}
              </div>

              {/* Feedback Banner */}
              <AnimatePresence>
                {quizFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`p-4 rounded-2xl border-2 border-[#1E1E24] flex items-center justify-between gap-3 shadow-2xs ${
                      quizFeedback.isCorrect
                        ? 'bg-[#DCFCE7] text-[#14532D]'
                        : 'bg-[#FEE2E2] text-[#991B1B]'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {quizFeedback.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                      ) : (
                        <HelpCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="text-xs font-black uppercase block">
                          {quizFeedback.isCorrect ? '¡Excelente!' : '¡Ajuste de Álgebra!'}
                        </span>
                        <p className="text-xs font-bold">{quizFeedback.text}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2.5 bg-[#6F78DB] hover:bg-[#5B64C8] text-white border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full cursor-pointer shrink-0 shadow-xs transition-all active:scale-95"
                    >
                      {quizIndex + 1 < quizQuestions.length ? 'Siguiente ➔' : 'Ver Resultados'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Celebration Screen */
            <div className="bg-[#6F78DB] text-white border-2 border-[#1E1E24] rounded-3xl p-8 text-center space-y-6 shadow-md animate-fade-in">
              <Mascot mood="celebration" size={96} className="mx-auto" />

              <div>
                <span className="px-3 py-1 bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full inline-block mb-2 shadow-2xs">
                  ¡Prueba de 5 Ejercicios Finalizada!
                </span>
                <h3 className="text-3xl font-black uppercase text-white">
                  Puntuación: {quizScore} / 5 Correctas
                </h3>
                <p className="text-xs font-bold text-white/90 mt-1 max-w-md mx-auto">
                  {quizScore === 5
                    ? '¡Perfecto! Dominas las leyes de la balanza y el desarrollo de productos notables sin cometer errores de signos.'
                    : '¡Buen intento! Repasa las leyes de la igualdad y la expansión del trinomio cuadrado perfecto.'}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-xs font-black text-white border-2 border-[#1E1E24] shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#F7CA38]" />
                <span>+100 XP Otorgados a tu nivel</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-3 bg-[#F7CA38] hover:bg-[#eab308] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full cursor-pointer shadow-xs flex items-center gap-2 transition-all active:scale-95"
                >
                  <RefreshCw className="w-4 h-4 text-[#1E1E24]" />
                  <span>Repetir Prueba de 5 Ejercicios</span>
                </button>

                <button
                  onClick={() => {
                    playSound('click');
                    setActiveTab('demo');
                  }}
                  className="px-6 py-3 bg-white hover:bg-gray-100 text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full cursor-pointer shadow-xs flex items-center gap-2 transition-all active:scale-95"
                >
                  <Check className="w-4 h-4 text-[#1E1E24] stroke-[2.5]" />
                  <span>Volver a Demostraciones</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
