import React from 'react';
import { Star } from 'lucide-react';
import { GameTimer } from './GameTimer';
import { MISSIONS_LIST } from './MissionsPanel';
import { Mascot } from './Mascot';

interface MainChallengeCardProps {
  activeModuleId: string;
  children: React.ReactNode;
}

export const MainChallengeCard: React.FC<MainChallengeCardProps> = ({
  activeModuleId,
  children,
}) => {
  const currentMission = MISSIONS_LIST.find((m) => m.id === activeModuleId) || MISSIONS_LIST[0];

  return (
    <div className="bg-white border border-[#E2E4EB] rounded-3xl p-5 sm:p-7 shadow-sm mb-8 relative">
      {/* Challenge Card Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-gray-100 pb-6 mb-6">
        <div className="flex items-start gap-4">
          {/* Mascot Illustration */}
          <Mascot mood="wizard" size={72} className="shrink-0 hidden sm:block mt-1" />

          <div>
            {/* Badge & Rating */}
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <span
                className="px-3 py-1 rounded-full text-xs font-black uppercase text-gray-900"
                style={{ backgroundColor: currentMission.color }}
              >
                {currentMission.badge}
              </span>

              {/* 5-Star Rating */}
              <div className="flex items-center gap-1 bg-[#F2F3F7] px-3 py-1 rounded-full border border-[#E2E4EB]">
                <Star className="w-3.5 h-3.5 fill-[#FEE041] text-[#FEE041]" />
                <Star className="w-3.5 h-3.5 fill-[#FEE041] text-[#FEE041]" />
                <Star className="w-3.5 h-3.5 fill-[#FEE041] text-[#FEE041]" />
                <Star className="w-3.5 h-3.5 fill-[#FEE041] text-[#FEE041]" />
                <Star className="w-3.5 h-3.5 text-gray-300 fill-gray-200" />
                <span className="text-xs font-extrabold text-gray-800 ml-1">4.0 / 5.0</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase">
              Design Challenge 5: {currentMission.title}
            </h2>

            {/* Subtitle / Description */}
            <p className="text-sm font-medium text-gray-600 mt-1 max-w-2xl leading-relaxed">
              {currentMission.subtitle}. Always a winner! Diseñado para aprendizaje intuitivo, visual y libre de adivinanzas.
            </p>

            {/* Creator Avatar & Role */}
            <div className="flex items-center gap-2.5 mt-3">
              <div className="w-8 h-8 rounded-full bg-[#FFB7CE] flex items-center justify-center font-black text-gray-900 text-xs shadow-xs">
                SY
              </div>
              <div>
                <span className="text-xs font-black text-gray-900 block leading-none">
                  Sepideh Yazdi
                </span>
                <span className="text-[10px] font-medium text-gray-500">
                  Creadora de la Misión
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Countdown Timer Widget */}
        <div className="bg-[#F2F3F7] border border-[#E2E4EB] rounded-2xl p-3.5 shadow-xs flex flex-col items-center justify-center shrink-0">
          <span className="text-[11px] font-extrabold uppercase text-gray-500 tracking-wider">
            Tiempo Restante de Misión
          </span>
          <GameTimer />
        </div>
      </div>

      {/* Main Interactive Playground Children */}
      <div className="my-2">
        {children}
      </div>
    </div>
  );
};

