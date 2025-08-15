import { BookOpen, FileText, Home, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode';

const navItems = [
  { to: '/', label: 'Beranda', Icon: Home },
  { to: '/edukasi', label: 'Edukasi', Icon: BookOpen },
  { to: '/panduan-aplikasi', label: 'Panduan', Icon: FileText },
  { to: '/login', label: 'Profil', Icon: User },
];

const BottomNavbar = () => {
  const { isDarkMode } = useDarkMode();
  const bgColor = isDarkMode
    ? 'bg-slate-900/95 border-slate-700'
    : 'bg-white/95 border-slate-200';
  const textColor = isDarkMode ? 'text-slate-400' : 'text-slate-600';
  const activeColor = isDarkMode ? 'text-green-400' : 'text-green-600';

  return (
    <nav
      className={`fixed bottom-0 z-50 w-full border-t backdrop-blur-lg ${bgColor} md:hidden`}
    >
      <div className='flex h-16 items-center px-2'>
        {navItems.map((item) => {
          const { to, label, Icon } = item;
          return (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `
                flex flex-col items-center justify-center flex-1 py-2 px-1
                transition-all duration-200 rounded-lg mx-1
                ${isActive ? activeColor : `${textColor}`}
                ${isActive ? 'bg-green-50/20' : ''}
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={`text-xs font-medium leading-none ${
                      isActive ? 'font-semibold' : 'font-normal'
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
