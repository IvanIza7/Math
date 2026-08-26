import React from 'react';
import { Bell } from 'lucide-react';
import { UserStats } from '../types';

interface HomeStatusBarProps {
  userStats: UserStats;
  onOpenNotifications?: () => void;
}

export const HomeStatusBar: React.FC<HomeStatusBarProps> = ({
  userStats,
  onOpenNotifications,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-2 flex-shrink-0 w-full max-w-md mx-auto">
      {/* 💎 Monedas */}
      <div className="flex-1 bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-3 py-1.5 flex items-center justify-center gap-1.5 font-jetbrains text-xs font-semibold text-white shadow-xs">
        <span className="text-sm">💎</span>
        <span>500</span>
      </div>

      {/* 🔥 Racha */}
      <div className="flex-1 bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-3 py-1.5 flex items-center justify-center gap-1.5 font-jetbrains text-xs font-semibold text-white shadow-xs">
        <span className="text-sm">🔥</span>
        <span>{userStats?.streak ?? 0}</span>
      </div>

      {/* ⭐ XP */}
      <div className="flex-1 bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-3 py-1.5 flex items-center justify-center gap-1.5 font-jetbrains text-xs font-semibold text-white shadow-xs">
        <span className="text-sm">⭐</span>
        <span>{userStats.xp} XP</span>
      </div>

      {/* 🔔 Notificaciones */}
      <button
        onClick={onOpenNotifications}
        className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-full p-2 flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#00e676] transition-colors cursor-pointer pill-btn shrink-0"
        title="Notificaciones"
      >
        <Bell className="w-4 h-4 text-[#ffd600]" />
      </button>
    </div>
  );
};
