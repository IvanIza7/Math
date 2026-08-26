import React from 'react';
import { Bell, Star, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserAvatar } from './Illustrations';
import { UserStats, UserProfile } from '../types';
import { playSound } from '../utils/sound';
import { APP_TEXTS } from '../config/appText';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  userStats: UserStats;
  userProfile?: UserProfile;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  greetingTitle?: string;
  greetingSubtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  userStats,
  userProfile,
  onOpenProfile,
  onOpenNotifications,
  greetingTitle = APP_TEXTS.header.greetingTitle,
  greetingSubtitle,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const currentXp = userStats?.xp ?? 0;
  const progressPercent = Math.min(100, Math.round(((currentXp % 500) / 500) * 100));

  const firstName = userProfile?.name ? userProfile.name.split(' ')[0] : APP_TEXTS.header.defaultStudentName;
  const subtitleDisplay = greetingSubtitle || `${APP_TEXTS.header.greetingSubtitlePrefix} ${firstName}`;

  return (
    <header className="px-5 pt-4 pb-3 flex flex-col gap-3.5 bg-white dark:bg-[#161822] border-b border-[#EBF1FF] dark:border-[#2C2E40] transition-colors duration-200">
      {/* Top Row: Avatar + Level Progress + XP Star + Theme Toggle + Notification Bell */}
      <div className="flex items-center justify-between gap-2.5">
        {/* Left: Avatar */}
        <button
          onClick={() => {
            playSound('click');
            onOpenProfile();
          }}
          className="relative focus:outline-none transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          title={APP_TEXTS.header.profileAvatarTooltip}
        >
          <UserAvatar avatarId={userProfile?.avatarId} size={44} className="border-2 border-[#1E1E24] dark:border-[#3E4259] shadow-xs" />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-white dark:border-[#161822]" />
        </button>

        {/* Middle: My Level Progress Bar */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#1E1E24] dark:text-white uppercase tracking-wide truncate">
              {APP_TEXTS.header.levelProgressLabel}
            </span>
            <span className="text-[11px] font-black text-[#1E1E24] dark:text-white shrink-0 ml-1">
              {APP_TEXTS.header.levelPrefix} {userStats?.level ?? 1}
            </span>
          </div>

          <div className="w-full bg-[#EBF1FF] dark:bg-[#202334] border-2 border-[#1E1E24] dark:border-[#3E4259] h-3.5 rounded-full overflow-hidden p-0.5 shadow-2xs">
            <div
              className="bg-[#6F78DB] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(12, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Right: XP Star Badge */}
        <button
          onClick={() => {
            playSound('click');
            onOpenProfile();
          }}
          className="flex items-center gap-1.5 bg-[#FFF9E6] dark:bg-[#202334] hover:bg-[#FEF08A] dark:hover:bg-[#2C3048] border-2 border-[#1E1E24] dark:border-[#3E4259] px-2.5 py-1 rounded-full text-xs font-black text-[#1E1E24] dark:text-white shrink-0 shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
          title={APP_TEXTS.header.xpStarTooltip}
        >
          <Star className="w-3.5 h-3.5 fill-[#F7CA38] text-[#1E1E24]" />
          <span>{currentXp} {APP_TEXTS.header.xpSuffix}</span>
        </button>

        {/* Dark Mode Quick Switch with Micro-Animation */}
        <button
          onClick={() => {
            playSound('click');
            toggleDarkMode();
          }}
          className={`w-9 h-9 rounded-full border-2 border-[#1E1E24] dark:border-[#3E4259] flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1E24] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none cursor-pointer shrink-0 transition-all ${
            isDarkMode ? 'bg-[#38BDF8] text-[#0F172A]' : 'bg-[#FFF9E6] text-[#D97706]'
          }`}
          title={isDarkMode ? 'Cambiar a Tema Claro' : 'Cambiar a Modo Oscuro'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDarkMode ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-4 h-4 stroke-[2.5]" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-4 h-4 stroke-[2.5]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Greeting Row */}
      <div className="pt-0.5">
        <span className="text-xs font-semibold text-[#8A909F] dark:text-gray-400 block">
          {subtitleDisplay}
        </span>
        <h1 className="text-xl font-black text-[#1E1E24] dark:text-white tracking-tight flex items-center gap-1.5 whitespace-nowrap">
          <span>{greetingTitle}</span>
          <span className="text-[#6F78DB] text-base shrink-0">🎯</span>
        </h1>
      </div>
    </header>
  );
};
