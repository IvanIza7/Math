import React, { useState } from 'react';
import { ArrowLeft, Save, Calendar as CalendarIcon, FileText, CheckCircle2, ClipboardList, BookOpen, Presentation, Swords, Flame } from 'lucide-react';
import { AttendanceRecord } from '../../types';
import { playSound } from '../../utils/sound';
import { getPlanForSession } from '../../data/classPlan';

import { AdminOverview } from '../admin/AdminOverview';
import { AdminStudentsView } from '../admin/AdminStudentsView';
import { AdminContentView } from '../admin/AdminContentView';
import { AdminAuditView } from '../admin/AdminAuditView';

interface AdminPanelModuleProps {
  onBack: () => void;
  onSaveAttendance: (record: AttendanceRecord) => void;
  attendanceRecords: AttendanceRecord[];
}

type AdminTab = 'resumen' | 'clases' | 'estudiantes' | 'contenido' | 'auditoria';

export const AdminPanelModule: React.FC<AdminPanelModuleProps> = ({ onBack, onSaveAttendance, attendanceRecords }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('resumen');
  const [classSubTab, setClassSubTab] = useState<'registro' | 'plan'>('registro');
  
  // Form state
  const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<AttendanceRecord['status']>('completed');
  const [topicCovered, setTopicCovered] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('correct');

    const newRecord: AttendanceRecord = {
      id: `att_${Date.now()}`,
      dateStr,
      timestamp: new Date().toISOString(),
      sessionNumber: attendanceRecords.filter(r => r.status === 'completed').length + 1,
      topicCovered,
      notes,
      status,
    };

    onSaveAttendance(newRecord);
    
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setTopicCovered('');
      setNotes('');
    }, 2000);
  };

  // Plan generation
  const completedSessions = attendanceRecords.filter(r => r.status === 'completed').length;
  const nextSessionNumber = completedSessions + 1;
  const plan = getPlanForSession(nextSessionNumber);

  return (
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-[#0F1117] flex flex-col font-jakarta pb-24">
      {/* Header */}
      <div className="bg-[#BAFF29] px-6 pt-12 pb-4 border-b-4 border-[#1E1E24] shadow-sm sticky top-0 z-30">
        <div className="flex items-center justify-between max-w-md mx-auto mb-4">
          <button 
            onClick={() => { playSound('click'); onBack(); }}
            className="w-10 h-10 rounded-full bg-white border-2 border-[#1E1E24] flex items-center justify-center cursor-pointer active:scale-95 shadow-[2px_2px_0px_0px_#1E1E24]"
          >
            <ArrowLeft className="w-5 h-5 text-[#1E1E24]" />
          </button>
          <div className="text-right">
            <h1 className="font-black text-xl text-[#1E1E24] uppercase tracking-tight">Admin Panel</h1>
          </div>
        </div>
        
        {/* Admin Tabs - Scrollable */}
        <div className="max-w-md mx-auto overflow-x-auto pb-2 -mx-6 px-6 hide-scrollbar flex gap-2">
          {[
            { id: 'resumen', label: 'Resumen' },
            { id: 'clases', label: 'Clases' },
            { id: 'estudiantes', label: 'Alumnos' },
            { id: 'contenido', label: 'Contenido' },
            { id: 'auditoria', label: 'Auditoría' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { playSound('click'); setActiveAdminTab(tab.id as AdminTab); }}
              className={`whitespace-nowrap px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider border-2 border-[#1E1E24] transition-all cursor-pointer flex-shrink-0 ${
                activeAdminTab === tab.id ? 'bg-[#1E1E24] text-white' : 'bg-white text-[#1E1E24] hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full max-w-md mx-auto p-4 space-y-6">
        
        {activeAdminTab === 'resumen' && <AdminOverview recentActivity={[]} />}
        {activeAdminTab === 'estudiantes' && <AdminStudentsView />}
        {activeAdminTab === 'contenido' && <AdminContentView />}
        {activeAdminTab === 'auditoria' && <AdminAuditView />}

        {activeAdminTab === 'clases' && (
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => { playSound('click'); setClassSubTab('registro'); }}
                className={`flex-1 py-2 rounded-xl font-black text-xs uppercase tracking-wider border-2 border-[#1E1E24] transition-all cursor-pointer ${
                  classSubTab === 'registro' ? 'bg-[#1E1E24] text-white' : 'bg-white text-[#1E1E24] hover:bg-gray-50'
                }`}
              >
                Registro
              </button>
              <button
                onClick={() => { playSound('click'); setClassSubTab('plan'); }}
                className={`flex-1 py-2 rounded-xl font-black text-xs uppercase tracking-wider border-2 border-[#1E1E24] transition-all cursor-pointer ${
                  classSubTab === 'plan' ? 'bg-[#1E1E24] text-white' : 'bg-white text-[#1E1E24] hover:bg-gray-50'
                }`}
              >
                Generador de Plan
              </button>
            </div>

            {classSubTab === 'registro' && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-[#161822] border-4 border-[#1E1E24] dark:border-[#2C2C3C] rounded-3xl p-6 shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000] space-y-6 mt-2">
            <div className="space-y-2">
              <label className="text-sm font-black text-[#1E1E24] dark:text-white uppercase tracking-widest flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" /> Fecha
              </label>
              <input 
                type="date" 
                value={dateStr}
                onChange={e => setDateStr(e.target.value)}
                className="w-full bg-[#F4F7FC] dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-xl p-3 text-[#1E1E24] dark:text-white font-bold"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-[#1E1E24] dark:text-white uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Estado
              </label>
              <select 
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full bg-[#F4F7FC] dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-xl p-3 text-[#1E1E24] dark:text-white font-bold"
              >
                <option value="completed">Clase Impartida</option>
                <option value="cancelled">Clase Cancelada</option>
                <option value="absence">Ausencia del Alumno</option>
                <option value="none">Sin Sesión</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-[#1E1E24] dark:text-white uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4" /> Tema Cubierto
              </label>
              <input 
                type="text" 
                value={topicCovered}
                onChange={e => setTopicCovered(e.target.value)}
                placeholder="Ej. Ecuaciones de 1er Grado"
                className="w-full bg-[#F4F7FC] dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-xl p-3 text-[#1E1E24] dark:text-white font-bold"
                required={status === 'completed'}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-[#1E1E24] dark:text-white uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4" /> Observaciones (Opcional)
              </label>
              <textarea 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Comportamiento, dudas frecuentes..."
                rows={3}
                className="w-full bg-[#F4F7FC] dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-xl p-3 text-[#1E1E24] dark:text-white font-bold resize-none"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 font-black text-sm uppercase tracking-widest rounded-2xl border-4 border-[#1E1E24] flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isSaved 
                  ? 'bg-green-400 text-[#1E1E24]' 
                  : 'bg-[#1E1E24] text-white active:scale-95 shadow-[4px_4px_0px_0px_#BAFF29]'
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Guardado
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Registrar Clase
                </>
              )}
            </button>
          </form>
        )}

        {activeAdminTab === 'clases' && classSubTab === 'plan' && (
          <div className="space-y-6 mt-2">
            {/* Plan Info Card */}
            <div className="bg-white dark:bg-[#161822] border-4 border-[#1E1E24] dark:border-[#2C2C3C] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000]">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList className="w-6 h-6 text-[#1E1E24] dark:text-white" />
                <h2 className="font-black text-xl text-[#1E1E24] dark:text-white tracking-tight">Siguiente Sesión: #{nextSessionNumber}</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-black uppercase text-gray-400 block">Módulo</span>
                  <p className="font-bold text-[#1E1E24] dark:text-[#F4F7FC]">{plan.moduleTitle}</p>
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-gray-400 block">Tema Principal</span>
                  <p className="font-bold text-[#1E1E24] dark:text-[#F4F7FC]">{plan.topicTitle}</p>
                </div>
              </div>
            </div>

            {/* Stages */}
            <div className="space-y-4">
              {plan.stages.map((stage, idx) => {
                let icon = <BookOpen className="w-5 h-5 text-white" />;
                let bgColor = "bg-blue-500";
                
                if (stage.type === 'demo') {
                  icon = <Presentation className="w-5 h-5 text-white" />;
                  bgColor = "bg-purple-500";
                } else if (stage.type === 'autonomous') {
                  icon = <Swords className="w-5 h-5 text-white" />;
                  bgColor = "bg-orange-500";
                } else if (stage.type === 'boss') {
                  icon = <Flame className="w-5 h-5 text-[#1E1E24]" />;
                  bgColor = "bg-[#FEE041]";
                }

                return (
                  <div key={idx} className="bg-white dark:bg-[#161822] border-4 border-[#1E1E24] dark:border-[#2C2C3C] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000]">
                    <div className={`${bgColor} border-b-4 border-[#1E1E24] dark:border-[#2C2C3C] p-3 flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        {icon}
                        <h3 className={`font-black uppercase tracking-tight ${stage.type === 'boss' ? 'text-[#1E1E24]' : 'text-white'}`}>
                          {stage.title}
                        </h3>
                      </div>
                      <span className={`text-xs font-black ${stage.type === 'boss' ? 'text-[#1E1E24]' : 'text-white/80'}`}>
                        {stage.timeRange}
                      </span>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <p className="font-bold text-sm text-[#1E1E24] dark:text-gray-300">
                        {stage.description}
                      </p>
                      
                      {stage.actionHint && (
                        <div className="bg-[#F4F7FC] dark:bg-[#202334] p-3 rounded-xl border-2 border-[#1E1E24] dark:border-[#3E4259]">
                          <p className="text-xs font-bold text-[#1E1E24] dark:text-white">
                            {stage.actionHint}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}
          </div>
        )}
      </div>
    </div>
  );
};
