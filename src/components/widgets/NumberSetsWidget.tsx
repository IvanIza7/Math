import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, CheckCircle2, HelpCircle, Trophy, Sparkles, ArrowRight, Play, RefreshCw, Check } from 'lucide-react';
import { NumberSetItem, NumberSetType } from '../../types';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';
import { Mascot } from './Mascot';

interface NumberSetsWidgetProps {
  onAwardXp: (amount: number) => void;
}

export const NumberSetsWidget: React.FC<NumberSetsWidgetProps> = ({ onAwardXp }) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'quiz'>('demo');
  const [selectedSet, setSelectedSet] = useState<NumberSetType>('N');

  // Quiz Mode state (5 Questions Practice)
  const questionPool: NumberSetItem[] = [
    { id: 'q1', valueDisplay: '7', latex: '7', correctSet: 'N', explanation: '7 es un entero positivo para contar. El conjunto más interno es Naturales (N).' },
    { id: 'q2', valueDisplay: '-12', latex: '-12', correctSet: 'Z', explanation: '-12 es un entero negativo. Nace al incluir negativos en los Enteros (Z).' },
    { id: 'q3', valueDisplay: '3/4', latex: '\\frac{3}{4}', correctSet: 'Q', explanation: '3/4 es un cociente de dos enteros. Pertenece a los Racionales (Q).' },
    { id: 'q4', valueDisplay: '√2', latex: '\\sqrt{2}', correctSet: 'I', explanation: '√2 es 1.41421356... decimal infinito no periódico. Es Irracional (I).' },
    { id: 'q5', valueDisplay: 'π', latex: '\\pi', correctSet: 'I', explanation: 'π ≈ 3.14159... no se puede escribir como fracción exacta. Es Irracional (I).' },
    { id: 'q6', valueDisplay: '0', latex: '0', correctSet: 'Z', explanation: '0 es el elemento neutro de la suma en los Enteros (Z).' },
    { id: 'q7', valueDisplay: '-0.25', latex: '-0.25', correctSet: 'Q', explanation: '-0.25 equivale a -1/4, una fracción de enteros. Es Racional (Q).' },
    { id: 'q8', valueDisplay: '15', latex: '15', correctSet: 'N', explanation: '15 es un número natural de conteo.' },
    { id: 'q9', valueDisplay: 'e (Euler)', latex: 'e', correctSet: 'I', explanation: 'e ≈ 2.71828... es el número irracional base de los logaritmos naturales.' },
    { id: 'q10', valueDisplay: '-8', latex: '-8', correctSet: 'Z', explanation: '-8 es un número entero negativo.' },
  ];

  const [quizQuestions, setQuizQuestions] = useState<NumberSetItem[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const setsInfo: { type: NumberSetType; name: string; symbol: string; badgeBg: string; textColor: string; desc: string; trick: string }[] = [
    { type: 'N', name: 'Naturales', symbol: 'ℕ', badgeBg: '#DCFCE7', textColor: 'text-[#166534]', desc: 'Enteros positivos para contar: 1, 2, 3, 4, 5...', trick: 'Son los primeros números que aprendemos de niños. No incluyen negativos ni fracciones.' },
    { type: 'Z', name: 'Enteros', symbol: 'ℤ', badgeBg: '#E0F2FE', textColor: 'text-[#0369A1]', desc: 'Incluyen el cero y los negativos: ..., -3, -2, -1, 0, 1, 2, 3...', trick: 'Piensa en temperaturas bajo cero o deudas en el banco.' },
    { type: 'Q', name: 'Racionales', symbol: 'ℚ', badgeBg: '#FEF3C7', textColor: 'text-[#92400E]', desc: 'Fracciones a/b con b≠0 y decimales finitos o periódicos: 1/2, -0.75, 3.33...', trick: 'Si se puede escribir como fracción de dos enteros, ¡es Racional!' },
    { type: 'I', name: 'Irracionales', symbol: 'I', badgeBg: '#FCE7F3', textColor: 'text-[#9D174D]', desc: 'Decimales infinitos no periódicos: √2, π, e, √3...', trick: '¡No se pueden convertir en fracción exacta! Sus decimales nunca terminan ni se repiten.' },
    { type: 'R', name: 'Reales', symbol: 'ℝ', badgeBg: '#EEF2FF', textColor: 'text-[#4338CA]', desc: 'La unión de Racionales e Irracionales: cubre toda la recta numérica sin huecos.', trick: 'Todos los números de bachillerato que verás pertenecen a la gran recta de Reales.' },
  ];

  const currentSetInfo = setsInfo.find((s) => s.type === selectedSet) || setsInfo[0];

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

  const handleAnswerQuiz = (chosenSet: NumberSetType) => {
    const currentQ = quizQuestions[quizIndex];
    if (!currentQ || quizFeedback) return;

    if (chosenSet === currentQ.correctSet) {
      playSound('correct');
      setQuizScore((prev) => prev + 1);
      setQuizFeedback({
        isCorrect: true,
        text: `¡Correcto! ${currentQ.explanation}`,
      });
    } else {
      playSound('error');
      setQuizFeedback({
        isCorrect: false,
        text: `¡Incorrecto! ${currentQ.explanation}`,
      });
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
      onAwardXp(100);
    }
  };

  return (
    <div className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 sm:p-6 shadow-xs space-y-6 text-[#1E1E24] font-jakarta">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1E1E24]/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#F7CA38] border-2 border-[#1E1E24] rounded-2xl shrink-0 shadow-2xs">
            <Box className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#6F78DB] text-white font-black text-[10px] uppercase rounded-full">
                Laboratorio Interactivo
              </span>
              <span className="text-xs font-bold text-[#8A909F]">Conjuntos Numéricos</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#1E1E24] uppercase tracking-tight">
              Cajas Anidadas: {activeTab === 'demo' ? 'Demostración Visual' : 'Prueba de 5 Ejercicios'}
            </h3>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-[#F4F7FC] p-1.5 rounded-full border-2 border-[#1E1E24]">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('demo');
            }}
            className={`px-4 py-2 rounded-full font-black text-xs uppercase transition-all cursor-pointer ${
              activeTab === 'demo'
                ? 'bg-[#1E1E24] text-white shadow-xs'
                : 'text-[#4A4E69] hover:text-[#1E1E24]'
            }`}
          >
            1. Demostración
          </button>
          <button
            onClick={handleStartQuiz}
            className={`px-4 py-2 rounded-full font-black text-xs uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-[#F7CA38] text-[#1E1E24] font-black shadow-xs'
                : 'text-[#4A4E69] hover:text-[#1E1E24]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>2. Prueba (5 Ejercicios)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: DEMOSTRACIÓN CON RECTA NUMÉRICA */}
      {activeTab === 'demo' && (
        <div className="space-y-6">
          {/* Set Selector Pills */}
          <div>
            <span className="text-xs font-black uppercase text-[#8A909F] block mb-2 tracking-wider">
              Selecciona un conjunto para ver su demostración en la recta:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {setsInfo.map((s) => {
                const isSelected = selectedSet === s.type;
                return (
                  <button
                    key={s.type}
                    onClick={() => {
                      playSound('click');
                      setSelectedSet(s.type);
                    }}
                    className={`p-3 rounded-2xl border-2 transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'border-[#1E1E24] bg-[#6F78DB] text-white shadow-xs scale-102 font-black'
                        : 'border-[#1E1E24]/20 bg-white text-[#1E1E24] hover:border-[#1E1E24] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <span className="text-sm font-black block">
                      {s.name} ({s.symbol})
                    </span>
                    <span className={`text-[10px] font-bold block ${isSelected ? 'text-white/80' : 'text-[#8A909F]'}`}>
                      Ver en Recta ➔
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Number Line (Recta Numérica) Card */}
          <div className="bg-[#E8F8EE] border-2 border-[#1E1E24] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-black uppercase text-[#1E1E24] border-2 border-[#1E1E24]"
                  style={{ backgroundColor: currentSetInfo.badgeBg }}
                >
                  Conjunto {currentSetInfo.name} ({currentSetInfo.symbol})
                </span>
                <span className="text-xs font-extrabold text-[#4A4E69] hidden sm:inline">
                  Representación en la Recta Real
                </span>
              </div>
            </div>

            <p className="text-xs font-bold text-[#1E1E24] leading-relaxed">
              {currentSetInfo.desc}
            </p>

            {/* Visual Number Line Canvas */}
            <div className="bg-white border-2 border-[#1E1E24] rounded-2xl p-6 shadow-2xs overflow-x-auto">
              <div className="min-w-[480px] relative py-8 flex items-center justify-between">
                {/* Main Axis Line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#1E1E24] rounded-full" />

                {/* Arrowheads */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#8A909F] font-black text-xs">
                  ◄ -∞
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8A909F] font-black text-xs">
                  +∞ ►
                </div>

                {/* Ticks and Highlights on Number Line */}
                {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((num) => {
                  let isHighlighted = false;
                  let highlightColor = currentSetInfo.badgeBg;

                  if (selectedSet === 'N' && num >= 1) {
                    isHighlighted = true;
                  } else if (selectedSet === 'Z') {
                    isHighlighted = true;
                  } else if (selectedSet === 'Q') {
                    isHighlighted = true;
                  } else if (selectedSet === 'I') {
                    isHighlighted = false;
                  } else if (selectedSet === 'R') {
                    isHighlighted = true;
                  }

                  return (
                    <div key={num} className="relative flex flex-col items-center group">
                      {/* Tick */}
                      <div className={`w-0.5 h-4 mb-2 ${isHighlighted ? 'bg-[#1E1E24] h-6' : 'bg-gray-300'}`} />

                      {/* Dot */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 border-[#1E1E24] flex items-center justify-center transition-transform ${
                          isHighlighted
                            ? 'scale-125 shadow-xs'
                            : 'bg-white'
                        }`}
                        style={{ backgroundColor: isHighlighted ? highlightColor : '#FFFFFF' }}
                      >
                        {isHighlighted && <div className="w-1.5 h-1.5 bg-[#1E1E24] rounded-full" />}
                      </div>

                      {/* Number Label */}
                      <span
                        className={`text-xs font-black mt-2 ${
                          isHighlighted ? 'text-[#1E1E24] scale-110' : 'text-[#8A909F]'
                        }`}
                      >
                        {num}
                      </span>
                    </div>
                  );
                })}

                {/* Special Points for Irracionales / Racionales fractions */}
                {selectedSet === 'I' && (
                  <>
                    <div className="absolute left-[54%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-[#FCE7F3] border-2 border-[#EC4899] flex items-center justify-center shadow-xs">
                        <span className="text-[10px] font-black text-[#9D174D]">√2</span>
                      </div>
                      <span className="text-[10px] font-black text-[#9D174D] mt-6">≈1.414</span>
                    </div>

                    <div className="absolute left-[78%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-[#FCE7F3] border-2 border-[#EC4899] flex items-center justify-center shadow-xs">
                        <span className="text-[10px] font-black text-[#9D174D]">π</span>
                      </div>
                      <span className="text-[10px] font-black text-[#9D174D] mt-6">≈3.1415</span>
                    </div>
                  </>
                )}

                {selectedSet === 'Q' && (
                  <>
                    <div className="absolute left-[44%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center shadow-xs">
                        <div className="flex flex-col items-center leading-none text-[8px] font-black text-[#92400E]">
                          <span className="border-b-[1.5px] border-[#92400E] px-[1px]">1</span>
                          <span>2</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-black text-[#92400E] mt-6">0.5</span>
                    </div>

                    <div className="absolute left-[22%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center shadow-xs">
                        <div className="flex flex-col items-center leading-none text-[8px] font-black text-[#92400E] relative">
                          <span className="absolute -left-2 top-1/2 -translate-y-1/2">-</span>
                          <span className="border-b-[1.5px] border-[#92400E] px-[1px]">3</span>
                          <span>2</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-black text-[#92400E] mt-6">-1.5</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Intuitive Trick Box */}
            <div className="bg-white border-2 border-[#1E1E24] p-4 rounded-2xl flex items-start gap-3 shadow-2xs">
              <Sparkles className="w-5 h-5 text-[#F7CA38] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-black uppercase text-[#1E1E24] block mb-0.5">
                  Regla de Oro:
                </span>
                <p className="text-xs font-semibold text-[#4A4E69]">
                  {currentSetInfo.trick}
                </p>
              </div>
            </div>

            {/* Action Button to launch 5-Exercise Practice */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleStartQuiz}
                className="px-6 py-3 bg-[#6F78DB] hover:bg-[#5B64C8] text-white font-black text-xs uppercase rounded-full border-2 border-[#1E1E24] cursor-pointer shadow-xs flex items-center gap-2"
              >
                <span>🚀 ¡Entendido! Hacer Prueba de 5 Ejercicios</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: PRUEBA DE 5 EJERCICIOS */}
      {activeTab === 'quiz' && (
        <div>
          {!quizFinished ? (
            <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-3xl p-5 sm:p-6 space-y-6 shadow-xs">
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

              <div className="w-full bg-white h-3 rounded-full overflow-hidden border-2 border-[#1E1E24]">
                <div
                  className="bg-[#22C55E] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              {quizQuestions[quizIndex] && (
                <div className="bg-white border-2 border-[#1E1E24] rounded-2xl p-6 text-center shadow-xs space-y-3">
                  <span className="text-xs font-black uppercase text-[#8A909F] block">
                    Clasifica el siguiente número en su conjunto más interno:
                  </span>

                  <div className="inline-block px-8 py-4 bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl text-3xl sm:text-4xl font-black text-[#1E1E24] font-mono my-2 shadow-2xs">
                    <MathView latex={quizQuestions[quizIndex].latex} />
                  </div>

                  <p className="text-xs font-semibold text-[#4A4E69]">
                    ¿A qué conjunto pertenece principalmente?
                  </p>
                </div>
              )}

              {/* Set Choices Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {setsInfo.filter((s) => s.type !== 'R').map((s) => (
                  <button
                    key={s.type}
                    disabled={quizFeedback !== null}
                    onClick={() => handleAnswerQuiz(s.type)}
                    className="p-4 rounded-2xl border-2 border-[#1E1E24] hover:scale-102 text-left cursor-pointer transition-all disabled:opacity-60 flex flex-col justify-between min-h-[90px] shadow-xs"
                    style={{ backgroundColor: s.badgeBg }}
                  >
                    <span className="text-xs font-black uppercase text-[#1E1E24]">
                      {s.name} ({s.symbol})
                    </span>
                    <span className="text-[10px] font-bold text-[#4A4E69] opacity-90 mt-2">
                      {s.desc.split(':')[0]}
                    </span>
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
                    className={`p-4 rounded-2xl border-2 border-[#1E1E24] flex items-center justify-between gap-3 shadow-xs ${
                      quizFeedback.isCorrect
                        ? 'bg-[#DCFCE7] text-[#166534]'
                        : 'bg-[#FEE2E2] text-[#991B1B]'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {quizFeedback.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                      ) : (
                        <HelpCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="text-xs font-black uppercase block">
                          {quizFeedback.isCorrect ? '¡Excelente!' : '¡Ajuste de Clasificación!'}
                        </span>
                        <p className="text-xs font-medium">{quizFeedback.text}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2.5 bg-[#1E1E24] hover:bg-[#333] text-white font-black text-xs uppercase rounded-full cursor-pointer shrink-0 shadow-xs"
                    >
                      {quizIndex + 1 < quizQuestions.length ? 'Siguiente ➔' : 'Ver Resultados'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Quiz Completion Celebration View */
            <div className="bg-[#6F78DB] text-white border-2 border-[#1E1E24] rounded-3xl p-8 text-center space-y-6 shadow-md animate-fade-in">
              <Mascot mood="celebration" size={96} className="mx-auto" />

              <div>
                <span className="px-3 py-1 bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full inline-block mb-2 shadow-2xs">
                  ¡Prueba de 5 Ejercicios Finalizada!
                </span>
                <h3 className="text-3xl font-black uppercase">
                  Puntuación: {quizScore} / 5 Correctas
                </h3>
                <p className="text-xs font-semibold text-white/90 mt-1 max-w-md mx-auto">
                  {quizScore === 5
                    ? '¡Perfecto! Has demostrado un dominio absoluto clasificando números reales.'
                    : '¡Buen intento! Repasa las demostraciones en la recta numérica para afianzar tus conocimientos.'}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-xs font-bold text-white border border-white/30">
                <Sparkles className="w-4 h-4 text-[#F7CA38]" />
                <span>+100 XP Otorgados a tu nivel</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-3 bg-[#F7CA38] hover:bg-[#eab308] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-[#1E1E24]" />
                  <span>Repetir Prueba</span>
                </button>

                <button
                  onClick={() => {
                    playSound('click');
                    setActiveTab('demo');
                  }}
                  className="px-6 py-3 bg-white hover:bg-gray-100 text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase rounded-full cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-[#1E1E24]" />
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
