import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import { LogoApp } from '../../elements/';

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`border-t pb-8 py-8 ${
        isDarkMode
          ? 'border-slate-800 bg-slate-900 text-slate-200'
          : 'border-slate-200 bg-slate-50 text-slate-700'
      }`}
    >
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          {/* Logo & Nama Aplikasi */}
          <Link
            to='/'
            className='flex items-center transition-transform hover:scale-105'
            aria-label='Kembali ke Beranda'
          >
            <LogoApp size='md' withText={true} textSize='xl' />
          </Link>

          {/* Copyright */}
          <p className='px-2 text-center text-sm leading-relaxed'>
            © {currentYear} E-wasteHub. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
