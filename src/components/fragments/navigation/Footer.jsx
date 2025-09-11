import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import { LogoApp } from '../../elements/';

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const tahunSekarang = new Date().getFullYear();

  return (
    <footer
      className={`border-t py-6 ${
        isDarkMode
          ? 'border-slate-800 bg-slate-900 text-slate-300'
          : 'border-slate-200 bg-slate-50 text-slate-600'
      }`}
    >
      <div className='max-w-6xl mx-auto px-4 flex flex-col items-center gap-3'>
        {/* Logo */}
        <Link
          to='/'
          className='flex items-center transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg p-1'
          aria-label='Kembali ke Beranda'
        >
          <LogoApp withText size='lg' />
        </Link>

        {/* Copyright */}
        <p className='text-md font-medium text-center'>
          © {tahunSekarang}{' '}
          <span className='font-semibold'>
            Hak Cipta dilindungi undang-undang.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
