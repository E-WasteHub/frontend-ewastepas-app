// src/components/fragments/forms/auth/FormPemulihanAkun.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usePemulihanAkun from '../../../../hooks/auth/usePemulihanAkun';
import useDarkMode from '../../../../hooks/useDarkMode';
import { Alert, Button, InputForm } from '../../../elements';
import FormHeader from '../FormHeader';

const FormPemulihanAkun = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // 🔹 Ambil state & fungsi dari custom hook
  const {
    email,
    isLoading,
    errorGlobal,
    errorInput,
    pesanSukses,
    ubahEmail,
    kirimLinkReset,
    setErrorGlobal,
    setPesanSukses,
  } = usePemulihanAkun();

  // 🔹 Reset pesan/error saat halaman dibuka
  useEffect(() => {
    setErrorGlobal('');
    setPesanSukses('');
  }, [setErrorGlobal, setPesanSukses]);

  // 🔹 Redirect ke halaman reset jika link berhasil dikirim
  useEffect(() => {
    if (pesanSukses) {
      const timer = setTimeout(() => {
        setPesanSukses('');
        navigate('/reset-kata-sandi');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pesanSukses, navigate, setPesanSukses]);

  return (
    <div className='w-full max-w-md mx-auto'>
      <div
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        } rounded-2xl border shadow-lg p-8`}
      >
        {/* 🔹 Header */}
        <FormHeader
          title='EWasteHub'
          subtitle='Lupa Kata Sandi'
          showLogo
          className='mb-6'
        />

        {/* 🔹 Info */}
        <p
          className={`text-center text-sm mb-4 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Masukkan email Anda untuk menerima link reset kata sandi
        </p>

        {/* 🔹 Alerts */}
        {pesanSukses && (
          <Alert type='success' message={pesanSukses} className='mb-4' />
        )}
        {errorGlobal && (
          <Alert
            type='error'
            message={errorGlobal}
            className='mb-4'
            onClose={() => setErrorGlobal('')}
          />
        )}
        {errorInput && (
          <Alert type='error' message={errorInput} className='mb-4' />
        )}

        {/* 🔹 Form */}
        <form onSubmit={kirimLinkReset} className='space-y-4'>
          {/* Input Email */}
          <InputForm
            label='Email'
            name='email'
            type='email'
            placeholder='Masukkan email Anda'
            value={email}
            onChange={ubahEmail}
            disabled={isLoading}
            required
            error={errorInput}
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

        {/* 🔹 Footer */}
        <div
          className={`text-center mt-6 pt-4 border-t ${
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

export default FormPemulihanAkun;
