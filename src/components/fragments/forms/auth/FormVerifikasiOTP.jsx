// src/components/forms/auth/FormVerifikasiOTP.jsx
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode, useToast, useVerifikasiOTPForm } from '../../../../hooks';
import { Button } from '../../../elements';
import FormHeader from '../FormHeader';

const FormVerifikasiOTP = () => {
  const { isDarkMode } = useDarkMode();
  const { success, error } = useToast();
  const navigate = useNavigate();

  // refs
  const inputRefs = useRef([]);
  const loginHandled = useRef(false);

  // custom hook
  const {
    otp,
    waktuTersisa,
    isLoading,
    errorField,
    errorGlobal,
    pesanSukses,
    pesanLogin,
    pesanResend,
    handleOtpChange,
    handleOtpSubmit,
    handleResend,
    formatWaktu,
    clearPesanSukses,
    clearPesanLogin,
    clearPesanResend,
  } = useVerifikasiOTPForm();

  // sukses verifikasi
  useEffect(() => {
    if (pesanSukses) {
      success(pesanSukses);
      clearPesanSukses();
      loginHandled.current = false;
    }
  }, [pesanSukses, success, clearPesanSukses]);

  // prompt login + redirect
  useEffect(() => {
    if (pesanLogin) {
      if (pesanLogin === 'arahkanKeLogin') {
        clearPesanLogin();
        navigate('/login');
        return;
      }
      if (!loginHandled.current) {
        loginHandled.current = true;
        success(pesanLogin);
        setTimeout(clearPesanLogin, 100);
      }
    }
  }, [pesanLogin, success, navigate, clearPesanLogin]);

  // sukses resend OTP
  useEffect(() => {
    if (pesanResend) {
      success(pesanResend);
      clearPesanResend();
    }
  }, [pesanResend, success, clearPesanResend]);

  // tampilkan error
  useEffect(() => {
    if (errorField) error(errorField);
    if (errorGlobal) error(errorGlobal);
  }, [errorField, errorGlobal, error]);

  // === Input OTP helpers ===
  const handleChangeDigit = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const otpArray = otp.split('');
    otpArray[index] = value;
    handleOtpChange(otpArray.join(''));
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePasteOtp = (e) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    handleOtpChange(digits);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
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
          subtitle='Verifikasi OTP'
          showLogo
          className='mb-6'
        />

        <p
          className={`text-center text-md mb-6 ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}
        >
          Masukkan kode OTP yang dikirim ke email Anda
        </p>

        {/* Form OTP */}
        <form onSubmit={handleOtpSubmit} className='space-y-6'>
          <div className='flex justify-center gap-2 mb-4'>
            {Array(6)
              .fill('')
              .map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type='text'
                  maxLength='1'
                  value={otp[i] || ''}
                  onChange={(e) => handleChangeDigit(i, e.target.value)}
                  onKeyDown={(e) => handleBackspace(i, e)}
                  onPaste={i === 0 ? handlePasteOtp : undefined}
                  disabled={isLoading}
                  className={`w-14 h-14 text-center text-lg font-semibold border rounded-md focus:outline-none focus:ring-2 transition-colors
                  ${
                    isDarkMode
                      ? 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-green-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-green-500'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed`}
                />
              ))}
          </div>

          {/* Timer / Resend */}
          {waktuTersisa > 0 ? (
            <div
              className={`border rounded-lg p-3 text-center ${
                isDarkMode
                  ? 'bg-slate-700 border-slate-600'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <p className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>
                Kode akan kadaluarsa dalam{' '}
                <span
                  className={`font-bold ${
                    waktuTersisa <= 60
                      ? isDarkMode
                        ? 'text-red-400'
                        : 'text-red-600'
                      : isDarkMode
                      ? 'text-green-400'
                      : 'text-green-600'
                  }`}
                >
                  {formatWaktu()}
                </span>
              </p>
            </div>
          ) : (
            <div
              className={`border rounded-lg p-4 text-center ${
                isDarkMode
                  ? 'bg-red-900/20 border-red-800'
                  : 'bg-red-50 border-gray-200'
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}
              >
                Kode OTP telah kadaluarsa
              </p>
              <button
                type='button'
                onClick={handleResend}
                disabled={isLoading}
                className={`mt-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    isDarkMode
                      ? 'text-green-400 hover:text-green-300'
                      : 'text-green-600 hover:text-green-500'
                  }`}
              >
                Kirim ulang kode OTP
              </button>
            </div>
          )}

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
              className={`font-medium transition-colors ${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              }`}
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
