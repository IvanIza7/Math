import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Sparkles, BookMarked, Search } from 'lucide-react';
import { REAL_NUMBER_PROPERTIES } from '../data/arsenal';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';
import { APP_TEXTS } from '../config/appText';

interface ArsenalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArsenalModal: React.FC<ArsenalModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const categories = ['Todos', 'Suma', 'Multiplicación', 'Leyes de Signos', 'Inversos'];

  const filteredProperties = REAL_NUMBER_PROPERTIES.filter((prop) => {
    const matchesCategory = activeCategory === 'Todos' || prop.category === activeCategory;
    const matchesSearch =
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.shortCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/40 backdrop-blur-xs font-jakarta">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl border-2 border-[#1E1E24] shadow-2xl flex flex-col overflow-hidden text-[#1E1E24]"
        >
          {/* Header Bar */}
          <div className="bg-[#6F78DB] border-b-2 border-[#1E1E24] text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white border-2 border-[#1E1E24] rounded-2xl shadow-2xs">
                <ShieldCheck className="w-6 h-6 text-[#F7CA38] stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">
                  {APP_TEXTS.arsenalModal.title}
                </h2>
                <p className="text-xs font-bold text-white/90">
                  {APP_TEXTS.arsenalModal.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="p-2 bg-white border-2 border-[#1E1E24] hover:bg-[#F4F7FC] text-[#1E1E24] rounded-full cursor-pointer transition-colors shadow-xs"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="p-3.5 border-b-2 border-[#1E1E24]/20 bg-[#F8FAFC] flex flex-col sm:flex-row gap-2.5 items-center justify-between">
            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playSound('click');
                    setActiveCategory(cat);
                  }}
                  className={`px-3 py-1 text-xs font-extrabold rounded-full cursor-pointer border-2 transition-all shadow-2xs ${
                    activeCategory === cat
                      ? 'bg-[#F7CA38] text-[#1E1E24] border-[#1E1E24]'
                      : 'bg-white text-[#4A4E69] hover:bg-[#E8EEF8] border-[#1E1E24]/20 hover:border-[#1E1E24]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8A909F]" />
              <input
                type="text"
                placeholder="Buscar propiedad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs font-bold bg-white border-2 border-[#1E1E24] rounded-full focus:outline-none focus:ring-2 focus:ring-[#6F78DB] text-[#1E1E24] placeholder-[#8A909F] shadow-2xs"
              />
            </div>
          </div>

          {/* Property Cards Grid */}
          <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white no-scrollbar">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full bg-[#6F78DB] text-white border border-[#1E1E24] shadow-2xs">
                      {prop.category}
                    </span>
                    <span className="text-[10px] font-bold text-[#8A909F]">
                      {prop.shortCode}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-[#1E1E24] mb-1 flex items-center gap-1.5">
                    <BookMarked className="w-4 h-4 text-[#6F78DB]" />
                    {prop.name}
                  </h3>

                  {/* Formula Box */}
                  <div className="my-2.5 p-2.5 bg-white rounded-xl text-center font-bold text-base text-[#1E1E24] border-2 border-[#1E1E24] shadow-2xs">
                    <MathView latex={prop.latexFormula} />
                  </div>

                  <p className="text-xs font-medium text-[#4A4E69] leading-relaxed mb-2.5">
                    {prop.description}
                  </p>
                </div>

                <div className="space-y-2">
                  {/* Visual Example */}
                  <div className="p-2.5 bg-white rounded-xl border border-[#1E1E24]/20 shadow-2xs">
                    <span className="text-[10px] font-black uppercase text-[#6F78DB] block mb-0.5">
                      Ejemplo:
                    </span>
                    <div className="text-xs font-bold text-[#1E1E24]">
                      <MathView latex={prop.visualExample} inline />
                    </div>
                  </div>

                  {/* Common Trap Warning */}
                  <div className="p-2.5 bg-[#FEF2F2] rounded-xl border-2 border-[#FECACA] shadow-2xs">
                    <span className="text-[10px] font-black uppercase text-[#DC2626] block mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#DC2626]" /> Trampa Común:
                    </span>
                    <p className="text-[11px] font-bold text-[#991B1B] leading-tight">{prop.commonTrap}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="bg-[#F8FAFC] border-t-2 border-[#1E1E24] p-3 text-center">
            <p className="text-xs font-bold text-[#8A909F]">
              💡 Cada transformación debe estar legalmente justificada con una de estas propiedades.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
