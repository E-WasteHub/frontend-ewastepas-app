// src/components/auth/FormResetKataSandi.jsx
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useDarkMode, useResetKataSandi, useToast } from '../../../../hooks';

import { Button, InputForm } from '../../../elements';
import FormHeader from '../FormHeader';

const FormResetKataSandi = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const otp = searchParams.get('otp');

  const {
    formResetKataSandi,
    isLoading,
    pesanErrorGlobal,
    pesanErrorField,
    pesanSukses,
    handleInputChange,
    handleSubmitReset,
  } = useResetKataSandi();

  // Redirect ke login setelah reset sukses
  useEffect(() => {
    if (pesanSukses) {
      showToast(pesanSukses, 'success');
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pesanSukses, navigate, showToast]);

  // Tampilkan error melalui toast
  useEffect(() => {
    if (pesanErrorGlobal) showToast(pesanErrorGlobal, 'error');
  }, [pesanErrorGlobal, showToast]);

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
          title='Ewastepas'
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
          Masukkan kata sandi baru Anda dan konfirmasi ulang
        </p>

        {/* Form */}
        <form onSubmit={(e) => handleSubmitReset(e, otp)} className='space-y-4'>
          <InputForm
            type='password'
            label='Kata Sandi Baru'
            name='kata_sandi'
            placeholder='Masukkan kata sandi baru'
            value={formResetKataSandi.kata_sandi}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            error={pesanErrorField.kata_sandi}
            showPasswordToggle
            autoComplete='new-password'
            className='text-sm'
          />

          <InputForm
            type='password'
            label='Konfirmasi Kata Sandi'
            name='konfirmasi_kata_sandi'
            placeholder='Konfirmasi kata sandi baru'
            value={formResetKataSandi.konfirmasi_kata_sandi}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            error={pesanErrorField.konfirmasi_kata_sandi}
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
