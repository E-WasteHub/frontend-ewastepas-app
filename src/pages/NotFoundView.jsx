// src/pages/NotFoundView.jsx
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

const NotFoundView = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-6'>
      <h1
        className={`text-6xl font-bold mb-4 ${
          isDarkMode ? 'text-green-400' : 'text-green-600'
        }`}
      >
        404
      </h1>
      <p
        className={`text-lg mb-6 text-center ${
          isDarkMode ? 'text-slate-300' : 'text-gray-700'
        }`}
      >
        Oops! Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link
        to='/'
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          isDarkMode
            ? 'bg-green-500 text-white hover:bg-green-400'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundView;
