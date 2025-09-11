// src/components/forms/auth/FormRegister.jsx
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useRegisterForm from '../../../../hooks/auth/useRegisterForm';
import useDarkMode from '../../../../hooks/useDarkMode';
import useToast from '../../../../hooks/useToast';
import { Button, InputForm, Label } from '../../../elements';
import FormHeader from '../FormHeader';

const FormRegister = () => {
  const { isDarkMode } = useDarkMode();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    form,
    peran,
    isLoading,
    errorField,
    errorMessage,
    successMessage,
    handleChange,
    handlePeranSelect,
    handleSubmit,
    clearError,
    clearSuccess,
  } = useRegisterForm();

  // reset pesan saat halaman dibuka ulang
  useEffect(() => {
    clearError();
    clearSuccess();
  }, [clearError, clearSuccess]);

  // tampilkan error via toast
  useEffect(() => {
    if (errorMessage) error(errorMessage);
  }, [errorMessage, error]);

  // tampilkan success via toast
  useEffect(() => {
    if (successMessage) success(successMessage);
  }, [successMessage, success]);

  // ambil peran dari query string (?peran=...)
  useEffect(() => {
    const peranParam = searchParams.get('peran');
    if (peranParam) {
      handlePeranSelect(peranParam);
    } else {
      handlePeranSelect('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // submit form registrasi
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await handleSubmit();

    if (res?.data?.id_pengguna) {
      localStorage.setItem('userId', res.data.id_pengguna);
      localStorage.setItem('userEmail', form.email);

      // simpan waktu expired OTP (5 menit)
      const expiresAt = Date.now() + 5 * 60 * 1000;
      localStorage.setItem('otpExpiresAt', expiresAt.toString());

      success('Akun berhasil dibuat. Mengarahkan ke halaman verifikasi OTP...');

      setTimeout(() => {
        navigate('/verifikasi-otp');
        clearSuccess();
      }, 2500);
    }
  };

  const roleOptions = [
    { value: 'Masyarakat', label: 'Masyarakat' },
    { value: 'Mitra Kurir', label: 'Mitra Kurir' },
  ];

  return (
    <div className='w-full max-w-lg mx-auto mt-4'>
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
          subtitle='Buat Akun Baru'
          showLogo
          className='mb-6'
        />

        {/* Form Register */}
        <form onSubmit={onSubmit} className='space-y-4'>
          {/* Pilih Peran */}
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

          {/* Input Nama */}
          <InputForm
            label='Nama Lengkap'
            name='nama_lengkap'
            type='text'
            placeholder='Masukkan nama lengkap Anda'
            value={form.nama_lengkap}
            onChange={handleChange}
            disabled={isLoading}
            required
            autoComplete='name'
            error={errorField.nama_lengkap}
          />

          {/* Input Email */}
          <InputForm
            label='Email'
            name='email'
            type='email'
            placeholder='Masukkan email Anda'
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
            required
            autoComplete='email'
            error={errorField.email}
          />

          {/* Input Kata Sandi */}
          <InputForm
            label='Kata Sandi'
            name='kata_sandi'
            type='password'
            placeholder='Masukkan kata sandi'
            value={form.kata_sandi}
            onChange={handleChange}
            disabled={isLoading}
            required
            showPasswordToggle
            autoComplete='new-password'
            error={errorField.kata_sandi}
          />

          {/* Konfirmasi Kata Sandi */}
          <InputForm
            label='Konfirmasi Kata Sandi'
            name='konfirmasi_kata_sandi'
            type='password'
            placeholder='Konfirmasi kata sandi'
            value={form.konfirmasi_kata_sandi}
            onChange={handleChange}
            disabled={isLoading}
            required
            showPasswordToggle
            autoComplete='new-password'
            error={errorField.konfirmasi_kata_sandi}
          />

          {/* Tombol Submit */}
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

        {/* Footer */}
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
              className={`${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              } font-medium transition-colors`}
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
