import React, { useState, useEffect } from 'react';

export const GameTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTwoDigits = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 my-2">
      {/* Days Card */}
      <div className="flex flex-col items-center">
        <div className="bg-[#F2F3F7] rounded-2xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-[#E2E4EB]">
          <span className="text-xl sm:text-2xl font-black text-gray-900">
            {formatTwoDigits(timeLeft.days)}
          </span>
        </div>
        <span className="text-[11px] sm:text-xs font-extrabold uppercase text-[#666666] mt-1">
          <span className="text-[#FF5A5A] font-black">D</span>ías
        </span>
      </div>

      {/* Colon Separator */}
      <div className="text-2xl sm:text-3xl font-black text-[#FF5A5A] pb-5 animate-pulse">
        :
      </div>

      {/* Hours Card */}
      <div className="flex flex-col items-center">
        <div className="bg-[#F2F3F7] rounded-2xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-[#E2E4EB]">
          <span className="text-xl sm:text-2xl font-black text-gray-900">
            {formatTwoDigits(timeLeft.hours)}
          </span>
        </div>
        <span className="text-[11px] sm:text-xs font-extrabold uppercase text-[#666666] mt-1">
          <span className="text-[#FF5A5A] font-black">H</span>oras
        </span>
      </div>

      {/* Colon Separator */}
      <div className="text-2xl sm:text-3xl font-black text-[#FF5A5A] pb-5 animate-pulse">
        :
      </div>

      {/* Minutes Card */}
      <div className="flex flex-col items-center">
        <div className="bg-[#F2F3F7] rounded-2xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-[#E2E4EB]">
          <span className="text-xl sm:text-2xl font-black text-gray-900">
            {formatTwoDigits(timeLeft.minutes)}
          </span>
        </div>
        <span className="text-[11px] sm:text-xs font-extrabold uppercase text-[#666666] mt-1">
          <span className="text-[#FF5A5A] font-black">M</span>inutos
        </span>
      </div>
    </div>
  );
};

