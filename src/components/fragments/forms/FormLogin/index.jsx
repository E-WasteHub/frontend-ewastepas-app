import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import { useLoginForm } from '../../../../hooks/useLoginForm';
import useAuthStore from '../../../../store/authStore';
import { Alert, Button, Checkbox, Input } from '../../../elements';
import FormHeader from '../FormHeader';

const FormLogin = () => {
  const { isDarkMode } = useDarkMode();
  const {
    email,
    kata_sandi,
    isLoading,
    errorField,
    error,
    rememberMe,
    handleInputChange,
    handleLoginSubmit,
  } = useLoginForm();

  const clearError = useAuthStore((state) => state.clearError);

  // ✅ Bersihkan error tiap kali halaman Login di-mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit();
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <div
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        } rounded-2xl border shadow-lg p-8`}
      >
        {/* Header */}
        <FormHeader
          title='EWasteHub'
          subtitle='Masuk ke Akun Anda'
          showLogo
          className='mb-6'
        />

        {/* Error Alert (global) */}
        {error && (
          <Alert
            type='error'
            message={error}
            className='my-3'
            onClose={() => clearError()}
          />
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className='space-y-4'>
          {/* Email */}
          <Input
            type='email'
            name='email'
            label='Email'
            placeholder='Masukkan email Anda'
            value={email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            error={errorField?.email} // ✅ khusus error field-level
            className='text-sm'
          />

          {/* Kata Sandi */}
          <Input
            type='password'
            name='kata_sandi'
            label='Kata Sandi'
            placeholder='Masukkan kata sandi Anda'
            value={kata_sandi}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            showPasswordToggle
            error={errorField?.kata_sandi} // ✅ khusus error field-level
            className='text-sm'
          />

          {/* Remember Me & Lupa Password */}
          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center space-x-2'>
              <Checkbox
                name='rememberMe'
                checked={rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                Ingat saya
              </span>
            </label>

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

        {/* Footer */}
        <div
          className={`text-center text-sm mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
            Belum punya akun?{' '}
            <Link
              to='/register'
              className={`${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              } font-semibold transition-colors`}
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
