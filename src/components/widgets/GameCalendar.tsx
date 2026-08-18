import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { playSound } from '../../utils/sound';

export const GameCalendar: React.FC = () => {
  const days = [
    { dayName: 'Lun', dateNum: 14 },
    { dayName: 'Mar', dateNum: 15 },
    { dayName: 'Mié', dateNum: 16 },
    { dayName: 'Jue', dateNum: 17 },
    { dayName: 'Vie', dateNum: 18, isActive: true },
    { dayName: 'Sáb', dateNum: 19 },
    { dayName: 'Dom', dateNum: 20 },
  ];

  const [selectedDate, setSelectedDate] = useState<number>(18);

  const handleSelectDay = (dateNum: number) => {
    playSound('click');
    setSelectedDate(dateNum);
  };

  return (
    <div className="bg-white border border-[#E2E4EB] rounded-3xl p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => playSound('click')}
          className="p-2.5 bg-[#F2F3F7] hover:bg-[#93E1FF] text-gray-700 hover:text-gray-900 rounded-full pill-btn cursor-pointer transition-all"
          title="Semana anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-around flex-1 gap-1 sm:gap-2">
          {days.map((item) => {
            const isSelected = selectedDate === item.dateNum;
            return (
              <button
                key={item.dateNum}
                onClick={() => handleSelectDay(item.dateNum)}
                className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-2xl cursor-pointer transition-all min-w-[38px] sm:min-w-[48px] ${
                  isSelected ? 'scale-105' : 'hover:bg-[#F2F3F7]'
                }`}
              >
                <span className="text-[11px] font-extrabold uppercase text-[#666666]">
                  {item.dayName}
                </span>

                <div
                  className={`mt-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-extrabold text-sm sm:text-base transition-all ${
                    isSelected
                      ? 'bg-[#FF5A5A] text-white shadow-md'
                      : 'bg-transparent text-gray-800'
                  }`}
                >
                  {item.dateNum}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => playSound('click')}
          className="p-2.5 bg-[#F2F3F7] hover:bg-[#93E1FF] text-gray-700 hover:text-gray-900 rounded-full pill-btn cursor-pointer transition-all"
          title="Semana siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

