import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Delete, ArrowUpDown, CornerDownLeft, RotateCcw, Sparkles } from 'lucide-react';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';

interface AlgebraicKeypadProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  onEnter?: () => void;
  placeholder?: string;
}

export const AlgebraicKeypad: React.FC<AlgebraicKeypadProps> = ({
  value,
  onChange,
  disabled = false,
  onEnter,
  placeholder = 'Escribe tu respuesta...'
}) => {
  // Mode tabs: 'num' (Números), 'var' (Variables), 'ops' (Operadores)
  const [activeTab, setActiveTab] = useState<'num' | 'var' | 'ops'>('num');

  // Fraction editing mode: if true, editing numerator and denominator separately
  const [fractionMode, setFractionMode] = useState<boolean>(() => {
    return value.includes('\\frac') || (value.includes('/') && !value.includes('+'));
  });
  const [fractionField, setFractionField] = useState<'num' | 'den'>('num');
  const [numVal, setNumVal] = useState<string>('');
  const [denVal, setDenVal] = useState<string>('');

  // Sync fraction state if value changes externally or initial parse
  useEffect(() => {
    const fracMatch = value.match(/\\frac\{([^}]*)\}\{([^}]*)\}/);
    if (fracMatch) {
      setFractionMode(true);
      setNumVal(fracMatch[1]);
      setDenVal(fracMatch[2]);
    } else if (value.includes('/') && !value.includes('\\frac')) {
      const parts = value.split('/');
      if (parts.length === 2) {
        setFractionMode(true);
        setNumVal(parts[0]);
        setDenVal(parts[1]);
      }
    }
  }, []);

  // Update outer value when in fraction mode
  const updateFraction = (newNum: string, newDen: string) => {
    setNumVal(newNum);
    setDenVal(newDen);
    if (!newNum && !newDen) {
      onChange('');
    } else {
      onChange(`\\frac{${newNum}}{${newDen}}`);
    }
  };

  const handleCharInsert = (char: string) => {
    if (disabled) return;
    playSound('tap');

    if (fractionMode) {
      if (fractionField === 'num') {
        const next = numVal + char;
        updateFraction(next, denVal);
      } else {
        const next = denVal + char;
        updateFraction(numVal, next);
      }
    } else {
      onChange(value + char);
    }
  };

  const handleDelete = () => {
    if (disabled) return;
    playSound('tap');

    if (fractionMode) {
      if (fractionField === 'num') {
        const next = numVal.slice(0, -1);
        updateFraction(next, denVal);
      } else {
        const next = denVal.slice(0, -1);
        updateFraction(numVal, next);
      }
    } else {
      onChange(value.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (disabled) return;
    playSound('click');
    if (fractionMode) {
      updateFraction('', '');
    } else {
      onChange('');
    }
  };

  const toggleFractionMode = () => {
    if (disabled) return;
    playSound('click');
    if (!fractionMode) {
      // Activating fraction mode
      const current = value.trim();
      setFractionMode(true);
      setFractionField('den'); // If has value, it becomes numerator, focus denominator
      setNumVal(current || '');
      setDenVal('');
      if (current) {
        onChange(`\\frac{${current}}{}`);
      } else {
        onChange(`\\frac{}{}`);
      }
    } else {
      // Deactivating fraction mode -> convert to linear expression or numerator
      setFractionMode(false);
      if (numVal && denVal) {
        onChange(`(${numVal})/(${denVal})`);
      } else {
        onChange(numVal || denVal || '');
      }
    }
  };

  // Keyboard physical listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key;
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        handleCharInsert(key);
      } else if (['x', 'y', 'a', 'b', 'c', 'n'].includes(key.toLowerCase())) {
        e.preventDefault();
        handleCharInsert(key.toLowerCase());
      } else if (['+', '-', '*', '^', '(', ')', '.'].includes(key)) {
        e.preventDefault();
        handleCharInsert(key === '*' ? '\\cdot ' : key);
      } else if (key === '/') {
        e.preventDefault();
        toggleFractionMode();
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (key === 'Enter') {
        e.preventDefault();
        onEnter?.();
      } else if (key === 'ArrowUp' && fractionMode) {
        e.preventDefault();
        setFractionField('num');
      } else if (key === 'ArrowDown' && fractionMode) {
        e.preventDefault();
        setFractionField('den');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, fractionMode, fractionField, numVal, denVal, value]);

  // Generate preview LaTeX string
  const renderPreview = () => {
    if (fractionMode) {
      const displayNum = numVal ? numVal : '{\\color{#999}\\square}';
      const displayDen = denVal ? denVal : '{\\color{#999}\\square}';
      return `\\frac{${displayNum}}{${displayDen}}`;
    }
    if (!value) return null;
    return value;
  };

  const previewLatex = renderPreview();

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-3 select-none">
      {/* Visual Answer & Math Preview Box */}
      <div className="w-full bg-white border-3 border-[#1E1E24] rounded-2xl p-3 shadow-[4px_4px_0px_0px_#1E1E24] flex flex-col items-center justify-center min-h-[72px] transition-all">
        {fractionMode ? (
          /* Interactive Editable Fraction Box */
          <div className="flex flex-col items-center py-1">
            <button
              onClick={() => { playSound('tap'); setFractionField('num'); }}
              className={`px-3 py-1 rounded-lg text-lg font-black font-mono transition-all border-2 cursor-pointer ${
                fractionField === 'num'
                  ? 'border-[#1E1E24] bg-[#FFE600] text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]'
                  : 'border-dashed border-gray-300 bg-gray-50 text-[#1E1E24] hover:border-gray-500'
              }`}
            >
              {numVal ? <MathView latex={numVal} inline /> : <span className="text-gray-400 text-xs">Numerador</span>}
            </button>

            {/* Fraction Bar */}
            <div className="w-24 sm:w-32 h-1 bg-[#1E1E24] my-1 rounded-full" />

            <button
              onClick={() => { playSound('tap'); setFractionField('den'); }}
              className={`px-3 py-1 rounded-lg text-lg font-black font-mono transition-all border-2 cursor-pointer ${
                fractionField === 'den'
                  ? 'border-[#1E1E24] bg-[#FFE600] text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24]'
                  : 'border-dashed border-gray-300 bg-gray-50 text-[#1E1E24] hover:border-gray-500'
              }`}
            >
              {denVal ? <MathView latex={denVal} inline /> : <span className="text-gray-400 text-xs">Denominador</span>}
            </button>
          </div>
        ) : previewLatex ? (
          <div className="text-2xl font-black text-[#1E1E24] font-mono tracking-wide py-1 overflow-x-auto max-w-full">
            <MathView latex={previewLatex} inline />
          </div>
        ) : (
          <span className="text-gray-300 font-bold text-sm">{placeholder}</span>
        )}
      </div>

      {/* Quick Toolbar (Always visible top access: Variables, Exponents, Fractions, Parentheses) */}
      <div className="w-full grid grid-cols-6 gap-1.5">
        <button
          onClick={() => handleCharInsert('x')}
          disabled={disabled}
          className="h-10 bg-white border-2 border-[#1E1E24] rounded-xl font-mono text-base font-black text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-50 transition-all cursor-pointer"
        >
          x
        </button>
        <button
          onClick={() => handleCharInsert('y')}
          disabled={disabled}
          className="h-10 bg-white border-2 border-[#1E1E24] rounded-xl font-mono text-base font-black text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-50 transition-all cursor-pointer"
        >
          y
        </button>
        <button
          onClick={() => handleCharInsert('a')}
          disabled={disabled}
          className="h-10 bg-white border-2 border-[#1E1E24] rounded-xl font-mono text-base font-black text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-50 transition-all cursor-pointer"
        >
          a
        </button>
        <button
          onClick={() => handleCharInsert('b')}
          disabled={disabled}
          className="h-10 bg-white border-2 border-[#1E1E24] rounded-xl font-mono text-base font-black text-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-50 transition-all cursor-pointer"
        >
          b
        </button>
        <button
          onClick={() => handleCharInsert('^')}
          disabled={disabled}
          className="h-10 bg-[#a78bfa] text-white border-2 border-[#1E1E24] rounded-xl font-black text-sm shadow-[2px_2px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          title="Exponente o Potencia"
        >
          xⁿ
        </button>
        <button
          onClick={toggleFractionMode}
          disabled={disabled}
          className={`h-10 border-2 border-[#1E1E24] rounded-xl font-black text-xs shadow-[2px_2px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${
            fractionMode ? 'bg-[#FFE600] text-[#1E1E24]' : 'bg-[#38bdf8] text-white'
          }`}
          title="Colocar / Editar Fracción"
        >
          {fractionMode ? 'Fracc ✓' : 'a/b'}
        </button>
      </div>

      {/* Second row: Parentheses, Operators, and Quick Clean */}
      <div className="w-full grid grid-cols-6 gap-1.5">
        <button
          onClick={() => handleCharInsert('(')}
          disabled={disabled}
          className="h-9 bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-lg font-black text-sm text-[#1E1E24] shadow-[1px_1px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          (
        </button>
        <button
          onClick={() => handleCharInsert(')')}
          disabled={disabled}
          className="h-9 bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-lg font-black text-sm text-[#1E1E24] shadow-[1px_1px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          )
        </button>
        <button
          onClick={() => handleCharInsert('+')}
          disabled={disabled}
          className="h-9 bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-lg font-black text-sm text-[#1E1E24] shadow-[1px_1px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          +
        </button>
        <button
          onClick={() => handleCharInsert('-')}
          disabled={disabled}
          className="h-9 bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-lg font-black text-sm text-[#1E1E24] shadow-[1px_1px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          -
        </button>
        <button
          onClick={() => handleCharInsert('\\cdot ')}
          disabled={disabled}
          className="h-9 bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-lg font-black text-sm text-[#1E1E24] shadow-[1px_1px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          title="Multiplicación"
        >
          ·
        </button>
        <button
          onClick={handleClear}
          disabled={disabled}
          className="h-9 bg-gray-100 hover:bg-gray-200 border-2 border-[#1E1E24] rounded-lg font-black text-[10px] uppercase text-[#1E1E24] shadow-[1px_1px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          title="Borrar todo"
        >
          AC
        </button>
      </div>

      {/* Main Numeric Pad */}
      <div className="w-full grid grid-cols-3 gap-2 mt-1">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleCharInsert(num.toString())}
            disabled={disabled}
            className="h-12 bg-white border-2 border-[#1E1E24] rounded-xl text-xl font-black text-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-50 transition-all cursor-pointer"
          >
            {num}
          </button>
        ))}

        <button
          onClick={handleDelete}
          disabled={disabled}
          className="h-12 bg-rose-100 border-2 border-[#1E1E24] rounded-xl flex items-center justify-center text-[#EF4444] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          title="Borrar carácter"
        >
          <Delete size={20} />
        </button>

        <button
          onClick={() => handleCharInsert('0')}
          disabled={disabled}
          className="h-12 bg-white border-2 border-[#1E1E24] rounded-xl text-xl font-black text-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-50 transition-all cursor-pointer"
        >
          0
        </button>

        <button
          onClick={() => handleCharInsert('.')}
          disabled={disabled}
          className="h-12 bg-gray-100 border-2 border-[#1E1E24] rounded-xl text-2xl font-black text-[#1E1E24] shadow-[3px_3px_0px_0px_#1E1E24] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-200 transition-all cursor-pointer"
          title="Punto decimal"
        >
          .
        </button>
      </div>
    </div>
  );
};
