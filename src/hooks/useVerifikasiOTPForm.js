// src/hooks/useVerifikasiOTPForm.js
import { useCallback, useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

export const useVerifikasiOTPForm = () => {
  const handleVerifyOtpStore = useAuthStore((state) => state.handleVerifyOtp);
  const handleResendOtpStore = useAuthStore((state) => state.handleResendOtp);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const successMessage = useAuthStore((state) => state.successMessage);

  // State lokal
  const [kodeOTP, setKodeOTP] = useState('');
  const [errorField, setErrorField] = useState('');
  const [timer, setTimer] = useState(300); // 5 menit
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [canResend, setCanResend] = useState(false);

  // Input OTP
  const handleInputOTP = (value) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setKodeOTP(numericValue);
    if (errorField) setErrorField('');
  };

  // Submit OTP
  const handleSubmitOTP = async (e) => {
    e.preventDefault();

    if (!kodeOTP) {
      setErrorField('Kode OTP wajib diisi');
      return;
    }
    if (kodeOTP.length !== 6) {
      setErrorField('Kode OTP harus 6 digit');
      return;
    }
    if (timer <= 0) {
      setErrorField('Kode OTP sudah kadaluarsa. Silakan kirim ulang OTP.');
      return;
    }

    await handleVerifyOtpStore({ kode_otp: kodeOTP });
  };

  // Kirim ulang OTP
  const handleResendOTP = async () => {
    await handleResendOtpStore();
    // reset timer & input
    setTimer(300);
    setIsTimerActive(true);
    setCanResend(false);
    setKodeOTP('');
    setErrorField('');
  };

  // Timer countdown
  const jalankanTimer = useCallback(() => {
    if (timer > 0 && isTimerActive) {
      const intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer, isTimerActive]);

  useEffect(() => {
    const cleanup = jalankanTimer();
    return cleanup;
  }, [jalankanTimer]);

  // Format waktu MM:SS
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return {
    // State
    kodeOTP,
    timer,
    isLoading,
    error,
    errorField,
    successMessage,
    isTimerActive,
    canResend,
    // Actions
    handleInputOTP,
    handleSubmitOTP,
    handleResendOTP,
    formatTimer,
  };
};
