import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useDarkMode from '../../hooks/useDarkMode';

const ThemeSelector = () => {
  const { theme, isDarkMode, setTheme } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find((t) => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Monitor;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
          isDarkMode
            ? 'text-slate-400 hover:text-green-400 hover:bg-slate-800/70 bg-slate-800/30'
            : 'text-slate-600 hover:text-green-600 hover:bg-slate-200 bg-slate-100'
        } ${
          isOpen
            ? isDarkMode
              ? 'bg-slate-800/70 text-green-400 ring-1 ring-green-500/30'
              : 'bg-slate-100 text-green-600 ring-1 ring-green-300/50'
            : ''
        }`}
        aria-label={`Current theme: ${theme}`}
      >
        <CurrentIcon size={18} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-40 rounded-xl shadow-xl z-50 overflow-hidden backdrop-blur-sm ${
            isDarkMode
              ? 'bg-slate-800/95 ring-1 ring-slate-700/50'
              : 'bg-white/95 ring-1 ring-slate-200/50'
          }`}
        >
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = theme === themeOption.value;

            return (
              <button
                key={themeOption.value}
                onClick={() => handleThemeChange(themeOption.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-green-600/20 text-green-400 font-medium'
                      : 'bg-green-50 text-green-700 font-medium'
                    : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-700/50 hover:text-green-400'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-green-600'
                }`}
              >
                <Icon size={16} />
                <span>{themeOption.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
