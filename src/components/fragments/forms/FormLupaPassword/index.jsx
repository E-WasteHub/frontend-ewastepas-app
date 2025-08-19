import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import Alert from '../../../elements/Alert';
import Button from '../../../elements/Button';
import { Input } from '../../../elements/Form';
import FormHeader from '../FormHeader';

const FormLupaPassword = () => {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return setError('Email wajib diisi');
    if (!/\S+@\S+\.\S+/.test(email))
      return setError('Format email tidak valid');

    setError('');
    setIsLoading(true);

    // TODO: Implement forgot password logic
    console.log('Reset password for:', email);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <div
        className={`
          ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-gray-200'
          }
          rounded-2xl border shadow-lg p-8
        `}
      >
        {/* Header */}
        <FormHeader
          title='EWasteHub'
          subtitle='Lupa Kata Sandi'
          showLogo
          className='mb-6'
        />

        {/* Deskripsi */}
        <p
          className={`text-center text-sm mb-4 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Masukkan email Anda untuk menerima link reset kata sandi
        </p>

        {/* Success & Error Alert */}
        {isSuccess && (
          <Alert
            type='success'
            message='Link reset kata sandi telah dikirim ke email Anda'
            className='mb-4'
          />
        )}
        {error && <Alert type='error' message={error} className='mb-4' />}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            type='email'
            label='Email'
            name='email'
            placeholder='Masukkan email Anda'
            value={email}
            onChange={handleInputChange}
            disabled={isLoading || isSuccess}
            required
            className='text-sm'
          />

          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
            loadingText='Mengirim...'
            disabled={isSuccess}
            className='w-full mt-6'
          >
            {isSuccess ? 'Link Terkirim' : 'Kirim Link Reset'}
          </Button>
        </form>

        {/* Footer */}
        <div
          className={`
            text-center text-sm mt-6 pt-4 border-t
            ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}
          `}
        >
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
            Ingat kata sandi?{' '}
            <Link
              to='/login'
              className={`
                ${
                  isDarkMode
                    ? 'text-green-400 hover:text-green-300'
                    : 'text-green-600 hover:text-green-500'
                }
                font-medium transition-colors
              `}
            >
              Kembali ke halaman masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormLupaPassword;
