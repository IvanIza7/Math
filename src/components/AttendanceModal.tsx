import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, CheckCircle2, Clock, ChevronLeft, ChevronRight, AlertCircle, XCircle } from 'lucide-react';
import { AttendanceRecord } from '../types';
import { playSound } from '../utils/sound';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendanceRecords: AttendanceRecord[];
  onAddAttendance: (status: 'completed' | 'cancelled' | 'absence' | 'none', dateStr: string, notes?: string) => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  attendanceRecords,
  onAddAttendance,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDayStr, setSelectedDayStr] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'completed' | 'cancelled' | 'absence' | 'none'>('completed');
  const [notesInput, setNotesInput] = useState('');

  if (!isOpen) return null;

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  const todayStr = new Date().toISOString().split('T')[0];

  const handlePrevMonth = () => {
    playSound('click');
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    playSound('click');
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getRecordForDate = (dateStr: string) => {
    return attendanceRecords.find((r) => r.dateStr === dateStr);
  };

  const handleSelectDay = (dayNum: number) => {
    playSound('click');
    const dayFormatted = String(dayNum).padStart(2, '0');
    const monthFormatted = String(month + 1).padStart(2, '0');
    const dateStr = `${year}-${monthFormatted}-${dayFormatted}`;
    setSelectedDayStr(dateStr);

    const existing = getRecordForDate(dateStr);
    if (existing) {
      setSelectedStatus((existing.status as any) || 'completed');
      setNotesInput(existing.notes || '');
    } else {
      setSelectedStatus('completed');
      setNotesInput('');
    }
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDayStr) return;

    playSound('correct');
    onAddAttendance(selectedStatus, selectedDayStr, notesInput.trim());
    setSelectedDayStr(null);
    setNotesInput('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs font-jakarta"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border-2 border-[#1E1E24] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-[#1E1E24] no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#F7CA38] border-b-2 border-[#1E1E24] p-4 sm:p-5 flex items-center justify-between text-[#1E1E24]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white border-2 border-[#1E1E24] rounded-2xl shadow-xs">
              <CalendarIcon className="w-6 h-6 text-[#1E1E24]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-white border border-[#1E1E24] text-[#1E1E24] font-black text-[10px] uppercase rounded-full">
                  Calendario
                </span>
                <span className="text-xs font-black text-[#1E1E24]">
                  {attendanceRecords.filter(r => r.status === 'completed').length} Clases
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#1E1E24] uppercase tracking-tight">
                Asistencia Presencial
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-2 bg-white border-2 border-[#1E1E24] hover:bg-black/10 text-[#1E1E24] rounded-full cursor-pointer transition-colors shadow-xs"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
        {/* Interactive Calendar Month Bar */}
        <div className="bg-[#F8FAFC] border-2 border-[#1E1E24] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrevMonth}
              className="p-2 bg-white hover:bg-[#F1F5F9] rounded-full border-2 border-[#1E1E24] cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4 text-[#1E1E24]" />
            </button>

            <span className="text-sm font-extrabold text-[#1E1E24] uppercase tracking-tight">
              {monthNames[month]} {year}
            </span>

            <button
              onClick={handleNextMonth}
              className="p-2 bg-white hover:bg-[#F1F5F9] rounded-full border-2 border-[#1E1E24] cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-4 h-4 text-[#1E1E24]" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center gap-1 mb-2">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
              <span key={d} className="text-[10px] font-black uppercase text-[#8A909F]">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-10 rounded-xl bg-transparent" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dayFormatted = String(dayNum).padStart(2, '0');
              const monthFormatted = String(month + 1).padStart(2, '0');
              const dateStr = `${year}-${monthFormatted}-${dayFormatted}`;

              const record = getRecordForDate(dateStr);
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDayStr;

              let bgClass = 'bg-white hover:bg-[#F1F5F9] border-2 border-[#1E1E24]/20 text-[#1E1E24]';
              let badgeDot = null;

              if (record) {
                if (record.status === 'completed') {
                  bgClass = 'bg-[#DCFCE7] border-2 border-[#22C55E] text-[#166534] font-black';
                  badgeDot = <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />;
                } else if (record.status === 'cancelled') {
                  bgClass = 'bg-pink-100 border-2 border-pink-400 text-pink-700 font-bold';
                  badgeDot = <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />;
                } else if (record.status === 'absence') {
                  bgClass = 'bg-amber-100 border-2 border-amber-400 text-amber-700 font-bold';
                  badgeDot = <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />;
                }
              }

              if (isSelected) {
                bgClass += ' ring-2 ring-[#F7CA38] scale-105';
              }

              return (
                <button
                  key={dateStr}
                  onClick={() => handleSelectDay(dayNum)}
                  className={`h-10 rounded-xl border flex flex-col items-center justify-center relative transition-all cursor-pointer ${bgClass}`}
                >
                  <span className={`text-xs ${isToday ? 'font-black underline text-[#6F78DB]' : 'font-bold'}`}>
                    {dayNum}
                  </span>

                  {badgeDot && (
                    <div className="absolute bottom-1 flex items-center justify-center">
                      {badgeDot}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Form */}
        {selectedDayStr && (
          <form onSubmit={handleSaveAttendance} className="bg-[#F8FAFC] border-2 border-[#1E1E24] p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <span className="text-xs font-black uppercase text-[#1E1E24]">
                Registrar Día: {selectedDayStr}
              </span>
              <button
                type="button"
                onClick={() => setSelectedDayStr(null)}
                className="text-xs font-bold text-[#8A909F] hover:text-[#1E1E24]"
              >
                Cancelar
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedStatus('completed')}
                className={`p-2.5 rounded-xl border-2 text-left text-xs font-black flex items-center gap-2 cursor-pointer ${
                  selectedStatus === 'completed'
                    ? 'bg-[#DCFCE7] border-[#22C55E] text-[#166534] shadow-xs'
                    : 'bg-white border-[#1E1E24]/20 text-[#4A4E69]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Impartida</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedStatus('cancelled')}
                className={`p-2.5 rounded-xl border-2 text-left text-xs font-black flex items-center gap-2 cursor-pointer ${
                  selectedStatus === 'cancelled'
                    ? 'bg-pink-100 border-pink-400 text-pink-700 shadow-xs'
                    : 'bg-white border-[#1E1E24]/20 text-[#4A4E69]'
                }`}
              >
                <XCircle className="w-4 h-4 text-pink-600 shrink-0" />
                <span>Cancelada</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedStatus('absence')}
                className={`p-2.5 rounded-xl border-2 text-left text-xs font-black flex items-center gap-2 cursor-pointer ${
                  selectedStatus === 'absence'
                    ? 'bg-amber-100 border-amber-400 text-amber-700 shadow-xs'
                    : 'bg-white border-[#1E1E24]/20 text-[#4A4E69]'
                }`}
              >
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Ausencia</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedStatus('none')}
                className={`p-2.5 rounded-xl border-2 text-left text-xs font-black flex items-center gap-2 cursor-pointer ${
                  selectedStatus === 'none'
                    ? 'bg-gray-200 border-gray-400 text-gray-800 shadow-xs'
                    : 'bg-white border-[#1E1E24]/20 text-[#4A4E69]'
                }`}
              >
                <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                <span>Sin Sesión</span>
              </button>
            </div>

            <input
              type="text"
              placeholder="Notas u observaciones de la clase (opcional)..."
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium bg-white border-2 border-[#1E1E24] rounded-xl focus:outline-none focus:border-[#F7CA38] text-[#1E1E24] placeholder-[#8A909F]"
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#F7CA38] hover:bg-[#ffce38] text-[#1E1E24] rounded-full border-2 border-[#1E1E24] font-black text-xs uppercase shadow-xs cursor-pointer transition-transform active:scale-95"
            >
              Guardar Asistencia
            </button>
          </form>
        )}

        {/* Attendance History List */}
        <div>
          <h4 className="text-xs font-black uppercase text-[#8A909F] mb-2 tracking-wider">
            Historial de Registro
          </h4>

          {attendanceRecords.length === 0 ? (
            <div className="p-4 text-center border-2 border-dashed border-[#1E1E24]/20 rounded-2xl bg-[#F8FAFC]">
              <p className="text-xs font-medium text-[#8A909F]">
                Aún no hay registros de asistencia. Selecciona un día arriba para registrar una clase.
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {[...attendanceRecords].reverse().map((rec) => (
                <div
                  key={rec.id}
                  className="bg-[#F8FAFC] border-2 border-[#1E1E24] p-3 rounded-2xl flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        rec.status === 'completed'
                          ? 'bg-[#22C55E]'
                          : rec.status === 'cancelled'
                          ? 'bg-pink-500'
                          : 'bg-amber-500'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-bold text-[#1E1E24] block">
                        {rec.dateStr} — Sesión #{rec.sessionNumber}
                      </span>
                      <span className="text-[11px] font-medium text-[#8A909F]">
                        {rec.notes || rec.topicCovered}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#166534] bg-[#DCFCE7] border border-[#22C55E]/40 px-2.5 py-1 rounded-full shrink-0">
                    {rec.timestamp}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};
