import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, CheckCircle2, AlertCircle, HelpCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Trial } from '../data/trials';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';

interface ActiveTrialProps {
  trial: Trial;
  onBack: () => void;
  onAwardXp: (amount: number) => void;
}

export type TrialPhase = 'rule' | 'transform' | 'correct' | 'wrong' | 'victory';

export const ActiveTrial: React.FC<ActiveTrialProps> = ({ trial, onBack, onAwardXp }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState<TrialPhase>('rule');
  const [selectedRule, setSelectedRule] = useState<number | null>(null);
  const [wrongMsg, setWrongMsg] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const currentStep = trial.steps[stepIdx] || trial.steps[0];

  const handleSelectRuleOption = (ruleIndex: number) => {
    setSelectedRule(ruleIndex);
    if (ruleIndex === currentStep.correctRule) {
      playSound('correct');
      setPhase('transform');
    } else {
      playSound('error');
      setWrongMsg(`Regla incorrecta: "${currentStep.rules[ruleIndex]}" no justifica la propiedad matemática de este paso.`);
      setPhase('wrong');
      setTimeout(() => {
        setPhase('rule');
        setSelectedRule(null);
      }, 1800);
    }
  };

  const handleSelectTransformationOption = (transIndex: number) => {
    if (transIndex === currentStep.correctTransformation) {
      playSound('correct');
      const stepResult = currentStep.transformations[transIndex];
      setCompletedSteps((prev) => [...prev, stepResult]);

      if (stepIdx + 1 < trial.steps.length) {
        setStepIdx((prev) => prev + 1);
        setSelectedRule(null);
        setPhase('rule');
      } else {
        setPhase('victory');
        onAwardXp(trial.xp);
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F7CA38', '#6F78DB', '#38bdf8', '#22C55E'],
        });
      }
    } else {
      playSound('error');
      setWrongMsg('Transformación incorrecta: la simplificación viola los axiomas algebraicos.');
      setPhase('wrong');
      setTimeout(() => {
        setPhase('transform');
      }, 1800);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7CA38] text-[#1E1E24] pb-24 max-w-md mx-auto font-jakarta relative overflow-hidden">
      {/* Top Header Section */}
      <div className="w-full pt-4 pb-6 px-5 flex flex-col relative z-10">
        <div className="flex items-center justify-between mb-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-10 h-10 bg-white border-2 border-[#1E1E24] rounded-full flex items-center justify-center text-[#1E1E24] hover:bg-[#FFFDF5] cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </motion.button>

          <div className="flex items-center gap-2">
            <span className="bg-white border-2 border-[#1E1E24] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#1E1E24] shadow-2xs">
              {trial.category} · {trial.volCode}
            </span>
            <span className="bg-white border-2 border-[#1E1E24] text-[#1E1E24] px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" /> +{trial.xp} XP
            </span>
          </div>
        </div>

        <div className="text-center mt-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#1E1E24]/80 block">
            Arena de Desafíos
          </span>
          <h1 className="text-xl font-black uppercase tracking-tight text-[#1E1E24]">
            {trial.title}
          </h1>
        </div>
      </div>

      {/* Main White Content Card with Rounded Top Corners */}
      <div className="relative z-20 w-full bg-white rounded-t-[36px] border-t-2 border-x-2 border-[#1E1E24] shadow-2xl p-5 pt-6 flex-1 space-y-4">
        {/* Expression -> Target Banner */}
        <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-3xl p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 text-center bg-white border-2 border-[#1E1E24] rounded-2xl p-2.5 shadow-2xs">
              <span className="text-[9px] text-[#8A909F] font-black uppercase tracking-wider block mb-0.5">Expresión</span>
              <span className="text-sm font-black text-[#1E1E24]">
                <MathView latex={trial.expression} />
              </span>
            </div>

            <span className="text-[#6F78DB] text-lg font-black shrink-0">➔</span>

            <div className="flex-1 text-center bg-white border-2 border-[#1E1E24] rounded-2xl p-2.5 shadow-2xs">
              <span className="text-[9px] text-[#8A909F] font-black uppercase tracking-wider block mb-0.5">Objetivo</span>
              <span className="text-sm font-black text-[#22C55E]">
                <MathView latex={trial.target} />
              </span>
            </div>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex gap-1.5 bg-[#F4F7FC] p-1.5 rounded-full border-2 border-[#1E1E24]">
            {trial.steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  idx < stepIdx
                    ? 'bg-[#22C55E]'
                    : idx === stepIdx
                    ? 'bg-[#F7CA38]'
                    : 'bg-white'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-black text-[#1E1E24] bg-white border-2 border-[#1E1E24] px-2.5 py-0.5 rounded-full shadow-2xs">
            Paso {stepIdx + 1}/{trial.steps.length}
          </span>
        </div>

        {/* Completed Step Trail */}
        {completedSteps.length > 0 && (
          <div className="space-y-1.5">
            {completedSteps.map((res, idx) => (
              <div
                key={idx}
                className="bg-[#DCFCE7] border-2 border-[#1E1E24] rounded-2xl px-3.5 py-2 text-xs font-black text-[#166534] flex items-center justify-between shadow-2xs"
              >
                <span>Paso {idx + 1} completado: <MathView latex={res} inline /></span>
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] stroke-[2.5]" />
              </div>
            ))}
          </div>
        )}

        {/* Wrong Feedback */}
        {phase === 'wrong' && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#FEE2E2] border-2 border-[#1E1E24] rounded-2xl p-3 text-xs font-black text-[#991B1B] flex items-center gap-2 shadow-xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-[#EF4444]" />
            <span>{wrongMsg}</span>
          </motion.div>
        )}

        {/* Main State Machine Content */}
        {phase !== 'victory' ? (
          <div className="space-y-3 flex-1 flex flex-col justify-between pt-1">
            <div>
              {/* Instruction Banner */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-xs uppercase tracking-wider text-[#6F78DB] flex items-center gap-1.5">
                  {phase === 'rule' ? '⚔️ Paso 1 — Arsenal de Reglas' : '⚡ Paso 2 — Transformación Resultante'}
                </span>

                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-[11px] font-black text-[#8A909F] hover:text-[#F59E0B] flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
                </button>
              </div>

              {/* Hint Box */}
              {showHint && (
                <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-2xl p-3 mb-3 text-xs text-[#92400E] font-bold flex items-start gap-2 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-[#F7CA38] shrink-0 mt-0.5" />
                  <span>Identifica la propiedad o axioma que permite simplificar legalmente la expresión actual.</span>
                </div>
              )}

              {/* Options List */}
              {phase === 'rule' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#4A4E69] mb-2">{currentStep.instruction}</p>
                  {currentStep.rules.map((ruleText, idx) => (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectRuleOption(idx)}
                      className="w-full text-left bg-white hover:bg-[#FFFDF5] border-2 border-[#1E1E24] rounded-2xl p-3.5 text-xs text-[#1E1E24] font-black transition-all cursor-pointer shadow-xs flex items-center gap-3 active:bg-[#F7CA38]"
                    >
                      <span className="w-7 h-7 rounded-xl bg-[#F7CA38] border border-[#1E1E24] text-[#1E1E24] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-snug">{ruleText}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {phase === 'transform' && (
                <div className="space-y-2">
                  <div className="bg-[#DCFCE7] border-2 border-[#1E1E24] rounded-2xl px-3.5 py-2 text-xs text-[#166534] font-black mb-3 shadow-2xs">
                    ✓ Regla seleccionada: {currentStep.rules[currentStep.correctRule]}
                  </div>

                  <p className="text-xs font-bold text-[#4A4E69] mb-2">Selecciona el resultado de la transformación:</p>
                  {currentStep.transformations.map((transText, idx) => (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectTransformationOption(idx)}
                      className="w-full text-left bg-white hover:bg-[#FFFDF5] border-2 border-[#1E1E24] rounded-2xl p-3.5 text-sm text-[#1E1E24] font-black transition-all cursor-pointer shadow-xs flex items-center gap-3 active:bg-[#F7CA38]"
                    >
                      <span className="w-7 h-7 rounded-xl bg-[#93E1FF] border border-[#1E1E24] text-[#1E1E24] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 font-black text-[#1E1E24]">
                        <MathView latex={transText} />
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Victory Screen */
          <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-3xl p-6 text-center space-y-4 shadow-md my-auto">
            <div className="w-16 h-16 rounded-full bg-[#22C55E] border-2 border-[#1E1E24] text-white flex items-center justify-center mx-auto shadow-xs">
              <Trophy className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="font-black text-2xl uppercase tracking-tight text-[#1E1E24]">
              ¡DESAFÍO COMPLETADO!
            </h3>

            <p className="text-xs text-[#4A4E69] font-bold leading-relaxed">
              Demostraste los {trial.steps.length} pasos justificando legalmente cada transformación con el Arsenal.
            </p>

            <div className="inline-block bg-[#F7CA38] border-2 border-[#1E1E24] rounded-full px-5 py-2 font-black text-sm text-[#1E1E24] shadow-xs">
              +{trial.xp} XP GANADOS ⭐
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={onBack}
                className="w-full py-3.5 bg-[#1E1E24] hover:bg-[#333] text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] shadow-md cursor-pointer transition-transform"
              >
                Volver a la Arena
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
