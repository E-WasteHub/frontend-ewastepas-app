// src/components/layouts/navbar/Navbar.jsx
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import { LogoApp, ThemeSelector } from '../../elements/';
import { ProfileDropdown } from '../../fragments';

const Navbar = () => {
  const { isDarkMode } = useDarkMode();
  const [pengguna, setPengguna] = useState(null);
  const [peran, setPeran] = useState(null);

  // 🔑 ambil data dari localStorage
  useEffect(() => {
    const savedPengguna = localStorage.getItem('pengguna');
    const savedPeran = localStorage.getItem('peran');
    if (savedPengguna) setPengguna(JSON.parse(savedPengguna));
    if (savedPeran) setPeran(savedPeran);
  }, []);

  const navLinks = [
    { to: '/', text: 'Beranda' },
    { to: '/edukasi', text: 'Edukasi' },
    { to: '/panduan-aplikasi', text: 'Panduan' },
  ];

  const getNavLinkClass = (isActive) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? isDarkMode
          ? 'text-emerald-400 underline decoration-2 underline-offset-8'
          : 'text-emerald-600 underline decoration-2 underline-offset-8'
        : isDarkMode
        ? 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/50'
        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <header
      className={`fixed top-0 z-40 w-full border-b shadow-md backdrop-blur-md ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-700'
          : 'bg-white/90 border-slate-200'
      }`}
    >
      <div className='flex items-center justify-between px-4 py-3 mx-auto max-w-7xl'>
        {/* Logo */}
        <div className='flex items-center'>
          <Link to='/' className='flex items-center'>
            <LogoApp size='xl' withText={true} textSize='2xl' />
          </Link>
        </div>

        {/* Navigation Links (Desktop only) */}
        <nav className='items-center hidden space-x-4 lg:flex'>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              {link.text}
            </NavLink>
          ))}

          {/* Auth / Profile & Theme Selector (Desktop) */}
          <div className='flex items-center text-sm gap-4 ml-2'>
            <ThemeSelector />
            {pengguna ? (
              <ProfileDropdown
                pengguna={pengguna}
                peran={peran}
                onLogout={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('pengguna');
                  localStorage.removeItem('peran');
                  window.location.href = '/login';
                }}
              />
            ) : (
              <>
                <NavLink
                  to='/login'
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                      isActive
                        ? isDarkMode
                          ? 'text-emerald-400 underline decoration-2 underline-offset-4'
                          : 'text-emerald-600 underline decoration-2 underline-offset-4'
                        : isDarkMode
                        ? 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/50'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`
                  }
                >
                  Masuk
                </NavLink>
                <NavLink
                  to='/register'
                  className='px-4 py-2 rounded-md font-medium transition-colors duration-200 bg-emerald-600 text-white hover:bg-emerald-700'
                >
                  Daftar
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Right section (Mobile only) */}
        <div className='flex items-center gap-2 lg:hidden'>
          <ThemeSelector />
          {pengguna ? (
            <ProfileDropdown
              pengguna={pengguna}
              peran={peran}
              onLogout={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('pengguna');
                localStorage.removeItem('peran');
                window.location.href = '/login';
              }}
            />
          ) : (
            <>
              <NavLink
                to='/login'
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/50'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Masuk
              </NavLink>
              <NavLink
                to='/register'
                className='px-3 py-1.5 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700'
              >
                Daftar
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
