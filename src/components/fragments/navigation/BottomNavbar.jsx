// src/components/layouts/navbar/BottomNavbar.jsx
import {
  BookOpen,
  FileText,
  Home,
  LayoutDashboardIcon,
  User,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import usePengguna from '../../../hooks/usePengguna';

const BottomNavbar = () => {
  const { isDarkMode } = useDarkMode();
  const { pengguna, peran } = usePengguna();

  // base navItems
  const navItems = [
    { to: '/', label: 'Beranda', Icon: Home },
    { to: '/edukasi', label: 'Edukasi', Icon: BookOpen },
    { to: '/panduan-aplikasi', label: 'Panduan', Icon: FileText },
  ];

  // 🔹 Kalau sudah login → ganti Login jadi Dashboard sesuai peran
  if (pengguna && peran) {
    navItems.push({
      to:
        peran === 'Admin'
          ? '/dashboard/admin'
          : peran === 'Mitra Kurir'
          ? '/dashboard/mitra-kurir'
          : '/dashboard/masyarakat',
      label: 'Dashboard',
      Icon: LayoutDashboardIcon,
    });
  } else {
    navItems.push({ to: '/login', label: 'Login', Icon: User });
  }

  return (
    <nav
      className={`fixed bottom-0 z-50 w-full border-t backdrop-blur-lg md:hidden ${
        isDarkMode
          ? 'bg-slate-900/95 border-slate-700'
          : 'bg-white/95 border-slate-200'
      }`}
    >
      <div className='flex h-16 items-center px-2'>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-2 px-1 mx-1 rounded-lg transition-all duration-200
              ${
                isActive
                  ? isDarkMode
                    ? 'text-green-400'
                    : 'text-green-600'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.Icon
                  className={`w-5 h-5 mb-1 transition-transform ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-xs ${
                    isActive ? 'font-semibold' : 'font-normal'
                  }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
