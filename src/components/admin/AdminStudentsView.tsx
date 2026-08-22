import React from 'react';
import { Search, Filter, ShieldAlert } from 'lucide-react';

export const AdminStudentsView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Search and Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar estudiante..." 
            className="w-full bg-white dark:bg-[#161822] border-4 border-[#1E1E24] dark:border-[#2C2C3C] rounded-2xl pl-10 pr-4 py-3 font-bold text-[#1E1E24] dark:text-white"
          />
        </div>
        <button className="bg-white dark:bg-[#161822] border-4 border-[#1E1E24] dark:border-[#2C2C3C] rounded-2xl p-3 flex items-center justify-center">
          <Filter className="w-5 h-5 text-[#1E1E24] dark:text-white" />
        </button>
      </div>

      {/* Student List */}
      <div className="space-y-4">
        {/* Mock Student 1 */}
        <div className="bg-white dark:bg-[#161822] rounded-3xl border-4 border-[#1E1E24] dark:border-[#2C2C3C] p-5 shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000]">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <h3 className="font-black text-lg text-[#1E1E24] dark:text-white">Ana López</h3>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nivel 7 • 🔥 6 Días</span>
              </div>
            </div>
            <button className="px-3 py-1 bg-gray-100 dark:bg-[#202334] rounded-lg text-xs font-black text-[#1E1E24] dark:text-white uppercase tracking-wider">
              Ver Perfil
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-black uppercase text-gray-500 mb-1">
                <span>Progreso General</span>
                <span className="text-blue-500">82%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-[#2C2C3C] rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            
            <div className="bg-[#F4F7FC] dark:bg-[#202334] p-3 rounded-xl border-2 border-transparent">
              <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">Tema Actual</span>
              <p className="font-bold text-sm text-[#1E1E24] dark:text-white">Ecuaciones de primer grado</p>
            </div>
          </div>
        </div>

        {/* Mock Student 2 */}
        <div className="bg-white dark:bg-[#161822] rounded-3xl border-4 border-[#1E1E24] dark:border-[#2C2C3C] p-5 shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000]">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                👦🏽
              </div>
              <div>
                <h3 className="font-black text-lg text-[#1E1E24] dark:text-white">Iván Z.</h3>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nivel 4 • 🔥 2 Días</span>
              </div>
            </div>
            <button className="px-3 py-1 bg-gray-100 dark:bg-[#202334] rounded-lg text-xs font-black text-[#1E1E24] dark:text-white uppercase tracking-wider">
              Ver Perfil
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-black uppercase text-gray-500 mb-1">
                <span>Progreso General</span>
                <span className="text-blue-500">45%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-[#2C2C3C] rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="bg-[#FFF4F4] dark:bg-[#3E1C1C] p-3 rounded-xl border-2 border-[#EF4444]/30">
              <div className="flex items-center gap-1 mb-1">
                <ShieldAlert className="w-3 h-3 text-[#EF4444]" />
                <span className="text-[10px] font-black uppercase text-[#EF4444]">Anti-Adivinanza Alert</span>
              </div>
              <p className="font-bold text-sm text-[#1E1E24] dark:text-gray-200">
                Selecciona transformaciones al azar (Score: 42/100)
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
