import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import { useRegisterForm } from '../../../../hooks/useRegisterForm';
import useAuthStore from '../../../../store/authStore';
import { Alert, Button, Input, Label } from '../../../elements';
import FormHeader from '../FormHeader';

const FormRegister = () => {
  const { isDarkMode } = useDarkMode();
  const [searchParams] = useSearchParams();

  const {
    formData,
    peran,
    isLoading,
    errorField,
    error,
    successMessage,
    handleInputChange,
    handlePeranSelect,
    handleRegisterSubmit,
  } = useRegisterForm();

  const clearError = useAuthStore((state) => state.clearError);

  // Bersihkan error global tiap kali halaman dimount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Auto set peran via query params
  useEffect(() => {
    const peranParam = searchParams.get('peran');
    const validPerans = ['masyarakat', 'mitra-kurir'];
    if (peranParam && validPerans.includes(peranParam)) {
      handlePeranSelect(peranParam);
    }
  }, [searchParams, handlePeranSelect]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegisterSubmit();
  };

  const perans = [
    { value: 'masyarakat', label: 'Masyarakat' },
    { value: 'mitra-kurir', label: 'Mitra Kurir' },
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
          title='EWasteHub'
          subtitle='Buat Akun Baru'
          showLogo={true}
          className='mb-6'
        />

        {/* Global Alert */}
        {error && (
          <Alert
            type='error'
            message={error}
            className='my-3'
            onClose={() => clearError()}
          />
        )}
        {successMessage && (
          <Alert type='success' message={successMessage} className='my-3' />
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className='space-y-4'>
          {/* Peran Selector */}
          <div>
            <Label htmlFor='peran' error={errorField.peran}>
              Pilih Peran
            </Label>
            <div className='flex gap-2'>
              {perans.map((p) => (
                <button
                  key={p.value}
                  type='button'
                  onClick={() => handlePeranSelect(p.value)}
                  disabled={isLoading}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md border transition-colors ${
                    peran === p.value
                      ? 'bg-green-600 text-white border-green-600'
                      : isDarkMode
                      ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {errorField.peran && (
              <p className='text-sm text-red-500 mt-1'>{errorField.peran}</p>
            )}
          </div>

          {/* Nama Lengkap */}
          <Input
            type='text'
            label='Nama Lengkap'
            name='nama_lengkap'
            placeholder='Masukkan nama lengkap Anda'
            value={formData.nama_lengkap}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            autoComplete='name'
            error={errorField.nama_lengkap}
            className='text-sm'
          />

          {/* Email */}
          <Input
            type='email'
            label='Email'
            name='email'
            placeholder='Masukkan email Anda'
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            autoComplete='email'
            error={errorField.email}
            className='text-sm'
          />

          {/* Kata Sandi */}
          <Input
            type='password'
            label='Kata Sandi'
            name='kata_sandi'
            placeholder='Masukkan kata sandi'
            value={formData.kata_sandi}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            showPasswordToggle={true}
            autoComplete='new-password'
            error={errorField.kata_sandi}
            className='text-sm'
          />

          {/* Konfirmasi Kata Sandi */}
          <Input
            type='password'
            label='Konfirmasi Kata Sandi'
            name='konfirmasi_kata_sandi'
            placeholder='Konfirmasi kata sandi'
            value={formData.konfirmasi_kata_sandi}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            showPasswordToggle={true}
            autoComplete='new-password'
            error={errorField.konfirmasi_kata_sandi}
            className='text-sm'
          />

          {/* Submit Button */}
          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
            loadingText='Mendaftar...'
            className='w-full mt-6'
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
