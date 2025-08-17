import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import { useLoginForm } from '../../../hooks/useLoginForm';
import Alert from '../../elements/Alert';
import Button from '../../elements/Button';
import { Checkbox, Input } from '../../elements/Form';
import FormHeader from './FormHeader';

const FormLogin = () => {
  const { isDarkMode } = useDarkMode();
  const {
    email,
    password,
    isLoading,
    error,
    rememberMe,
    handleInputChange,
    handleLoginSubmit,
  } = useLoginForm();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit();
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      {/* Container dengan border dan shadow seperti wireframe */}
      <div
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        } rounded-2xl border shadow-lg p-8`}
      >
        {/* Header dengan Logo */}
        <FormHeader
          title='EWasteHub'
          subtitle='Masuk ke Akun Anda'
          showLogo={true}
          className='mb-6'
        />

        {/* Error Alert */}
        {error && <Alert type='error' message={error} className='mb-4' />}

        {/* Form */}
        <form onSubmit={onSubmit} className='space-y-4'>
          {/* Email Input */}
          <div>
            <Input
              type='email'
              label='Email'
              name='email'
              placeholder='Masukkan email Anda'
              value={email}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              className='text-sm'
            />
          </div>

          {/* Password Input */}
          <div>
            <Input
              type='password'
              label='Kata sandi'
              name='password'
              placeholder='Masukkan kata sandi Anda'
              value={password}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              showPasswordToggle={true}
              className='text-sm'
            />
          </div>

          {/* Remember Me dan Lupa Password dalam satu baris */}
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                name='rememberMe'
                checked={rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <label
                className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}
              >
                Ingat saya
              </label>
            </div>
            <Link
              to='/lupa-password'
              className={`${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              } transition-colors`}
            >
              Lupa kata sandi?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
            loadingText='Masuk...'
            className='w-full mt-6'
          >
            Masuk
          </Button>
        </form>

        {/* Footer Link */}
        <div
          className={`text-center mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}
          >
            Belum punya akun?{' '}
            <Link
              to='/register'
              className={`${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              } font-medium transition-colors`}
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
