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
  const [timer, setTimer] = useState(300); // 5 minutes
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

  // Format timer to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleInputChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
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

    // Focus the next empty input or the last input
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

    // TODO: Implement OTP verification logic
    console.log('OTP submitted:', otpValue);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleResendOTP = () => {
    setIsResending(true);
    setError('');

    // TODO: Implement resend OTP logic
    console.log('Resending OTP...');
    setTimeout(() => {
      setIsResending(false);
      setTimer(300); // Reset to 5 minutes
    }, 2000);
  };
  return (
    <div className='w-full max-w-md mx-auto'>
      {/* Container dengan border dan shadow seperti wireframe */}
      <div
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        } rounded-2xl border shadow-lg p-8`}
      >
        {/* Header dengan Logo */}
        <FormHeader
          title='EWasteHub'
          subtitle='Verifikasi OTP'
          showLogo={true}
          className='mb-6'
        />

        {/* Subtitle Description */}
        <p
          className={`text-center text-md font-semi-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}
        >
          Masukkan kode OTP
        </p>

        {/* Error Alert */}
        {error && <Alert type='error' message={error} className='mb-4' />}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* OTP Input Boxes */}
          <div>
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
          </div>

          {/* Timer Card */}
          {timer > 0 && (
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
          )}

          {/* Timer Expired Message */}
          {timer === 0 && (
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

          {/* Resend Button - Only show when timer is 0 */}
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

          {/* Submit Button */}
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

        {/* Footer Link */}
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
