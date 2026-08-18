import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Play,
  Sparkles,
  Award,
  Lightbulb,
  CheckCircle2,
  Bookmark,
  Share2,
  Calculator,
} from 'lucide-react';
import { VolumeTopic, VolumeData } from '../data/curriculum';
import { MathView } from '../utils/math';
import { playSound } from '../utils/sound';
import { TopicInteractiveLab } from './TopicInteractiveLab';

interface TopicDetailViewProps {
  topic: VolumeTopic;
  volume: VolumeData;
  onBack: () => void;
  onStartQuiz: (topicTitle: string) => void;
  onMarkCompleted: (topicId: string) => void;
  isCompleted: boolean;
  onAwardXp?: (amount: number) => void;
}

export const TopicDetailView: React.FC<TopicDetailViewProps> = ({
  topic,
  volume,
  onBack,
  onStartQuiz,
  onMarkCompleted,
  isCompleted,
  onAwardXp = () => {},
}) => {
  const volIndex = volume.topics.findIndex((t) => t.id === topic.id);
  const topicNumber = (volIndex >= 0 ? volIndex + 1 : 1).toString().padStart(2, '0');

  // Vibrant header theme color with high contrast dark border
  const themeBgColor = volume.color || '#F7CA38';

  return (
    <div
      className="flex flex-col min-h-screen text-[#1E1E24] pb-16 font-jakarta relative overflow-hidden"
      style={{ backgroundColor: themeBgColor }}
    >
      {/* Top Header Section (Flat/Straight background at the back, painting in from top) */}
      <motion.div
        initial={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          scaleY: 0.9,
          y: -15,
        }}
        animate={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scaleY: 1,
          y: 0,
        }}
        exit={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          scaleY: 0.9,
          y: -15,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: 'top center' }}
        className="w-full pt-4 pb-8 px-5 flex flex-col items-center relative z-10"
      >
        {/* Decorative Memphis floating elements */}
        <div className="absolute top-3 left-6 w-6 h-6 rounded-full border-2 border-black/10 pointer-events-none" />
        <div className="absolute top-10 left-16 w-2 h-2 rounded-full bg-black/15 pointer-events-none" />
        <div className="absolute top-6 right-8 text-black/15 font-black text-lg pointer-events-none select-none">
          ✦
        </div>

        {/* Action Top Bar */}
        <div className="w-full flex items-center justify-between mb-3 max-w-md">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              playSound('click');
              onBack();
            }}
            className="w-10 h-10 bg-white/95 hover:bg-white border-2 border-[#1E1E24] rounded-full flex items-center justify-center text-[#1E1E24] shadow-xs cursor-pointer transition-colors"
            title="Volver a Volúmenes"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </motion.button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#1E1E24] bg-white/90 border-2 border-[#1E1E24] px-3 py-1 rounded-full shadow-2xs">
              {volume.code} · {volume.title}
            </span>
          </div>

          <div className="w-10 h-10 bg-white/90 border-2 border-[#1E1E24] rounded-full flex items-center justify-center font-black text-xs shadow-xs text-[#1E1E24]">
            #{topicNumber}
          </div>
        </div>

        {/* Title and Subtitle Info with Smooth Spring */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.3 }}
          className="text-center mt-2 px-2 max-w-sm"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-black/10 text-[#1E1E24] text-[10px] font-black uppercase tracking-wider rounded-full border border-black/15 mb-1.5">
            <BookOpen className="w-3 h-3" />
            <span>Tema {topicNumber} de {volume.topics.length}</span>
          </div>

          <h1 className="text-2xl font-black text-[#1E1E24] tracking-tight leading-tight">
            {topic.title}
          </h1>

          <p className="text-xs font-bold text-[#1E1E24]/80 mt-1">
            {volume.subtitle}
          </p>
        </motion.div>
      </motion.div>

      {/* Main White Topic Detail Card with Rounded Top Corners */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.35 }}
        className="relative z-20 w-full max-w-md mx-auto bg-white rounded-t-[36px] border-t-2 border-x-2 border-[#1E1E24] shadow-2xl p-5 pt-6 pb-16 space-y-5 flex-1"
      >
        {/* Status Pill Card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`border-2 border-[#1E1E24] rounded-3xl p-4 flex items-center justify-between shadow-xs ${
            isCompleted ? 'bg-[#DCFCE7]' : 'bg-[#FFF9E6]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl border-2 border-[#1E1E24] flex items-center justify-center shrink-0 ${
                isCompleted ? 'bg-[#22C55E] text-white' : 'bg-[#F7CA38] text-[#1E1E24]'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#8A909F] block">
                Estado del Tema
              </span>
              <h3 className="text-sm font-extrabold text-[#1E1E24]">
                {isCompleted ? 'Completado con Éxito (+50 XP)' : 'Listo para Estudiar & Practicar'}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onStartQuiz(topic.title);
            }}
            className="px-3 py-1.5 bg-[#1E1E24] text-white rounded-full text-[11px] font-black uppercase tracking-wide flex items-center gap-1 shadow-xs hover:bg-[#333] transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <span>Quiz</span>
            <Play className="w-2.5 h-2.5 fill-current text-[#F7CA38]" />
          </button>
        </motion.div>

        {/* Concept Summary Broken Down into Colorful Cards */}
        <div className="space-y-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-[#8A909F] flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-[#F7CA38]" />
            <span>Conceptos Fundamentales</span>
          </span>

          <div className="grid grid-cols-1 gap-2">
            {topic.conceptSummary
              .split('. ')
              .filter((sentence) => sentence.trim().length > 0)
              .map((sentence, sIdx) => {
                const colors = [
                  { bg: 'bg-[#FFF9E6]', border: 'border-[#F59E0B]', text: 'text-[#78350F]', badge: 'bg-[#F59E0B]' },
                  { bg: 'bg-[#EFF6FF]', border: 'border-[#3B82F6]', text: 'text-[#1E3A8A]', badge: 'bg-[#3B82F6]' },
                  { bg: 'bg-[#F0FDF4]', border: 'border-[#10B981]', text: 'text-[#065F46]', badge: 'bg-[#10B981]' },
                  { bg: 'bg-[#FAF5FF]', border: 'border-[#A855F7]', text: 'text-[#581C87]', badge: 'bg-[#A855F7]' },
                ];
                const col = colors[sIdx % colors.length];

                return (
                  <div
                    key={sIdx}
                    className={`${col.bg} border-2 ${col.border} rounded-2xl p-3.5 shadow-2xs flex items-start gap-2.5`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full ${col.badge} text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}
                    >
                      {sIdx + 1}
                    </span>
                    <p className={`text-xs sm:text-sm font-bold ${col.text} leading-relaxed`}>
                      {sentence.endsWith('.') ? sentence : `${sentence}.`}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Laboratorio Interactivo por Tema */}
        <TopicInteractiveLab
          topic={topic}
          volume={volume}
          onAwardXp={onAwardXp}
        />

        {/* Key Concepts (Conceptos Clave) */}
        {topic.keyConcepts && topic.keyConcepts.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#8A909F] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#6F78DB]" />
              <span>Conceptos Clave</span>
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              {topic.keyConcepts.map((kc, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-[#1E1E24] rounded-2xl p-3.5 shadow-xs flex flex-col gap-1"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-black text-[#1E1E24] border border-[#1E1E24]/30"
                      style={{ backgroundColor: kc.bgPill || '#FEF08A' }}
                    >
                      {kc.term}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A4E69] font-medium leading-relaxed pl-0.5">
                    {kc.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subtopics Checklist */}
        {topic.subtopics && topic.subtopics.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#8A909F] flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Contenido del Subtema</span>
            </span>

            <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-3xl p-4 space-y-2.5 shadow-xs">
              {topic.subtopics.map((sub, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2.5 text-xs text-[#1E1E24]">
                  <span className="w-5 h-5 rounded-full bg-white border border-[#1E1E24]/30 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    {sIdx + 1}
                  </span>
                  <span className="font-semibold leading-snug">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KaTeX Formulas & Equations */}
        {topic.latexFormulas && topic.latexFormulas.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#8A909F] flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Fórmulas & Propiedades</span>
            </span>

            <div className="space-y-3">
              {topic.latexFormulas.map((form, fIdx) => (
                <div
                  key={fIdx}
                  className="bg-white border-2 border-[#1E1E24] rounded-3xl p-4 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#1E1E24]">
                      {form.title}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#EEF2FF] text-[#6F78DB] rounded-md border border-[#6F78DB]/30">
                      Fórmula
                    </span>
                  </div>

                  <div className="py-3 px-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#1E1E24]/15 text-center text-sm font-bold text-[#6F78DB] overflow-x-auto no-scrollbar">
                    <MathView latex={form.latex} />
                  </div>

                  <p className="text-xs font-medium text-[#8A909F]">
                    {form.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invisible Math Trick (Truco Invisible Anti-Adivinanza) */}
        {topic.invisibleTrick && (
          <div className="bg-[#FEF08A] border-2 border-[#1E1E24] rounded-3xl p-4 shadow-sm flex items-start gap-3">
            <div className="p-2 bg-white rounded-2xl border-2 border-[#1E1E24] text-[#F97316] shrink-0 mt-0.5 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-[#92400E] uppercase tracking-wider block mb-0.5">
                Truco Invisible Anti-Adivinanza
              </span>
              <p className="text-xs font-extrabold text-[#1E1E24] leading-relaxed">
                {topic.invisibleTrick}
              </p>
            </div>
          </div>
        )}

        {/* Exercises to Practice */}
        {topic.exercisesToPut && topic.exercisesToPut.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#8A909F] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>Ejercicios Típicos</span>
            </span>

            <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-3xl p-4 space-y-2 shadow-xs">
              {topic.exercisesToPut.map((ex, eIdx) => (
                <div key={eIdx} className="flex items-start gap-2 text-xs text-[#4A4E69]">
                  <span className="text-[#6F78DB] font-black mt-0.5">•</span>
                  <span className="font-medium leading-relaxed">{ex}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Sticky Action Buttons */}
        <div className="pt-3 space-y-2.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playSound('correct');
              onMarkCompleted(topic.id);
            }}
            className={`w-full py-3.5 font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all ${
              isCompleted
                ? 'bg-[#DCFCE7] text-[#166534]'
                : 'bg-[#22C55E] hover:bg-[#16a34a] text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4 stroke-[2.5]" />
            <span>
              {isCompleted ? '✓ Tema Marcado como Completado' : 'Completar Tema · +50 XP'}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              playSound('click');
              onStartQuiz(topic.title);
            }}
            className="w-full py-3 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E24] shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#1E1E24]" />
            <span>Practicar en Quiz Interactivo</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
