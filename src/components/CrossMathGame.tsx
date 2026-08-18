import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RotateCcw, Undo2, Check, Sparkles, Trophy, ChevronRight, HelpCircle, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CROSS_MATH_LEVELS, CrossMathLevel, CrossMathDifficulty } from '../data/crossMathData';
import { playSound } from '../utils/sound';

interface CrossMathGameProps {
  onBack: () => void;
  onAwardXp: (amount: number) => void;
}

export const CrossMathGame: React.FC<CrossMathGameProps> = ({ onBack, onAwardXp }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<CrossMathDifficulty>('facil');
  const [selectedLevelNum, setSelectedLevelNum] = useState<number>(1);
  const [completedLevels, setCompletedLevels] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('crossmath_completed_levels');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const currentLevel: CrossMathLevel =
    CROSS_MATH_LEVELS.find(
      (l) => l.difficulty === selectedDifficulty && l.levelNumber === selectedLevelNum
    ) || CROSS_MATH_LEVELS[0];

  // User fills state: cellId -> number | null
  const [userFills, setUserFills] = useState<Record<string, number | null>>({});
  const [activeCellId, setActiveCellId] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<Record<string, number | null>>>([]);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Initialize level
  useEffect(() => {
    const initialFills: Record<string, number | null> = {};
    currentLevel.blankIds.forEach((id) => {
      initialFills[id] = null;
    });
    setUserFills(initialFills);
    setActiveCellId(currentLevel.blankIds[0]);
    setHistory([]);
    setIsVictory(false);
    setIsWrong(false);
    setTimerSeconds(0);
  }, [selectedDifficulty, selectedLevelNum]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Find used numbers in number bank
  const usedNumbers = Object.values(userFills).filter((v): v is number => v !== null);

  const availableTokens = currentLevel.numberBank.map((num, idx) => {
    const usedCount = usedNumbers.filter((n) => n === num).length;
    const totalCount = currentLevel.numberBank.filter((n) => n === num).length;
    const isUsed = usedCount >= totalCount;
    return { num, isUsed, key: `${num}-${idx}` };
  });

  // Tap a token from the bank
  const handleSelectToken = (num: number) => {
    if (isVictory) return;
    playSound('click');

    // Find target cell
    let targetKey = activeCellId;
    if (!targetKey || userFills[targetKey] !== null) {
      targetKey = currentLevel.blankIds.find((k) => userFills[k] === null) || currentLevel.blankIds[0];
    }

    setHistory((prev) => [...prev, { ...userFills }]);
    const nextFills = { ...userFills, [targetKey]: num };
    setUserFills(nextFills);

    // Auto advance active cell
    const nextEmpty = currentLevel.blankIds.find((k) => nextFills[k] === null);
    if (nextEmpty) {
      setActiveCellId(nextEmpty);
    }

    // Check if fully filled
    if (currentLevel.blankIds.every((k) => nextFills[k] !== null)) {
      validateBoard(nextFills);
    }
  };

  // Remove filled number from a cell
  const handleCellClick = (cellId: string) => {
    if (currentLevel.fixedCells && currentLevel.fixedCells[cellId] !== undefined) return;
    playSound('click');
    setActiveCellId(cellId);
    if (userFills[cellId] !== null) {
      setHistory((prev) => [...prev, { ...userFills }]);
      setUserFills((prev) => ({ ...prev, [cellId]: null }));
    }
  };

  const handleUndo = () => {
    playSound('click');
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setUserFills(prev);
      setHistory((h) => h.slice(0, h.length - 1));
    }
  };

  const handleClear = () => {
    playSound('click');
    setHistory((prev) => [...prev, { ...userFills }]);
    const emptyFills: Record<string, number | null> = {};
    currentLevel.blankIds.forEach((id) => {
      emptyFills[id] = null;
    });
    setUserFills(emptyFills);
    setActiveCellId(currentLevel.blankIds[0]);
    setIsWrong(false);
  };

  const validateBoard = (fills: Record<string, number | null>) => {
    // Check against official solution
    let isCorrect = true;
    for (const id of currentLevel.blankIds) {
      if (fills[id] !== currentLevel.solution[id]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      playSound('correct');
      confetti({
        particleCount: 70,
        spread: 60,
        colors: ['#F7CA38', '#22C55E', '#6F78DB', '#38bdf8'],
      });
      setIsVictory(true);
      setIsWrong(false);

      const levelKey = `${currentLevel.difficulty}-${currentLevel.levelNumber}`;
      if (!completedLevels.includes(levelKey)) {
        const nextCompleted = [...completedLevels, levelKey];
        setCompletedLevels(nextCompleted);
        try {
          localStorage.setItem('crossmath_completed_levels', JSON.stringify(nextCompleted));
        } catch {}
      }

      onAwardXp(currentLevel.difficulty === 'dificil' ? 100 : currentLevel.difficulty === 'medio' ? 75 : 50);
    } else {
      playSound('error');
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 2000);
    }
  };

  const handleNextLevel = () => {
    playSound('click');
    if (selectedLevelNum < 5) {
      setSelectedLevelNum((prev) => prev + 1);
    } else if (selectedDifficulty === 'facil') {
      setSelectedDifficulty('medio');
      setSelectedLevelNum(1);
    } else if (selectedDifficulty === 'medio') {
      setSelectedDifficulty('dificil');
      setSelectedLevelNum(1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7CA38] text-[#1E1E24] pb-24 max-w-md mx-auto font-jakarta relative overflow-hidden">
      {/* Top Header */}
      <div className="w-full pt-4 pb-3 px-5 flex flex-col relative z-10">
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
            <span className="bg-white border-2 border-[#1E1E24] px-3 py-1 rounded-full text-xs font-black text-[#1E1E24] shadow-2xs">
              ⏱ {formatTimer(timerSeconds)}
            </span>
            <span className="bg-[#6F78DB] text-white border-2 border-[#1E1E24] px-3 py-1 rounded-full text-xs font-black shadow-2xs">
              +50 XP
            </span>
          </div>
        </div>

        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#1E1E24]/80 block">
            PUZZLES MATEMÁTICOS
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#1E1E24]">
            CROSS MATH
          </h1>
        </div>

        {/* Difficulty Selector (Fácil, Medio, Difícil) */}
        <div className="w-full flex items-center bg-white/90 p-1 rounded-full border-2 border-[#1E1E24] shadow-xs mt-3">
          {(['facil', 'medio', 'dificil'] as CrossMathDifficulty[]).map((diff) => (
            <motion.button
              key={diff}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                playSound('click');
                setSelectedDifficulty(diff);
              }}
              className={`flex-1 py-1.5 rounded-full text-center text-xs font-black transition-all cursor-pointer capitalize ${
                selectedDifficulty === diff
                  ? diff === 'facil'
                    ? 'bg-[#22C55E] text-white border-2 border-[#1E1E24] shadow-2xs'
                    : diff === 'medio'
                    ? 'bg-[#F97316] text-white border-2 border-[#1E1E24] shadow-2xs'
                    : 'bg-[#EF4444] text-white border-2 border-[#1E1E24] shadow-2xs'
                  : 'text-[#8A909F] hover:text-[#1E1E24] border-2 border-transparent'
              }`}
            >
              {diff}
            </motion.button>
          ))}
        </div>

        {/* Level Selector 1 to 5 */}
        <div className="flex items-center justify-between gap-1.5 mt-2.5 px-2">
          {[1, 2, 3, 4, 5].map((lvl) => {
            const isCompleted = completedLevels.includes(`${selectedDifficulty}-${lvl}`);
            const isSelected = selectedLevelNum === lvl;

            return (
              <motion.button
                key={lvl}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound('click');
                  setSelectedLevelNum(lvl);
                }}
                className={`flex-1 py-1.5 rounded-xl border-2 font-black text-xs transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#1E1E24] text-[#1E1E24] ring-2 ring-[#6F78DB] ring-offset-1'
                    : isCompleted
                    ? 'bg-[#22C55E] border-[#1E1E24] text-white'
                    : 'bg-white/70 border-[#1E1E24]/30 text-[#8A909F]'
                }`}
              >
                <span>Nivel {lvl}</span>
                {isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main White Content Card with CrossMath Grid */}
      <div className="relative z-20 w-full bg-white rounded-t-[36px] border-t-2 border-x-2 border-[#1E1E24] shadow-2xl p-5 pt-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Instruction Banner */}
        <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-2xl p-2.5 text-center shadow-2xs">
          <p className="text-xs font-bold text-[#4A4E69]">
            {currentLevel.instruction}
          </p>
        </div>

        {/* CrossMath Board Render */}
        <div className="w-full flex items-center justify-center my-1">
          {currentLevel.size === 2 ? (
            /* 2x2 Grid Layout */
            <div className="bg-[#F4F7FC] border-2 border-[#1E1E24] rounded-3xl p-4 shadow-sm w-full max-w-[340px]">
              {/* Row 0 */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <CellBox
                  id="r0c0"
                  value={userFills.r0c0}
                  isActive={activeCellId === 'r0c0'}
                  onClick={() => handleCellClick('r0c0')}
                />
                <OpBox op={currentLevel.rowOps[0][0]} />
                <CellBox
                  id="r0c1"
                  value={userFills.r0c1}
                  isActive={activeCellId === 'r0c1'}
                  onClick={() => handleCellClick('r0c1')}
                />
                <EqualsBox />
                <ResultBox value={currentLevel.rowResults[0]} />
              </div>

              {/* Col Operators between Row 0 and Row 1 */}
              <div className="flex items-center justify-between gap-1 px-3 my-1 text-center font-black text-sm text-[#8A909F]">
                <div className="w-12 text-center">{currentLevel.colOps[0][0]}</div>
                <div className="w-6" />
                <div className="w-12 text-center">{currentLevel.colOps[1][0]}</div>
                <div className="w-6" />
                <div className="w-12" />
              </div>

              {/* Row 1 */}
              <div className="flex items-center justify-between gap-1 mt-1 mb-2">
                <CellBox
                  id="r1c0"
                  value={userFills.r1c0}
                  isActive={activeCellId === 'r1c0'}
                  onClick={() => handleCellClick('r1c0')}
                />
                <OpBox op={currentLevel.rowOps[1][0]} />
                <CellBox
                  id="r1c1"
                  value={userFills.r1c1}
                  isActive={activeCellId === 'r1c1'}
                  onClick={() => handleCellClick('r1c1')}
                />
                <EqualsBox />
                <ResultBox value={currentLevel.rowResults[1]} />
              </div>

              {/* Equals line */}
              <div className="flex items-center justify-between gap-1 px-3 my-1 text-center font-black text-sm text-[#8A909F]">
                <div className="w-12 text-center">=</div>
                <div className="w-6" />
                <div className="w-12 text-center">=</div>
                <div className="w-6" />
                <div className="w-12" />
              </div>

              {/* Col Results Row */}
              <div className="flex items-center justify-between gap-1 px-1">
                <ResultBox value={currentLevel.colResults[0]} />
                <div className="w-6" />
                <ResultBox value={currentLevel.colResults[1]} />
                <div className="w-6" />
                <div className="w-12" />
              </div>
            </div>
          ) : (
            /* 3x3 Grid Layout */
            <div className="bg-[#F4F7FC] border-2 border-[#1E1E24] rounded-3xl p-3 shadow-sm w-full max-w-[360px] overflow-x-auto">
              {/* Row 0 */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <CellBox
                  id="r0c0"
                  value={currentLevel.fixedCells?.r0c0 ?? userFills.r0c0}
                  isFixed={currentLevel.fixedCells?.r0c0 !== undefined}
                  isActive={activeCellId === 'r0c0'}
                  onClick={() => handleCellClick('r0c0')}
                />
                <OpBox op={currentLevel.rowOps[0][0]} />
                <CellBox
                  id="r0c1"
                  value={currentLevel.fixedCells?.r0c1 ?? userFills.r0c1}
                  isFixed={currentLevel.fixedCells?.r0c1 !== undefined}
                  isActive={activeCellId === 'r0c1'}
                  onClick={() => handleCellClick('r0c1')}
                />
                <OpBox op={currentLevel.rowOps[0][1]} />
                <CellBox
                  id="r0c2"
                  value={currentLevel.fixedCells?.r0c2 ?? userFills.r0c2}
                  isFixed={currentLevel.fixedCells?.r0c2 !== undefined}
                  isActive={activeCellId === 'r0c2'}
                  onClick={() => handleCellClick('r0c2')}
                />
                <EqualsBox />
                <ResultBox value={currentLevel.rowResults[0]} />
              </div>

              {/* Col Ops 0 */}
              <div className="flex items-center justify-between gap-1 px-2 my-0.5 text-center font-black text-xs text-[#8A909F]">
                <div className="w-10 text-center">{currentLevel.colOps[0][0]}</div>
                <div className="w-4" />
                <div className="w-10 text-center">{currentLevel.colOps[0][1]}</div>
                <div className="w-4" />
                <div className="w-10 text-center">{currentLevel.colOps[0][2]}</div>
                <div className="w-4" />
                <div className="w-10" />
              </div>

              {/* Row 1 */}
              <div className="flex items-center justify-between gap-1 my-1">
                <CellBox
                  id="r1c0"
                  value={currentLevel.fixedCells?.r1c0 ?? userFills.r1c0}
                  isFixed={currentLevel.fixedCells?.r1c0 !== undefined}
                  isActive={activeCellId === 'r1c0'}
                  onClick={() => handleCellClick('r1c0')}
                />
                <OpBox op={currentLevel.rowOps[1][0]} />
                <CellBox
                  id="r1c1"
                  value={currentLevel.fixedCells?.r1c1 ?? userFills.r1c1}
                  isFixed={currentLevel.fixedCells?.r1c1 !== undefined}
                  isActive={activeCellId === 'r1c1'}
                  onClick={() => handleCellClick('r1c1')}
                />
                <OpBox op={currentLevel.rowOps[1][1]} />
                <CellBox
                  id="r1c2"
                  value={currentLevel.fixedCells?.r1c2 ?? userFills.r1c2}
                  isFixed={currentLevel.fixedCells?.r1c2 !== undefined}
                  isActive={activeCellId === 'r1c2'}
                  onClick={() => handleCellClick('r1c2')}
                />
                <EqualsBox />
                <ResultBox value={currentLevel.rowResults[1]} />
              </div>

              {/* Col Ops 1 */}
              <div className="flex items-center justify-between gap-1 px-2 my-0.5 text-center font-black text-xs text-[#8A909F]">
                <div className="w-10 text-center">{currentLevel.colOps[1][0]}</div>
                <div className="w-4" />
                <div className="w-10 text-center">{currentLevel.colOps[1][1]}</div>
                <div className="w-4" />
                <div className="w-10 text-center">{currentLevel.colOps[1][2]}</div>
                <div className="w-4" />
                <div className="w-10" />
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between gap-1 my-1">
                <CellBox
                  id="r2c0"
                  value={currentLevel.fixedCells?.r2c0 ?? userFills.r2c0}
                  isFixed={currentLevel.fixedCells?.r2c0 !== undefined}
                  isActive={activeCellId === 'r2c0'}
                  onClick={() => handleCellClick('r2c0')}
                />
                <OpBox op={currentLevel.rowOps[2][0]} />
                <CellBox
                  id="r2c1"
                  value={currentLevel.fixedCells?.r2c1 ?? userFills.r2c1}
                  isFixed={currentLevel.fixedCells?.r2c1 !== undefined}
                  isActive={activeCellId === 'r2c1'}
                  onClick={() => handleCellClick('r2c1')}
                />
                <OpBox op={currentLevel.rowOps[2][1]} />
                <CellBox
                  id="r2c2"
                  value={currentLevel.fixedCells?.r2c2 ?? userFills.r2c2}
                  isFixed={currentLevel.fixedCells?.r2c2 !== undefined}
                  isActive={activeCellId === 'r2c2'}
                  onClick={() => handleCellClick('r2c2')}
                />
                <EqualsBox />
                <ResultBox value={currentLevel.rowResults[2]} />
              </div>

              {/* Equals line */}
              <div className="flex items-center justify-between gap-1 px-2 my-0.5 text-center font-black text-xs text-[#8A909F]">
                <div className="w-10 text-center">=</div>
                <div className="w-4" />
                <div className="w-10 text-center">=</div>
                <div className="w-4" />
                <div className="w-10 text-center">=</div>
                <div className="w-4" />
                <div className="w-10" />
              </div>

              {/* Col Results Row */}
              <div className="flex items-center justify-between gap-1 px-1">
                <ResultBox value={currentLevel.colResults[0]} />
                <div className="w-4" />
                <ResultBox value={currentLevel.colResults[1]} />
                <div className="w-4" />
                <ResultBox value={currentLevel.colResults[2]} />
                <div className="w-4" />
                <div className="w-10" />
              </div>
            </div>
          )}
        </div>

        {/* Feedback message if wrong */}
        <AnimatePresence>
          {isWrong && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#EF4444] text-white border-2 border-[#1E1E24] rounded-2xl p-2.5 text-center text-xs font-black shadow-md"
            >
              ⚠️ ¡Casi! Revisa las operaciones horizontales y verticales.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Victory Modal */}
        <AnimatePresence>
          {isVictory && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#22C55E] text-white border-2 border-[#1E1E24] rounded-3xl p-4 shadow-lg text-center space-y-2"
            >
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-6 h-6 text-[#FDE047]" />
                <h3 className="font-black text-base uppercase">
                  ¡Desafío {selectedLevelNum} Completado!
                </h3>
              </div>
              <p className="text-xs font-bold text-white/90">
                ¡Has verificado todas las ecuaciones correctamente!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextLevel}
                className="bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] border-2 border-[#1E1E24] font-black text-xs uppercase px-5 py-2.5 rounded-full shadow-md cursor-pointer inline-flex items-center gap-1.5 mt-1"
              >
                <span>Siguiente Nivel</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Number Bank & Action Bar */}
        <div className="space-y-3 pt-1 border-t border-[#1E1E24]/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#1E1E24]">
              Banco de Números:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndo}
                className="text-[10px] font-black uppercase text-[#1E1E24] bg-white border border-[#1E1E24] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs hover:bg-[#F4F7FC] cursor-pointer"
              >
                <Undo2 className="w-3 h-3" /> Deshacer
              </button>
              <button
                onClick={handleClear}
                className="text-[10px] font-black uppercase text-[#EF4444] bg-white border border-[#1E1E24] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs hover:bg-[#FEE2E2] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reiniciar
              </button>
            </div>
          </div>

          {/* Tokens Row */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {availableTokens.map((token) => (
              <motion.button
                key={token.key}
                whileTap={!token.isUsed ? { scale: 0.92 } : undefined}
                disabled={token.isUsed}
                onClick={() => handleSelectToken(token.num)}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl font-black text-base flex items-center justify-center transition-all border-2 border-[#1E1E24] ${
                  token.isUsed
                    ? 'bg-[#E2E8F0] text-[#94A3B8] border-[#94A3B8]/30 cursor-not-allowed opacity-50'
                    : 'bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] shadow-xs hover:shadow-md cursor-pointer'
                }`}
              >
                {token.num}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components for CrossMath Grid
const CellBox: React.FC<{
  id: string;
  value: number | null | undefined;
  isFixed?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}> = ({ value, isFixed, isActive, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl font-black text-base flex items-center justify-center border-2 border-[#1E1E24] transition-all cursor-pointer ${
        isFixed
          ? 'bg-[#6F78DB] text-white shadow-2xs'
          : isActive
          ? 'bg-[#FDE047] text-[#1E1E24] ring-2 ring-[#1E1E24] ring-offset-1 shadow-md'
          : value !== null && value !== undefined
          ? 'bg-white text-[#1E1E24] shadow-2xs'
          : 'bg-white/80 border-dashed border-[#1E1E24]/40 text-transparent'
      }`}
    >
      {value !== null && value !== undefined ? value : ''}
    </motion.button>
  );
};

const OpBox: React.FC<{ op: string }> = ({ op }) => (
  <div className="w-6 sm:w-7 h-10 flex items-center justify-center font-black text-sm text-[#1E1E24]">
    {op === '*' ? '×' : op === '/' ? '÷' : op}
  </div>
);

const EqualsBox: React.FC = () => (
  <div className="w-5 sm:w-6 h-10 flex items-center justify-center font-black text-sm text-[#8A909F]">
    =
  </div>
);

const ResultBox: React.FC<{ value: number }> = ({ value }) => (
  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#1E1E24] text-white font-black text-sm flex items-center justify-center border-2 border-[#1E1E24] shadow-2xs">
    {value}
  </div>
);
