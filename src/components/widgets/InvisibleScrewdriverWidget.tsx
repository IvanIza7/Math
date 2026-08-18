import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Eye, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';

interface ExpressionItem {
  id: string;
  expression: string;
  label: string;
  hiddenParts: {
    sign: string;
    multiplier: string;
    exponent: string;
    denominator: string;
  };
  stepExplanation: string[];
  commonTrap: string;
}

export const InvisibleScrewdriverWidget: React.FC = () => {
  const expressions: ExpressionItem[] = [
    {
      id: 'expr-neg4',
      expression: '-4',
      label: 'El -1 oculto en un número negativo',
      hiddenParts: {
        sign: '-',
        multiplier: '(-1)',
        exponent: '4^1',
        denominator: '4 / 1',
      },
      stepExplanation: [
        'En realidad, -4 es el resultado de la multiplicación (-1) · 4.',
        'Tiene un exponente invisible (4¹ = 4).',
        'Tiene un denominador invisible (4 / 1 = 4).',
      ],
      commonTrap: 'Creer que el signo menos es parte inseparable del número sin entender su rol de multiplicador (-1).',
    },
    {
      id: 'expr-trap-sq',
      expression: '-3^2',
      label: '¡La Trampa Suprema! -3² sin paréntesis',
      hiddenParts: {
        sign: '-',
        multiplier: '(-1) · (3 · 3)',
        exponent: '3²',
        denominator: '/ 1',
      },
      stepExplanation: [
        'Paso 1: El exponente 2 SOLO afecta al número 3, NO al signo menos.',
        'Paso 2: Desarmamos el -1 libre: -1 · (3²).',
        'Paso 3: Calculamos 3² = 9.',
        'Paso 4: Multiplicamos (-1) · 9 = -9.',
      ],
      commonTrap: '¡Decir que -3² es +9! Solo es +9 si tuviera paréntesis (-3)². Sin ellos, da -9.',
    },
    {
      id: 'expr-double-neg-sq',
      expression: '-(-3)^2',
      label: 'Doble Menos y Paréntesis -(-3)²',
      hiddenParts: {
        sign: '-',
        multiplier: '(-1) · [(-3) · (-3)]',
        exponent: '(-3)²',
        denominator: '/ 1',
      },
      stepExplanation: [
        'Paso 1: Desarmamos el signo frontal como (-1).',
        'Paso 2: Calculamos la potencia dentro del paréntesis (-3)² = (-3)·(-3) = +9.',
        'Paso 3: Multiplicamos el (-1) frontal por el +9 obtenido.',
        'Resultado Final = -9.',
      ],
      commonTrap: 'Pensar que los dos menos se eliminan antes de resolver la potencia.',
    },
    {
      id: 'expr-[#38B6FF]',
      expression: '-x',
      label: 'Variable con signo negativo -x',
      hiddenParts: {
        sign: '-',
        multiplier: '(-1) · x',
        exponent: 'x^1',
        denominator: 'x / 1',
      },
      stepExplanation: [
        'El coeficiente de x no está vacío: hay un (-1) invisible.',
        '-x es exactamente igual a (-1) · x.',
      ],
      commonTrap: 'Creer que el coeficiente de -x es 0. ¡Si fuera 0, la x desaparecería (0·x = 0)!',
    },
  ];

  const [selectedExpr, setSelectedExpr] = useState<ExpressionItem>(expressions[0]);
  const [isDismantled, setIsDismantled] = useState<boolean>(false);

  const handleDismantle = () => {
    playSound('flip');
    setIsDismantled(!isDismantled);
  };

  return (
    <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-3xl p-5 text-white shadow-lg">
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2C2C30]">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#38B6FF] border border-[#2C2C30] rounded-xl text-gray-900">
            <Wrench className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Desarmador de Signos e Invisibles
            </h3>
            <p className="text-xs font-bold text-gray-400">
              Revela los (-1), exponentes 1 y denominadores 1 ocultos
            </p>
          </div>
        </div>

        <button
          onClick={handleDismantle}
          className={`px-3 py-1.5 font-black text-xs uppercase border border-[#2C2C30] rounded-xl pill-btn cursor-pointer flex items-center gap-1 ${
            isDismantled ? 'bg-[#BAFF29] text-gray-900' : 'bg-[#FFDE59] text-gray-900'
          }`}
        >
          <Eye className="w-4 h-4" />
          {isDismantled ? 'Armar Expresión' : 'Usar Desarmador'}
        </button>
      </div>

      {/* Selector of Expressions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {expressions.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              playSound('click');
              setSelectedExpr(item);
              setIsDismantled(false);
            }}
            className={`p-3 border rounded-2xl text-center font-black text-sm cursor-pointer transition-all ${
              selectedExpr.id === item.id
                ? 'bg-[#BAFF29] text-gray-900 border-[#BAFF29] shadow-xs scale-105'
                : 'bg-[#121214] text-gray-300 border-[#2C2C30] hover:border-gray-500'
            }`}
          >
            <MathView latex={item.expression} inline />
          </button>
        ))}
      </div>

      {/* Dismantling Workbench Area */}
      <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-6 flex flex-col items-center justify-center mb-6">
        <span className="text-xs font-black text-gray-400 uppercase mb-2">
          {selectedExpr.label}
        </span>

        {/* Big Display Box */}
        <div className="my-4 p-6 bg-[#1C1C1E] border border-[#BAFF29] rounded-2xl text-3xl font-black text-[#BAFF29] text-center min-w-[240px]">
          <MathView latex={selectedExpr.expression} />
        </div>

        {/* Dismantled Layers View */}
        <AnimatePresence mode="wait">
          {isDismantled ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 my-2"
            >
              <div className="bg-[#FFDE59] border border-[#2C2C30] rounded-xl p-3 text-center">
                <span className="text-[10px] font-black uppercase text-gray-900 block mb-1">
                  Multiplicador Oculto
                </span>
                <span className="text-lg font-black text-gray-900 font-mono">
                  {selectedExpr.hiddenParts.multiplier}
                </span>
              </div>

              <div className="bg-[#38B6FF] border border-[#2C2C30] rounded-xl p-3 text-center">
                <span className="text-[10px] font-black uppercase text-gray-900 block mb-1">
                  Exponente Oculto
                </span>
                <span className="text-lg font-black font-mono text-gray-900">
                  {selectedExpr.hiddenParts.exponent}
                </span>
              </div>

              <div className="bg-[#BAFF29] border border-[#2C2C30] rounded-xl p-3 text-center">
                <span className="text-[10px] font-black uppercase text-gray-900 block mb-1">
                  Denominador Oculto
                </span>
                <span className="text-lg font-black text-gray-900 font-mono">
                  {selectedExpr.hiddenParts.denominator}
                </span>
              </div>
            </motion.div>
          ) : (
            <p className="text-xs font-bold text-gray-400 italic">
              👈 Haz clic en "Usar Desarmador" para separar las partes invisibles.
            </p>
          )}
        </AnimatePresence>
      </div>

      {/* Step by step explanation */}
      <div className="bg-[#121214] border border-[#2C2C30] rounded-2xl p-4 mb-4">
        <h4 className="text-xs font-black uppercase text-white mb-2 flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-[#BAFF29]" /> Desglose Paso a Paso:
        </h4>
        <ul className="space-y-1">
          {selectedExpr.stepExplanation.map((step, idx) => (
            <li key={idx} className="text-xs font-medium text-gray-300 flex items-start gap-2">
              <span className="w-4 h-4 bg-[#BAFF29] text-gray-900 rounded-full text-[10px] flex items-center justify-center shrink-0 font-black">
                {idx + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Common Trap Warning */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3 flex items-start gap-2">
        <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-[10px] font-black uppercase text-red-300 block">
            ¡Evita esta trampa común!
          </span>
          <p className="text-xs font-medium text-gray-200">{selectedExpr.commonTrap}</p>
        </div>
      </div>
    </div>
  );
};
