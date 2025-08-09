import { Link } from 'react-router-dom';
// Impor gambar dengan benar
import ewasteDarkLogo from '../../assets/img/ewasteDark.png';
import ewasteLightLogo from '../../assets/img/ewasteLight.png';
import useDarkMode from '../../hooks/useDarkMode';

const Footer = () => {
  // Kita tetap butuh isDarkMode hanya untuk memilih sumber gambar
  const { isDarkMode } = useDarkMode();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`
        border-t py-6 sm:py-8 md:pb-8 pb-24
        ${
          isDarkMode
            ? 'border-slate-800 bg-slate-900 text-white'
            : 'border-slate-200 bg-slate-50 text-black'
        }
      `}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex flex-col items-center justify-center space-y-3 sm:space-y-4'>
          {/* Logo dan Nama Aplikasi */}
          <Link
            to='/'
            className='flex items-center'
            aria-label='Kembali ke Beranda'
          >
            <img
              src={isDarkMode ? ewasteDarkLogo : ewasteLightLogo}
              alt='E-wasteHub Logo'
              className='h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3'
            />
            <span
              className={`text-lg sm:text-xl font-bold ${
                isDarkMode ? 'text-green-600' : 'text-green-400'
              }`}
            >
              EwasteHub
            </span>
          </Link>

          {/* Copyright */}
          <p
            className={`px-2 text-center text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            © {currentYear} E-wasteHub. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
