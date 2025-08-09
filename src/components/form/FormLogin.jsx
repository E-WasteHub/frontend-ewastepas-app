import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useDarkMode from '../../hooks/useDarkMode';
import Alert from '../common/Alert';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import GoogleIcon from '../common/GoogleIcon';
import PasswordToggle from '../common/PasswordToggle';
import FormField from './FormField';

// Use FormField as InputForm for compatibility
const InputForm = FormField;

const FormLogin = () => {
  const { isDarkMode } = useDarkMode();
  const {
    loginData: formData,
    isLoading,
    error,
    showPassword,
    updateLoginField: updateField,
    togglePassword,
    handleLogin: handleSubmit,
  } = useAuth();

  return (
    <div
      className={`p-8 rounded-2xl border shadow-xl backdrop-blur-sm ${
        isDarkMode
          ? 'bg-slate-800/95 border-slate-700/50 shadow-2xl shadow-slate-900/50'
          : 'bg-white/95 border-gray-200/50 shadow-2xl shadow-gray-900/10'
      }`}
    >
      {/* Header with Logo */}
      <div className='text-center space-y-6 mb-8'>
        {/* Logo and App Name */}
        <div className='flex items-center justify-center gap-3'>
          <img
            src={
              isDarkMode
                ? '/src/assets/img/ewasteDark.png'
                : '/src/assets/img/ewasteLight.png'
            }
            alt='EwasteHub Logo'
            className='w-12 h-12 object-contain'
          />
          <div className='flex flex-col'>
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              EwasteHub
            </h2>
            <div
              className={`w-32 h-0.5 mx-auto rounded-full ${
                isDarkMode
                  ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500'
              }`}
            />
          </div>
        </div>

        {/* Welcome Text */}
        <div className='space-y-1'>
          <h1
            className={`text-2xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Selamat Datang Kembali
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}
          >
            Masuk ke akun EwasteHub Anda
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className='mb-6'>
          <Alert type='error' message={error} />
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-5'>
        <InputForm
          label='Email'
          name='email'
          type='email'
          placeholder='nama@email.com'
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          disabled={isLoading}
          required
        />

        <div className='relative'>
          <InputForm
            label='Password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Masukkan password'
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            disabled={isLoading}
            required
          />
          <div className='absolute right-3 top-9'>
            <PasswordToggle
              showPassword={showPassword}
              onToggle={togglePassword}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className='flex items-center justify-between pt-2'>
          <CheckBox
            id='remember-me'
            name='rememberMe'
            label='Ingat saya'
            checked={formData.rememberMe}
            onChange={(e) => updateField('rememberMe', e.target.checked)}
            disabled={isLoading}
          />
          <Link
            to='/forgot-password'
            className={`text-sm font-medium transition-colors ${
              isDarkMode
                ? 'text-green-400 hover:text-green-300'
                : 'text-green-600 hover:text-green-500'
            }`}
          >
            Lupa password?
          </Link>
        </div>

        <div className='pt-2'>
          <Button type='submit' className='w-full h-12' loading={isLoading}>
            Masuk
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className='relative my-4'>
        <div className='absolute inset-0 flex items-center'>
          <div
            className={`w-full border-t ${
              isDarkMode ? 'border-slate-600' : 'border-gray-200'
            }`}
          />
        </div>
        <div className='relative flex justify-center'>
          <span
            className={`px-4 text-sm ${
              isDarkMode
                ? 'bg-slate-800 text-slate-400'
                : 'bg-white text-gray-500'
            }`}
          >
            atau
          </span>
        </div>
      </div>

      {/* Google Login */}
      <Button
        type='button'
        variant='secondary'
        disabled={isLoading}
        className='flex items-center justify-center gap-3 w-full h-12'
      >
        <GoogleIcon className='w-5 h-5' />
        <span>Masuk dengan Google</span>
      </Button>

      {/* Footer */}
      <div className='text-center mt-6 '>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Belum punya akun?{' '}
          <Link
            to='/register'
            className={`font-medium transition-colors ${
              isDarkMode
                ? 'text-green-400 hover:text-green-300'
                : 'text-green-600 hover:text-green-500'
            }`}
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
