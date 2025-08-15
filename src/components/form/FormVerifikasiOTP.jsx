import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import darkLogo from '../../assets/img/ewasteDark.png';
import lightLogo from '../../assets/img/ewasteLight.png';
import useDarkMode from '../../hooks/useDarkMode';
import { useVerifikasiOTPForm } from '../../hooks/useVerifikasiOTPForm';
import Alert from '../common/Alert';
import {
  FooterVerifikasiOTP,
  HeaderVerifikasiOTP,
  OTPInputField,
  TimerVerifikasiOTP,
} from './verifikasiOTP';

const FormVerifikasiOTP = () => {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();

  // Ambil email dari state yang dikirim dari halaman register
  const email = location.state?.email || '';

  const {
    kodeOTP,
    timer,
    isLoading,
    error,
    canResend,
    tanganiInputOTP,
    tanganiSubmitOTP,
    kirimUlangOTP,
    formatTimer,
  } = useVerifikasiOTPForm();

  const logo = isDarkMode ? darkLogo : lightLogo;

  // Redirect ke register jika tidak ada email
  useEffect(() => {
    if (!email) {
      console.warn('Tidak ada email, redirect ke halaman register');
      // TODO: Implement redirect to register page
    }
  }, [email]);

  return (
    <div className='w-full max-w-md mx-auto space-y-6'>
      {/* Form Container dengan Rounded Border */}
      <div
        className={`p-8 rounded-2xl shadow-lg border ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        {/* Header Form */}
        <HeaderVerifikasiOTP logo={logo} email={email} />

        {/* Alert Error */}
        {error && (
          <div className='mb-6'>
            <Alert type='error' message={error} />
          </div>
        )}

        {/* Form Verifikasi OTP */}
        <form onSubmit={tanganiSubmitOTP} className='space-y-6'>
          {/* OTP Input Field */}
          <OTPInputField
            kodeOTP={kodeOTP}
            onOTPChange={tanganiInputOTP}
            isLoading={isLoading}
            error={error}
          />

          {/* Timer dan Resend */}
          <TimerVerifikasiOTP
            timer={timer}
            formatTimer={formatTimer}
            canResend={canResend}
            onResendOTP={kirimUlangOTP}
            isLoading={isLoading}
          />

          {/* Footer dengan Submit Button */}
          <FooterVerifikasiOTP
            isLoading={isLoading}
            kodeOTP={kodeOTP}
            timer={timer}
            canResend={canResend}
          />
        </form>
      </div>
    </div>
  );
};

export default FormVerifikasiOTP;
