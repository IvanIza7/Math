import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRightLeft, Clock, Delete } from 'lucide-react';
import { PracticePreset } from '../types';
import { playSound } from '../utils/sound';

interface PracticeQuizProps {
  preset: PracticePreset;
  onFinish: (sessionData: any) => void;
  onBack: () => void;
}

interface Question {
  terms: number[];
  operators: string[];
  answer: number;
}

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({ preset, onFinish, onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [inputDirection, setInputDirection] = useState<'left_to_right' | 'right_to_left'>(preset.inputDirection);
  
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Stats
  const [startTime, setStartTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [timeTakenPerQuestion, setTimeTakenPerQuestion] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    generateQuestions();
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());

    const timer = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateQuestions = () => {
    const qs: Question[] = [];
    for (let i = 0; i < preset.numQuestions; i++) {
      const rows = Math.floor(Math.random() * (preset.maxRows - preset.minRows + 1)) + preset.minRows;
      const digits = Math.floor(Math.random() * (preset.maxDigits - preset.minDigits + 1)) + preset.minDigits;
      
      let valid = false;
      let terms: number[] = [];
      let operators: string[] = [];
      let currentAnswer = 0;

      while (!valid) {
        let rawTerms: number[] = [];
        for (let r = 0; r < rows; r++) {
          const maxNum = Math.pow(10, digits) - 1;
          const minNum = Math.pow(10, digits - 1);
          const term = digits === 1 ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
          rawTerms.push(term);
        }
        
        rawTerms.sort((a, b) => b - a);
        
        let mainOp = '+';
        if (preset.allowSubtraction && Math.random() > 0.5) {
          mainOp = '-';
        }

        let sumRest = 0;
        for (let r = 1; r < rows; r++) sumRest += rawTerms[r];

        if (mainOp === '-') {
           if (rawTerms[0] >= sumRest) {
              valid = true;
              currentAnswer = rawTerms[0] - sumRest;
           }
        } else {
           const maxNum = Math.pow(10, preset.maxDigits) - 1;
           const minNum = Math.pow(10, preset.maxDigits - 1);
           
           if (rows * minNum > maxNum) {
              valid = true;
              currentAnswer = rawTerms[0] + sumRest;
           } else {
              if (rawTerms[0] + sumRest <= maxNum) {
                valid = true;
                currentAnswer = rawTerms[0] + sumRest;
              }
           }
        }

        if (valid) {
           terms = rawTerms;
           operators = Array(rows - 1).fill(mainOp);
        }
      }

      qs.push({ terms, operators, answer: currentAnswer });
    }
    setQuestions(qs);
  };

  const handleKeyPress = (key: string) => {
    if (isSuccess) return; // Block input while animating success
    playSound('click');

    if (key === 'delete') {
      setInputVal(prev => prev.slice(0, -1));
      setIsError(false);
      return;
    }

    if (key === 'enter') {
      checkAnswer(inputVal);
      return;
    }

    // Add number based on direction
    if (inputVal.length < 10) {
      let nextVal = inputVal;
      if (inputDirection === 'right_to_left') {
        nextVal = key + nextVal; // Appends to the left
      } else {
        nextVal = nextVal + key; // Appends to the right
      }
      setInputVal(nextVal);
      setIsError(false);
      
      // Auto-check on correct
      const currentQ = questions[currentIdx];
      if (parseInt(nextVal, 10) === currentQ.answer) {
        setTimeout(() => checkAnswer(nextVal), 50);
      }
    }
  };

  const checkAnswer = (valToCheck: string) => {
    const currentQ = questions[currentIdx];
    if (parseInt(valToCheck, 10) === currentQ.answer) {
      // Success!
      playSound('success');
      setIsSuccess(true);
      
      const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
      setTimeTakenPerQuestion(prev => [...prev, timeTaken]);

      setTimeout(() => {
        if (currentIdx + 1 < questions.length) {
          setCurrentIdx(prev => prev + 1);
          setInputVal('');
          setIsSuccess(false);
          setQuestionStartTime(Date.now());
        } else {
          // Finish!
          const finalTimes = [...timeTakenPerQuestion, timeTaken];
          const totalTime = Math.floor((Date.now() - startTime) / 1000);
          onFinish({
            presetId: preset.id,
            totalTime,
            fastestAnswer: Math.min(...finalTimes),
            slowestAnswer: Math.max(...finalTimes),
            accuracy: Math.max(0, 100 - (mistakes * 5)), // Simple accuracy metric: -5% per mistake
            numQuestions: preset.numQuestions,
            times: finalTimes
          });
        }
      }, 500); // Wait for green animation
    } else {
      playSound('error');
      setIsError(true);
      setMistakes(prev => prev + 1);
      // Optional: clear input on error
      // setInputVal(''); 
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (questions.length === 0) return null;

  const currentQ = questions[currentIdx];

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
          <div className="font-black text-sm px-3 py-1 bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-lg">
            {currentIdx + 1} / {preset.numQuestions}
          </div>
          <div className="font-black text-sm flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-[#1E1E24] rounded-lg">
            <Clock size={16} className="text-[#F59E0B]" />
            {formatTime(currentTime)}
          </div>
        </div>

        <button 
          onClick={() => {
            playSound('click');
            setInputDirection(prev => prev === 'left_to_right' ? 'right_to_left' : 'left_to_right');
          }}
          className="w-10 h-10 border-2 border-[#1E1E24] rounded-xl flex items-center justify-center bg-[#BAFF29] hover:bg-[#a6ff00] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
          title="Cambiar dirección de escritura"
        >
          <ArrowRightLeft size={18} />
        </button>
      </div>

      {/* Hero: Math Problem */}
      <div className="flex-1 flex flex-col items-center justify-center relative px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 items-center text-5xl sm:text-7xl font-black tracking-tighter tabular-nums mb-4">
              {currentQ.terms.map((term, i) => {
                const isLast = i === currentQ.terms.length - 1;
                const op = isLast ? currentQ.operators[0] : '';
                return (
                  <React.Fragment key={i}>
                    <div className={`text-right font-black ${currentQ.operators[0] === '-' ? 'text-red-500' : 'text-blue-500'}`}>
                      {op}
                    </div>
                    <div className="text-right">{term}</div>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="w-full h-1.5 sm:h-2 bg-[#1E1E24] mt-2 mb-4 rounded-full" />
            
            {/* Input Box */}
            <motion.div 
              animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`w-full min-h-[72px] sm:min-h-[96px] border-4 rounded-2xl flex items-center justify-end px-4 transition-colors shadow-inner ${
                isSuccess 
                  ? 'bg-green-100 border-green-500 text-green-600' 
                  : isError 
                    ? 'bg-red-100 border-red-500 text-red-600'
                    : 'bg-white border-[#1E1E24]'
              }`}
            >
              {inputVal || (
                <span className="text-gray-300">?</span>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom Keypad */}
      <div className="bg-white border-t-4 border-[#1E1E24] p-4 pb-8 rounded-t-3xl shadow-[0px_-8px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-3">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="h-16 sm:h-20 bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl text-2xl sm:text-3xl font-black shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleKeyPress('delete')}
            className="h-16 sm:h-20 bg-red-100 border-2 border-[#1E1E24] rounded-2xl flex items-center justify-center text-red-600 shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
          >
            <Delete size={28} />
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="h-16 sm:h-20 bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl text-2xl sm:text-3xl font-black shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
          >
            0
          </button>
          <button
            onClick={() => handleKeyPress('enter')}
            className="h-16 sm:h-20 bg-[#BAFF29] border-2 border-[#1E1E24] rounded-2xl text-2xl sm:text-3xl font-black shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all flex items-center justify-center"
          >
            ⏎
          </button>
        </div>
      </div>

    </div>
  );
};
