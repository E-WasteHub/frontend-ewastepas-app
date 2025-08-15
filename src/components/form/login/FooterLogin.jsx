import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import Button from '../../common/Button';
import { CheckBox } from '../../common/inputs';

const FooterLogin = ({ isLoading, rememberMe, onRememberMeChange }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='space-y-6'>
      {/* Remember Me & Forgot Password */}
      <div className='flex items-center justify-between'>
        {/* Ingat Saya Checkbox */}
        <CheckBox
          id='rememberMe'
          name='rememberMe'
          checked={rememberMe}
          onChange={onRememberMeChange}
          label='Ingat saya'
          disabled={isLoading}
        />

        {/* Link Lupa Password */}
        <Link
          to='/lupa-password'
          className={`text-sm hover:underline ${
            isDarkMode
              ? 'text-green-400 hover:text-green-300'
              : 'text-green-600 hover:text-green-700'
          }`}
        >
          Lupa kata sandi?
        </Link>
      </div>

      {/* Submit Button */}
      <Button type='submit' disabled={isLoading} className='w-full'>
        {isLoading ? 'Sedang masuk...' : 'Masuk'}
      </Button>

      {/* Link ke Register */}
      <div className='text-center'>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Belum punya akun?{' '}
          <Link
            to='/register'
            className={`font-medium hover:underline ${
              isDarkMode
                ? 'text-green-400 hover:text-green-300'
                : 'text-green-600 hover:text-green-700'
            }`}
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FooterLogin;
