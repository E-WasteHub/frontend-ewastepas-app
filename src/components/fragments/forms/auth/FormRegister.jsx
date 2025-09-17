import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDarkMode, useRegisterForm, useToast } from '../../../../hooks';
import { simpanOtpDenganKadaluarsa } from '../../../../utils/authUtils';
import { Button, InputForm, Label } from '../../../elements';
import FormHeader from '../FormHeader';

const FormRegister = () => {
  const { isDarkMode } = useDarkMode();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    formRegistrasi,
    peran,
    isLoading,
    errorField,
    pesanError,
    pesanSukses,
    handleChange,
    handlePeranSelect,
    handleSubmit,
    clearError,
    clearSuccess,
  } = useRegisterForm();

  // reset pesan saat mount
  useEffect(() => {
    clearError();
    clearSuccess();
  }, [clearError, clearSuccess]);

  // ambil peran dari query string (?peran=...) atau set default
  useEffect(() => {
    const peranParam = searchParams.get('peran');
    handlePeranSelect(peranParam || 'Masyarakat');
  }, [searchParams, handlePeranSelect]);

  // tampilkan toast error sekali
  useEffect(() => {
    if (pesanError) {
      error(pesanError);
      clearError();
    }
  }, [pesanError, error, clearError]);

  // tampilkan toast sukses sekali
  useEffect(() => {
    if (pesanSukses) {
      success(pesanSukses);
      clearSuccess();
    }
  }, [pesanSukses, success, clearSuccess]);

  // submit register
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await handleSubmit();
    if (!res?.data?.id_pengguna) return;

    // simpan info otp di localStorage
    localStorage.setItem('userId', res.data.id_pengguna);
    localStorage.setItem('userEmail', formRegistrasi.email);

    // simpan otp expiry
    simpanOtpDenganKadaluarsa(5 * 60);
    navigate('/verifikasi-otp');
  };

  const roleOptions = [
    { value: 'Masyarakat', label: 'Masyarakat' },
    { value: 'Mitra Kurir', label: 'Mitra Kurir' },
  ];

  return (
    <div className='w-full max-w-lg mx-auto mt-4'>
      <div
        className={`rounded-2xl border shadow-lg p-8 ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <FormHeader
          title='Ewastepas'
          subtitle='Buat Akun Baru'
          showLogo
          className='mb-6'
        />

        <form onSubmit={onSubmit} className='space-y-4'>
          {/* pilih peran */}
          <div>
            <Label htmlFor='peran' error={errorField.peran}>
              Pilih Peran
            </Label>
            <div className='flex gap-2'>
              {roleOptions.map((role) => (
                <button
                  key={role.value}
                  type='button'
                  onClick={() => handlePeranSelect(role.value)}
                  disabled={isLoading}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md border transition-colors
                    ${
                      peran === role.value
                        ? 'bg-green-600 text-white border-green-600'
                        : isDarkMode
                        ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {role.label}
                </button>
              ))}
            </div>
            {errorField.peran && (
              <p className='text-sm text-red-500 mt-1'>{errorField.peran}</p>
            )}
          </div>

          {/* input nama */}
          <InputForm
            label='Nama Lengkap'
            name='nama_lengkap'
            type='text'
            placeholder='Masukkan nama lengkap Anda'
            value={formRegistrasi.nama_lengkap}
            onChange={handleChange}
            disabled={isLoading}
            required
            autoComplete='name'
            error={errorField.nama_lengkap}
          />

          {/* input email */}
          <InputForm
            label='Email'
            name='email'
            type='email'
            placeholder='Masukkan email Anda'
            value={formRegistrasi.email}
            onChange={handleChange}
            disabled={isLoading}
            required
            autoComplete='email'
            error={errorField.email}
          />

          {/* input kata sandi */}
          <InputForm
            label='Kata Sandi'
            name='kata_sandi'
            type='password'
            placeholder='Masukkan kata sandi'
            value={formRegistrasi.kata_sandi}
            onChange={handleChange}
            disabled={isLoading}
            required
            showPasswordToggle
            autoComplete='new-password'
            error={errorField.kata_sandi}
          />

          {/* konfirmasi kata sandi */}
          <InputForm
            label='Konfirmasi Kata Sandi'
            name='konfirmasi_kata_sandi'
            type='password'
            placeholder='Konfirmasi kata sandi'
            value={formRegistrasi.konfirmasi_kata_sandi}
            onChange={handleChange}
            disabled={isLoading}
            required
            showPasswordToggle
            autoComplete='off'
            error={errorField.konfirmasi_kata_sandi}
          />

          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
            loadingText='Mendaftar...'
            className='w-full'
          >
            Daftar
          </Button>
        </form>

        <div
          className={`text-center mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}
          >
            Sudah punya akun?{' '}
            <Link
              to='/login'
              className={`font-medium transition-colors ${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              }`}
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
