import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { EncyclopediaCard } from '../data/encyclopediaCards';
import { playSound } from '../utils/sound';

interface TopicCardProps {
  card: EncyclopediaCard;
  onClick: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ card, onClick }) => {
  return (
    <motion.button
      whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px #1E1E24' }}
      whileTap={{ y: 2, x: 2, boxShadow: 'none' }}
      onClick={() => { playSound('click'); onClick(); }}
      className="bg-white border-2 border-[#1E1E24] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1E1E24] flex flex-col h-full text-left transition-all"
    >
      <div className="flex items-start justify-between mb-3 w-full">
        <span 
          className="text-[10px] font-black uppercase px-2 py-1 rounded-md border-2 border-[#1E1E24]"
          style={{ backgroundColor: card.color + '33', color: '#1E1E24' }}
        >
          {card.categoria}
        </span>
        <BookOpen size={20} className="text-[#8A909F] shrink-0" />
      </div>
      
      <h3 className="font-black text-lg text-[#1E1E24] leading-tight mb-2 line-clamp-2">
        {card.titulo}
      </h3>
      
      <p className="text-sm font-bold text-[#4A4E69] mb-4 flex-1 line-clamp-3">
        {card.resumen}
      </p>
      
      <div className="w-full flex items-center justify-between text-[#1E1E24] font-black text-sm pt-4 border-t-2 border-dashed border-[#E2E8F0] mt-auto">
        <span>Ver detalle</span>
        <div className="w-8 h-8 rounded-full border-2 border-[#1E1E24] bg-[#BAFF29] flex items-center justify-center shrink-0">
          <ArrowRight size={16} />
        </div>
      </div>
    </motion.button>
  );
};
