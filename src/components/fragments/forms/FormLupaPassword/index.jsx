// src/components/auth/FormLupaPassword.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import { useLupaPasswordForm } from '../../../../hooks/useLupaPasswordForm';
import { Alert, Button, Input } from '../../../elements';
import FormHeader from '../FormHeader';

const FormLupaPassword = () => {
  const { isDarkMode } = useDarkMode();
  const {
    email,
    isLoading,
    error,
    errorField,
    successMessage,
    handleInputEmail,
    handleSubmitReset,
    setError, // dari hook
    setSuccessMessage, // dari hook
  } = useLupaPasswordForm();

  const navigate = useNavigate();

  // Bersihkan error saat mount
  useEffect(() => {
    setError('');
    setSuccessMessage('');
  }, [setError, setSuccessMessage]);

  // Redirect user setelah berhasil kirim link reset
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(''); // biar pesan tidak kebawa
        navigate('/reset-kata-sandi');
      }, 2000); // delay 2 detik
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate, setSuccessMessage]);

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
          subtitle='Lupa Kata Sandi'
          showLogo
          className='mb-6'
        />

        {/* Deskripsi */}
        <p
          className={`text-center text-sm mb-4 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Masukkan email Anda untuk menerima link reset kata sandi
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
            onClose={() => setError('')}
          />
        )}
        {errorField && (
          <Alert type='error' message={errorField} className='mb-4' />
        )}

        {/* Form */}
        <form onSubmit={handleSubmitReset} className='space-y-4'>
          <Input
            type='email'
            label='Email'
            name='email'
            placeholder='Masukkan email Anda'
            value={email}
            onChange={handleInputEmail}
            disabled={isLoading}
            required
            error={errorField}
            className='text-sm'
          />

          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
            loadingText='Mengirim...'
            className='w-full mt-6'
          >
            Kirim Link Reset
          </Button>
        </form>

        {/* Footer */}
        <div
          className={`text-center text-sm mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
            Ingat kata sandi?{' '}
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

export default FormLupaPassword;
