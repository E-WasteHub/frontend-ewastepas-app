import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import Alert from '../../elements/Alert';
import Button from '../../elements/Button';
import FormHeader from './FormHeader';

const FormVerifikasiOTP = () => {
  const { isDarkMode } = useDarkMode();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timer, setTimer] = useState(300); // 5 menit
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format timer ke MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // hanya angka

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto focus ke input berikutnya
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace untuk kembali ke input sebelumnya
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);

    const newOtp = [...otp];
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }
    setOtp(newOtp);

    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError('Masukkan kode OTP 6 digit');
      return;
    }

    setError('');
    setIsLoading(true);
    setIsSuccess(false);

    // TODO: Integrasi dengan API verifikasi OTP
    console.log('OTP submitted:', otpValue);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleResendOTP = () => {
    setIsResending(true);
    setError('');
    setIsSuccess(false);

    // TODO: Integrasi dengan API resend OTP
    console.log('Resending OTP...');
    setTimeout(() => {
      setIsResending(false);
      setTimer(300); // Reset timer ke 5 menit
    }, 2000);
  };

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
          subtitle='Verifikasi OTP'
          showLogo={true}
          className='mb-6'
        />

        {/* Subtitle */}
        <p
          className={`text-center text-md mb-6 ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}
        >
          Masukkan kode OTP yang dikirim ke email Anda
        </p>

        {/* Alert */}
        {error && <Alert type='error' message={error} className='mb-4' />}
        {isSuccess && (
          <Alert
            type='success'
            message='Verifikasi berhasil! Anda akan diarahkan ke halaman berikutnya.'
            className='mb-4'
          />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* OTP Inputs */}
          <div className='flex justify-center gap-2 mb-4'>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type='text'
                maxLength='1'
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={isLoading}
                className={`w-14 h-14 text-center text-lg font-semibold border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-green-500 focus:border-green-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
            ))}
          </div>

          {/* Timer */}
          {timer > 0 ? (
            <div
              className={`${
                isDarkMode
                  ? 'bg-slate-700 border-slate-600'
                  : 'bg-gray-50 border-gray-200'
              } border rounded-lg p-3 text-center`}
            >
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}
              >
                Kode akan kadaluarsa dalam{' '}
                <span
                  className={`font-bold ${
                    timer <= 60
                      ? isDarkMode
                        ? 'text-red-400'
                        : 'text-red-600'
                      : isDarkMode
                      ? 'text-green-400'
                      : 'text-green-600'
                  }`}
                >
                  {formatTime(timer)}
                </span>
              </p>
            </div>
          ) : (
            <div
              className={`${
                isDarkMode
                  ? 'bg-red-900/20 border-red-800'
                  : 'bg-red-50 border-red-200'
              } border rounded-lg p-4 text-center`}
            >
              <p
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}
              >
                Kode OTP telah kadaluarsa
              </p>
            </div>
          )}

          {/* Resend OTP */}
          {timer === 0 && (
            <div className='text-center'>
              <button
                type='button'
                onClick={handleResendOTP}
                disabled={isResending || isLoading}
                className={`text-sm transition-colors ${
                  isDarkMode
                    ? 'text-green-400 hover:text-green-300'
                    : 'text-green-600 hover:text-green-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isResending ? 'Mengirim ulang...' : 'Kirim ulang kode OTP'}
              </button>
            </div>
          )}

          {/* Submit */}
          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
            loadingText='Memverifikasi...'
            className='w-full'
          >
            Verifikasi
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
            Salah email?{' '}
            <Link
              to='/register'
              className={`${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              } font-medium transition-colors`}
            >
              Daftar ulang dengan email yang benar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormVerifikasiOTP;
