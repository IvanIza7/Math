import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, CheckCircle2, FileText, Info } from 'lucide-react';
import { AttendanceRecord } from '../types';
import { playSound } from '../utils/sound';

interface ClassDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: AttendanceRecord | null;
}

export const ClassDetailModal: React.FC<ClassDetailModalProps> = ({ isOpen, onClose, record }) => {
  if (!record) return null;

  const statusLabel = {
    completed: 'Clase Impartida',
    cancelled: 'Clase Cancelada',
    absence: 'Ausencia',
    none: 'Sin Sesión'
  };

  const statusColor = {
    completed: 'bg-[#BAFF29]',
    cancelled: 'bg-red-400',
    absence: 'bg-orange-400',
    none: 'bg-gray-200'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => { playSound('click'); onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-[#161822] rounded-3xl border-4 border-[#1E1E24] shadow-[8px_8px_0px_0px_#1E1E24] max-w-sm w-full overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-4 border-b-4 border-[#1E1E24] flex items-center justify-between ${statusColor[record.status || 'none']}`}>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#1E1E24]" />
                <h3 className="font-black text-lg text-[#1E1E24] tracking-tight">{record.dateStr}</h3>
              </div>
              <button 
                onClick={() => { playSound('click'); onClose(); }}
                className="w-8 h-8 rounded-full bg-white/50 hover:bg-white border-2 border-[#1E1E24] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
              >
                <X className="w-4 h-4 text-[#1E1E24]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 text-[#1E1E24] dark:text-white">
              
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs font-black uppercase text-gray-500">Estado de la Sesión</p>
                  <p className="font-bold text-lg">{statusLabel[record.status || 'none']}</p>
                </div>
              </div>

              {record.status === 'completed' && (
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs font-black uppercase text-gray-500">Tema Cubierto</p>
                    <p className="font-bold text-lg">{record.topicCovered || 'Repaso General'}</p>
                  </div>
                </div>
              )}

              {record.notes && (
                <div className="bg-[#F4F7FC] dark:bg-[#202334] border-2 border-[#1E1E24] rounded-xl p-3 flex gap-2">
                  <Info className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-xs font-black uppercase text-gray-500">Observaciones del Profesor</p>
                    <p className="font-bold text-sm mt-1">{record.notes}</p>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
