// src/components/auth/FormResetKataSandi.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import * as authService from '../../../../services/authService';
import { Alert, Button, InputForm } from '../../../elements';
import FormHeader from '../FormHeader';

const FormResetKataSandi = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 🔹 state lokal
  const [kataSandi, setKataSandi] = useState('');
  const [konfirmasiKataSandi, setKonfirmasiKataSandi] = useState('');
  const [errorGlobal, setErrorGlobal] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ambil OTP dari query
  const otp = searchParams.get('otp');

  // handler input
  const ubahKataSandi = (e) => {
    setKataSandi(e.target.value);
    setErrorGlobal('');
    setErrorInput('');
    setSuccessMessage('');
  };

  const ubahKonfirmasiKataSandi = (e) => {
    setKonfirmasiKataSandi(e.target.value);
    setErrorGlobal('');
    setErrorInput('');
    setSuccessMessage('');
  };

  // submit reset
  const kirimResetKataSandi = async (e) => {
    e.preventDefault();
    setErrorGlobal('');
    setSuccessMessage('');

    // validasi manual
    if (!kataSandi) {
      setErrorGlobal('Kata sandi baru wajib diisi');
      setErrorInput('kataSandi');
      return;
    }
    if (kataSandi.length < 6) {
      setErrorGlobal('Kata sandi minimal 6 karakter');
      setErrorInput('kataSandi');
      return;
    }
    if (!konfirmasiKataSandi) {
      setErrorGlobal('Konfirmasi kata sandi wajib diisi');
      setErrorInput('konfirmasiKataSandi');
      return;
    }
    if (kataSandi !== konfirmasiKataSandi) {
      setErrorGlobal('Konfirmasi kata sandi tidak cocok');
      setErrorInput('konfirmasiKataSandi');
      return;
    }
    if (!otp) {
      setErrorGlobal(
        'Kode OTP tidak ditemukan. Silakan coba lagi lewat link baru.'
      );
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
      setErrorGlobal(err.message || 'Reset password gagal');
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
        {errorGlobal && (
          <Alert
            type='error'
            message={errorGlobal}
            className='mb-4'
            onClose={() => setErrorGlobal('')}
          />
        )}

        {/* Form */}
        <form onSubmit={kirimResetKataSandi} className='space-y-4'>
          <InputForm
            type='password'
            label='Kata Sandi Baru'
            name='kataSandi'
            placeholder='Masukkan kata sandi baru'
            value={kataSandi}
            onChange={ubahKataSandi}
            disabled={isLoading}
            required
            error={errorInput === 'kataSandi' ? errorGlobal : ''}
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
            onChange={ubahKonfirmasiKataSandi}
            disabled={isLoading}
            required
            error={errorInput === 'konfirmasiKataSandi' ? errorGlobal : ''}
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
