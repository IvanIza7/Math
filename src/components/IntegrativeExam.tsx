import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, ArrowRightLeft, ArrowRight } from 'lucide-react';
import { PUENTE_EXAM_DATA } from '../data/puenteBachilleratoData';
import { IntegrativeExamResults } from './IntegrativeExamResults';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';

interface IntegrativeExamProps {
  onBack: () => void;
  onAwardXp: (amount: number, reason?: string, entityId?: string, metadata?: any) => void;
}

export const IntegrativeExam: React.FC<IntegrativeExamProps> = ({ onBack, onAwardXp }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(50).fill(''));
  const [isFinished, setIsFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  // Keypad specific state
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isFinished) {
        setTimerSeconds(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  // When changing questions, prepopulate keypad input if it was already answered
  useEffect(() => {
    if (PUENTE_EXAM_DATA[currentIdx]?.inputType === 'keypad') {
      setInputVal(answers[currentIdx] || '');
    }
  }, [currentIdx, answers]);

  const handleKeyPress = (key: string) => {
    playSound('click');
    let newVal = inputVal;
    if (key === 'BACKSPACE') {
      newVal = newVal.slice(0, -1);
    } else if (key === '-') {
      newVal = newVal.startsWith('-') ? newVal.slice(1) : '-' + newVal;
    } else if (key === '.') {
      if (!newVal.includes('.')) newVal += '.';
    } else {
      if (newVal.length < 10) newVal += key;
    }
    setInputVal(newVal);
    
    // Save to answers instantly
    const newAnswers = [...answers];
    newAnswers[currentIdx] = newVal;
    setAnswers(newAnswers);
  };

  const handleOptionSelect = (opt: string) => {
    playSound('click');
    const newAnswers = [...answers];
    newAnswers[currentIdx] = opt;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    playSound('click');
    if (currentIdx < PUENTE_EXAM_DATA.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (isFinished) {
    return (
      <IntegrativeExamResults 
        answers={answers} 
        timeElapsed={timerSeconds} 
        onClose={onBack} 
        onAwardXp={onAwardXp}
      />
    );
  }

  const currentQ = PUENTE_EXAM_DATA[currentIdx];
  const isKeypad = currentQ.inputType === 'keypad';
  const hasAnswer = answers[currentIdx] !== '';

  return (
    <div className="fixed inset-0 bg-[#F2F3F7] flex flex-col font-poppins text-[#1E1E24] overflow-hidden z-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#1E1E24] p-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <button 
          onClick={() => { playSound('click'); onBack(); }}
          className="w-10 h-10 border-2 border-[#1E1E24] rounded-xl flex items-center justify-center hover:bg-[#F2F3F7] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-4">
          <div className="font-black text-sm px-3 py-1 bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-lg text-[#92400E]">
            {currentIdx + 1} / 50
          </div>
          <div className="font-black text-sm flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-[#1E1E24] rounded-lg">
            <Clock size={16} className="text-[#F59E0B]" />
            {formatTime(timerSeconds)}
          </div>
        </div>

        <div className="w-10"></div>
      </div>

      {/* Hero: Question Area */}
      <div className="flex-1 flex flex-col relative px-6 py-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col max-w-md mx-auto w-full"
          >
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase text-[#8A909F] tracking-wider">
                Competencia {currentQ.competency}
              </span>
              <h2 className="text-xl font-bold mt-1 text-[#1E1E24]">
                {currentQ.instruction}
              </h2>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center min-h-[150px]">
              {currentQ.questionLatex.length > 0 && (
                <div className="text-4xl sm:text-5xl font-black tracking-tighter text-center flex flex-col gap-3 w-full p-4 bg-white border-2 border-[#1E1E24] rounded-2xl shadow-inner">
                  {currentQ.questionLatex.map((line, i) => (
                    <div key={i}><MathView latex={line} /></div>
                  ))}
                </div>
              )}
              
              {/* If keypad, show the input box inside the hero */}
              {isKeypad && (
                <div className={`mt-6 w-full min-h-[72px] sm:min-h-[96px] border-4 rounded-2xl flex items-center justify-end px-4 transition-colors shadow-inner bg-white border-[#1E1E24] text-4xl sm:text-5xl font-black`}>
                  {inputVal || <span className="text-gray-300">?</span>}
                </div>
              )}

              {/* If multiple choice, show buttons */}
              {!isKeypad && currentQ.options && (
                <div className="w-full mt-6 space-y-3">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = answers[currentIdx] === opt;
                    return (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(opt)}
                        className={`w-full text-left p-4 rounded-2xl border-2 font-black transition-all shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-between ${
                          isSelected 
                            ? 'bg-[#1E1E24] border-[#1E1E24] text-white' 
                            : 'bg-white border-[#1E1E24] text-[#1E1E24] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <div className="text-lg">
                          <MathView latex={opt} inline />
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 ${isSelected ? 'border-white bg-[#BAFF29]' : 'border-[#E2E8F0]'} flex items-center justify-center shrink-0`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#1E1E24]" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Input Area / Footer */}
      <div className="bg-white border-t-4 border-[#1E1E24] p-4 pb-8 rounded-t-3xl shadow-[0px_-8px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-md mx-auto">
          {/* Custom Keypad for Keypad Questions */}
          {isKeypad && (
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (
                <button
                  key={num}
                  onClick={() => handleKeyPress(num.toString())}
                  className="h-14 sm:h-16 bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl text-2xl font-black shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleKeyPress('-')}
                className="h-14 sm:h-16 bg-[#E2E8F0] border-2 border-[#1E1E24] rounded-2xl text-2xl font-black shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
              >
                ±
              </button>
              <button
                onClick={() => handleKeyPress('0')}
                className="h-14 sm:h-16 bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl text-2xl font-black shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
              >
                0
              </button>
              <button
                onClick={() => handleKeyPress('.')}
                className="h-14 sm:h-16 bg-[#E2E8F0] border-2 border-[#1E1E24] rounded-2xl text-2xl font-black shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
              >
                .
              </button>
              <div className="col-span-3 flex justify-end">
                <button
                  onClick={() => handleKeyPress('BACKSPACE')}
                  className="h-12 px-6 bg-[#FEE2E2] text-[#EF4444] border-2 border-[#1E1E24] rounded-xl text-sm font-black shadow-[3px_3px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all flex items-center gap-2"
                >
                  BORRAR
                </button>
              </div>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className={`w-full py-4 rounded-2xl border-2 border-[#1E1E24] font-black text-lg flex items-center justify-center gap-2 transition-all ${
              hasAnswer 
                ? 'bg-[#BAFF29] text-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none cursor-pointer' 
                : 'bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed'
            }`}
          >
            <span>{currentIdx === PUENTE_EXAM_DATA.length - 1 ? 'Finalizar' : 'Siguiente'}</span>
            <ArrowRight size={20} className={hasAnswer ? 'text-[#1E1E24]' : 'text-gray-400'} />
          </button>
        </div>
      </div>
    </div>
  );
};
