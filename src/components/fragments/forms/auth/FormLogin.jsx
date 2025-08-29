// src/components/fragments/forms/FormLogin.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import { useLoginForm } from '../../../../hooks/useLoginForm';
import { Alert, Button, Checkbox, InputForm } from '../../../elements';
import FormHeader from '../FormHeader';

const FormLogin = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

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

  const [successMessage, setSuccessMessage] = useState('');

  // --- Handler Submit ---
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await handleLoginSubmit(e);

    if (!res?.data?.nama_peran) return;

    const role = res.data.nama_peran.toLowerCase();

    // Pesan default
    let message = 'Login berhasil! Mengarahkan ke dashboard...';

    switch (role) {
      case 'masyarakat':
        setSuccessMessage(message);
        setTimeout(() => navigate('/dashboard/masyarakat'), 2000);
        break;

      case 'mitra kurir':
        setSuccessMessage(message);
        setTimeout(() => navigate('/dashboard/mitra-kurir'), 2000);
        break;

      case 'admin':
        // ✅ Admin tidak langsung redirect, pakai OTL
        setSuccessMessage(
          'Login berhasil! Silakan cek email Anda untuk melanjutkan.'
        );
        break;

      default:
        setSuccessMessage(message);
        setTimeout(() => navigate('/'), 2000);
    }
  };

  // Bersihkan pesan saat unmount
  useEffect(() => () => setSuccessMessage(''), []);

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

        {/* Alerts */}
        {error && <Alert type='error' message={error} className='my-3' />}
        {successMessage && (
          <Alert type='success' message={successMessage} className='my-3' />
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className='space-y-4'>
          <InputForm
            label='Email'
            name='email'
            type='email'
            placeholder='Masukkan email Anda'
            value={email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            error={errorField?.email}
          />

          <InputForm
            label='Kata Sandi'
            name='kata_sandi'
            type='password'
            placeholder='Masukkan kata sandi Anda'
            value={kata_sandi}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            showPasswordToggle
            error={errorField?.kata_sandi}
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
              to='/pemulihan-akun'
              className={`${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              } transition-colors`}
            >
              Lupa kata sandi?
            </Link>
          </div>

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
