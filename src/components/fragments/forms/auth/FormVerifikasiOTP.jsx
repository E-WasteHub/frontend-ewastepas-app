import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useVerifikasiOTPForm from '../../../../hooks/auth/useVerifikasiOTPForm';
import useDarkMode from '../../../../hooks/useDarkMode';
import { Alert, Button } from '../../../elements';
import FormHeader from '../FormHeader';

const FormVerifikasiOTP = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const inputRefs = useRef([]); // simpan referensi setiap input digit OTP

  // 🔹 Ambil state & actions dari custom hook
  const {
    otp,
    waktuTersisa,
    isTimerAktif,
    bisaKirimUlang,
    isLoading,
    fieldError,
    globalError,
    successMessage,
    setUserId,
    setSuccessMessage,
    handleOtpChange,
    handleOtpSubmit,
    handleKirimUlang,
    formatWaktu,
  } = useVerifikasiOTPForm();
  /** 🔄 Ambil userId dari localStorage ketika pertama kali masuk halaman */
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      navigate('/register'); // kalau tidak ada userId, paksa ke halaman daftar ulang
    } else {
      setUserId(storedUserId);
    }
  }, [navigate, setUserId]);

  /** 🔄 Redirect ke login setelah OTP berhasil diverifikasi */
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        localStorage.removeItem('userId'); // hapus data sementara
        navigate('/login');
        setSuccessMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate, setSuccessMessage]);

  /** 📌 Handler perubahan input digit OTP */
  const handleChangeDigit = (index, value) => {
    if (!/^\d*$/.test(value)) return; // hanya boleh angka
    const otpArray = otp.split('');
    otpArray[index] = value;
    handleOtpChange(otpArray.join(''));

    // auto focus ke kotak berikutnya
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /** 📌 Handler tombol Backspace untuk pindah ke kiri */
  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /** 📌 Handler paste OTP sekaligus isi semua digit */
  const handlePasteOtp = (e) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    handleOtpChange(digits);

    // arahkan fokus ke digit terakhir yang ditempel
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
        {/* 🔹 Header */}
        <FormHeader
          title='EWasteHub'
          subtitle='Verifikasi OTP'
          showLogo
          className='mb-6'
        />

        {/* 🔹 Info instruksi */}
        <p
          className={`text-center text-md mb-6 ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}
        >
          Masukkan kode OTP yang dikirim ke email Anda
        </p>

        {/* 🔹 Alerts */}
        {fieldError && (
          <Alert type='error' message={fieldError} className='mb-4' />
        )}
        {globalError && (
          <Alert type='error' message={globalError} className='mb-4' />
        )}
        {successMessage && (
          <Alert type='success' message={successMessage} className='mb-4' />
        )}

        {/* 🔹 Form OTP */}
        <form onSubmit={handleOtpSubmit} className='space-y-6'>
          {/* Input 6 digit OTP */}
          <div className='flex justify-center gap-2 mb-4'>
            {Array(6)
              .fill('')
              .map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type='text'
                  maxLength='1'
                  value={otp[index] || ''}
                  onChange={(e) => handleChangeDigit(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  onPaste={index === 0 ? handlePasteOtp : undefined}
                  disabled={isLoading}
                  className={`w-14 h-14 text-center text-lg font-semibold border rounded-md focus:outline-none focus:ring-2 transition-colors
                    ${
                      isDarkMode
                        ? 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-green-500 focus:border-green-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-green-500 focus:border-gray-500'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                />
              ))}
          </div>

          {/* Timer OTP */}
          {waktuTersisa > 0 ? (
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
                    waktuTersisa <= 60
                      ? isTimerAktif
                        ? isDarkMode
                          ? 'text-red-400'
                          : 'text-red-600'
                        : 'text-gray-400'
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
              className={`${
                isDarkMode
                  ? 'bg-red-900/20 border-red-800'
                  : 'bg-red-50 border-gray-200'
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

          {/* Tombol Kirim Ulang OTP */}
          {bisaKirimUlang && (
            <div className='text-center'>
              <button
                type='button'
                onClick={handleKirimUlang}
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

          {/* Tombol Submit Verifikasi */}
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

        {/* 🔹 Footer */}
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
