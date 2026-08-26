import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Zap, Target, TrendingUp, AlertTriangle, RotateCcw } from 'lucide-react';
import { PracticeSession } from '../types';
import { playSound } from '../utils/sound';

interface PracticeResultsProps {
  sessionData: any;
  onBack: () => void;
}

export const PracticeResults: React.FC<PracticeResultsProps> = ({ sessionData, onBack }) => {
  const [history, setHistory] = useState<PracticeSession[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    saveAndFetchHistory();
    playSound('correct');
  }, []);

  const saveAndFetchHistory = async () => {
    if (isSaved) return;

    try {
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        // Save
        const { error: insertError } = await supabase.from('practice_sessions').insert({
          user_id: user.user.id,
          preset_id: sessionData.presetId,
          total_time: sessionData.totalTime,
          fastest_answer: sessionData.fastestAnswer,
          slowest_answer: sessionData.slowestAnswer,
          accuracy: sessionData.accuracy,
          num_questions: sessionData.numQuestions
        });

        if (insertError) throw insertError;

        // Fetch history for chart
        const { data: histData, error: fetchError } = await supabase
          .from('practice_sessions')
          .select('*')
          .eq('preset_id', sessionData.presetId)
          .order('created_at', { ascending: true })
          .limit(10);

        if (!fetchError && histData) {
          setHistory(histData.map(d => ({
            id: d.id,
            totalTime: d.total_time,
            fastestAnswer: d.fastest_answer,
            slowestAnswer: d.slowest_answer,
            accuracy: Number(d.accuracy),
            numQuestions: d.num_questions,
            dateStr: new Date(d.created_at).toLocaleDateString()
          })));
        }
      }
    } catch (e) {
      console.warn('Could not save/fetch to Supabase, local fallback only', e);
      // Local fallback logic could go here
    } finally {
      setIsSaved(true);
    }
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Simple SVG Line Chart Builder
  const renderChart = () => {
    if (history.length < 2) {
      return (
        <div className="h-32 flex items-center justify-center border-2 border-dashed border-[#1E1E24]/30 rounded-2xl text-xs font-bold text-[#8A909F] text-center p-4">
          Juega más sesiones con este preset para ver tu gráfica de evolución.
        </div>
      );
    }

    const maxAcc = 100;
    const minAcc = Math.min(...history.map(h => h.accuracy)) - 10;
    const range = Math.max(maxAcc - minAcc, 10);
    
    const width = 300;
    const height = 100;
    const paddingX = 20;
    const paddingY = 20;

    const getX = (index: number) => paddingX + (index * ((width - 2*paddingX) / (history.length - 1)));
    const getY = (val: number) => height - paddingY - (((val - minAcc) / range) * (height - 2*paddingY));

    const points = history.map((h, i) => `${getX(i)},${getY(h.accuracy)}`).join(' ');

    return (
      <div className="relative w-full overflow-hidden bg-[#f8faf9] border-2 border-[#1E1E24] rounded-2xl p-4">
        <h4 className="text-[10px] font-black uppercase text-[#8A909F] mb-2 tracking-wider">Evolución de Precisión</h4>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Grid lines */}
          <line x1={paddingX} y1={getY(100)} x2={width-paddingX} y2={getY(100)} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
          <text x={0} y={getY(100)+4} fontSize="8" fill="#8A909F" fontWeight="bold">100%</text>

          {/* Line */}
          <polyline points={points} fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Points */}
          {history.map((h, i) => (
            <circle key={i} cx={getX(i)} cy={getY(h.accuracy)} r="4" fill="#22C55E" stroke="#1E1E24" strokeWidth="2" />
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7CA38] text-[#1E1E24] font-poppins pb-20 relative overflow-hidden">
      
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <button 
          onClick={() => { playSound('click'); onBack(); }}
          className="w-10 h-10 border-2 border-[#1E1E24] rounded-xl flex items-center justify-center bg-white hover:bg-[#F2F3F7] shadow-[2px_2px_0px_0px_#1E1E24] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-black uppercase tracking-tight">Resultados</h1>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-4">
        
        {/* Main Stats Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white border-4 border-[#1E1E24] rounded-3xl p-6 shadow-[8px_8px_0px_0px_#1E1E24]"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black tracking-tighter mb-1">COMPLETADO</h2>
            <p className="text-sm font-bold text-[#4A4E69]">Práctica de {sessionData.numQuestions} ejercicios</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="bg-[#FFF9E6] border-2 border-[#1E1E24] rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <Clock className="text-[#F59E0B] mb-1" size={24} />
              <span className="text-[10px] font-black uppercase text-[#8A909F]">Tiempo Total</span>
              <span className="text-2xl font-black">{formatTime(sessionData.totalTime)}</span>
            </div>

            <div className="bg-[#F0FDF4] border-2 border-[#1E1E24] rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <Target className="text-green-500 mb-1" size={24} />
              <span className="text-[10px] font-black uppercase text-[#8A909F]">Precisión</span>
              <span className="text-2xl font-black">{sessionData.accuracy}%</span>
            </div>

            <div className="bg-[#EFF6FF] border-2 border-[#1E1E24] rounded-2xl p-3 flex flex-col items-center justify-center text-center">
              <Zap className="text-blue-500 mb-1" size={20} />
              <span className="text-[9px] font-black uppercase text-[#8A909F]">Más Rápida</span>
              <span className="text-lg font-black text-blue-600">{formatTime(sessionData.fastestAnswer)}</span>
            </div>

            <div className="bg-red-50 border-2 border-[#1E1E24] rounded-2xl p-3 flex flex-col items-center justify-center text-center">
              <AlertTriangle className="text-red-500 mb-1" size={20} />
              <span className="text-[9px] font-black uppercase text-[#8A909F]">Más Lenta</span>
              <span className="text-lg font-black text-red-600">{formatTime(sessionData.slowestAnswer)}</span>
            </div>

          </div>
        </motion.div>

        {/* Chart */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-2 border-[#1E1E24] rounded-3xl p-4 shadow-xs"
        >
          {renderChart()}
        </motion.div>

        {/* Review Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-[#1E1E24] text-white border-2 border-[#1E1E24] rounded-2xl py-4 flex items-center justify-center gap-2 font-black text-sm uppercase shadow-[4px_4px_0px_0px_#BAFF29] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
        >
          <RotateCcw size={18} /> Volver a Jugar Preset
        </motion.button>

      </div>
    </div>
  );
};
