import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getChallengeHistory, ChallengeAttempt } from '../utils/history';
import { playSound } from '../utils/sound';

interface ChallengeHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterChallengeId?: string | null;
}

export const ChallengeHistoryModal: React.FC<ChallengeHistoryModalProps> = ({ isOpen, onClose, filterChallengeId }) => {
  const [history, setHistory] = useState<ChallengeAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // Transform data for chart (oldest to newest)
  const chartData = [...history].reverse().map((h, i) => ({
    name: `Intento ${i + 1}`,
    time: h.timeSeconds,
    score: h.score,
    date: new Date(h.date).toLocaleDateString()
  }));

  const formatTime = (secs: number) => {
    const totalMs = Math.floor(secs * 1000);
    const m = Math.floor(totalMs / 60000).toString().padStart(2, '0');
    const s = Math.floor((totalMs % 60000) / 1000).toString().padStart(2, '0');
    const ms = Math.floor((totalMs % 1000) / 10).toString().padStart(2, '0');
    return `${m}:${s}:${ms}`;
  };

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
          className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-[#1E1E24]"
        >
          {/* Header */}
          <div className="bg-[#1E1E24] p-4 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Historial de Desafíos</h2>
              <p className="text-[#8A909F] font-bold text-sm">Analiza tu velocidad y precisión</p>
            </div>
            <button
              onClick={() => { playSound('click'); onClose(); }}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1 bg-[#F4F7FC]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#8A909F]">
                <div className="w-12 h-12 border-4 border-[#6F78DB] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-bold text-lg">Cargando estadísticas...</p>
                <p className="text-sm">Obteniendo tus datos desde la nube</p>
              </div>
            ) : history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#8A909F]">
                <Clock size={48} className="mb-4 opacity-50" />
                <p className="font-bold text-lg">No hay historial aún.</p>
                <p className="text-sm">¡Completa una práctica para ver tus estadísticas!</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Chart Section */}
                <div className="bg-white p-4 rounded-2xl border-2 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24]">
                  <h3 className="text-sm font-black uppercase text-[#1E1E24] mb-2">Evolución de Tiempo</h3>
                  <div className="h-[180px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#EBF1FF" />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8A909F', fontWeight: 'bold' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#8A909F', fontWeight: 'bold' }} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: '2px solid #1E1E24', fontWeight: 'bold', fontSize: '12px' }}
                          formatter={(value: number) => [formatTime(value), 'Tiempo']}
                        />
                        <Line type="monotone" dataKey="time" stroke="#6F78DB" strokeWidth={4} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl border-2 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#1E1E24] text-white">
                          <th className="p-2 font-black uppercase text-[10px]">Desafío</th>
                          <th className="p-2 font-black uppercase text-[10px]">Fecha</th>
                          <th className="p-2 font-black uppercase text-[10px]">Tiempo</th>
                          <th className="p-2 font-black uppercase text-[10px]">Precisión</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((h, i) => (
                          <tr key={h.id} className="border-b-2 border-[#EBF1FF] hover:bg-[#F4F7FC]">
                            <td className="p-2 font-bold text-xs text-[#1E1E24] truncate max-w-[120px]">{h.title}</td>
                            <td className="p-2 font-bold text-xs text-[#8A909F] flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(h.date).toLocaleDateString()}
                            </td>
                            <td className="p-2 font-black text-xs text-[#F59E0B] whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <Clock size={12} />
                                {formatTime(h.timeSeconds)}
                              </div>
                            </td>
                            <td className="p-2 font-black text-xs text-[#22C55E]">
                              {h.score}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
