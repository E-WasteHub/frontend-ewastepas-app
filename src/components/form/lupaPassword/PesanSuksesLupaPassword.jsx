import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import Button from '../../common/Button';

const PesanSuksesLupaPassword = ({ successMessage, onReset }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='text-center space-y-6'>
      {/* Icon Success */}
      <div className='flex justify-center'>
        <div
          className={`p-4 rounded-full ${
            isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
          }`}
        >
          <CheckCircle
            className={`w-12 h-12 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}
          />
        </div>
      </div>

      {/* Judul */}
      <h3
        className={`text-xl font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Email Terkirim!
      </h3>

      {/* Pesan Success */}
      <p
        className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}
      >
        {successMessage}
      </p>

      {/* Icon Email */}
      <div className='flex justify-center'>
        <Mail
          className={`w-8 h-8 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-400'
          }`}
        />
      </div>

      {/* Instructions */}
      <div
        className={`p-4 rounded-lg border ${
          isDarkMode
            ? 'bg-slate-700/50 border-slate-600 text-slate-300'
            : 'bg-blue-50 border-blue-200 text-blue-700'
        }`}
      >
        <p className='text-sm'>
          <strong>Langkah selanjutnya:</strong>
          <br />
          1. Buka aplikasi email Anda
          <br />
          2. Cari email dari EwasteHub
          <br />
          3. Klik tautan di dalam email
          <br />
          4. Ikuti petunjuk untuk membuat kata sandi baru
        </p>
      </div>

      {/* Action Buttons */}
      <div className='space-y-3'>
        <Button onClick={onReset} variant='outline' className='w-full'>
          Kirim Email Lain
        </Button>

        <Link to='/login'>
          <Button variant='ghost' className='w-full'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Kembali ke Halaman Masuk
          </Button>
        </Link>
      </div>

      {/* Helpful Note */}
      <p
        className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}
      >
        Tidak menerima email? Periksa folder spam atau junk mail Anda.
      </p>
    </div>
  );
};

export default PesanSuksesLupaPassword;
