import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { AttendanceRecord } from '../../types';
import { playSound } from '../../utils/sound';
import { ClassDetailModal } from '../ClassDetailModal';

interface PlanDeClaseModuleProps {
  attendanceRecords: AttendanceRecord[];
}

export const PlanDeClaseModule: React.FC<PlanDeClaseModuleProps> = ({
  attendanceRecords,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  const prevMonth = () => {
    playSound('click');
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const nextMonth = () => {
    playSound('click');
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const getRecordForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return attendanceRecords.find(r => r.dateStr === dateStr);
  };

  const handleDayClick = (day: number) => {
    const record = getRecordForDate(day);
    if (record) {
      playSound('click');
      setSelectedRecord(record);
      setIsModalOpen(true);
    }
  };

  // Generate calendar grid
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col h-[100dvh] bg-[#F4F7FC] dark:bg-[#0F1117] text-[#1E1E24] pb-20 font-jakarta relative overflow-hidden transition-colors">
      
      {/* Top Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-[#FFB7CE] pt-8 pb-4 px-5 border-b-4 border-[#1E1E24] shadow-sm relative z-10 shrink-0"
      >
        <div className="w-full flex items-center gap-3 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#1E1E24] flex items-center justify-center shadow-[4px_4px_0px_0px_#1E1E24]">
            <CalendarIcon className="w-6 h-6 text-[#1E1E24]" />
          </div>
          <div>
            <h1 className="font-black text-2xl text-[#1E1E24] uppercase tracking-tight">
              Calendario
            </h1>
            <p className="font-bold text-[#1E1E24]/70 text-sm">
              Tu historial de clases
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 w-full max-w-md mx-auto p-4 flex flex-col justify-center min-h-0">
        {/* Calendar Card */}
        <div className="bg-white dark:bg-[#161822] border-4 border-[#1E1E24] dark:border-[#2C2C3C] rounded-3xl p-4 shadow-[6px_6px_0px_0px_#1E1E24] dark:shadow-[6px_6px_0px_0px_#000000] flex flex-col h-full max-h-[600px]">
          
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-2 shrink-0">
            <button onClick={prevMonth} className="w-10 h-10 rounded-full border-2 border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#202334] active:scale-95 transition-transform cursor-pointer">
              <ChevronLeft className="w-5 h-5 dark:text-white" />
            </button>
            <h2 className="font-black text-lg uppercase tracking-wider dark:text-white">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button onClick={nextMonth} className="w-10 h-10 rounded-full border-2 border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#202334] active:scale-95 transition-transform cursor-pointer">
              <ChevronRight className="w-5 h-5 dark:text-white" />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2 shrink-0">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
              <div key={d} className="text-center font-black text-xs text-gray-400 uppercase">{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 flex-1 content-start">
            {blanks.map(b => (
              <div key={`blank-${b}`} className="aspect-square" />
            ))}
            
            {days.map(day => {
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const record = getRecordForDate(day);
              const isToday = dateStr === todayStr;
              
              let bgColor = 'bg-transparent';
              let textColor = 'text-[#1E1E24] dark:text-white';
              let borderColor = 'border-transparent';
              
              if (record) {
                if (record.status === 'completed') bgColor = 'bg-[#BAFF29]';
                else if (record.status === 'cancelled') bgColor = 'bg-red-400';
                else if (record.status === 'absence') bgColor = 'bg-orange-400';
                textColor = 'text-[#1E1E24]';
                borderColor = 'border-[#1E1E24]';
              }
              
              if (isToday) {
                borderColor = 'border-[#1E1E24] dark:border-[#BAFF29]';
                if (!record) {
                  bgColor = 'bg-gray-100 dark:bg-[#202334]';
                }
              }

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  disabled={!record}
                  className={`aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all ${bgColor} ${textColor} ${borderColor} ${record ? 'cursor-pointer hover:scale-105 shadow-sm active:scale-95' : 'opacity-80'}`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t-2 border-gray-100 dark:border-[#2C2C3C] grid grid-cols-2 gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#BAFF29] border border-[#1E1E24]" />
              <span className="text-xs font-bold dark:text-gray-300">Impartida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400 border border-[#1E1E24]" />
              <span className="text-xs font-bold dark:text-gray-300">Ausencia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-[#1E1E24]" />
              <span className="text-xs font-bold dark:text-gray-300">Cancelada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-100 dark:bg-[#202334] border-2 border-dashed border-gray-300 dark:border-gray-500" />
              <span className="text-xs font-bold dark:text-gray-300">Hoy</span>
            </div>
          </div>
        </div>
      </div>

      <ClassDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={selectedRecord}
      />
    </div>
  );
};
