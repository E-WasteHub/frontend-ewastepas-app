// src/components/fragments/forms/auth/FormPemulihanAkun.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDarkMode, usePemulihanAkun, useToast } from '../../../../hooks';

import { Button, InputForm } from '../../../elements';
import FormHeader from '../FormHeader';

const FormPemulihanAkun = () => {
  const { isDarkMode } = useDarkMode();
  const { success, error } = useToast();

  const {
    email,
    isLoading,
    pesanErrorField,
    pesanErrorGlobal,
    pesanSukses,
    handleUbahEmail,
    handleKirimLinkReset,
    setPesanErrorGlobal,
    setPesanSukses,
  } = usePemulihanAkun();

  // Reset pesan saat halaman dibuka
  useEffect(() => {
    setPesanErrorGlobal('');
    setPesanSukses('');
  }, [setPesanErrorGlobal, setPesanSukses]);

  // Tampilkan error global dengan toast
  useEffect(() => {
    if (pesanErrorGlobal) error(pesanErrorGlobal);
  }, [pesanErrorGlobal, error]);

  // Tampilkan pesan sukses dengan toast dan auto-reset setelah delay
  useEffect(() => {
    if (pesanSukses) {
      success(pesanSukses);
      const timer = setTimeout(() => setPesanSukses(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [pesanSukses, success, setPesanSukses]);

  return (
    <div className='w-full max-w-md mx-auto'>
      <div
        className={`rounded-2xl border shadow-lg p-8 ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <FormHeader
          title='Ewastepas'
          subtitle='Lupa Kata Sandi'
          showLogo
          className='mb-6'
        />

        <p
          className={`text-center text-sm mb-4 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Masukkan email Anda untuk menerima link reset kata sandi
        </p>

        <form onSubmit={handleKirimLinkReset} className='space-y-4' noValidate>
          <InputForm
            label='Email'
            name='email'
            type='email'
            placeholder='Masukkan email Anda'
            value={email}
            onChange={handleUbahEmail}
            disabled={isLoading}
            required
            error={pesanErrorField}
          />

          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
            loadingText='Mengirim...'
            className='w-full my-3'
          >
            Kirim Link Reset
          </Button>
        </form>

        <div
          className={`text-center text-sm mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
            Ingat kata sandi?{' '}
            <Link
              to='/login'
              className={`font-medium transition-colors ${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              }`}
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
