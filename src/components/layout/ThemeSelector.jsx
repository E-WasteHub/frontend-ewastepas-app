import { Moon, Sun } from 'lucide-react';
import useDarkMode from '../../hooks/useDarkMode';

const ThemeSelector = () => {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
        isDarkMode
          ? 'text-slate-400 hover:text-yellow-400 hover:bg-slate-800/70 bg-slate-800/30'
          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200 bg-slate-100'
      }`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeSelector;
