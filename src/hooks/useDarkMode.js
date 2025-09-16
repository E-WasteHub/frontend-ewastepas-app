import { useContext } from 'react';
import { DarkMode } from '../context/DarkMode';

const useDarkMode = () => {
  const context = useContext(DarkMode);

  if (context === undefined) {
    throw new Error('useDarkMode harus digunakan dalam DarkModeProvider');
  }

  // fungsi helper
  const setModeTerang = () => context.setIsDarkMode(false);
  const setModeGelap = () => context.setIsDarkMode(true);

  const toggleTheme = () => {
    context.setIsDarkMode(!context.isDarkMode);
  };

  return {
    isDarkMode: context.isDarkMode,
    setIsDarkMode: context.setIsDarkMode,
    setModeTerang,
    setModeGelap,
    toggleTheme,
  };
};

export default useDarkMode;
