import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, RefreshCw, BookOpen } from 'lucide-react';
import { playSound } from '../utils/sound';
import { Mascot } from './widgets/Mascot';

interface IllegalMoveModalProps {
  isOpen: boolean;
  illegalReason: string | null;
  onClose: () => void;
  onOpenArsenal: () => void;
}

export const IllegalMoveModal: React.FC<IllegalMoveModalProps> = ({
  isOpen,
  illegalReason,
  onClose,
  onOpenArsenal,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md font-jakarta">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          className="relative w-full max-w-lg bg-white border-2 border-[#1E1E24] rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden text-[#1E1E24]"
        >
          {/* Header Badge */}
          <div className="flex items-center gap-3 mb-4 bg-[#FEE2E2] border-2 border-[#EF4444] rounded-2xl p-3.5 shadow-2xs">
            <Mascot mood="thinking" size={56} className="shrink-0" />
            <div>
              <div className="flex items-center gap-1.5 text-[#DC2626] font-extrabold text-xs uppercase mb-0.5">
                <ShieldAlert className="w-4 h-4 text-[#DC2626]" />
                <span>Movimiento no permitido</span>
              </div>
              <h2 className="text-xl font-black uppercase text-[#1E1E24]">
                ¡Movimiento Ilegal!
              </h2>
            </div>
          </div>

          {/* Explanation Box */}
          <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 mb-6 shadow-2xs">
            <p className="text-xs sm:text-sm font-bold text-[#4A4E69] leading-relaxed">
              {illegalReason ||
                'Esa regla no existe en tu arsenal de bloques de números reales. En matemáticas no se pueden inventar atajos sin justificación.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-[#F7CA38] hover:bg-[#eab308] text-[#1E1E24] border-2 border-[#1E1E24] font-black uppercase text-xs rounded-full cursor-pointer shadow-xs transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4 text-[#1E1E24]" />
              <span>Reintentar Paso</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                onClose();
                onOpenArsenal();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-gray-100 text-[#1E1E24] border-2 border-[#1E1E24] font-black uppercase text-xs rounded-full cursor-pointer shadow-xs transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-[#6F78DB]" />
              <span>Ver Arsenal</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

