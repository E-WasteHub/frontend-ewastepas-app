import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import { LogoApp } from '../../elements/';

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`border-t py-12 ${
        isDarkMode
          ? 'border-slate-800 bg-slate-900 text-slate-200'
          : 'border-slate-200 bg-slate-50 text-slate-700'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-6 md:space-y-4'>
          {/* Logo & Nama Aplikasi */}
          <Link
            to='/'
            className='flex items-center transition-transform hover:scale-105'
            aria-label='Kembali ke Beranda'
          >
            <LogoApp withText className='w-8 h-8 text-lg md:text-xl' />
          </Link>

          {/* Copyright */}
          <p className='px-2 text-center leading-relaxed text-sm md:text-base'>
            © {currentYear} E-wasteHub. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
