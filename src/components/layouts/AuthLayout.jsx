import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode';

const BackButton = ({ isDarkMode }) => (
  <Link
    to='/'
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-md border ${
      isDarkMode
        ? 'text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 border-slate-700/50'
        : 'text-slate-700 hover:text-slate-900 bg-white/90 hover:bg-white border-gray-200/50'
    }`}
  >
    <ArrowLeft size={16} />
    Kembali ke Beranda
  </Link>
);

const ThemeToggleButton = ({ isDarkMode, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className={`p-2.5 rounded-lg transition-all duration-200 backdrop-blur-md border ${
      isDarkMode
        ? 'text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 border-slate-700/50'
        : 'text-slate-700 hover:text-slate-900 bg-white/90 hover:bg-white border-gray-200/50'
    }`}
    aria-label='Toggle theme'
  >
    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
  </button>
);

const AuthLayout = ({ children }) => {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <div className='min-h-screen relative'>
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-900'
            : 'bg-gradient-to-br from-green-50 via-white/80 to-emerald-50'
        }`}
      />

      {/* Desktop Controls */}
      <div className='hidden md:block'>
        <div className='fixed top-6 left-6 z-50'>
          <BackButton isDarkMode={isDarkMode} />
        </div>
        <div className='fixed top-6 right-6 z-50'>
          <ThemeToggleButton
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </div>
      </div>

      {/* Mobile Controls */}
      <div className='md:hidden'>
        <div className='fixed top-0 left-0 right-0 z-50 p-4'>
          <div
            className={`flex items-center justify-between p-3 rounded-xl backdrop-blur-md border ${
              isDarkMode
                ? 'bg-slate-800/95 border-slate-700/50'
                : 'bg-white/95 border-gray-200/50'
            }`}
          >
            <Link
              to='/'
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-gray-100/50'
              }`}
            >
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-gray-100/50'
              }`}
              aria-label='Toggle theme'
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10 px-4 py-8 md:py-12 pt-20 md:pt-12 min-h-screen'>
        <div className='flex items-center justify-center min-h-[calc(100vh-8rem)]'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
