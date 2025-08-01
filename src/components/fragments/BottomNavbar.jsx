import { Book, HelpCircle, Home, Recycle, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode';

const navItems = [
  { to: '/', label: 'Beranda', Icon: Home },
  { to: '/edukasi', label: 'Edukasi', Icon: Book },
  { to: '/panduan-aplikasi', label: 'Panduan', Icon: Recycle },
  { to: '/faq', label: 'Bantuan', Icon: HelpCircle },
  { to: '/login', label: 'Profil', Icon: User },
];

const BottomNavbar = () => {
  const { isDarkMode } = useDarkMode();
  const bgColor = isDarkMode
    ? 'bg-slate-900/90 border-slate-800'
    : 'bg-white border-slate-200';
  const textColor = isDarkMode ? 'text-slate-300' : 'text-slate-500';
  const activeColor = isDarkMode ? 'text-green-400' : 'text-green-600';
  const indicatorColor = isDarkMode ? 'bg-green-400' : 'bg-green-600';

  return (
    <nav
      className={`fixed bottom-0 z-50 w-full border-t backdrop-blur-md ${bgColor} md:hidden`}
    >
      <div className='flex h-16 justify-around items-center'>
        {navItems.map((item) => {
          const { to, label, Icon } = item;
          return (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `
                flex flex-col items-center justify-center w-full gap-1 pt-1
                transition-colors duration-200
                ${isActive ? activeColor : textColor}
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon className='w-5 h-5' strokeWidth={isActive ? 2.5 : 2} />
                  <span className='text-[11px] font-medium leading-none'>
                    {label}
                  </span>
                  <div
                    className={`mt-1 h-1 w-1 rounded-full transition-transform duration-300 ${indicatorColor} ${
                      isActive ? 'scale-100' : 'scale-0'
                    }`}
                  ></div>
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
