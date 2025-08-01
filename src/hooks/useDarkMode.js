import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }

  // Helper functions
  const setLightMode = () => context.setTheme('light');
  const setDarkMode = () => context.setTheme('dark');
  const setSystemMode = () => context.setTheme('system');

  const toggleTheme = () => {
    if (context.theme === 'light') {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  return {
    theme: context.theme,
    isDarkMode: context.isDarkMode,
    setTheme: context.setTheme,
    setLightMode,
    setDarkMode,
    setSystemMode,
    toggleTheme,
  };
};

export default useDarkMode;
