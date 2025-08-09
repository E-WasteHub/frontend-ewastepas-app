import { Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useDarkMode from '../../hooks/useDarkMode';
import Alert from '../common/Alert';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import GoogleIcon from '../common/GoogleIcon';
import PasswordToggle from '../common/PasswordToggle';
import FormField from './FormField';

// Use FormField as InputForm for compatibility
const InputForm = FormField;

const FormRegister = () => {
  const { isDarkMode } = useDarkMode();
  const {
    registerData: formData,
    isLoading,
    error,
    showPassword,
    showKonfirmasiPassword,
    updateRegisterField: updateField,
    togglePassword,
    toggleKonfirmasiPassword,
    handleRegister: handleSubmit,
  } = useAuth();

  return (
    <div
      className={`p-8 min-w-max rounded-2xl border shadow-xl backdrop-blur-sm ${
        isDarkMode
          ? 'bg-slate-800/95 border-slate-700/50 shadow-2xl shadow-slate-900/50'
          : 'bg-white/95 border-gray-200/50 shadow-2xl shadow-gray-900/10'
      }`}
    >
      {/* Header with Logo */}
      <div className='text-center space-y-6 mb-8'>
        {/* Logo and App Name */}
        <div className='flex items-center justify-center gap-3'>
          <img
            src={
              isDarkMode
                ? '/src/assets/img/ewasteDark.png'
                : '/src/assets/img/ewasteLight.png'
            }
            alt='EwasteHub Logo'
            className='w-12 h-12 object-contain'
          />
          <div className='flex flex-col'>
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              EwasteHub
            </h2>
            <div
              className={`w-32 h-0.5 mx-auto rounded-full ${
                isDarkMode
                  ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500'
              }`}
            />
          </div>
        </div>

        {/* Welcome Text */}
        <div className='space-y-1'>
          <h1
            className={`text-2xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Bergabung dengan Kami
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}
          >
            Buat akun EwasteHub dan mulai berkontribusi
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        {error && (
          <div className='mb-6'>
            <Alert type='error' message={error} />
          </div>
        )}

        <InputForm
          label='Nama Lengkap'
          name='namaLengkap'
          type='text'
          placeholder='Masukkan nama lengkap Anda'
          value={formData.namaLengkap}
          onChange={(e) => updateField('namaLengkap', e.target.value)}
          disabled={isLoading}
          autoComplete='name'
          required
        />

        {/* Role Selection */}
        <div className='space-y-3'>
          <label
            className={`block text-sm font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-700'
            }`}
          >
            Pilih Role
          </label>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {/* Masyarakat Role Button */}
            <button
              type='button'
              onClick={() => updateField('role', 'masyarakat')}
              disabled={isLoading}
              className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                formData.role === 'masyarakat'
                  ? isDarkMode
                    ? 'border-green-400 bg-green-900/20 text-green-300'
                    : 'border-green-500 bg-green-50 text-green-700'
                  : isDarkMode
                  ? 'border-slate-600 hover:border-slate-500 text-slate-300'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
              } ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
              }`}
            >
              <div className='flex items-center space-x-3'>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    formData.role === 'masyarakat'
                      ? isDarkMode
                        ? 'bg-green-800/50'
                        : 'bg-green-100'
                      : isDarkMode
                      ? 'bg-slate-700'
                      : 'bg-gray-100'
                  }`}
                >
                  <Users
                    className={`w-5 h-5 ${
                      formData.role === 'masyarakat'
                        ? isDarkMode
                          ? 'text-green-300'
                          : 'text-green-600'
                        : isDarkMode
                        ? 'text-slate-400'
                        : 'text-gray-500'
                    }`}
                  />
                </div>
                <div className='text-left'>
                  <div className='font-medium text-sm'>Masyarakat</div>
                  <div
                    className={`text-xs ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}
                  >
                    Pengguna umum
                  </div>
                </div>
              </div>
            </button>

            {/* Mitra Kurir Role Button */}
            <button
              type='button'
              onClick={() => updateField('role', 'mitra-kurir')}
              disabled={isLoading}
              className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                formData.role === 'mitra-kurir'
                  ? isDarkMode
                    ? 'border-green-400 bg-green-900/20 text-green-300'
                    : 'border-green-500 bg-green-50 text-green-700'
                  : isDarkMode
                  ? 'border-slate-600 hover:border-slate-500 text-slate-300'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
              } ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
              }`}
            >
              <div className='flex items-center space-x-3'>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    formData.role === 'mitra-kurir'
                      ? isDarkMode
                        ? 'bg-green-800/50'
                        : 'bg-green-100'
                      : isDarkMode
                      ? 'bg-slate-700'
                      : 'bg-gray-100'
                  }`}
                >
                  <Zap
                    className={`w-5 h-5 ${
                      formData.role === 'mitra-kurir'
                        ? isDarkMode
                          ? 'text-green-300'
                          : 'text-green-600'
                        : isDarkMode
                        ? 'text-slate-400'
                        : 'text-gray-500'
                    }`}
                  />
                </div>
                <div className='text-left'>
                  <div className='font-medium text-sm'>Mitra Kurir</div>
                  <div
                    className={`text-xs ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}
                  >
                    Partner kurir
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <InputForm
          label='Email'
          name='email'
          type='email'
          placeholder='contoh@email.com'
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          disabled={isLoading}
          autoComplete='email'
          required
        />

        <div className='relative'>
          <InputForm
            label='Password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Masukkan password'
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            disabled={isLoading}
            autoComplete='new-password'
            required
          />
          <div className='absolute right-3 top-9'>
            <PasswordToggle
              showPassword={showPassword}
              onToggle={togglePassword}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className='relative'>
          <InputForm
            label='Konfirmasi Password'
            name='konfirmasiPassword'
            type={showKonfirmasiPassword ? 'text' : 'password'}
            placeholder='Ulangi password'
            value={formData.konfirmasiPassword}
            onChange={(e) => updateField('konfirmasiPassword', e.target.value)}
            disabled={isLoading}
            autoComplete='new-password'
            required
          />
          <div className='absolute right-3 top-9'>
            <PasswordToggle
              showPassword={showKonfirmasiPassword}
              onToggle={toggleKonfirmasiPassword}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Terms Agreement */}
        <div className='pt-2'>
          <CheckBox
            id='agree-terms'
            name='agreeToTerms'
            checked={formData.setujuSyarat}
            onChange={(e) => updateField('setujuSyarat', e.target.checked)}
            disabled={isLoading}
            label={
              <span
                className={`text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}
              >
                Saya menyetujui{' '}
                <Link
                  to='/terms'
                  className={`font-medium transition-colors ${
                    isDarkMode
                      ? 'text-green-400 hover:text-green-300'
                      : 'text-green-600 hover:text-green-500'
                  }`}
                >
                  Syarat dan Ketentuan
                </Link>{' '}
                dan{' '}
                <Link
                  to='/privacy'
                  className={`font-medium transition-colors ${
                    isDarkMode
                      ? 'text-green-400 hover:text-green-300'
                      : 'text-green-600 hover:text-green-500'
                  }`}
                >
                  Kebijakan Privasi
                </Link>
              </span>
            }
          />
        </div>

        <div className='pt-2'>
          <Button type='submit' className='w-full h-12' loading={isLoading}>
            Daftar Sekarang
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className='relative my-4'>
        <div className='absolute inset-0 flex items-center'>
          <div
            className={`w-full border-t ${
              isDarkMode ? 'border-slate-600' : 'border-gray-200'
            }`}
          />
        </div>
        <div className='relative flex justify-center'>
          <span
            className={`px-4 text-sm ${
              isDarkMode
                ? 'bg-slate-800 text-slate-400'
                : 'bg-white text-gray-500'
            }`}
          >
            atau
          </span>
        </div>
      </div>

      {/* Google Login */}
      <Button
        type='button'
        variant='secondary'
        disabled={isLoading}
        className='flex items-center justify-center gap-3 w-full h-12'
      >
        <GoogleIcon className='w-5 h-5' />
        <span>Daftar dengan Google</span>
      </Button>

      {/* Footer */}
      <div className='text-center mt-6'>
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
            Masuk disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormRegister;
