import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ArrowRight, Book, Swords, Calculator, Check, Sparkles, User, Heart } from 'lucide-react';
import { playSound } from '../utils/sound';
import { AVATAR_OPTIONS, UserAvatar } from './Illustrations';

export type AcademicGrade = 'Primaria' | 'Secundaria' | 'Bachillerato' | 'Universidad';

export interface OnboardingData {
  avatarId: string;
  academicGoal: AcademicGrade;
  favoriteArea: string;
  bio: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  username: string;
  onComplete: (data: OnboardingData) => void;
}

const MATH_AREAS = [
  'Aritmética',
  'Álgebra',
  'Geometría',
  'Trigonometría',
  'Cálculo',
  'Probabilidad',
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, username, onComplete }) => {
  const [step, setStep] = useState(0);
  
  // State for the collected data
  const [avatarId, setAvatarId] = useState<string>('astro');
  const [bio, setBio] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<AcademicGrade | null>(null);
  const [favoriteArea, setFavoriteArea] = useState<string>('');

  if (!isOpen) return null;

  const grades: AcademicGrade[] = ['Primaria', 'Secundaria', 'Bachillerato', 'Universidad'];

  const handleNext = () => {
    playSound('click');
    if (step === 1 && (!selectedGrade || !favoriteArea)) return;
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      if (selectedGrade && favoriteArea) {
        onComplete({
          avatarId,
          academicGoal: selectedGrade,
          favoriteArea,
          bio: bio.trim() || 'Estudiando con rigor axiomático y enfoque anti-adivinanza.',
        });
      }
    }
  };

  const slides = [
    // Step 0: Avatar & Bio
    <div key="step-0" className="flex flex-col h-full animate-fade-in space-y-4 pt-2 overflow-y-auto no-scrollbar">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-[#1E1E24] tracking-tight">
          ¡Hola, <span className="text-[#6F78DB]">{username}</span>! 👋
        </h2>
        <p className="text-sm font-bold text-[#4A4E69]">
          Personaliza tu perfil de estudiante
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-[#1E1E24]">Elige un Avatar:</label>
        <div className="grid grid-cols-4 gap-2">
          {AVATAR_OPTIONS.map((opt) => (
            <div 
              key={opt.id}
              onClick={() => { playSound('click'); setAvatarId(opt.id); }}
              className={`cursor-pointer rounded-xl p-2 flex flex-col items-center justify-center gap-1 border-2 transition-all ${
                avatarId === opt.id 
                  ? 'border-[#1E1E24] bg-[#BAFF29] shadow-[2px_2px_0px_0px_#1E1E24]'
                  : 'border-transparent hover:bg-black/5 hover:border-[#1E1E24]/20'
              }`}
            >
              <UserAvatar avatarId={opt.id} size={42} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-[#1E1E24]">Tu Lema (Opcional):</label>
        <input 
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Ej: Rompiendo récords en matemáticas 🚀"
          maxLength={60}
          className="w-full px-4 py-3 bg-white border-2 border-[#1E1E24] rounded-2xl text-sm font-bold text-[#1E1E24] focus:outline-none focus:ring-2 focus:ring-[#6F78DB] shadow-[2px_2px_0px_0px_#1E1E24]"
        />
      </div>
    </div>,

    // Step 1: Grade & Area
    <div key="step-1" className="flex flex-col h-full animate-fade-in space-y-4 pt-2 overflow-y-auto no-scrollbar">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-[#1E1E24] tracking-tight">
          Nivel Académico 📚
        </h2>
        <p className="text-sm font-bold text-[#4A4E69]">
          ¿Qué estás estudiando actualmente?
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-[#1E1E24]">Grado:</label>
          <div className="grid grid-cols-2 gap-2">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => { playSound('click'); setSelectedGrade(grade); }}
                className={`w-full text-left px-3 py-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                  selectedGrade === grade 
                    ? 'bg-[#BAFF29] border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] scale-[1.02]' 
                    : 'bg-white border-[#1E1E24] hover:bg-gray-50'
                }`}
              >
                <span className="font-black text-[13px] text-[#1E1E24]">{grade}</span>
                {selectedGrade === grade && <Check size={14} className="text-[#1E1E24] stroke-[4]" />}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-[#1E1E24]">Área Favorita:</label>
          <div className="grid grid-cols-3 gap-2">
            {MATH_AREAS.map((area) => (
              <button
                key={area}
                onClick={() => { playSound('click'); setFavoriteArea(area); }}
                className={`w-full text-center px-2 py-2 rounded-xl border-2 transition-all ${
                  favoriteArea === area 
                    ? 'bg-[#6F78DB] text-white border-[#1E1E24] shadow-[2px_2px_0px_0px_#1E1E24] scale-[1.02]' 
                    : 'bg-white text-[#1E1E24] border-[#1E1E24] hover:bg-gray-50'
                }`}
              >
                <span className="font-black text-[11px]">{area}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,

    // Step 2: Volumes
    <div key="step-2" className="flex flex-col h-full animate-fade-in items-center justify-center text-center space-y-6 pt-8 pb-4">
      <div className="w-24 h-24 bg-[#FFDE59] rounded-3xl border-4 border-[#1E1E24] flex items-center justify-center shadow-[6px_6px_0px_0px_#1E1E24] -rotate-3">
        <Book size={48} className="text-[#1E1E24]" />
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-black text-[#1E1E24] uppercase tracking-tight">1. Volúmenes</h3>
        <p className="text-base font-bold text-[#4A4E69] px-4">
          Aquí encontrarás toda la teoría. Es nuestra "Enciclopedia" interactiva donde aprenderás matemáticas desde cero con explicaciones claras y animadas.
        </p>
      </div>
    </div>,

    // Step 3: Arena
    <div key="step-3" className="flex flex-col h-full animate-fade-in items-center justify-center text-center space-y-6 pt-8 pb-4">
      <div className="w-24 h-24 bg-[#EF4444] rounded-3xl border-4 border-[#1E1E24] flex items-center justify-center shadow-[6px_6px_0px_0px_#1E1E24] rotate-3">
        <Swords size={48} className="text-white" />
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-black text-[#1E1E24] uppercase tracking-tight">2. La Arena</h3>
        <p className="text-base font-bold text-[#4A4E69] px-4">
          Pon a prueba tus conocimientos. Resuelve desafíos contra reloj, gana XP y demuestra que dominas cada tema sin adivinar.
        </p>
      </div>
    </div>,

    // Step 4: Formulario
    <div key="step-4" className="flex flex-col h-full animate-fade-in items-center justify-center text-center space-y-6 pt-8 pb-4">
      <div className="w-24 h-24 bg-[#6F78DB] rounded-3xl border-4 border-[#1E1E24] flex items-center justify-center shadow-[6px_6px_0px_0px_#1E1E24] -rotate-3">
        <Calculator size={48} className="text-white" />
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-black text-[#1E1E24] uppercase tracking-tight">3. Formulario Mágico</h3>
        <p className="text-base font-bold text-[#4A4E69] px-4">
          ¿Olvidaste una fórmula? No te preocupes. Encuentra identidades, leyes y reglas rápidamente clasificadas por tema.
        </p>
      </div>
    </div>
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E1E24]/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#F4F7FC] border-4 border-[#1E1E24] rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_#1E1E24] flex flex-col relative min-h-[500px] max-h-[90vh]"
      >
        {/* Progress Bar */}
        <div className="h-2 bg-[#1E1E24]/10 w-full shrink-0">
          <motion.div 
            className="h-full bg-[#1E1E24]" 
            initial={{ width: 0 }}
            animate={{ width: `${((step) / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              {slides[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar */}
        <div className="p-5 sm:p-6 bg-white border-t-4 border-[#1E1E24] flex items-center justify-between shrink-0">
          <div className="flex gap-1.5 sm:gap-2">
            {[0, 1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className={`w-2.5 h-2.5 rounded-full border-2 border-[#1E1E24] ${i === step ? 'bg-[#1E1E24]' : 'bg-transparent'}`} 
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={step === 1 && (!selectedGrade || !favoriteArea)}
            className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl border-2 border-[#1E1E24] font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-all ${
              (step === 1 && (!selectedGrade || !favoriteArea))
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                : 'bg-[#BAFF29] hover:bg-[#a6ff00] text-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] active:translate-y-1 active:translate-x-1 active:shadow-none'
            }`}
          >
            {step === 4 ? (
              <>
                ¡EMPEZAR! <Sparkles size={18} className="fill-current" />
              </>
            ) : (
              <>
                CONTINUAR <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
