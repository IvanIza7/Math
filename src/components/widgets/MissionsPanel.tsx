import React from 'react';
import { Play, CheckCircle2, BookOpen, ChevronRight } from 'lucide-react';
import { playSound } from '../../utils/sound';

export interface MissionItem {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  xpReward: number;
  unlocked: boolean;
}

interface MissionsPanelProps {
  activeModule: string;
  setActiveModule: (modId: string) => void;
  completedModules?: string[];
}

export const MISSIONS_LIST: MissionItem[] = [
  {
    id: 'combo-trials',
    order: 1,
    title: 'Misión 1: Combo Trials',
    subtitle: 'Eliminación de Paréntesis y Jerarquía de Operaciones',
    badge: 'Aritmética',
    color: '#FFB7CE',
    xpReward: 150,
    unlocked: true,
  },
  {
    id: 'invisible',
    order: 2,
    title: 'Misión 2: Signos Invisibles',
    subtitle: 'Coeficiente 1, Exponente 1 y Signos Ocultos (+)',
    badge: 'Fundamentos',
    color: '#93E1FF',
    xpReward: 100,
    unlocked: true,
  },
  {
    id: 'number-sets',
    order: 3,
    title: 'Misión 3: Conjuntos Numéricos',
    subtitle: 'Clasificación Visual e Inclusión de ℕ, ℤ y ℚ',
    badge: 'Estructura',
    color: '#6C47FF',
    xpReward: 120,
    unlocked: true,
  },
  {
    id: 'divisibility',
    order: 4,
    title: 'Misión 4: Torres de Divisibilidad',
    subtitle: 'Descomposición en Primos, MCD y mcm',
    badge: 'Aritmética Avanzada',
    color: '#BAFF29',
    xpReward: 140,
    unlocked: true,
  },
  {
    id: 'arsenal-module',
    order: 5,
    title: 'Misión 5: Arsenal Real',
    subtitle: 'Las 6 Reglas Inviolables del Álgebra Reales',
    badge: 'Leyes Reales',
    color: '#FEE041',
    xpReward: 160,
    unlocked: true,
  },
  {
    id: 'algebra',
    order: 6,
    title: 'Misión 6: Álgebra de Bachillerato',
    subtitle: 'Traducción de Lenguaje, Exponentes y Balanza',
    badge: 'Álgebra',
    color: '#93E1FF',
    xpReward: 200,
    unlocked: true,
  },
];

export const MissionsPanel: React.FC<MissionsPanelProps> = ({
  activeModule,
  setActiveModule,
  completedModules = [],
}) => {
  const completedCount = completedModules.length;
  const progressPercent = Math.min(100, Math.round((completedCount / MISSIONS_LIST.length) * 100));

  return (
    <div className="bg-white border border-[#E2E4EB] rounded-3xl p-5 sm:p-6 shadow-sm">
      {/* Header with Title & Overall Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FEE041] rounded-2xl shadow-xs">
            <BookOpen className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">
              Plan Curricular de Misiones
            </h3>
            <p className="text-xs font-medium text-gray-500">
              Organizado en orden pedagógico progresivo
            </p>
          </div>
        </div>

        {/* Gamified Horizontal Progress Bar with Lime Green (#BAFF29) */}
        <div className="flex items-center gap-3 bg-[#F2F3F7] p-2 sm:px-4 sm:py-2 rounded-2xl min-w-[220px]">
          <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#BAFF29] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(15, progressPercent)}%` }}
            />
          </div>
          <span className="text-xs font-black text-gray-800">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Unfolded Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {MISSIONS_LIST.map((mission) => {
          const isActive = activeModule === mission.id;
          const isCompleted = completedModules.includes(mission.id);

          return (
            <div
              key={mission.id}
              onClick={() => {
                playSound('click');
                setActiveModule(mission.id);
              }}
              className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between border ${
                isActive
                  ? 'bg-[#F2F3F7] border-[#6C47FF] shadow-md ring-2 ring-[#6C47FF]/20 scale-[1.01]'
                  : 'bg-white border-[#E2E4EB] hover:border-gray-300 hover:shadow-xs'
              }`}
              style={{
                borderLeftWidth: '6px',
                borderLeftColor: mission.color,
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full text-gray-900"
                    style={{ backgroundColor: mission.color }}
                  >
                    {mission.badge}
                  </span>

                  <span className="text-[11px] font-bold text-gray-500">
                    +{mission.xpReward} XP
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-black text-gray-900 leading-tight mb-1 flex items-center justify-between">
                  <span>{mission.title}</span>
                  {isActive && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#BAFF29] animate-ping" />
                  )}
                </h4>

                <p className="text-xs font-medium text-gray-500 leading-relaxed">
                  {mission.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                <span
                  className={`text-xs font-bold uppercase flex items-center gap-1.5 ${
                    isActive ? 'text-[#6C47FF]' : 'text-gray-500'
                  }`}
                >
                  {isActive ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-[#6C47FF] text-[#6C47FF]" />
                      <span>En Curso</span>
                    </>
                  ) : isCompleted ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6C47FF]" />
                      <span>Completado</span>
                    </>
                  ) : (
                    <span>Iniciar Misión</span>
                  )}
                </span>

                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                  isActive ? 'translate-x-1 text-[#6C47FF]' : 'group-hover:translate-x-1'
                }`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

