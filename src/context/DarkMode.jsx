// src/context/DarkMode.jsx
import React, { useEffect, useState } from 'react';
import { DarkModeContext } from './DarkModeContext';

export const DarkModeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved;
    }
    return 'system';
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Calculate isDarkMode based on theme
  useEffect(() => {
    let darkMode = false;

    if (theme === 'dark') {
      darkMode = true;
    } else if (theme === 'light') {
      darkMode = false;
    } else if (theme === 'system') {
      // Check system preference
      if (typeof window !== 'undefined' && window.matchMedia) {
        darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }

    setIsDarkMode(darkMode);
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [theme]);

  // Listen for system theme changes when theme is 'system'
  useEffect(() => {
    if (
      theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia
    ) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e) => {
        setIsDarkMode(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  const value = {
    theme,
    isDarkMode,
    setTheme,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
