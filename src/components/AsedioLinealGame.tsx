import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  RotateCcw,
  Shield,
  Swords,
  Sparkles,
  Trophy,
  CheckCircle2,
  ChevronRight,
  X,
  Flame,
  Zap,
  Award,
  HelpCircle,
  Lightbulb,
  BookOpen,
  Target,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ASEDIO_LINEAL_LEVELS, AsedioLevel, TermItem } from '../data/asedioLinealData';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';
import { saveActiveHeroSession } from '../utils/activeSession';

interface AsedioLinealGameProps {
  onBack: () => void;
  onAwardXp: (amount: number) => void;
  initialLevelIndex?: number;
}

export const AsedioLinealGame: React.FC<AsedioLinealGameProps> = ({
  onBack,
  onAwardXp,
  initialLevelIndex = 0,
}) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(initialLevelIndex);
  const level = ASEDIO_LINEAL_LEVELS[currentLevelIdx] || ASEDIO_LINEAL_LEVELS[0];

  // Dynamic game board state
  const [leftTerms, setLeftTerms] = useState<TermItem[]>(level.leftTerms);
  const [rightTerms, setRightTerms] = useState<TermItem[]>(level.rightTerms);
  const [selectedTerm, setSelectedTerm] = useState<{ side: 'left' | 'right'; term: TermItem } | null>(
    null
  );

  const [stepHistory, setStepHistory] = useState<string[]>([]);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [towerHp, setTowerHp] = useState<number>(100);
  const [showLevelSelect, setShowLevelSelect] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showEquationModal, setShowEquationModal] = useState<boolean>(false);
  const [activeLeagueTab, setActiveLeagueTab] = useState<'bronce' | 'plata' | 'oro'>('bronce');

  // Storage of completed levels
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('asedio_completed_levels_v1');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  // Helper to format a side of terms into a clean readable math string
  const formatSide = (terms: TermItem[]): string => {
    if (!terms || terms.length === 0) return '0';
    return terms
      .map((t, idx) => {
        let lbl = t.label.trim();
        if (idx === 0) {
          if (lbl.startsWith('+')) lbl = lbl.substring(1).trim();
        } else {
          if (!lbl.startsWith('+') && !lbl.startsWith('-')) {
            lbl = `+ ${lbl}`;
          } else if (lbl.startsWith('+')) {
            lbl = `+ ${lbl.substring(1).trim()}`;
          } else if (lbl.startsWith('-')) {
            lbl = `- ${lbl.substring(1).trim()}`;
          }
        }
        return lbl;
      })
      .join(' ');
  };

  // Live dynamic equation string computed from current board state
  const currentEquationText = `${formatSide(leftTerms)} = ${formatSide(rightTerms)}`;

  // Load level and initialize
  useEffect(() => {
    setLeftTerms(level.leftTerms);
    setRightTerms(level.rightTerms);
    setSelectedTerm(null);
    setStepHistory([`Inicio: ${level.initialEquation}`]);
    setIsVictory(false);
    setTowerHp(100);

    // Save active state to Home Netflix carousel
    saveActiveHeroSession({
      id: 'active-asedio-lineal',
      type: 'asedio',
      title: `Asedio Lineal: Nivel ${level.levelNumber}`,
      subtitle: `${level.leagueName} · ${level.initialEquation}`,
      badge: `${level.leagueName.toUpperCase()} · EN PROGRESO`,
      progressText: `Nivel ${level.levelNumber} de 30`,
      progressPercent: Math.round((level.levelNumber / 30) * 100),
      totalSteps: 4,
      currentStep: 1,
      bgGradient: 'bg-[#6F78DB]',
      textColor: 'text-white',
      badgeBg: 'bg-[#F7CA38] text-[#1E1E24] font-black',
      ctaBg: 'bg-[#F7CA38] text-[#1E1E24] font-black',
      theme: 'equations',
      actionPayload: { levelNumber: level.levelNumber },
      lastUpdated: Date.now(),
    });
  }, [currentLevelIdx, level]);

  // Check if current board is ready for the Final Strike (ax = b)
  const isSimplifiedLeftVar =
    leftTerms.length === 1 &&
    leftTerms[0].type === 'var' &&
    rightTerms.length === 1 &&
    rightTerms[0].type === 'const';

  const isSimplifiedRightVar =
    rightTerms.length === 1 &&
    rightTerms[0].type === 'var' &&
    leftTerms.length === 1 &&
    leftTerms[0].type === 'const';

  const canStrike = isSimplifiedLeftVar || isSimplifiedRightVar;

  // Handle Term Selection
  const handleSelectTerm = (side: 'left' | 'right', term: TermItem) => {
    if (isVictory) return;
    playSound('click');

    // If already selected, clicking another term on same side triggers fusion
    if (selectedTerm && selectedTerm.side === side && selectedTerm.term.id !== term.id) {
      handleMergeTerms(side, selectedTerm.term, term);
      return;
    }

    // Otherwise toggle selection
    if (selectedTerm?.term.id === term.id) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm({ side, term });
    }
  };

  // Merge (Agrupar) two terms on the SAME side
  const handleMergeTerms = (side: 'left' | 'right', termA: TermItem, termB: TermItem) => {
    if (termA.type !== termB.type) {
      playSound('error');
      return;
    }

    playSound('correct');
    const newCoef = termA.coef + termB.coef;
    const newLabel =
      termA.type === 'var'
        ? newCoef === 1
          ? 'x'
          : newCoef === -1
          ? '-x'
          : `${newCoef > 0 ? (side === 'left' && leftTerms[0]?.id === termA.id ? `${newCoef}x` : `+${newCoef}x`) : `${newCoef}x`}`
        : `${newCoef >= 0 ? `+${newCoef}` : newCoef}`;

    const newMergedItem: TermItem = {
      id: `merged-${Date.now()}`,
      type: termA.type,
      coef: newCoef,
      label:
        newLabel.startsWith('+') &&
        (side === 'left' ? leftTerms.findIndex((t) => t.id === termA.id) === 0 : false)
          ? newLabel.replace('+', '')
          : newLabel,
    };

    if (side === 'left') {
      const updated = leftTerms.filter((t) => t.id !== termA.id && t.id !== termB.id);
      if (newCoef !== 0) updated.push(newMergedItem);
      setLeftTerms(updated);
    } else {
      const updated = rightTerms.filter((t) => t.id !== termA.id && t.id !== termB.id);
      if (newCoef !== 0) updated.push(newMergedItem);
      setRightTerms(updated);
    }

    setSelectedTerm(null);
    setStepHistory((prev) => [
      ...prev,
      `Agrupación: ${termA.label} y ${termB.label} ➔ ${newMergedItem.label}`,
    ]);
  };

  // Cross Bridge (Transposition between Top (Right) and Bottom (Left))
  const handleCrossBridge = () => {
    if (!selectedTerm) return;
    playSound('correct');

    const sourceSide = selectedTerm.side;
    const sourceTerm = selectedTerm.term;
    const flippedCoef = -sourceTerm.coef;

    const flippedLabel =
      sourceTerm.type === 'var'
        ? flippedCoef === 1
          ? '+x'
          : flippedCoef === -1
          ? '-x'
          : flippedCoef > 0
          ? `+${flippedCoef}x`
          : `${flippedCoef}x`
        : flippedCoef >= 0
        ? `+${flippedCoef}`
        : `${flippedCoef}`;

    const crossedTerm: TermItem = {
      id: `cross-${Date.now()}`,
      type: sourceTerm.type,
      coef: flippedCoef,
      label: flippedLabel,
    };

    if (sourceSide === 'left') {
      setLeftTerms((prev) => prev.filter((t) => t.id !== sourceTerm.id));
      setRightTerms((prev) => [...prev, crossedTerm]);
      setStepHistory((prev) => [
        ...prev,
        `Cruce de puente: ${sourceTerm.label} pasa como ${crossedTerm.label}`,
      ]);
    } else {
      setRightTerms((prev) => prev.filter((t) => t.id !== sourceTerm.id));
      setLeftTerms((prev) => [...prev, crossedTerm]);
      setStepHistory((prev) => [
        ...prev,
        `Cruce de puente: ${sourceTerm.label} pasa como ${crossedTerm.label}`,
      ]);
    }

    setSelectedTerm(null);
  };

  // Final Strike (División y Victoria)
  const handleFinalStrike = () => {
    if (!canStrike) return;

    playSound('fanfare');
    setTowerHp(0);
    setIsVictory(true);

    confetti({
      particleCount: 120,
      spread: 90,
      colors: ['#F7CA38', '#EF4444', '#3B82F6', '#22C55E'],
    });

    onAwardXp(level.xpReward);

    const nextLevelNum = level.levelNumber + 1;
    if (!completedLevels.includes(level.levelNumber)) {
      const updated = [...completedLevels, level.levelNumber];
      if (nextLevelNum <= 30 && !updated.includes(nextLevelNum)) {
        updated.push(nextLevelNum);
      }
      setCompletedLevels(updated);
      try {
        localStorage.setItem('asedio_completed_levels_v1', JSON.stringify(updated));
      } catch {}
    }
  };

  // Reset current board
  const handleResetLevel = () => {
    playSound('click');
    setLeftTerms(level.leftTerms);
    setRightTerms(level.rightTerms);
    setSelectedTerm(null);
    setIsVictory(false);
    setTowerHp(100);
    setStepHistory([`Reinicio: ${level.initialEquation}`]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F7FC] text-[#1E1E24] flex flex-col justify-between overflow-y-auto no-scrollbar font-jakarta">
      {/* Top Header Navbar - Clean with Profile-style Back Button & Actions */}
      <div className="bg-[#F7CA38] border-b-2 border-[#1E1E24] px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        {/* Left: Back Button styled like in ProfileView */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            playSound('click');
            onBack();
          }}
          className="w-10 h-10 bg-white hover:bg-[#F4F7FC] border-2 border-[#1E1E24] rounded-full flex items-center justify-center text-[#1E1E24] shadow-xs cursor-pointer transition-colors"
          title="Volver a la Arena"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </motion.button>

        {/* Right: Actions (Ayuda, Niveles, Reiniciar) */}
        <div className="flex items-center gap-2">
          {/* Help / Guide Button */}
          <button
            onClick={() => {
              playSound('click');
              setShowHelpModal(true);
            }}
            className="bg-white hover:bg-[#F4F7FC] text-[#1E1E24] text-xs font-black px-3.5 py-2 rounded-full border-2 border-[#1E1E24] cursor-pointer flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
            title="Ver Guía Táctica"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
            <span>Ayuda</span>
          </button>

          {/* Level Selector Button */}
          <button
            onClick={() => {
              playSound('click');
              setShowLevelSelect(true);
            }}
            className="bg-[#6F78DB] hover:bg-[#5B64C8] text-white text-xs font-black px-3.5 py-2 rounded-full border-2 border-[#1E1E24] cursor-pointer flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
            title="Seleccionar Nivel"
          >
            <Trophy className="w-3.5 h-3.5 text-[#F7CA38]" />
            <span>Niveles</span>
          </button>

          {/* Reset Board */}
          <button
            onClick={handleResetLevel}
            className="w-10 h-10 rounded-full bg-white border-2 border-[#1E1E24] text-[#1E1E24] flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#F4F7FC] transition-colors"
            title="Reiniciar Batalla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subheader Banner (Between Header and Board) - Home Style */}
      <div className="px-4 pt-3.5 pb-1 max-w-md mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#F7CA38] text-[#1E1E24] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border-2 border-[#1E1E24] shadow-2xs">
                {level.leagueName}
              </span>
              <span className="text-xs font-black text-[#8A909F]">
                Nivel {level.levelNumber}/30
              </span>
            </div>
            <h1 className="text-2xl font-black text-[#1E1E24] tracking-tight flex items-center gap-2">
              Asedio Lineal
              <span className="text-[#6F78DB] text-lg">✦</span>
            </h1>
            <p className="text-xs font-semibold text-[#8A909F]">
              Batalla de Ecuaciones · Clash Royale
            </p>
          </div>

          {/* Live Dynamic Equation Capsule with micro-animation on update */}
          <motion.div
            key={currentEquationText}
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: [1, 1.05, 1], opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-2 border-[#1E1E24] rounded-2xl px-3 py-1.5 text-right shadow-2xs flex flex-col items-end"
          >
            <div className="flex items-center gap-1 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#8A909F]">
                En Tablero
              </span>
            </div>
            <span className="text-xs sm:text-sm font-black text-[#1E1E24] tracking-tight">
              {currentEquationText}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Main Clash Royale Vertical Battlefield Arena (Top to Bottom) in Home Light Theme */}
      <div className="flex-1 flex flex-col p-4 max-w-md mx-auto w-full space-y-3 pb-24">
        {/* Vertical Arena Board */}
        <div className="bg-white border-2 border-[#1E1E24] rounded-[32px] p-4 shadow-sm flex flex-col space-y-3 relative overflow-hidden">
          {/* ============================================================ */}
          {/* 1. TOP ZONE: TORRE RIVAL / LADO DERECHO DE LA ECUACIÓN */}
          {/* ============================================================ */}
          <div className="bg-[#FFF5F5] border-2 border-[#1E1E24] rounded-2xl p-3 shadow-xs space-y-2.5">
            {/* Enemy Tower Header & HP Bar */}
            <div className="flex items-center justify-between border-b border-[#1E1E24]/15 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#FEE2E2] border-2 border-[#1E1E24] flex items-center justify-center text-sm shadow-2xs">
                  👑
                </span>
                <div>
                  <span className="text-[10px] font-black text-[#EF4444] uppercase tracking-wide block">
                    Torre Rival (Lado Derecho)
                  </span>
                  <div className="w-32 h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden border border-[#1E1E24] mt-0.5">
                    <div
                      className="h-full bg-[#EF4444] rounded-full transition-all duration-500"
                      style={{ width: `${towerHp}%` }}
                    />
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-black text-[#EF4444] bg-white px-2.5 py-0.5 rounded-full border border-[#1E1E24] shadow-2xs">
                HP: {towerHp}%
              </span>
            </div>

            {/* Enemy Troops Pool (Right Terms) */}
            <div className="min-h-[64px] flex flex-wrap items-center gap-2 p-1">
              {rightTerms.map((term) => {
                const isSelected =
                  selectedTerm?.side === 'right' && selectedTerm.term.id === term.id;
                return (
                  <motion.button
                    key={term.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectTerm('right', term)}
                    className={`py-2 px-3.5 rounded-2xl font-black text-xs sm:text-sm border-2 border-[#1E1E24] transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#F7CA38] text-[#1E1E24] ring-2 ring-[#1E1E24] scale-105 shadow-md'
                        : term.type === 'var'
                        ? 'bg-[#EF4444] hover:bg-[#dc2626] text-white'
                        : 'bg-white hover:bg-[#F8FAFC] text-[#1E1E24]'
                    }`}
                  >
                    <span>{term.type === 'var' ? '🏹' : '🪙'}</span>
                    <span>{term.label}</span>
                  </motion.button>
                );
              })}
              {rightTerms.length === 0 && (
                <div className="w-full py-3 text-center text-xs text-[#8A909F] font-bold border border-dashed border-[#1E1E24]/30 rounded-xl bg-white/50">
                  Territorio despejado (0)
                </div>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 2. MIDDLE ZONE: RÍO DE LA IGUALDAD Y PUENTE DEL IGUAL (=) */}
          {/* ============================================================ */}
          <div className="relative py-2.5 flex items-center justify-center">
            {/* Light Blue River Strip */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6 bg-[#BAE6FD] rounded-full border-2 border-[#1E1E24]" />

            {/* Bridge with Equal Sign (=) */}
            <div className="relative z-10 bg-[#F7CA38] border-2 border-[#1E1E24] rounded-2xl px-5 py-1.5 shadow-sm flex items-center gap-2">
              <span className="text-[10px] font-black text-[#1E1E24] uppercase tracking-wider">
                PUENTE
              </span>
              <span className="w-7 h-7 rounded-xl bg-white text-[#1E1E24] font-black text-base flex items-center justify-center border-2 border-[#1E1E24] shadow-2xs">
                =
              </span>
              <span className="text-[10px] font-black text-[#1E1E24] uppercase tracking-wider">
                IGUALDAD
              </span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 3. BOTTOM ZONE: TU FORTALEZA / LADO IZQUIERDO DE LA ECUACIÓN */}
          {/* ============================================================ */}
          <div className="bg-[#EEF2FF] border-2 border-[#1E1E24] rounded-2xl p-3 shadow-xs space-y-2.5">
            {/* Player Tower Header & HP Bar */}
            <div className="flex items-center justify-between border-b border-[#1E1E24]/15 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#DBEAFE] border-2 border-[#1E1E24] flex items-center justify-center text-sm shadow-2xs">
                  🛡️
                </span>
                <div>
                  <span className="text-[10px] font-black text-[#6F78DB] uppercase tracking-wide block">
                    Tu Fortaleza (Lado Izquierdo)
                  </span>
                  <div className="w-32 h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden border border-[#1E1E24] mt-0.5">
                    <div className="w-full h-full bg-[#6F78DB] rounded-full" />
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-black text-[#6F78DB] bg-white px-2.5 py-0.5 rounded-full border border-[#1E1E24] shadow-2xs">
                Aliado
              </span>
            </div>

            {/* Player Troops Pool (Left Terms) */}
            <div className="min-h-[64px] flex flex-wrap items-center gap-2 p-1">
              {leftTerms.map((term) => {
                const isSelected =
                  selectedTerm?.side === 'left' && selectedTerm.term.id === term.id;
                return (
                  <motion.button
                    key={term.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectTerm('left', term)}
                    className={`py-2 px-3.5 rounded-2xl font-black text-xs sm:text-sm border-2 border-[#1E1E24] transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#F7CA38] text-[#1E1E24] ring-2 ring-[#1E1E24] scale-105 shadow-md'
                        : term.type === 'var'
                        ? 'bg-[#6F78DB] hover:bg-[#5B64C8] text-white'
                        : 'bg-white hover:bg-[#F8FAFC] text-[#1E1E24]'
                    }`}
                  >
                    <span>{term.type === 'var' ? '⚔️' : '🪙'}</span>
                    <span>{term.label}</span>
                  </motion.button>
                );
              })}
              {leftTerms.length === 0 && (
                <div className="w-full py-3 text-center text-xs text-[#8A909F] font-bold border border-dashed border-[#1E1E24]/30 rounded-xl bg-white/50">
                  Territorio despejado (0)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Dock Controls Bar */}
        <div className="bg-white border-2 border-[#1E1E24] p-3.5 rounded-3xl shadow-md">
          {selectedTerm ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#1E1E24]">
                  Tropa: <strong className="font-black bg-[#FFF9E6] px-2 py-0.5 rounded-lg border border-[#1E1E24]">{selectedTerm.term.label}</strong>
                </span>
                <span className="text-[10px] text-[#8A909F] font-bold">
                  ({selectedTerm.side === 'left' ? 'Tu lado' : 'Rival'})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCrossBridge}
                  className="px-4 py-2.5 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] font-black text-xs rounded-full shadow-xs cursor-pointer flex items-center gap-1.5 transition-transform active:scale-95 border-2 border-[#1E1E24]"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-[#1E1E24]" />
                  <span>Cruzar Puente (=)</span>
                </button>

                <button
                  onClick={() => setSelectedTerm(null)}
                  className="px-3 py-2 bg-[#F4F7FC] hover:bg-[#E2E8F0] text-[#1E1E24] text-xs font-bold rounded-full border border-[#1E1E24] cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : canStrike ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinalStrike}
              className="w-full py-3.5 bg-[#22C55E] hover:bg-[#16a34a] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-md cursor-pointer flex items-center justify-center gap-2 animate-bounce border-2 border-[#1E1E24]"
            >
              <Flame className="w-5 h-5 text-white fill-current" />
              <span>¡LANZAR ATAQUE FINAL! (DIVIDIR Y ROMPER TORRE)</span>
            </motion.button>
          ) : (
            <div className="text-xs text-[#4A4E69] font-semibold text-center flex items-center justify-center gap-1.5">
              <span>💡</span>
              <span>
                Toca dos tropas en su mismo lado para <strong>agrupar</strong>, o una tropa para <strong>cruzar el puente (=)</strong>.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* BOTTOM-CENTER FLOATING FAB FOR DYNAMIC EQUATION */}
      {/* ============================================================ */}
      <div className="fixed bottom-5 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
        <motion.button
          key={currentEquationText}
          initial={{ scale: 0.95, y: 10, opacity: 0 }}
          animate={{ 
            scale: [1, 1.07, 1],
            y: 0, 
            opacity: 1,
            transition: { duration: 0.35, ease: 'easeOut' }
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playSound('click');
            setShowEquationModal(true);
          }}
          className="pointer-events-auto bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] border-2 border-[#1E1E24] rounded-full px-4 sm:px-5 py-2.5 shadow-xl flex items-center gap-2 cursor-pointer transition-all active:scale-95 group"
        >
          <span className="w-7 h-7 rounded-full bg-white border border-[#1E1E24] flex items-center justify-center text-xs font-black shadow-2xs group-hover:rotate-12 transition-transform">
            🎯
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#1E1E24]/70 hidden xs:inline">
              Ecuación:
            </span>
            <span className="font-black text-xs sm:text-sm tracking-tight text-[#1E1E24]">
              {currentEquationText}
            </span>
          </div>
          <span className="text-[10px] font-black bg-[#1E1E24] text-white px-2.5 py-0.5 rounded-full ml-1 shadow-2xs flex items-center gap-1">
            <span>Ver</span>
            <span>👁️</span>
          </span>
        </motion.button>
      </div>

      {/* ============================================================ */}
      {/* FLOATING FAB EQUATION MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showEquationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 max-w-sm w-full text-[#1E1E24] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#1E1E24]/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#F7CA38] border-2 border-[#1E1E24] text-[#1E1E24] flex items-center justify-center font-black text-sm">
                    🎯
                  </span>
                  <div>
                    <h3 className="font-black text-sm text-[#1E1E24]">Ecuación de la Batalla</h3>
                    <span className="text-[10px] text-[#8A909F] font-bold">
                      Nivel {level.levelNumber} · {level.leagueName}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowEquationModal(false)}
                  className="w-7 h-7 rounded-full bg-[#F4F7FC] border border-[#1E1E24]/30 text-[#1E1E24] flex items-center justify-center cursor-pointer hover:bg-[#E2E8F0]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Current Live Equation Large Display */}
              <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#8A909F]">
                    Estado Actual en Tablero
                  </span>
                </div>
                <div className="py-2 text-2xl sm:text-3xl font-black text-[#1E1E24] tracking-tight">
                  {currentEquationText}
                </div>
              </div>

              {/* Initial Equation Reference */}
              <div className="bg-[#F8FAFC] border border-[#1E1E24]/20 rounded-2xl p-3 text-xs space-y-1">
                <span className="text-[10px] font-extrabold text-[#8A909F] uppercase block">
                  Ecuación Inicial del Nivel:
                </span>
                <span className="font-bold text-[#1E1E24] text-sm">
                  {level.initialEquation}
                </span>
              </div>

              <div className="bg-[#F8FAFC] border border-[#1E1E24]/20 rounded-2xl p-3 text-xs text-[#4A4E69] space-y-1.5">
                <p className="font-bold text-[#1E1E24]">
                  🏹 <strong>Objetivo del juego:</strong>
                </p>
                <p>
                  Despejar la incógnita $x$ agrupando tropas en cada territorio, cruzando el puente para invertir signos y lanzando el ataque de división final.
                </p>
              </div>

              <button
                onClick={() => setShowEquationModal(false)}
                className="w-full py-3 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] cursor-pointer shadow-xs"
              >
                Cerrar y Continuar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* TACTICAL HELP MODAL (Pistas y Pasos del Nivel) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 max-w-sm w-full text-[#1E1E24] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#1E1E24]/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#F7CA38] border-2 border-[#1E1E24] text-[#1E1E24] flex items-center justify-center font-black text-sm">
                    💡
                  </span>
                  <div>
                    <h3 className="font-black text-sm text-[#1E1E24]">Guía Táctica de Batalla</h3>
                    <span className="text-[10px] text-[#8A909F] font-bold">
                      Nivel {level.levelNumber} · {level.leagueName}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowHelpModal(false)}
                  className="w-7 h-7 rounded-full bg-[#F4F7FC] border border-[#1E1E24]/30 text-[#1E1E24] flex items-center justify-center cursor-pointer hover:bg-[#E2E8F0]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Rules & Strategy */}
              <div className="space-y-2.5 text-xs text-[#4A4E69]">
                <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-2xl p-2.5 space-y-1">
                  <span className="text-[10px] font-black text-[#1E1E24] uppercase block">
                    🛡️ Regla 1: Agrupamiento de Tropas
                  </span>
                  <p className="text-[11px] text-[#1E1E24]/90">
                    Toca dos tropas del mismo tipo en el mismo territorio para sumarlas o restarlas sin cambiar de signo.
                  </p>
                </div>

                <div className="bg-[#E0F2FE] border-2 border-[#1E1E24] rounded-2xl p-2.5 space-y-1">
                  <span className="text-[10px] font-black text-[#0369A1] uppercase block">
                    🌉 Regla 2: Cruce de Puente (=)
                  </span>
                  <p className="text-[11px] text-[#1E1E24]/90">
                    Toca una tropa y pulsa "Cruzar Puente" para enviarla al otro lado invirtiendo su signo ($+ \leftrightarrow -$).
                  </p>
                </div>

                <div className="bg-[#DCFCE7] border-2 border-[#1E1E24] rounded-2xl p-2.5 space-y-1">
                  <span className="text-[10px] font-black text-[#15803D] uppercase block">
                    ⚔️ Regla 3: Ataque Final (División)
                  </span>
                  <p className="text-[11px] text-[#1E1E24]/90">
                    Cuando quede una $x$ en un lado y un número en el otro ($ax = b$), lanza el Ataque Final para dividir y ganar 3 coronas.
                  </p>
                </div>

                {/* Level Specific Steps Guidance */}
                <div className="bg-[#F8FAFC] border border-[#1E1E24]/20 rounded-2xl p-2.5 space-y-1.5 mt-2">
                  <span className="text-[10px] font-black text-[#1E1E24] uppercase block flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                    Plan Táctico Recomendado
                  </span>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#4A4E69]">
                    {level.step1Description && <li className="leading-tight">{level.step1Description}</li>}
                    {level.step2Description && <li className="leading-tight">{level.step2Description}</li>}
                    {level.step3Description && <li className="leading-tight">{level.step3Description}</li>}
                  </ol>
                </div>
              </div>

              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full py-3 bg-[#6F78DB] hover:bg-[#5B64C8] text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] cursor-pointer shadow-xs"
              >
                ¡Entendido, al Combate!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* LEVEL SELECT MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showLevelSelect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border-2 border-[#1E1E24] rounded-3xl p-5 max-w-sm w-full text-[#1E1E24] shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-[#1E1E24]/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#F7CA38] border-2 border-[#1E1E24] flex items-center justify-center text-sm shadow-2xs">
                    🏆
                  </span>
                  <h3 className="font-black text-sm text-[#1E1E24]">Ligas de Asedio (30 Niveles)</h3>
                </div>

                <button
                  onClick={() => setShowLevelSelect(false)}
                  className="w-7 h-7 rounded-full bg-[#F4F7FC] border border-[#1E1E24]/30 text-[#1E1E24] hover:bg-[#E2E8F0] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* League Tabs */}
              <div className="flex items-center bg-[#F4F7FC] p-1 rounded-full border-2 border-[#1E1E24]">
                {(['bronce', 'plata', 'oro'] as const).map((league) => (
                  <button
                    key={league}
                    onClick={() => setActiveLeagueTab(league)}
                    className={`flex-1 py-1.5 rounded-full text-xs font-black uppercase transition-all cursor-pointer ${
                      activeLeagueTab === league
                        ? 'bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] shadow-2xs'
                        : 'text-[#8A909F] hover:text-[#1E1E24] border-2 border-transparent'
                    }`}
                  >
                    {league === 'bronce' ? '🥉 Bronce' : league === 'plata' ? '🥈 Plata' : '🥇 Oro'}
                  </button>
                ))}
              </div>

              {/* Levels Grid for Selected League */}
              <div className="grid grid-cols-5 gap-2 overflow-y-auto p-1 flex-1 no-scrollbar">
                {ASEDIO_LINEAL_LEVELS.filter((l) => l.league === activeLeagueTab).map((lvl) => {
                  const isUnlocked = completedLevels.includes(lvl.levelNumber);
                  const isCurrent = lvl.levelNumber === level.levelNumber;

                  return (
                    <button
                      key={lvl.id}
                      disabled={!isUnlocked}
                      onClick={() => {
                        playSound('click');
                        setCurrentLevelIdx(lvl.levelNumber - 1);
                        setShowLevelSelect(false);
                      }}
                      className={`h-12 rounded-2xl border-2 border-[#1E1E24] flex flex-col items-center justify-center text-xs font-black transition-all cursor-pointer shadow-2xs ${
                        isCurrent
                          ? 'bg-[#F7CA38] text-[#1E1E24] ring-2 ring-[#1E1E24] shadow-xs'
                          : isUnlocked
                          ? 'bg-white hover:bg-[#F4F7FC] text-[#1E1E24]'
                          : 'bg-[#E2E8F0] text-[#94A3B8] border-[#94A3B8] cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span>{lvl.levelNumber}</span>
                      {isUnlocked && <span className="text-[8px] text-[#22C55E]">★</span>}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* VICTORY 3 CROWNS MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isVictory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white border-4 border-[#1E1E24] rounded-[36px] p-6 max-w-sm w-full text-center text-[#1E1E24] shadow-2xl space-y-4"
            >
              {/* 3 Crowns Visual */}
              <div className="flex items-center justify-center gap-2">
                <motion.span
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl"
                >
                  👑
                </motion.span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.3 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl"
                >
                  👑
                </motion.span>
                <motion.span
                  initial={{ scale: 0, rotate: 20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl"
                >
                  👑
                </motion.span>
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#EF4444] block">
                  ¡TORRE DESTRUIDA!
                </span>
                <h2 className="text-2xl font-black text-[#1E1E24] mt-1">¡VICTORIA REAL!</h2>
              </div>

              {/* XP Reward Badge */}
              <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-2xl p-3 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                <span className="text-sm font-black text-[#1E1E24]">
                  +{level.xpReward} XP Reales Obtenidos
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                {currentLevelIdx < ASEDIO_LINEAL_LEVELS.length - 1 ? (
                  <button
                    onClick={() => {
                      playSound('click');
                      setCurrentLevelIdx((prev) => prev + 1);
                    }}
                    className="w-full py-3.5 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] font-black text-sm uppercase tracking-wider rounded-full border-2 border-[#1E1E24] shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Siguiente Nivel ({level.levelNumber + 1})</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                ) : (
                  <div className="bg-[#DCFCE7] text-[#15803D] text-xs font-black p-3 rounded-2xl border-2 border-[#1E1E24]">
                    🏆 ¡HAS COMPLETADO TODAS LAS 3 LIGAS DE ASEDIO LINEAL!
                  </div>
                )}

                <button
                  onClick={() => {
                    playSound('click');
                    onBack();
                  }}
                  className="w-full py-2.5 bg-[#F4F7FC] hover:bg-[#E2E8F0] text-[#1E1E24] font-black text-xs rounded-full border-2 border-[#1E1E24] cursor-pointer"
                >
                  Volver a la Arena
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
