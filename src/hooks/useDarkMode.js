import { useContext } from 'react';
import { DarkMode } from '../context/DarkMode';

const useDarkMode = () => {
  const context = useContext(DarkMode);

  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }

  // Helper functions
  const setLightMode = () => context.setIsDarkMode(false);
  const setDarkMode = () => context.setIsDarkMode(true);

  const toggleTheme = () => {
    context.setIsDarkMode(!context.isDarkMode);
  };

  return {
    isDarkMode: context.isDarkMode,
    setIsDarkMode: context.setIsDarkMode,
    setLightMode,
    setDarkMode,
    toggleTheme,
  };
};

export default useDarkMode;
