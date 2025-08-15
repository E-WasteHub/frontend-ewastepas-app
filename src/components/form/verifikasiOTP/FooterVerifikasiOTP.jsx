import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import Button from '../../common/Button';

const FooterVerifikasiOTP = ({ isLoading, kodeOTP, timer, canResend }) => {
  const { isDarkMode } = useDarkMode();

  // Button disabled jika loading, kode tidak lengkap, atau timer habis
  const isDisabled =
    isLoading || kodeOTP.length !== 6 || (timer <= 0 && !canResend);

  return (
    <div className='space-y-6'>
      {/* Submit Button */}
      <Button type='submit' disabled={isDisabled} className='w-full'>
        {isLoading ? 'Memverifikasi...' : 'Verifikasi OTP'}
      </Button>

      {/* Link Kembali ke Register */}
      <div className='text-center'>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Salah email?{' '}
          <Link
            to='/register'
            className={`font-medium hover:underline ${
              isDarkMode
                ? 'text-green-400 hover:text-green-300'
                : 'text-green-600 hover:text-green-700'
            }`}
          >
            Daftar ulang dengan email yang benar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FooterVerifikasiOTP;
