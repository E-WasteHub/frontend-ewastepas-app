// src/components/auth/FormResetKataSandi.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import * as authService from '../../../../services/authService';
import { Alert, Button, Input } from '../../../elements';
import FormHeader from '../FormHeader';

const FormResetKataSandi = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // state lokal
  const [kataSandi, setKataSandi] = useState('');
  const [konfirmasiKataSandi, setKonfirmasiKataSandi] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorField, setErrorField] = useState('');

  // ambil OTP dari query
  const otp = searchParams.get('otp');

  // handler input
  const handleInputKataSandi = (e) => {
    setKataSandi(e.target.value);
    setError('');
    setErrorField('');
    setSuccessMessage('');
  };

  const handleInputKonfirmasiKataSandi = (e) => {
    setKonfirmasiKataSandi(e.target.value);
    setError('');
    setErrorField('');
    setSuccessMessage('');
  };

  // submit reset
  const handleSubmitReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // validasi manual
    if (!kataSandi) {
      setError('Kata sandi baru wajib diisi');
      setErrorField('kataSandi');
      return;
    }
    if (kataSandi.length < 6) {
      setError('Kata sandi minimal 6 karakter');
      setErrorField('kataSandi');
      return;
    }
    if (!konfirmasiKataSandi) {
      setError('Konfirmasi kata sandi wajib diisi');
      setErrorField('konfirmasiKataSandi');
      return;
    }
    if (kataSandi !== konfirmasiKataSandi) {
      setError('Konfirmasi kata sandi tidak cocok');
      setErrorField('konfirmasiKataSandi');
      return;
    }
    if (!otp) {
      setError('Kode OTP tidak ditemukan. Silakan coba lagi lewat link baru.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.resetPassword({
        otp,
        kata_sandi: kataSandi,
        konfirmasi_kata_sandi: konfirmasiKataSandi,
      });
      setSuccessMessage(res.message || 'Reset kata sandi berhasil');
      setKataSandi('');
      setKonfirmasiKataSandi('');
    } catch (err) {
      setError(err.message || 'Reset password gagal');
    } finally {
      setIsLoading(false);
    }
  };

  // redirect ke login kalau sukses
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
        {error && <Alert type='error' message={error} className='mb-4' />}

        {/* Form */}
        <form onSubmit={handleSubmitReset} className='space-y-4'>
          <Input
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
            className='text-sm'
          />
          <Input
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
              className={
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              }
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
