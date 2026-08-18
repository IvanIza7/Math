import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  setDarkMode: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('math_anti_guessing_theme');
      // Keep strictly light mode by default as requested
      if (savedTheme === 'dark') {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      const body = document.body;

      // Trigger smooth fade micro-animation class during switch
      root.classList.add('theme-transition-all');
      const timer = setTimeout(() => {
        root.classList.remove('theme-transition-all');
      }, 450);

      if (isDarkMode) {
        root.classList.add('dark');
        body?.classList.add('dark');
        localStorage.setItem('math_anti_guessing_theme', 'dark');
      } else {
        root.classList.remove('dark');
        body?.classList.remove('dark');
        localStorage.setItem('math_anti_guessing_theme', 'light');
      }

      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setDarkMode = (enabled: boolean) => {
    setIsDarkMode(enabled);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
