import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, ArrowRight, Sparkles, Hash, Layers, Scale, Compass, Shapes, Triangle } from 'lucide-react';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { SubTopic } from '../types';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';
import { APP_TEXTS } from '../config/appText';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (moduleId: string, subtopicId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Handle ESC or Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled externally or passed
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search across all modules and subtopics
  const filteredResults: { moduleTitle: string; moduleId: string; moduleNumber: number; subtopic: SubTopic }[] = [];

  const query = searchTerm.toLowerCase().trim();

  CURRICULUM_MODULES.forEach((mod) => {
    mod.subtopics.forEach((sub) => {
      const matchTitle = sub.title.toLowerCase().includes(query);
      const matchBadge = sub.badge.toLowerCase().includes(query);
      const matchSummary = sub.summary.toLowerCase().includes(query);
      const matchTrick = sub.invisibleTrick.toLowerCase().includes(query);
      const matchConcepts = sub.keyConcepts.some(
        (c) => c.term.toLowerCase().includes(query) || c.definition.toLowerCase().includes(query)
      );

      if (query === '' || matchTitle || matchBadge || matchSummary || matchTrick || matchConcepts) {
        filteredResults.push({
          moduleTitle: mod.title,
          moduleId: mod.id,
          moduleNumber: mod.moduleNumber,
          subtopic: sub,
        });
      }
    });
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fade-in font-jakarta">
      <div className="bg-white border-2 border-[#1E1E24] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 bg-[#F4F7FC] border-b-2 border-[#1E1E24] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#6F78DB] shrink-0 stroke-[2.5]" />
          <input
            type="text"
            autoFocus
            placeholder="Buscar por tema, palabra clave o fórmula (ej. Factorización, m.c.m., Trinomio, Seno)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-[#1E1E24] placeholder-[#8A909F] font-bold text-sm focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 bg-white border border-[#1E1E24]/30 rounded-lg text-[10px] font-mono text-[#8A909F] shadow-2xs">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 border border-[#1E1E24]/30 flex items-center justify-center text-[#1E1E24] transition-all cursor-pointer shadow-2xs"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-white">
          <div className="flex items-center justify-between text-[11px] font-black uppercase text-[#8A909F]">
            <span>Resultados de la Enciclopedia ({filteredResults.length})</span>
            <span className="text-[#6F78DB]">Acceso Instantáneo</span>
          </div>

          {filteredResults.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-bold text-[#4A4E69]">No se encontraron temas coincidentes.</p>
              <p className="text-xs text-[#8A909F]">Prueba buscar "Álgebra", "Fracciones", "Inversos" o "Trigonometría".</p>
            </div>
          ) : (
            filteredResults.map(({ moduleTitle, moduleId, moduleNumber, subtopic }) => (
              <div
                key={subtopic.id}
                onClick={() => {
                  playSound('click');
                  onSelectTopic(moduleId, subtopic.id);
                  onClose();
                }}
                className="p-3.5 bg-[#F8FAFC] hover:bg-[#EEF2FF] border-2 border-[#1E1E24] hover:border-[#6F78DB] rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 group shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#F7CA38] text-[#1E1E24] border border-[#1E1E24] font-black text-[9px] uppercase rounded-full shadow-2xs">
                      VOL-0{moduleNumber}
                    </span>
                    <span className="text-[10px] font-bold text-[#8A909F] uppercase truncate">
                      {moduleTitle}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-[#1E1E24] group-hover:text-[#6F78DB] transition-colors">
                    {subtopic.title}
                  </h4>

                  <p className="text-xs font-medium text-[#4A4E69] line-clamp-1">
                    {subtopic.summary}
                  </p>
                </div>

                <div className="p-2 bg-white border border-[#1E1E24]/20 rounded-xl text-[#1E1E24] group-hover:text-white group-hover:bg-[#6F78DB] group-hover:border-[#6F78DB] transition-all shrink-0 shadow-2xs">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F4F7FC] border-t-2 border-[#1E1E24] text-[10px] font-bold text-[#8A909F] flex items-center justify-between">
          <span>{APP_TEXTS.searchModal.footerShortcut}</span>
          <span className="text-[#1E1E24] font-black">{APP_TEXTS.searchModal.footerBrand}</span>
        </div>
      </div>
    </div>
  );
};
