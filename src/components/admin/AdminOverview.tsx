import React from 'react';
import { Users, BookOpen, Presentation, ShieldAlert, Activity } from 'lucide-react';
import { AdminActionLog } from '../../types';

interface AdminOverviewProps {
  recentActivity: AdminActionLog[];
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ recentActivity }) => {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#161822] p-4 rounded-2xl border-4 border-[#1E1E24] dark:border-[#2C2C3C] shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000]">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-black uppercase">Estudiantes</span>
          </div>
          <p className="text-3xl font-black text-[#1E1E24] dark:text-white">124</p>
          <p className="text-xs font-bold text-green-500 mt-1">↑ 12 esta semana</p>
        </div>

        <div className="bg-white dark:bg-[#161822] p-4 rounded-2xl border-4 border-[#1E1E24] dark:border-[#2C2C3C] shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000]">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-black uppercase">Sesiones</span>
          </div>
          <p className="text-3xl font-black text-[#1E1E24] dark:text-white">89</p>
          <p className="text-xs font-bold text-[#8A909F] mt-1">Impartidas total</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#161822] rounded-3xl border-4 border-[#1E1E24] dark:border-[#2C2C3C] p-5 shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#1E1E24] dark:text-white" />
            <h3 className="font-black text-[#1E1E24] dark:text-white tracking-tight uppercase">Actividad Reciente</h3>
          </div>
          <button className="text-xs font-bold text-blue-500 hover:underline">Ver toda</button>
        </div>

        <div className="space-y-4">
          {/* Mock Activity List as requested by user */}
          <div className="flex gap-3 border-b-2 border-gray-100 dark:border-[#2C2C3C] pb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <span className="text-sm">👤</span>
            </div>
            <div>
              <p className="text-sm text-[#1E1E24] dark:text-gray-300">
                <span className="font-black">Iván</span> completó:
                <br />Trial de ecuaciones
              </p>
              <p className="text-xs text-gray-400 font-bold mt-1">Hace 12 min</p>
            </div>
          </div>

          <div className="flex gap-3 border-b-2 border-gray-100 dark:border-[#2C2C3C] pb-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <span className="text-sm">🔓</span>
            </div>
            <div>
              <p className="text-sm text-[#1E1E24] dark:text-gray-300">
                <span className="font-black">Ana</span> desbloqueó:
                <br />Factorización
              </p>
              <p className="text-xs text-gray-400 font-bold mt-1">Hace 1 h</p>
            </div>
          </div>
          
          <div className="flex gap-3 pb-1">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <span className="text-sm">✅</span>
            </div>
            <div>
              <p className="text-sm text-[#1E1E24] dark:text-gray-300">
                <span className="font-black">Carlos</span> completó:
                <br />Sesión #6
              </p>
              <p className="text-xs text-gray-400 font-bold mt-1">Hace 2 h</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Admin Alerts */}
      <div className="bg-[#FFF4F4] dark:bg-[#3E1C1C] rounded-3xl border-4 border-[#EF4444] p-5 shadow-[4px_4px_0px_0px_#EF4444]">
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert className="w-5 h-5 text-[#EF4444]" />
          <h3 className="font-black text-[#EF4444] tracking-tight uppercase">Alertas de Auditoría</h3>
        </div>
        <p className="text-sm text-[#1E1E24] dark:text-white font-bold">
          Se detectaron 2 posibles inconsistencias de XP en la base de datos.
        </p>
        <button className="mt-3 px-4 py-2 bg-[#EF4444] text-white font-black text-xs uppercase tracking-wider rounded-xl">
          Ir a Auditoría
        </button>
      </div>
    </div>
  );
};
