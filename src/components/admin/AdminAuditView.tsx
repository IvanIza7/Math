import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

export const AdminAuditView: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#EF4444] text-white p-5 rounded-3xl shadow-[4px_4px_0px_0px_#1E1E24]">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="w-6 h-6" />
          <h2 className="font-black text-xl tracking-tight uppercase">Auditoría de Progreso</h2>
        </div>
        <p className="text-sm font-bold text-white/90">
          Progress Integrity Checker. Verifica que el XP, Rachas y desbloqueos coincidan matemáticamente con el Event Log inmutable.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white dark:bg-[#161822] rounded-3xl border-4 border-[#1E1E24] dark:border-[#2C2C3C] p-5 shadow-[4px_4px_0px_0px_#1E1E24] dark:shadow-[4px_4px_0px_0px_#000000]">
        
        <button 
          onClick={handleScan}
          disabled={isScanning}
          className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-4 border-[#1E1E24] shadow-[4px_4px_0px_0px_#1E1E24] active:scale-95 ${
            isScanning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#BAFF29] text-[#1E1E24]'
          }`}
        >
          {isScanning ? (
            <span className="animate-pulse">Ejecutando Escaneo...</span>
          ) : (
            <>
              <SearchIcon className="w-5 h-5" />
              Ejecutar Integrity Scan
            </>
          )}
        </button>

        {/* Scan Results */}
        {scanComplete && (
          <div className="mt-6 space-y-4">
            <h3 className="font-black text-lg text-[#1E1E24] dark:text-white uppercase">Resultados:</h3>
            
            <div className="bg-[#FFF4F4] dark:bg-[#3E1C1C] border-2 border-[#EF4444] rounded-2xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-xs font-black uppercase text-[#EF4444]">Inconsistencia Detectada</span>
                  </div>
                  <p className="font-bold text-sm text-[#1E1E24] dark:text-white">Estudiante: Ana López</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    XP Acumulado (1,250) no coincide con la suma de eventos (1,100). Faltan registros que justifiquen +150 XP.
                  </p>
                </div>
                <button className="px-3 py-2 bg-[#EF4444] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Recalcular
                </button>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-black uppercase text-green-600 dark:text-green-400">Integridad Confirmada</span>
              </div>
              <p className="font-bold text-sm text-[#1E1E24] dark:text-white">Estudiante: Iván Z.</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Todos los eventos y dependencias coinciden matemáticamente.</p>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
