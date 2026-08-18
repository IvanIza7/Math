import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Swords, Target, Calendar, LayoutGrid } from 'lucide-react';
import { MainTab } from '../types';
import { playSound } from '../utils/sound';
import { APP_TEXTS } from '../config/appText';

interface FloatingNavProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: 'guia' as MainTab,
      label: APP_TEXTS.navigation.home,
      icon: BookOpen,
    },
    {
      id: 'arena' as MainTab,
      label: APP_TEXTS.navigation.arena,
      icon: Swords,
    },
    {
      id: 'plan' as MainTab,
      label: APP_TEXTS.navigation.classes,
      icon: Calendar,
    },
    {
      id: 'mas' as MainTab,
      label: APP_TEXTS.navigation.progress,
      icon: LayoutGrid,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#161822] border-t-2 border-x-2 border-[#1E1E24] dark:border-[#2C2C3C] rounded-t-3xl pt-2 pb-2.5 px-3 max-w-md mx-auto shadow-2xl font-jakarta transition-colors duration-200">
      <nav className="flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playSound('click');
                onTabChange(tab.id);
              }}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                isActive
                  ? 'text-[#1E1E24] dark:text-white font-black'
                  : 'text-[#8A909F] dark:text-gray-400 hover:text-[#1E1E24] dark:hover:text-white font-bold'
              }`}
            >
              <div
                className={`w-11 h-7 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#F7CA38] text-[#1E1E24] border-2 border-[#1E1E24] shadow-2xs'
                    : 'bg-transparent border-2 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className="text-[10px] tracking-tight">
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};
