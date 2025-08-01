import { Link, NavLink } from 'react-router-dom';
import ewasteDarkLogo from '../../assets/img/ewasteDark.png';
import ewasteLightLogo from '../../assets/img/ewasteLight.png';
import useDarkMode from '../../hooks/useDarkMode';
import {
  getAuthButtonClass,
  getNavbarStyles,
  getNavLinkClass,
} from '../../utils/navbarStyles';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  const { isDarkMode } = useDarkMode();

  const navLinks = [
    { to: '/', text: 'Beranda' },
    { to: '/edukasi', text: 'Edukasi' },
    { to: '/panduan-aplikasi', text: 'Panduan' },
    { to: '/faq', text: 'FAQ' },
  ];

  const styles = getNavbarStyles(isDarkMode);

  return (
    <header
      className={`fixed top-0 z-40 w-full border-b shadow-md backdrop-blur-md ${styles.header}`}
    >
      <div className='flex items-center justify-between px-2 py-3 mx-auto max-w-7xl'>
        <div className='flex items-center justify-between w-full lg:w-auto'>
          {/* Logo & Text */}
          <div className='flex items-center gap-2'>
            <img
              src={isDarkMode ? ewasteDarkLogo : ewasteLightLogo}
              alt='E-wasteHub Logo'
              className='w-10 h-10 rounded-xl'
            />
            <Link
              to='/'
              className={`text-xl font-bold transition-colors ${styles.logo}`}
            >
              EwasteHub
            </Link>
          </div>

          {/* Theme Selector - MOBILE ONLY */}
          <div className='block lg:hidden ml-2'>
            <ThemeSelector />
          </div>
        </div>

        <nav className='items-center hidden space-x-4 text-sm font-medium lg:flex'>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => getNavLinkClass(styles, isActive)}
              end={link.to === '/'}
            >
              {link.text}
            </NavLink>
          ))}

          <div className='flex items-center gap-4 ml-1'>
            {/* Theme Selector - DESKTOP */}
            <ThemeSelector />

            <NavLink
              to='/login'
              className={({ isActive }) =>
                getAuthButtonClass(styles, 'login', isActive)
              }
            >
              Masuk
            </NavLink>

            <NavLink
              to='/register'
              className={({ isActive }) =>
                getAuthButtonClass(styles, 'register', isActive)
              }
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
