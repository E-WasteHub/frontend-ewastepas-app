// src/components/auth/FormResetKataSandi.jsx
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useResetKataSandi from '../../../../hooks/auth/useResetKataSandi';
import useDarkMode from '../../../../hooks/useDarkMode';
import { Alert, Button, InputForm } from '../../../elements';
import FormHeader from '../FormHeader';

const FormResetKataSandi = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const otp = searchParams.get('otp');

  // 🔹 Gunakan custom hook
  const {
    kataSandi,
    konfirmasiKataSandi,
    isLoading,
    error,
    errorField,
    successMessage,
    handleInputKataSandi,
    handleInputKonfirmasiKataSandi,
    handleSubmitReset,
    clearError,
  } = useResetKataSandi();

  // 🔹 Redirect ke login setelah sukses reset
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

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
          subtitle='Reset Kata Sandi'
          showLogo
          className='mb-6'
        />

        {/* Deskripsi */}
        <p
          className={`text-center text-sm mb-4 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Masukkan kata sandi baru Anda dan konfirmasi kata sandi
        </p>

        {/* Alerts */}
        {successMessage && (
          <Alert type='success' message={successMessage} className='mb-4' />
        )}
        {error && (
          <Alert
            type='error'
            message={error}
            className='mb-4'
            onClose={clearError}
          />
        )}

        {/* Form */}
        <form onSubmit={(e) => handleSubmitReset(e, otp)} className='space-y-4'>
          <InputForm
            type='password'
            label='Kata Sandi Baru'
            name='kataSandi'
            placeholder='Masukkan kata sandi baru'
            value={kataSandi}
            onChange={handleInputKataSandi}
            disabled={isLoading}
            required
            error={errorField === 'kataSandi' ? error : ''}
            showPasswordToggle
            autoComplete='new-password'
            className='text-sm'
          />

          <InputForm
            type='password'
            label='Konfirmasi Kata Sandi'
            name='konfirmasiKataSandi'
            placeholder='Konfirmasi kata sandi baru'
            value={konfirmasiKataSandi}
            onChange={handleInputKonfirmasiKataSandi}
            disabled={isLoading}
            required
            error={errorField === 'konfirmasiKataSandi' ? error : ''}
            showPasswordToggle
            autoComplete='new-password'
            className='text-sm'
          />

          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
            loadingText='Menyimpan...'
            className='w-full mt-6'
          >
            Simpan Kata Sandi Baru
          </Button>
        </form>

        {/* Footer */}
        <div
          className={`text-center text-sm mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
            Sudah ingat kata sandi?{' '}
            <Link
              to='/login'
              className={`${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              } font-medium transition-colors`}
            >
              Kembali ke halaman masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormResetKataSandi;
