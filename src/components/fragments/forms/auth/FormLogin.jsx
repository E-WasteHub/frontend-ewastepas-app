// src/components/fragments/forms/auth/FormLogin.jsx
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useDarkMode,
  useLoginForm,
  usePengguna,
  useToast,
} from '../../../../hooks';
import { dapatkanPathDashboardBerdasarkanPeran } from '../../../../utils/peranUtils';

import { Button, Checkbox, InputForm, Message } from '../../../elements';
import FormHeader from '../FormHeader';

const FormLogin = () => {
  const { isDarkMode } = useDarkMode();
  const { setPengguna } = usePengguna();
  const { success, info, warning } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    email,
    kata_sandi,
    ingatSaya,
    isLoading,
    pesanErrorGlobal,
    pesanErrorField,
    handlePerubahanInput,
    handleSubmitLogin,
  } = useLoginForm();

  // Cek query param expired / unauthorized → hanya 1 toast
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('expired') === '1') {
      warning('Sesi Anda sudah berakhir, silakan login kembali.');
    } else if (params.get('unauthorized') === '1') {
      warning('Anda tidak memiliki izin untuk mengakses halaman tersebut.');
    }
    if (params.has('expired') || params.has('unauthorized')) {
      params.delete('expired');
      params.delete('unauthorized');
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [location, warning, navigate]);

  // Handler submit form login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handleSubmitLogin(e);
    if (!response) return;

    if (response?.redirectToOtp) {
      info('Akun Anda belum aktif. Mengarahkan ke halaman verifikasi OTP...');
      setTimeout(() => navigate('/verifikasi-otp', { replace: true }), 1500);
      return;
    }

    if (response?.isAdminOtp) {
      info('OTP login Admin sudah dikirim ke email. Silakan cek email Anda.');
      return;
    }

    handleLoginBerhasil(response.data);
  };

  // Handler login berhasil (selain Admin OTP)
  const handleLoginBerhasil = (dataPengguna) => {
    const { peran } = dataPengguna;
    if (peran === 'Admin') return; // Admin OTP udah di-handle

    success(`Selamat datang! Mengarahkan ke dashboard ${peran}...`);
    setPengguna(dataPengguna);

    setTimeout(() => {
      const dashboardPath = dapatkanPathDashboardBerdasarkanPeran(peran);
      navigate(dashboardPath, { replace: true });
    }, 1500);
  };

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
          subtitle='Masuk ke Akun Anda'
          showLogo
          className='mb-6'
        />

        {pesanErrorGlobal && (
          <Message
            type='error'
            className={`text-center my-3 rounded-2xl p-4 ${
              isDarkMode
                ? 'bg-red-300 border-red-400 text-red-700'
                : 'bg-red-200 border-red-600 text-red-800'
            }`}
          >
            {pesanErrorGlobal}
          </Message>
        )}

        <form onSubmit={handleSubmit} className='space-y-4' noValidate>
          <InputForm
            label='Email'
            name='email'
            type='email'
            placeholder='Masukkan email Anda'
            value={email}
            onChange={handlePerubahanInput}
            disabled={isLoading}
            required
            error={pesanErrorField.email}
          />

          <InputForm
            label='Kata Sandi'
            name='kata_sandi'
            type='password'
            placeholder='Masukkan kata sandi Anda'
            value={kata_sandi}
            onChange={handlePerubahanInput}
            disabled={isLoading}
            required
            showPasswordToggle
            error={pesanErrorField.kata_sandi}
          />

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center space-x-2'>
              <Checkbox
                name='ingatSaya'
                checked={ingatSaya}
                onChange={handlePerubahanInput}
                disabled={isLoading}
              />
              <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                Ingat saya
              </span>
            </label>

            <Link
              to='/pemulihan-akun'
              className={`font-medium transition-colors ${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              }`}
            >
              Lupa kata sandi?
            </Link>
          </div>

          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
            loadingText='Memproses login...'
            disabled={isLoading || !email.trim() || !kata_sandi.trim()}
            className='w-full mt-6'
          >
            Masuk
          </Button>
        </form>

        <div
          className={`text-center text-sm mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
            Belum punya akun?{' '}
            <Link
              to='/register'
              className={`font-semibold transition-colors ${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              }`}
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
