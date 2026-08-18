import React from 'react';
import { X, BookOpen, Trophy, ShieldCheck, Flame, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import { MISSIONS_LIST } from './widgets/MissionsPanel';
import { UserStats } from '../types';
import { playSound } from '../utils/sound';
import { Mascot } from './widgets/Mascot';

interface NavigationModalProps {
  isOpen: boolean;
  tab: 'missions' | 'progress' | 'arsenal' | null;
  onClose: () => void;
  activeModule: string;
  setActiveModule: (modId: string) => void;
  userStats: UserStats;
  onOpenArsenalModal: () => void;
}

export const NavigationModal: React.FC<NavigationModalProps> = ({
  isOpen,
  tab,
  onClose,
  activeModule,
  setActiveModule,
  userStats,
  onOpenArsenalModal,
}) => {
  if (!isOpen || !tab) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-all animate-fade-in font-jakarta"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-[#1E1E24] rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl relative text-[#1E1E24]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 bg-[#F4F7FC] hover:bg-gray-200 text-[#1E1E24] border-2 border-[#1E1E24] rounded-full flex items-center justify-center cursor-pointer shadow-2xs transition-colors"
          title="Cerrar modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Tab 1: Misiones Direct Quick Selector */}
        {tab === 'missions' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#F7CA38] border-2 border-[#1E1E24] rounded-2xl shadow-2xs">
                <BookOpen className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#1E1E24] uppercase">
                  Acceso Rápido a Misiones
                </h3>
                <p className="text-xs font-bold text-[#8A909F]">
                  Cambia de reto sin hacer scroll
                </p>
              </div>
            </div>

            <div className="space-y-2.5 mt-4">
              {MISSIONS_LIST.map((m) => {
                const isActive = activeModule === m.id;
                const isCompleted = userStats.trialsCompleted.includes(m.id);

                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      playSound('click');
                      setActiveModule(m.id);
                      onClose();
                    }}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
                      isActive
                        ? 'bg-[#6F78DB] text-white border-[#1E1E24] font-black'
                        : 'bg-[#F8FAFC] text-[#1E1E24] border-[#1E1E24]/20 hover:border-[#1E1E24] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border border-[#1E1E24]"
                        style={{ backgroundColor: m.color }}
                      />
                      <div>
                        <span className={`text-[10px] font-black uppercase block ${isActive ? 'text-white/80' : 'text-[#8A909F]'}`}>
                          {m.badge}
                        </span>
                        <span className="text-sm font-black block">
                          {m.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-[#F7CA38]' : 'text-[#22C55E]'}`} />
                      )}
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Gamification Progress Stats */}
        {tab === 'progress' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#F7CA38] border-2 border-[#1E1E24] rounded-2xl shadow-2xs">
                <Trophy className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#1E1E24] uppercase">
                  Tu Progreso y Métricas
                </h3>
                <p className="text-xs font-bold text-[#8A909F]">
                  Estadísticas activas de aprendizaje
                </p>
              </div>
            </div>

            <div className="flex justify-center my-3">
              <Mascot mood="cheering" size={80} />
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border-2 border-[#1E1E24] shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-black text-[#8A909F] mb-1">
                  <Star className="w-4 h-4 fill-[#F7CA38] text-[#F7CA38]" />
                  <span>Puntos XP</span>
                </div>
                <span className="text-2xl font-black text-[#1E1E24]">{userStats.xp} XP</span>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border-2 border-[#1E1E24] shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-black text-[#8A909F] mb-1">
                  <Flame className="w-4 h-4 fill-[#EF4444] text-[#EF4444]" />
                  <span>Racha Diaria</span>
                </div>
                <span className="text-2xl font-black text-[#1E1E24]">{userStats.streak} días</span>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border-2 border-[#1E1E24] shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-black text-[#8A909F] mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>Misiones Listas</span>
                </div>
                <span className="text-2xl font-black text-[#1E1E24]">
                  {userStats.trialsCompleted.length} / 6
                </span>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border-2 border-[#1E1E24] shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-black text-[#8A909F] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#6F78DB]" />
                  <span>Trampas Atrapadas</span>
                </div>
                <span className="text-2xl font-black text-[#1E1E24]">
                  {userStats.illegalMovesCaughtCount || 0}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="w-full mt-2 py-3.5 bg-[#F7CA38] hover:bg-[#eab308] text-[#1E1E24] border-2 border-[#1E1E24] rounded-full font-black text-xs uppercase shadow-xs cursor-pointer transition-all active:scale-95"
            >
              CONTINUAR APRENDIENDO
            </button>
          </div>
        )}

        {/* Tab 3: Arsenal Direct Trigger */}
        {tab === 'arsenal' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#F7CA38] border-2 border-[#1E1E24] rounded-2xl shadow-2xs">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#1E1E24] uppercase">
                  Arsenal de Reglas Reales
                </h3>
                <p className="text-xs font-bold text-[#8A909F]">
                  Leyes matemáticas universales inviolables
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-2xl border-2 border-[#1E1E24] mb-4 space-y-2 text-xs font-semibold text-[#4A4E69] shadow-2xs">
              <p>✓ <strong>Suma / Resta:</strong> Necesitan términos semejantes.</p>
              <p>✓ <strong>Multiplicación:</strong> Se multiplican coeficientes y suman exponentes.</p>
              <p>✓ <strong>División:</strong> División de números y resta de exponentes.</p>
              <p>✓ <strong>Leyes Exponentes:</strong> (aⁿ)ᵐ = aⁿˣᵐ y a⁰ = 1 (para a ≠ 0).</p>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
                onOpenArsenalModal();
              }}
              className="w-full py-3.5 bg-[#F7CA38] hover:bg-[#eab308] text-[#1E1E24] border-2 border-[#1E1E24] rounded-full font-black text-xs uppercase shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Ver las 6 Reglas del Arsenal</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
