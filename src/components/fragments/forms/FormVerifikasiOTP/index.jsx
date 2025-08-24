import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import { useVerifikasiOTPForm } from '../../../../hooks/useVerifikasiOTPForm';
import { Alert, Button } from '../../../elements';
import FormHeader from '../FormHeader';

const FormVerifikasiOTP = () => {
  const { isDarkMode } = useDarkMode();
  const {
    kodeOTP,
    isLoading,
    error,
    errorField,
    successMessage,
    timer,
    canResend,
    handleInputOTP,
    handleSubmitOTP,
    handleResendOTP,
    formatTimer,
  } = useVerifikasiOTPForm();

  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // hanya angka
    const newOtp = kodeOTP.split('');
    newOtp[index] = value;
    handleInputOTP(newOtp.join(''));

    // auto fokus ke input berikutnya
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !kodeOTP[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    handleInputOTP(digits);

    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
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

        {/* Alerts */}
        {errorField && (
          <Alert type='error' message={errorField} className='mb-4' />
        )}
        {error && <Alert type='error' message={error} className='mb-4' />}
        {successMessage && (
          <Alert type='success' message={successMessage} className='mb-4' />
        )}

        {/* Form */}
        <form onSubmit={handleSubmitOTP} className='space-y-6'>
          {/* OTP Inputs */}
          <div className='flex justify-center gap-2 mb-4'>
            {Array(6)
              .fill('')
              .map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type='text'
                  maxLength='1'
                  value={kodeOTP[index] || ''}
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
                  {formatTimer()}
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
          {canResend && (
            <div className='text-center'>
              <button
                type='button'
                onClick={handleResendOTP}
                disabled={isLoading}
                className={`text-sm transition-colors ${
                  isDarkMode
                    ? 'text-green-400 hover:text-green-300'
                    : 'text-green-600 hover:text-green-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Kirim ulang kode OTP
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
