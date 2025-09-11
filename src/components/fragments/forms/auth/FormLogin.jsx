import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useLoginForm from '../../../../hooks/auth/useLoginForm';
import useDarkMode from '../../../../hooks/useDarkMode';
import usePengguna from '../../../../hooks/usePengguna';
import useToast from '../../../../hooks/useToast';
import { getDashboardPathByPeran } from '../../../../utils/peranUtils';
import { Button, Checkbox, InputForm } from '../../../elements';
import FormHeader from '../FormHeader';

const FormLogin = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const { setPengguna } = usePengguna();
  const { success, error: errorToast, info, warning } = useToast();

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

  // Cek apakah user di-redirect karena token expired
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('expired') === '1') {
      warning('Sesi Anda sudah berakhir, silakan login kembali.');
    }
  }, [location.search, warning]);

  // Submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    // Cek apakah ada proses OTP yang belum selesai
    const pendingOtpUser = localStorage.getItem('userId');
    if (pendingOtpUser) {
      info(
        'Anda memiliki proses verifikasi OTP yang belum selesai. Silakan lanjutkan verifikasi.'
      );
      navigate('/verifikasi-otp');
      return;
    }
    const res = await handleLoginSubmit(e);

    if (res?.data?.peran) {
      const peran = res.data.peran;
      if (peran === 'Admin') {
        info('Login berhasil! Silakan cek email untuk verifikasi.');
        return;
      }
      success(`Selamat datang! Mengarahkan ke dashboard ${peran}...`);
      setPengguna(res.data);
      setTimeout(
        () => navigate(getDashboardPathByPeran(peran), { replace: true }),
        2500
      );
    } else if (res?.message) {
      info(res.message);
    }
  };

  useEffect(() => {
    if (error) errorToast(error);
  }, [error, errorToast]);

  return (
    <div className='w-full max-w-md mx-auto'>
      <div
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        } rounded-2xl border shadow-lg p-8`}
      >
        <FormHeader
          title='Ewastepas'
          subtitle='Masuk ke Akun Anda'
          showLogo
          className='mb-6'
        />

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
            loadingText='Memuat...'
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
