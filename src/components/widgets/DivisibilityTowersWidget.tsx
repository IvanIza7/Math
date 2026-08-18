import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Plus, Trash2, Sparkles, Trophy, ArrowRight, CheckCircle2, HelpCircle, RefreshCw, Check } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';
import { Mascot } from './Mascot';

interface DivisibilityTowersWidgetProps {
  onAwardXp?: (amount: number) => void;
}

interface TowerQuizQuestion {
  id: string;
  question: string;
  latex?: string;
  options: { label: string; isCorrect: boolean; explanation: string }[];
}

export const DivisibilityTowersWidget: React.FC<DivisibilityTowersWidgetProps> = ({ onAwardXp }) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'quiz'>('demo');

  // Demo State
  const [factorsA, setFactorsA] = useState<number[]>([2, 2, 3]); // 12
  const [factorsB, setFactorsB] = useState<number[]>([2, 3, 3]); // 18

  const primeColors: Record<number, string> = {
    2: '#FFB7CE', // Soft Pink
    3: '#93E1FF', // Sky Blue
    5: '#FEE041', // Soft Yellow
    7: '#BAFF29', // Soft Lime
  };

  const valA = factorsA.reduce((acc, curr) => acc * curr, 1);
  const valB = factorsB.reduce((acc, curr) => acc * curr, 1);

  // Calculate GCD (MCD) and LCM (MCM)
  const getGcd = (a: number, b: number): number => (b === 0 ? a : getGcd(b, a % b));
  const gcdVal = valA > 0 && valB > 0 ? getGcd(valA, valB) : 1;
  const lcmVal = valA > 0 && valB > 0 ? (valA * valB) / gcdVal : 1;

  const addFactor = (tower: 'A' | 'B', prime: number) => {
    playSound('click');
    if (tower === 'A') {
      if (factorsA.length < 6) setFactorsA([...factorsA, prime]);
    } else {
      if (factorsB.length < 6) setFactorsB([...factorsB, prime]);
    }
  };

  const removeFactor = (tower: 'A' | 'B', index: number) => {
    playSound('click');
    if (tower === 'A') {
      setFactorsA(factorsA.filter((_, idx) => idx !== index));
    } else {
      setFactorsB(factorsB.filter((_, idx) => idx !== index));
    }
  };

  // 5 Questions Quiz Pool for Towers / MCD / MCM
  const questionPool: TowerQuizQuestion[] = [
    {
      id: 'tq1',
      question: '¿Cuál es la descomposición en factores primos del número 12?',
      latex: '12',
      options: [
        { label: '2² × 3', isCorrect: true, explanation: 'Correcto: 2 × 2 × 3 = 12, ambos 2 y 3 son números primos.' },
        { label: '2 × 6', isCorrect: false, explanation: 'Incorrecto: El 6 no es un número primo (se puede descomponer en 2 × 3).' },
        { label: '4 × 3', isCorrect: false, explanation: 'Incorrecto: El 4 es compuesto. La norma de primos requiere descomponerlo en 2².' },
        { label: '2³', isCorrect: false, explanation: 'Incorrecto: 2³ = 8, no da 12.' },
      ],
    },
    {
      id: 'tq2',
      question: '¿Cuál es el Máximo Común Divisor (MCD) de 12 y 18?',
      latex: 'MCD(12, 18)',
      options: [
        { label: '6', isCorrect: true, explanation: '¡Correcto! Factores comunes: 2¹ × 3¹ = 6.' },
        { label: '3', isCorrect: false, explanation: 'Incorrecto: 3 es un divisor común, pero 6 es el MÁXIMO común divisor.' },
        { label: '36', isCorrect: false, explanation: 'Incorrecto: 36 es el Mínimo Común Múltiplo (MCM), no el MCD.' },
        { label: '2', isCorrect: false, explanation: 'Incorrecto: 2 es divisor común pero no el máximo.' },
      ],
    },
    {
      id: 'tq3',
      question: '¿Cuál es el Mínimo Común Múltiplo (MCM) de 8 y 12?',
      latex: 'MCM(8, 12)',
      options: [
        { label: '24', isCorrect: true, explanation: '¡Correcto! 8 = 2³, 12 = 2² × 3. MCM = 2³ × 3 = 24.' },
        { label: '4', isCorrect: false, explanation: 'Incorrecto: 4 es el MCD de 8 y 12.' },
        { label: '48', isCorrect: false, explanation: 'Incorrecto: 48 es un múltiplo común, pero no el MÍNIMO.' },
        { label: '96', isCorrect: false, explanation: 'Incorrecto: Es el producto directo de 8 × 12, no el mínimo múltiplo.' },
      ],
    },
    {
      id: 'tq4',
      question: 'Si el MCD de dos números es 1, ¿cómo se llaman estos números?',
      options: [
        { label: 'Primos entre sí (Coprimos)', isCorrect: true, explanation: '¡Correcto! Al no compartir ningún factor primo en común, se llaman primos relativos o coprimos.' },
        { label: 'Números Pares', isCorrect: false, explanation: 'Incorrecto: Los números pares comparten al menos el factor 2.' },
        { label: 'Irracionales', isCorrect: false, explanation: 'Incorrecto: Coprimo es un concepto de teoría de enteros.' },
        { label: 'Múltiplos exactos', isCorrect: false, explanation: 'Incorrecto: No comparten divisores.' },
      ],
    },
    {
      id: 'tq5',
      question: '¿Cuál es el MCD de dos números primos distintos, por ejemplo, 5 y 7?',
      latex: 'MCD(5, 7)',
      options: [
        { label: '1', isCorrect: true, explanation: '¡Correcto! Al ser ambos primos, únicamente comparten el divisor 1.' },
        { label: '35', isCorrect: false, explanation: 'Incorrecto: 35 es el MCM (5 × 7), no el MCD.' },
        { label: '5', isCorrect: false, explanation: 'Incorrecto: 5 no divide a 7.' },
        { label: '7', isCorrect: false, explanation: 'Incorrecto: 7 no divide a 5.' },
      ],
    },
  ];

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<TowerQuizQuestion[]>([]);
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
    <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-3xl p-5 sm:p-6 shadow-sm space-y-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#2C2C30]">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#BAFF29] rounded-2xl shrink-0">
            <Layers className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#BAFF29] text-gray-900 font-black text-[10px] uppercase rounded-full">
                Laboratorio Interactivo
              </span>
              <span className="text-xs font-bold text-gray-400">Factores Primos & Divisibilidad</span>
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Torres Primas: {activeTab === 'demo' ? 'Demostración Visual' : 'Prueba de 5 Ejercicios'}
            </h3>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-[#121214] p-1.5 rounded-full border border-[#2C2C30]">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('demo');
            }}
            className={`px-4 py-2 rounded-full font-black text-xs uppercase pill-btn transition-all cursor-pointer ${
              activeTab === 'demo'
                ? 'bg-[#1C1C1E] text-white border border-[#2C2C30] shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            1. Demostración
          </button>
          <button
            onClick={handleStartQuiz}
            className={`px-4 py-2 rounded-full font-black text-xs uppercase pill-btn transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-[#BAFF29] text-gray-900 shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gray-900" />
            <span>2. Prueba (5 Ejercicios)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DEMOSTRACIÓN GUIADA */}
      {activeTab === 'demo' && (
        <div className="space-y-6">
          {/* Prime Adding Controls */}
          <div className="bg-[#121214] p-4 border border-[#2C2C30] rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-black uppercase text-gray-300">
              Construye las Torres con Bloques Primos:
            </span>
            <div className="flex flex-wrap gap-2">
              {[2, 3, 5, 7].map((prime) => (
                <div key={prime} className="flex gap-1 items-center bg-[#1C1C1E] p-1.5 rounded-xl border border-[#2C2C30]">
                  <span className="text-[10px] font-black uppercase text-gray-400 pl-1">
                    Factor {prime}:
                  </span>
                  <button
                    onClick={() => addFactor('A', prime)}
                    className="px-2.5 py-1 text-xs font-black rounded-lg border border-[#2C2C30] text-gray-900 pill-btn cursor-pointer"
                    style={{ backgroundColor: primeColors[prime] }}
                  >
                    + Torre A
                  </button>
                  <button
                    onClick={() => addFactor('B', prime)}
                    className="px-2.5 py-1 text-xs font-black rounded-lg border border-[#2C2C30] text-gray-900 pill-btn cursor-pointer"
                    style={{ backgroundColor: primeColors[prime] }}
                  >
                    + Torre B
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Towers Workbench */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tower A */}
            <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-xs font-black uppercase text-gray-300">Torre Número A</span>
                <span className="text-lg font-black text-gray-900 bg-[#FEE041] px-3 py-1 rounded-full border border-amber-300">
                  Valor = {valA}
                </span>
              </div>

              <div className="flex flex-col-reverse items-center justify-start gap-1.5 w-full min-h-[180px] p-4 bg-[#1C1C1E] border border-[#2C2C30] rounded-xl shadow-2xs">
                {factorsA.length === 0 ? (
                  <span className="text-xs font-medium text-gray-500 my-auto">Sin factores</span>
                ) : (
                  factorsA.map((p, idx) => (
                    <motion.div
                      key={idx}
                      layout
                      className="w-full max-w-[200px] py-2 border border-gray-300 rounded-xl font-black text-xs text-gray-900 flex items-center justify-between px-3 shadow-2xs"
                      style={{ backgroundColor: primeColors[p] || '#FFFFFF' }}
                    >
                      <span>Bloque Primo {p}</span>
                      <button
                        onClick={() => removeFactor('A', idx)}
                        className="p-1 bg-white border border-gray-300 rounded-md hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Tower B */}
            <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-4 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-xs font-black uppercase text-gray-300">Torre Número B</span>
                <span className="text-lg font-black text-gray-900 bg-[#93E1FF] px-3 py-1 rounded-full border border-sky-300">
                  Valor = {valB}
                </span>
              </div>

              <div className="flex flex-col-reverse items-center justify-start gap-1.5 w-full min-h-[180px] p-4 bg-[#1C1C1E] border border-[#2C2C30] rounded-xl shadow-2xs">
                {factorsB.length === 0 ? (
                  <span className="text-xs font-medium text-gray-500 my-auto">Sin factores</span>
                ) : (
                  factorsB.map((p, idx) => (
                    <motion.div
                      key={idx}
                      layout
                      className="w-full max-w-[200px] py-2 border border-gray-300 rounded-xl font-black text-xs text-gray-900 flex items-center justify-between px-3 shadow-2xs"
                      style={{ backgroundColor: primeColors[p] || '#FFFFFF' }}
                    >
                      <span>Bloque Primo {p}</span>
                      <button
                        onClick={() => removeFactor('B', idx)}
                        className="p-1 bg-white border border-gray-300 rounded-md hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* MCD & MCM Results Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#121214] border border-[#BAFF29] rounded-2xl p-4 text-center">
              <span className="text-xs font-black uppercase text-[#BAFF29] block mb-1">
                MÁXIMO COMÚN DIVISOR (MCD)
              </span>
              <span className="text-2xl font-black text-white">
                MCD({valA}, {valB}) = {gcdVal}
              </span>
              <p className="text-[11px] font-medium text-gray-400 mt-1">
                (Intersección de bloques primos compartidos por ambas torres)
              </p>
            </div>

            <div className="bg-[#121214] border border-[#93E1FF] rounded-2xl p-4 text-center">
              <span className="text-xs font-black uppercase text-[#93E1FF] block mb-1">
                MÍNIMO COMÚN MÚLTIPLO (MCM)
              </span>
              <span className="text-2xl font-black text-white">
                MCM({valA}, {valB}) = {lcmVal}
              </span>
              <p className="text-[11px] font-medium text-gray-400 mt-1">
                (La torre más alta necesaria para contener a ambos números)
              </p>
            </div>
          </div>

          {/* Intuitive Trick Box */}
          <div className="bg-[#1C1C1E] border border-[#2C2C30] p-4 rounded-2xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#BAFF29] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-black uppercase text-[#BAFF29] block mb-0.5">
                Regla de Oro Mágica de Divisibilidad:
              </span>
              <p className="text-xs font-medium text-gray-300">
                Para el <strong>MCD</strong> toma los factores primos comunes con el <em>menor exponente</em>. Para el <strong>MCM</strong> toma los comunes y no comunes con el <em>mayor exponente</em>.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleStartQuiz}
              className="px-6 py-3 bg-[#BAFF29] hover:bg-[#a3e61c] text-gray-900 font-black text-xs uppercase rounded-full pill-btn cursor-pointer shadow-xs flex items-center gap-2"
            >
              <span>🚀 ¡Entendido! Hacer Prueba de 5 Ejercicios</span>
              <ArrowRight className="w-4 h-4 text-gray-900" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PRUEBA DE 5 EJERCICIOS */}
      {activeTab === 'quiz' && (
        <div>
          {!quizFinished ? (
            <div className="bg-[#121214] border border-[#2C2C30] rounded-3xl p-5 sm:p-6 space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-gray-400">
                  Ejercicio {quizIndex + 1} de {quizQuestions.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#BAFF29]" />
                  <span className="text-xs font-black text-white">
                    Aciertos: {quizScore}/{quizIndex}
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#2C2C30] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#BAFF29] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              {quizQuestions[quizIndex] && (
                <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-2xl p-6 text-center shadow-xs space-y-3">
                  <span className="text-xs font-black uppercase text-gray-400 block">
                    Resuelve la siguiente pregunta de Divisibilidad:
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {quizQuestions[quizIndex].question}
                  </h4>
                  {quizQuestions[quizIndex].latex && (
                    <div className="inline-block px-6 py-2 bg-[#121214] border border-[#BAFF29] rounded-xl text-2xl font-black text-[#BAFF29] font-mono my-1">
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
                    className="p-4 rounded-2xl border border-[#2C2C30] bg-[#1C1C1E] hover:border-gray-500 text-left pill-btn cursor-pointer transition-all disabled:opacity-60 flex items-center justify-between shadow-2xs"
                  >
                    <span className="text-xs font-black text-white">{opt.label}</span>
                    <span className="text-[10px] font-bold text-[#BAFF29] uppercase">Seleccionar</span>
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
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                      quizFeedback.isCorrect
                        ? 'bg-[#BAFF29]/30 border-lime-400 text-gray-900'
                        : 'bg-[#FFB7CE]/30 border-pink-400 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {quizFeedback.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
                      ) : (
                        <HelpCircle className="w-5 h-5 text-pink-700 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="text-xs font-black uppercase block">
                          {quizFeedback.isCorrect ? '¡Excelente!' : '¡Ajuste Requerido!'}
                        </span>
                        <p className="text-xs font-medium">{quizFeedback.text}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2.5 bg-[#6C47FF] hover:bg-[#5E35B1] text-white font-black text-xs uppercase rounded-full pill-btn cursor-pointer shrink-0 shadow-xs"
                    >
                      {quizIndex + 1 < quizQuestions.length ? 'Siguiente ➔' : 'Ver Resultados'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Celebration Screen */
            <div className="bg-[#6C47FF] text-white rounded-3xl p-8 text-center space-y-6 shadow-md animate-fade-in">
              <Mascot mood="celebration" size={96} className="mx-auto" />

              <div>
                <span className="px-3 py-1 bg-[#BAFF29] text-gray-900 font-black text-xs uppercase rounded-full inline-block mb-2">
                  ¡Prueba de 5 Ejercicios Finalizada!
                </span>
                <h3 className="text-3xl font-black uppercase">
                  Puntuación: {quizScore} / 5 Correctas
                </h3>
                <p className="text-xs font-semibold text-purple-100 mt-1 max-w-md mx-auto">
                  {quizScore === 5
                    ? '¡Dominio total de Torres Primas, MCD y MCM!'
                    : '¡Buen esfuerzo! Repasa la construcción de torres para perfeccionar la regla de exponentes.'}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold text-[#BAFF29] border border-white/20">
                <Sparkles className="w-4 h-4" />
                <span>+100 XP Otorgados a tu nivel</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-3 bg-[#BAFF29] hover:bg-[#a3e61c] text-gray-900 font-black text-xs uppercase rounded-full pill-btn cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-gray-900" />
                  <span>Repetir Prueba de 5 Ejercicios</span>
                </button>

                <button
                  onClick={() => {
                    playSound('click');
                    setActiveTab('demo');
                  }}
                  className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-black text-xs uppercase rounded-full pill-btn cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-gray-900" />
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
