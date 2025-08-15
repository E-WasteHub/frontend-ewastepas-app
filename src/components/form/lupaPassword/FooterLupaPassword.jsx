import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import Button from '../../common/Button';

const FooterLupaPassword = ({ isLoading, successMessage }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='space-y-6'>
      {/* Submit Button */}
      <Button
        type='submit'
        disabled={isLoading || !!successMessage}
        className='w-full'
      >
        {isLoading ? 'Mengirim tautan...' : 'Kirim Tautan Reset'}
      </Button>

      {/* Link Kembali ke Login */}
      <div className='text-center'>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Ingat kata sandi Anda?{' '}
          <Link
            to='/login'
            className={`font-medium hover:underline ${
              isDarkMode
                ? 'text-green-400 hover:text-green-300'
                : 'text-green-600 hover:text-green-700'
            }`}
          >
            Kembali ke halaman masuk
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FooterLupaPassword;
