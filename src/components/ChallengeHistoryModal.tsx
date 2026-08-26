import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Target, Calendar, ChevronDown, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getChallengeHistory, ChallengeAttempt } from '../utils/history';
import { playSound } from '../utils/sound';

interface ChallengeHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterChallengeId?: string | null;
}

interface DayGroup {
  day: number;
  dateStr: string;
  attempts: ChallengeAttempt[];
}

interface WeekGroup {
  weekNum: number;
  days: Record<number, DayGroup>;
}

interface MonthGroup {
  month: number;
  monthName: string;
  weeks: Record<number, WeekGroup>;
}

interface YearGroup {
  year: number;
  months: Record<number, MonthGroup>;
}

interface ChallengeGroup {
  challengeId: string;
  challengeTitle: string;
  years: Record<number, YearGroup>;
  allAttempts: ChallengeAttempt[];
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const ChallengeHistoryModal: React.FC<ChallengeHistoryModalProps> = ({ isOpen, onClose, filterChallengeId }) => {
  const [history, setHistory] = useState<ChallengeAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getChallengeHistory().then(data => {
        if (filterChallengeId) {
          setHistory(data.filter(h => h.challengeId === filterChallengeId));
        } else {
          setHistory(data);
        }
        setIsLoading(false);
      });
    }
  }, [isOpen, filterChallengeId]);

  if (!isOpen) return null;

  const getWeekOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return Math.ceil((date.getDate() + firstDay.getDay()) / 7);
  };

  const formatTime = (secs: number) => {
    const totalMs = Math.floor(secs * 1000);
    const m = Math.floor(totalMs / 60000).toString().padStart(2, '0');
    const s = Math.floor((totalMs % 60000) / 1000).toString().padStart(2, '0');
    const ms = Math.floor((totalMs % 1000) / 10).toString().padStart(2, '0');
    return `${m}:${s}:${ms}`;
  };

  // Build the tree grouped by Challenge -> Year -> Month -> Week -> Day
  const buildTree = () => {
    const tree: Record<string, ChallengeGroup> = {};

    history.forEach(attempt => {
      if (!tree[attempt.challengeId]) {
        tree[attempt.challengeId] = {
          challengeId: attempt.challengeId,
          challengeTitle: attempt.title,
          years: {},
          allAttempts: []
        };
      }
      
      const cg = tree[attempt.challengeId];
      cg.allAttempts.push(attempt);

      const d = new Date(attempt.date);
      const year = d.getFullYear();
      const month = d.getMonth();
      const week = getWeekOfMonth(d);
      const day = d.getDate();

      if (!cg.years[year]) cg.years[year] = { year, months: {} };
      if (!cg.years[year].months[month]) cg.years[year].months[month] = { month, monthName: MONTH_NAMES[month], weeks: {} };
      if (!cg.years[year].months[month].weeks[week]) cg.years[year].months[month].weeks[week] = { weekNum: week, days: {} };
      if (!cg.years[year].months[month].weeks[week].days[day]) {
        cg.years[year].months[month].weeks[week].days[day] = {
          day,
          dateStr: d.toLocaleDateString(),
          attempts: []
        };
      }

      cg.years[year].months[month].weeks[week].days[day].attempts.push(attempt);
    });

    return tree;
  };

  const toggleNode = (nodeId: string) => {
    playSound('click');
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  const renderAttempt = (attempt: ChallengeAttempt) => {
    const isPercentage = attempt.score > attempt.maxScore && attempt.score <= 100;
    
    let displayScore = attempt.score;
    let displayMax = attempt.maxScore || 5;
    
    if (isPercentage) {
      displayMax = 5;
      displayScore = Math.round((attempt.score / 100) * 5);
    }
    
    // Passing criteria: usually 3/5 for challenges.
    const passingScore = Math.ceil(displayMax * 0.6); // 60%
    const isPerfect = displayScore === displayMax;
    const isPassed = displayScore >= passingScore;
    const errors = displayMax - displayScore;

    return (
      <div key={attempt.id} className="bg-white border-2 border-[#1E1E24] rounded-xl p-3 shadow-xs ml-4 mb-2 flex flex-col gap-2 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-2 h-full ${isPerfect ? 'bg-[#22C55E]' : isPassed ? 'bg-[#F7CA38]' : 'bg-[#EF4444]'}`}></div>
        <div className="flex items-center justify-between pl-2">
          <div className="flex items-center gap-1.5 text-xs font-black bg-[#F4F7FC] px-2 py-1 rounded-md border-2 border-[#1E1E24]/30">
            <Clock size={12} />
            {new Date(attempt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className={`text-[10px] font-black px-2 py-1 rounded-md uppercase border-2 border-[#1E1E24] text-white ${
            isPerfect ? 'bg-[#22C55E]' : isPassed ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
          }`}>
            {isPerfect ? 'PERFECTO' : isPassed ? 'APROBADO' : 'FALLIDO'}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-1 pl-2">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full border-2 border-[#1E1E24] flex items-center justify-center ${isPassed ? 'bg-[#22C55E] text-white' : 'bg-red-100 text-red-600'}`}>
              {isPassed ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-black text-[#8A909F]">Aciertos</span>
              <span className="text-sm font-black text-[#1E1E24]">{displayScore} / {displayMax}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full border-2 border-[#1E1E24] flex items-center justify-center ${errors > 0 ? 'bg-red-100 text-[#EF4444]' : 'bg-[#F0FDF4] text-[#22C55E]'}`}>
              <X size={12} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-black text-[#8A909F]">Errores</span>
              <span className="text-sm font-black text-[#1E1E24]">{errors}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 col-span-2 mt-1">
            <div className="w-6 h-6 rounded-full bg-[#38bdf8] border-2 border-[#1E1E24] flex items-center justify-center">
              <Clock size={12} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-black text-[#8A909F]">Tiempo</span>
              <span className="text-sm font-black">{formatTime(attempt.timeSeconds)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tree = buildTree();
  const challenges = Object.values(tree);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={() => { playSound('click'); onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#F4F7FC] rounded-[2rem] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-[#1E1E24]"
        >
          {/* Header */}
          <div className="bg-[#1E1E24] p-5 flex items-center justify-between shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_2px,_transparent_2px)]" style={{ backgroundSize: '16px 16px' }} />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl border-2 border-[#1E1E24] flex items-center justify-center shadow-xs">
                <Target className="text-[#1E1E24]" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight leading-none">Historial</h2>
                <p className="text-[#8A909F] font-bold text-xs mt-1 uppercase">Estadísticas por desafío</p>
              </div>
            </div>
            <button
              onClick={() => { playSound('click'); onClose(); }}
              className="relative z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border-2 border-transparent hover:border-white/20"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1 font-poppins text-[#1E1E24]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#8A909F]">
                <div className="w-12 h-12 border-4 border-[#6F78DB] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-bold text-lg">Cargando estadísticas...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#8A909F]">
                <Clock size={48} className="mb-4 opacity-50" />
                <p className="font-bold text-lg text-[#1E1E24]">No hay historial aún.</p>
                <p className="text-sm">¡Completa un desafío para ver tus estadísticas!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {challenges.map(cg => (
                  <div key={cg.challengeId} className="bg-white rounded-2xl border-4 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] overflow-hidden">
                    <button 
                      onClick={() => toggleNode(`c-${cg.challengeId}`)}
                      className="w-full flex items-center justify-between p-4 bg-[#F7CA38] border-b-4 border-transparent font-black text-lg active:bg-[#eab308] transition-colors"
                      style={{ borderBottomColor: expandedNodes.has(`c-${cg.challengeId}`) ? '#1E1E24' : 'transparent' }}
                    >
                      <div className="flex items-center gap-2 text-left">
                        <span className="uppercase text-[#1E1E24] leading-tight">{cg.challengeTitle}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-[#1E1E24] flex items-center justify-center shrink-0">
                        {expandedNodes.has(`c-${cg.challengeId}`) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedNodes.has(`c-${cg.challengeId}`) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-white space-y-4">
                            {/* Chart for this challenge */}
                            <div className="bg-[#F4F7FC] p-3 rounded-xl border-2 border-[#1E1E24]/20">
                              <h3 className="text-xs font-black uppercase text-[#8A909F] mb-2 pl-1">Evolución de Tiempo</h3>
                              <div className="h-[120px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart 
                                    data={[...cg.allAttempts].reverse().map((h, i) => ({
                                      name: `Int. ${i+1}`,
                                      time: h.timeSeconds,
                                    }))} 
                                    margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#EBF1FF" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8A909F', fontWeight: 'bold' }} />
                                    <YAxis tick={{ fontSize: 10, fill: '#8A909F', fontWeight: 'bold' }} width={30} />
                                    <Tooltip 
                                      contentStyle={{ borderRadius: '8px', border: '2px solid #1E1E24', fontWeight: 'bold', fontSize: '10px' }}
                                      formatter={(value: number) => [formatTime(value), 'Tiempo']}
                                    />
                                    <Line type="monotone" dataKey="time" stroke="#6F78DB" strokeWidth={3} activeDot={{ r: 5 }} />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            {/* Date Tree */}
                            <div className="space-y-3">
                              {Object.keys(cg.years).map(Number).sort((a, b) => b - a).map(year => (
                                <div key={`y-${year}`} className="mb-2">
                                  <button 
                                    onClick={() => toggleNode(`c-${cg.challengeId}-y-${year}`)}
                                    className="w-full flex items-center justify-between p-2.5 bg-[#F4F7FC] border-2 border-[#1E1E24] rounded-xl shadow-xs font-black text-sm active:translate-y-0.5 active:translate-x-0.5 transition-all"
                                  >
                                    <span>{year}</span>
                                    {expandedNodes.has(`c-${cg.challengeId}-y-${year}`) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                  </button>

                                  <AnimatePresence>
                                    {expandedNodes.has(`c-${cg.challengeId}-y-${year}`) && (
                                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                        <div className="pt-2 pl-3 space-y-2 border-l-2 border-[#1E1E24]/20 ml-4 mt-2">
                                          {Object.keys(cg.years[year].months).map(Number).sort((a, b) => b - a).map(month => (
                                            <div key={`m-${month}`}>
                                              <button 
                                                onClick={() => toggleNode(`c-${cg.challengeId}-m-${year}-${month}`)}
                                                className="w-full flex items-center justify-between p-2 hover:bg-black/5 rounded-lg font-bold text-sm transition-colors"
                                              >
                                                <span>{cg.years[year].months[month].monthName}</span>
                                                {expandedNodes.has(`c-${cg.challengeId}-m-${year}-${month}`) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                              </button>

                                              <AnimatePresence>
                                                {expandedNodes.has(`c-${cg.challengeId}-m-${year}-${month}`) && (
                                                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                                    <div className="pt-1 pl-3 space-y-2 border-l-2 border-[#1E1E24]/20 ml-2 mt-1">
                                                      {Object.keys(cg.years[year].months[month].weeks).map(Number).sort((a, b) => b - a).map(week => (
                                                        <div key={`w-${week}`}>
                                                          <button 
                                                            onClick={() => toggleNode(`c-${cg.challengeId}-w-${year}-${month}-${week}`)}
                                                            className="w-full flex items-center gap-2 p-1.5 hover:bg-black/5 rounded-lg font-bold text-xs text-[#4A4E69] transition-colors"
                                                          >
                                                            <div className="w-5 h-5 rounded-md bg-[#BAFF29] border border-[#1E1E24] flex items-center justify-center text-[9px] text-[#1E1E24]">
                                                              S{week}
                                                            </div>
                                                            <span>Semana {week}</span>
                                                          </button>

                                                          <AnimatePresence>
                                                            {expandedNodes.has(`c-${cg.challengeId}-w-${year}-${month}-${week}`) && (
                                                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                                                <div className="pt-1 pl-2 space-y-3 mt-2">
                                                                  {Object.keys(cg.years[year].months[month].weeks[week].days).map(Number).sort((a, b) => b - a).map(day => (
                                                                    <div key={`d-${day}`}>
                                                                      <div className="flex items-center gap-1.5 mb-2 font-black text-[10px] uppercase text-[#1E1E24] bg-[#F4F7FC] border border-[#1E1E24]/30 px-2 py-1 rounded-md inline-flex">
                                                                        <Calendar size={10} />
                                                                        {cg.years[year].months[month].weeks[week].days[day].dateStr}
                                                                      </div>
                                                                      <div className="space-y-2">
                                                                        {cg.years[year].months[month].weeks[week].days[day].attempts.map(renderAttempt)}
                                                                      </div>
                                                                    </div>
                                                                  ))}
                                                                </div>
                                                              </motion.div>
                                                            )}
                                                          </AnimatePresence>
                                                        </div>
                                                      ))}
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
