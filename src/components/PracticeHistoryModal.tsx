import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Target, TrendingUp, ChevronDown, ChevronRight, Zap } from 'lucide-react';
import { supabase } from '../config/supabase';
import { PracticeSession, PracticePreset } from '../types';
import { playSound } from '../utils/sound';

interface PracticeHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: PracticePreset | null;
}

// Grouping types
interface DayGroup {
  day: number;
  dateStr: string;
  sessions: PracticeSession[];
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

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const PracticeHistoryModal: React.FC<PracticeHistoryModalProps> = ({ isOpen, onClose, preset }) => {
  const [history, setHistory] = useState<PracticeSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen && preset) {
      fetchHistory();
    }
  }, [isOpen, preset]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('practice_sessions')
        .select('*')
        .eq('preset_id', preset!.id)
        .order('created_at', { ascending: false });

      if (data && !error) {
        setHistory(data.map(d => ({
          id: d.id,
          totalTime: d.total_time,
          fastestAnswer: d.fastest_answer,
          slowestAnswer: d.slowest_answer,
          accuracy: Number(d.accuracy),
          numQuestions: d.num_questions,
          dateStr: new Date(d.created_at).toLocaleDateString(),
          createdAt: d.created_at
        })));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeekOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return Math.ceil((date.getDate() + firstDay.getDay()) / 7);
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const formatTimestamp = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Build the tree
  const buildTree = () => {
    const tree: Record<number, YearGroup> = {};

    history.forEach(session => {
      if (!session.createdAt) return;
      const d = new Date(session.createdAt);
      const year = d.getFullYear();
      const month = d.getMonth();
      const week = getWeekOfMonth(d);
      const day = d.getDate();

      if (!tree[year]) tree[year] = { year, months: {} };
      if (!tree[year].months[month]) tree[year].months[month] = { month, monthName: MONTH_NAMES[month], weeks: {} };
      if (!tree[year].months[month].weeks[week]) tree[year].months[month].weeks[week] = { weekNum: week, days: {} };
      if (!tree[year].months[month].weeks[week].days[day]) {
        tree[year].months[month].weeks[week].days[day] = {
          day,
          dateStr: d.toLocaleDateString(),
          sessions: []
        };
      }

      tree[year].months[month].weeks[week].days[day].sessions.push(session);
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

  if (!isOpen || !preset) return null;

  const tree = buildTree();
  const sortedYears = Object.keys(tree).map(Number).sort((a, b) => b - a);

  const renderSession = (session: PracticeSession) => (
    <div key={session.id} className="bg-white border-2 border-[#1E1E24] rounded-xl p-3 shadow-xs ml-4 mb-2 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-black bg-[#F7CA38] px-2 py-1 rounded-md border-2 border-[#1E1E24]">
          <Clock size={12} />
          {formatTimestamp(session.createdAt!)}
        </div>
        <div className="text-xs font-black px-2 py-1 rounded-md border-2 border-[#1E1E24] bg-white">
          {session.numQuestions} Qs
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#BAFF29] border-2 border-[#1E1E24] flex items-center justify-center">
            <Target size={12} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-black text-[#8A909F]">Precisión</span>
            <span className="text-sm font-black">{session.accuracy}%</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#38bdf8] border-2 border-[#1E1E24] flex items-center justify-center">
            <Clock size={12} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-black text-[#8A909F]">Tiempo Total</span>
            <span className="text-sm font-black">{formatTime(session.totalTime)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FEF2F2] border-2 border-[#EF4444] flex items-center justify-center text-[#EF4444]">
            <TrendingUp size={12} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-black text-[#8A909F]">Lento</span>
            <span className="text-sm font-black">{session.slowestAnswer}s</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#F0FDF4] border-2 border-[#22C55E] flex items-center justify-center text-[#22C55E]">
            <Zap size={12} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-black text-[#8A909F]">Rápido</span>
            <span className="text-sm font-black">{session.fastestAnswer}s</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-md bg-[#F4F7FC] rounded-[2rem] border-4 border-[#1E1E24] shadow-[8px_8px_0px_0px_#1E1E24] overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="bg-[#F7CA38] p-5 border-b-4 border-[#1E1E24] flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#1E1E24_2px,_transparent_2px)]" style={{ backgroundSize: '16px 16px' }} />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl border-2 border-[#1E1E24] flex items-center justify-center shadow-xs">
              <Calendar className="text-[#1E1E24]" size={20} />
            </div>
            <div>
              <h2 className="font-black text-xl text-[#1E1E24] uppercase tracking-tight leading-none">
                Historial
              </h2>
              <p className="text-xs font-bold text-[#1E1E24]/70 mt-1 uppercase truncate max-w-[200px]">
                {preset.name}
              </p>
            </div>
          </div>
          <button 
            onClick={() => { playSound('click'); onClose(); }}
            className="relative z-10 w-10 h-10 bg-white rounded-full border-2 border-[#1E1E24] flex items-center justify-center hover:bg-gray-100 active:translate-y-0.5 active:translate-x-0.5 shadow-xs transition-all shrink-0"
          >
            <X size={20} className="text-[#1E1E24]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 font-poppins text-[#1E1E24]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-3">
              <div className="w-8 h-8 border-4 border-[#F7CA38] border-t-transparent rounded-full animate-spin" />
              <p className="font-bold text-sm text-[#8A909F]">Cargando historial...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-10 px-4">
              <div className="w-16 h-16 mx-auto bg-white rounded-full border-2 border-[#1E1E24] flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_#1E1E24]">
                <Calendar size={24} className="text-[#8A909F]" />
              </div>
              <h3 className="font-black text-lg mb-2">Sin historial</h3>
              <p className="text-sm font-bold text-[#8A909F]">
                Aún no has jugado sesiones con este preset. ¡Inicia una práctica para generar estadísticas!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedYears.map(year => (
                <div key={year} className="mb-2">
                  <button 
                    onClick={() => toggleNode(`y-${year}`)}
                    className="w-full flex items-center justify-between p-3 bg-white border-2 border-[#1E1E24] rounded-xl shadow-xs font-black text-lg active:translate-y-0.5 active:translate-x-0.5 transition-all"
                  >
                    <span>{year}</span>
                    {expandedNodes.has(`y-${year}`) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>

                  <AnimatePresence>
                    {expandedNodes.has(`y-${year}`) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pl-4 space-y-2 border-l-2 border-[#1E1E24]/20 ml-4 mt-2">
                          {Object.keys(tree[year].months).map(Number).sort((a, b) => b - a).map(month => (
                            <div key={`${year}-${month}`}>
                              <button 
                                onClick={() => toggleNode(`m-${year}-${month}`)}
                                className="w-full flex items-center justify-between p-2 hover:bg-black/5 rounded-lg font-bold text-base transition-colors"
                              >
                                <span>{tree[year].months[month].monthName}</span>
                                {expandedNodes.has(`m-${year}-${month}`) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                              </button>

                              <AnimatePresence>
                                {expandedNodes.has(`m-${year}-${month}`) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pt-1 pl-4 space-y-2 border-l-2 border-[#1E1E24]/20 ml-2 mt-1">
                                      {Object.keys(tree[year].months[month].weeks).map(Number).sort((a, b) => b - a).map(week => (
                                        <div key={`${year}-${month}-${week}`}>
                                          <button 
                                            onClick={() => toggleNode(`w-${year}-${month}-${week}`)}
                                            className="w-full flex items-center gap-2 p-1.5 hover:bg-black/5 rounded-lg font-bold text-sm text-[#4A4E69] transition-colors"
                                          >
                                            <div className="w-6 h-6 rounded-md bg-[#BAFF29] border border-[#1E1E24] flex items-center justify-center text-[10px] text-[#1E1E24]">
                                              S{week}
                                            </div>
                                            <span>Semana {week}</span>
                                          </button>

                                          <AnimatePresence>
                                            {expandedNodes.has(`w-${year}-${month}-${week}`) && (
                                              <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                              >
                                                <div className="pt-1 pl-3 space-y-3 mt-2">
                                                  {Object.keys(tree[year].months[month].weeks[week].days).map(Number).sort((a, b) => b - a).map(day => (
                                                    <div key={`${year}-${month}-${week}-${day}`}>
                                                      <div className="flex items-center gap-2 mb-2 font-black text-xs text-[#1E1E24] bg-white border border-[#1E1E24]/30 px-2 py-1 rounded-md inline-flex">
                                                        <Calendar size={12} />
                                                        {tree[year].months[month].weeks[week].days[day].dateStr}
                                                      </div>
                                                      <div className="space-y-2">
                                                        {tree[year].months[month].weeks[week].days[day].sessions.map(renderSession)}
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
          )}
        </div>
      </motion.div>
    </div>
  );
};
