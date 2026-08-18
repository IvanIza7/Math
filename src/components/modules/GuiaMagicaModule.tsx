import React, { useState } from 'react';
import { BookOpen, Sparkles, Check, ChevronRight, Eye, Play, Maximize2, Trophy, Flame, ArrowRight, Layers, Scale, Hash } from 'lucide-react';
import { CURRICULUM_MODULES } from '../../data/curriculum';
import { CurriculumModule, SubTopic } from '../../types';
import { MathView } from '../../utils/math';
import { playSound } from '../../utils/sound';
import { Mascot } from '../widgets/Mascot';
import { NumberSetsWidget } from '../widgets/NumberSetsWidget';
import { DivisibilityTowersWidget } from '../widgets/DivisibilityTowersWidget';
import { AlgebraBalanceWidget } from '../widgets/AlgebraBalanceWidget';

interface GuiaMagicaModuleProps {
  completedTopics: string[];
  onToggleTopicCompleted: (topicId: string) => void;
  onOpenContextHelp: (title: string, trick?: string, formulas?: { title: string; latex: string; explanation: string }[]) => void;
  onOpenConcept: (subtopic: SubTopic, moduleTitle: string, moduleNumber: number) => void;
  onOpenDemo: (subtopic: SubTopic) => void;
  onOpenInteractiveLab: (tab?: 'sets' | 'towers' | 'algebra') => void;
  onAwardXp: (amount: number) => void;
}

export const GuiaMagicaModule: React.FC<GuiaMagicaModuleProps> = ({
  completedTopics,
  onToggleTopicCompleted,
  onOpenContextHelp,
  onOpenConcept,
  onOpenDemo,
  onOpenInteractiveLab,
  onAwardXp,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(CURRICULUM_MODULES[0].id);
  const [activeSubtopicId, setActiveSubtopicId] = useState<string>(CURRICULUM_MODULES[0].subtopics[0].id);

  const activeModule = CURRICULUM_MODULES.find((m) => m.id === selectedModuleId) || CURRICULUM_MODULES[0];
  const activeSubtopic = activeModule.subtopics.find((s) => s.id === activeSubtopicId) || activeModule.subtopics[0];

  const completedCount = completedTopics.length;
  const totalSubtopics = CURRICULUM_MODULES.reduce((acc, m) => acc + m.subtopics.length, 0);

  const moduleIcons = [Hash, Layers, Scale, BookOpen, Sparkles];

  return (
    <div className="space-y-6">
      {/* 1. MATIKS STARTER QUEST BANNER (Image 2 Style) */}
      <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-3xl p-5 sm:p-6 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase text-[#BAFF29] tracking-widest block mb-1">
              {completedCount}/{totalSubtopics} TEMAS COMPLETADOS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span>MATIKS</span>
              <span className="text-[#BAFF29]">QUEST</span>
            </h2>
            <p className="text-xs font-medium text-gray-400 mt-0.5">
              Completa cada módulo de matemáticas con explicaciones paso a paso y pruebas prácticas de 5 ejercicios
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSound('click');
                onOpenContextHelp(
                  activeSubtopic.title,
                  activeSubtopic.invisibleTrick,
                  activeSubtopic.latexFormulas
                );
              }}
              className="px-4 py-2 bg-[#121214] border border-[#2C2C30] hover:border-[#BAFF29] text-[#BAFF29] font-black text-xs uppercase rounded-full pill-btn cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Truco Contextual</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                onOpenInteractiveLab(
                  activeSubtopic.widgetType === 'divisibility-towers'
                    ? 'towers'
                    : activeSubtopic.widgetType === 'algebra-balance'
                    ? 'algebra'
                    : 'sets'
                );
              }}
              className="px-4 py-2 bg-[#BAFF29] hover:bg-[#a3e61c] text-gray-900 font-black text-xs uppercase rounded-full pill-btn cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Maximize2 className="w-3.5 h-3.5 text-gray-900" />
              <span>Lab Pantalla Completa</span>
            </button>
          </div>
        </div>

        {/* Quest Step Roadmap */}
        <div className="pt-2">
          <div className="w-full bg-[#121214] h-2 rounded-full overflow-hidden mb-3">
            <div
              className="bg-[#BAFF29] h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(5, (completedCount / totalSubtopics) * 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-5 gap-2 text-center">
            {CURRICULUM_MODULES.map((mod, idx) => {
              const isModActive = selectedModuleId === mod.id;
              const IconComp = moduleIcons[idx % moduleIcons.length];

              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    playSound('click');
                    setSelectedModuleId(mod.id);
                    if (mod.subtopics.length > 0) {
                      setActiveSubtopicId(mod.subtopics[0].id);
                    }
                  }}
                  className={`p-2 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isModActive
                      ? 'bg-[#252528] border-[#BAFF29] text-white shadow-xs'
                      : 'bg-[#121214] border-[#2C2C30] text-gray-400 hover:text-white'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                      isModActive ? 'bg-[#BAFF29] text-gray-900' : 'bg-[#1C1C1E] text-gray-400'
                    }`}
                  >
                    M{mod.moduleNumber}
                  </div>
                  <span className="text-[9px] font-black uppercase truncate max-w-full hidden xs:inline">
                    {mod.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. CATEGORIES / MODULE SELECTION CARDS ROW (Image 2 DUELS Row Style) */}
      <div className="space-y-3">
        <span className="text-xs font-black uppercase text-gray-400 tracking-wider block px-1">
          MÓDULOS DE APRENDIZAJE & CATEGORÍAS
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CURRICULUM_MODULES.map((m, idx) => {
            const isSelected = selectedModuleId === m.id;
            const IconComp = moduleIcons[idx % moduleIcons.length];

            return (
              <button
                key={m.id}
                onClick={() => {
                  playSound('click');
                  setSelectedModuleId(m.id);
                  if (m.subtopics.length > 0) {
                    setActiveSubtopicId(m.subtopics[0].id);
                  }
                }}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between h-28 relative overflow-hidden pill-btn ${
                  isSelected
                    ? 'bg-[#1C1C1E] border-2 border-[#BAFF29] shadow-md'
                    : 'bg-[#1C1C1E] border-[#2C2C30] hover:border-gray-500'
                }`}
              >
                {/* Yellow header badge if active */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#BAFF29]" />
                )}

                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      isSelected ? 'bg-[#BAFF29] text-gray-900' : 'bg-[#121214] text-gray-300'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#121214] text-gray-400 border border-[#2C2C30]">
                    {m.subtopics.length} TEMAS
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase text-[#BAFF29] block">
                    MÓDULO 0{m.moduleNumber}
                  </span>
                  <h3 className="text-xs font-black uppercase text-white truncate">
                    {m.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. EXERCISES & TOPICS GRID (Image 3 2x2 Dark Cards Style) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BAFF29]" />
            <h3 className="text-lg font-black uppercase text-white tracking-tight">
              Temas & Ejercicios: {activeModule.title}
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-400">
            {activeModule.subtopics.length} Unidades Interactivas
          </span>
        </div>

        {/* 2x2 Grid of Subtopics / Exercises */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeModule.subtopics.map((sub) => {
            const isCompleted = completedTopics.includes(sub.id);
            const isSubActive = activeSubtopicId === sub.id;

            return (
              <div
                key={sub.id}
                onClick={() => {
                  playSound('click');
                  setActiveSubtopicId(sub.id);
                }}
                className={`bg-[#1C1C1E] border rounded-3xl p-5 cursor-pointer transition-all space-y-4 relative flex flex-col justify-between hover:border-[#BAFF29] ${
                  isSubActive
                    ? 'border-2 border-[#BAFF29] shadow-lg'
                    : 'border-[#2C2C30]'
                }`}
              >
                {/* Top Corner Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-[#121214] text-[#BAFF29] border border-[#2C2C30]">
                    Bachillerato ○
                  </span>

                  {isCompleted ? (
                    <span className="text-[10px] font-black text-gray-900 bg-[#BAFF29] px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3 text-gray-900" /> DOMINADO
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-gray-400 bg-[#121214] px-2.5 py-1 rounded-full border border-[#2C2C30]">
                      Prueba 5 Ejercicios 🔒
                    </span>
                  )}
                </div>

                {/* Center Content / Graphic Preview */}
                <div className="space-y-2">
                  <div className="p-3 bg-[#121214] border border-[#2C2C30] rounded-2xl font-mono text-center text-xs font-bold text-[#BAFF29]">
                    {sub.latexFormulas[0] ? (
                      <MathView latex={sub.latexFormulas[0].latex} />
                    ) : (
                      <span>{sub.badge}</span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-2 pt-1">
                    <div>
                      <h4 className="text-base font-black text-white uppercase tracking-tight">
                        {sub.title}
                      </h4>
                      <p className="text-xs font-medium text-gray-400 line-clamp-2 mt-0.5">
                        {sub.summary}
                      </p>
                    </div>
                    <div className="p-2 bg-[#252528] rounded-xl text-[#BAFF29] shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Action Controls Row */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#2C2C30]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound('click');
                      onOpenConcept(sub, activeModule.title, activeModule.moduleNumber);
                    }}
                    className="py-2 bg-[#121214] hover:bg-[#252528] border border-[#2C2C30] text-white font-black text-[10px] uppercase rounded-full pill-btn cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3 text-[#BAFF29]" />
                    <span>Concepto</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound('click');
                      onOpenDemo(sub);
                    }}
                    className="py-2 bg-[#121214] hover:bg-[#252528] border border-[#2C2C30] text-white font-black text-[10px] uppercase rounded-full pill-btn cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Play className="w-3 h-3 text-[#FEE041]" />
                    <span>Demo</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound('click');
                      setActiveSubtopicId(sub.id);
                      onOpenInteractiveLab(
                        sub.widgetType === 'divisibility-towers'
                          ? 'towers'
                          : sub.widgetType === 'algebra-balance'
                          ? 'algebra'
                          : 'sets'
                      );
                    }}
                    className="py-2 bg-[#BAFF29] hover:bg-[#a3e61c] text-gray-900 font-black text-[10px] uppercase rounded-full pill-btn cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                  >
                    <ArrowRight className="w-3 h-3 text-gray-900" />
                    <span>Prueba</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. EMBEDDED WORKBENCH WIDGET FOR SELECTED SUBTOPIC */}
      <div className="bg-[#1C1C1E] border border-[#2C2C30] rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-[#2C2C30]">
          <div className="flex items-center gap-3">
            <Mascot mood="happy" size={44} className="shrink-0" />
            <div>
              <span className="px-2.5 py-0.5 bg-[#BAFF29] text-gray-900 font-black text-[10px] uppercase rounded-full">
                Laboratorio Interactivo Activo
              </span>
              <h3 className="text-lg font-black text-white uppercase tracking-tight mt-0.5">
                {activeSubtopic.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onOpenInteractiveLab(
                activeSubtopic.widgetType === 'divisibility-towers'
                  ? 'towers'
                  : activeSubtopic.widgetType === 'algebra-balance'
                  ? 'algebra'
                  : 'sets'
              );
            }}
            className="px-4 py-2 bg-[#BAFF29] hover:bg-[#a3e61c] text-gray-900 font-black text-xs uppercase rounded-full pill-btn cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Maximize2 className="w-3.5 h-3.5 text-gray-900" />
            <span>Pantalla Completa</span>
          </button>
        </div>

        {/* KaTeX Formula Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeSubtopic.latexFormulas.map((f, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-[#2C2C30] bg-[#121214]"
            >
              <span className="text-xs font-black text-white block mb-1">
                {f.title}
              </span>
              <div className="bg-[#1C1C1E] p-3 rounded-xl border border-[#2C2C30] font-mono my-2 text-center text-sm font-bold text-[#BAFF29]">
                <MathView latex={f.latex} />
              </div>
              <p className="text-xs font-medium text-gray-400">
                {f.explanation}
              </p>
            </div>
          ))}
        </div>

        {/* Embedded Active Widget */}
        <div className="pt-2">
          {activeSubtopic.widgetType === 'number-sets' && <NumberSetsWidget onAwardXp={onAwardXp} />}
          {activeSubtopic.widgetType === 'divisibility-towers' && <DivisibilityTowersWidget onAwardXp={onAwardXp} />}
          {activeSubtopic.widgetType === 'algebra-balance' && <AlgebraBalanceWidget onAwardXp={onAwardXp} />}
        </div>
      </div>
    </div>
  );
};

