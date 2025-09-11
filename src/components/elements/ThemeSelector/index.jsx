import { Moon, Sun } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const ThemeSelector = () => {
  const { isDarkMode, toggleTheme } = useDarkMode();

  const buttonDesain = isDarkMode
    ? 'text-slate-400 hover:text-yellow-400'
    : 'text-slate-600 hover:text-blue-600';

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center rounded-lg transition-all duration-200 ${buttonDesain}`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeSelector;
