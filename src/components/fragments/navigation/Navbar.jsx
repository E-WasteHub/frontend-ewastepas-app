import { Link, NavLink } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import LogoApp from '../../elements/Icon/LogoApp';
import ThemeSelector from '../../elements/ThemeSelector';

const Navbar = () => {
  const { isDarkMode } = useDarkMode();

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
        {/* Logo + Mobile Theme Selector */}
        <div className='flex items-center justify-between w-full lg:w-auto'>
          <Link to='/' className='flex items-center'>
            <LogoApp size='xl' withText={true} textSize='2xl' />
          </Link>

          {/* Theme Selector - MOBILE ONLY */}
          <div className='block lg:hidden ml-2'>
            <ThemeSelector />
          </div>
        </div>

        {/* Navigation Links */}
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

          {/* Auth Buttons & Theme Selector */}
          <div className='flex items-center text-sm gap-4 ml-2'>
            {/* Theme Selector - DESKTOP */}
            <ThemeSelector />

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
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
