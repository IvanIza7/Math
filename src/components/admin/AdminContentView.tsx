import React, { useState } from 'react';
import { Lock, Unlock, Settings, ChevronDown, ChevronRight, Archive } from 'lucide-react';
import { CURRICULUM_MODULES } from '../../data/curriculum';

export const AdminContentView: React.FC = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>(CURRICULUM_MODULES[1].id);

  return (
    <div className="space-y-6">
      
      <div className="bg-[#1E1E24] text-white p-5 rounded-3xl shadow-[4px_4px_0px_0px_#BAFF29]">
        <h2 className="font-black text-xl mb-2 tracking-tight uppercase">Gestión de Contenido</h2>
        <p className="text-sm font-bold text-gray-400">Controla el acceso global a los módulos y temas, o configúralos por estudiante.</p>
      </div>

      <div className="space-y-4">
        {CURRICULUM_MODULES.map((mod) => (
          <div key={mod.id} className="bg-white dark:bg-[#161822] rounded-3xl border-4 border-[#1E1E24] dark:border-[#2C2C3C] overflow-hidden shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000]">
            
            {/* Module Header */}
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#202334] transition-colors"
              onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{mod.icon}</span>
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider block">Módulo {mod.moduleNumber}</span>
                  <h3 className="font-black text-[#1E1E24] dark:text-white">{mod.title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-md">
                  Disponible
                </span>
                {expandedModule === mod.id ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
              </div>
            </div>

            {/* Topics List */}
            {expandedModule === mod.id && (
              <div className="border-t-4 border-[#1E1E24] dark:border-[#2C2C3C] bg-gray-50 dark:bg-[#0F1117] p-4 space-y-3">
                {mod.subtopics.map(topic => (
                  <div key={topic.id} className="bg-white dark:bg-[#161822] border-2 border-[#1E1E24] dark:border-[#2C2C3C] rounded-2xl p-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#1E1E24] dark:text-white">{topic.title}</h4>
                      <p className="text-[10px] text-gray-500 font-bold mt-1">Requisitos: Ninguno</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <select className="bg-[#F4F7FC] dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] rounded-lg text-xs font-bold p-1">
                        <option value="available">🟢 Disponible</option>
                        <option value="locked">🔒 Bloqueado</option>
                        <option value="archived">📦 Archivado</option>
                      </select>
                      
                      <button className="p-2 bg-gray-200 dark:bg-[#2C2C3C] rounded-lg hover:bg-gray-300 transition-colors">
                        <Settings className="w-4 h-4 text-[#1E1E24] dark:text-white" />
                      </button>
                    </div>
                  </div>
                ))}

                <button className="w-full py-3 mt-2 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-2xl text-xs font-black uppercase text-gray-500 hover:bg-gray-100 dark:hover:bg-[#202334] transition-colors">
                  + Configurar dependencias
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
