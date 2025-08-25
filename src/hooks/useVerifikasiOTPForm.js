import { useCallback, useEffect, useState } from 'react';
import * as authService from '../services/authService';

export const useVerifikasiOTPForm = () => {
  const [userId, setUserId] = useState(null); // ✅ simpan id_pengguna
  const [kodeOTP, setKodeOTP] = useState('');
  const [errorField, setErrorField] = useState('');
  const [timer, setTimer] = useState(300);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Input OTP
  const handleInputOTP = (value) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setKodeOTP(numericValue);
    if (errorField) setErrorField('');
  };

  // Submit OTP
  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    if (!kodeOTP) return setErrorField('Kode OTP wajib diisi');
    if (kodeOTP.length !== 6) return setErrorField('Kode OTP harus 6 digit');
    if (timer <= 0) return setErrorField('Kode OTP sudah kadaluarsa');
    if (!userId) return setErrorField('User tidak ditemukan, daftar ulang');

    try {
      setIsLoading(true);
      const res = await authService.verifyOtp({
        id_pengguna: userId,
        kode_otp: kodeOTP,
      });
      setSuccessMessage(res.message || 'Verifikasi berhasil');
    } catch (err) {
      setError(err.message || 'Verifikasi OTP gagal');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (!userId) {
      setErrorField('User tidak ditemukan untuk resend OTP');
      return;
    }
    try {
      await authService.resendOtp(userId);
      setTimer(300);
      setIsTimerActive(true);
      setCanResend(false);
      setKodeOTP('');
      setError('');
    } catch (err) {
      setError(err.message || 'Gagal mengirim ulang OTP');
    }
  };

  // Timer
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

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return {
    // state
    kodeOTP,
    timer,
    isLoading,
    error,
    errorField,
    successMessage,
    isTimerActive,
    canResend,
    userId,
    setUserId, // expose setter
    // action
    handleInputOTP,
    handleSubmitOTP,
    handleResendOTP,
    formatTimer,
  };
};
