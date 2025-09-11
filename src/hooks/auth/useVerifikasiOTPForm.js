// src/hooks/auth/useVerifikasiOTPForm.js
import { useEffect, useState } from 'react';
import * as authService from '../../services/authService';
import { formatWaktuCountdown } from '../../utils/dateUtils';

const OTP_EXPIRY_KEY = 'otpExpiresAt';

const useVerifikasiOTPForm = () => {
  // state utama
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // state feedback
  const [fieldError, setFieldError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [verifySuccessMessage, setVerifySuccessMessage] = useState('');
  const [resendSuccessMessage, setResendSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // state timer
  const [waktuTersisa, setWaktuTersisa] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) setUserEmail(email);
  }, []);

  // inisialisasi timer
  useEffect(() => {
    const expiry = localStorage.getItem('otpExpiresAt');
    if (expiry) {
      const sisa = Math.max(
        0,
        Math.floor((parseInt(expiry, 10) - Date.now()) / 1000)
      );
      setWaktuTersisa(sisa);
    }
  }, []);

  // mulai timer
  const startTimer = (seconds) => {
    const expiresAt = Date.now() + seconds * 1000;
    localStorage.setItem('otpExpiresAt', expiresAt.toString());
    setWaktuTersisa(seconds);
  };

  // update timer setiap detik
  useEffect(() => {
    if (waktuTersisa <= 0) {
      localStorage.removeItem('otpExpiresAt');
      return;
    }
    // Kurangi waktu tersisa setiap detik
    const interval = setInterval(() => {
      setWaktuTersisa((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [waktuTersisa]);

  // verifikasi OTP
  const handleOtpSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!otp) return setFieldError('Kode OTP wajib diisi');
    if (otp.length !== 6) return setFieldError('Kode OTP harus 6 digit');
    if (waktuTersisa <= 0) return setFieldError('Kode OTP sudah kadaluarsa');
    if (!userId) return setFieldError('User tidak ditemukan, daftar ulang');

    try {
      setIsLoading(true);
      const res = await authService.verifyOtp({
        id_pengguna: userId,
        kode_otp: otp,
      });
      setVerifySuccessMessage(res.message || 'Verifikasi berhasil');
      return res;
    } catch (err) {
      setGlobalError(err.message || 'Verifikasi OTP gagal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // resend OTP
  const handleKirimUlang = async () => {
    if (!userEmail) {
      setFieldError('Email tidak ditemukan, silakan daftar ulang');
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.resendOtp(userEmail);
      startTimer(300);
      setOtp('');
      setGlobalError('');
      setResendSuccessMessage(
        res.message ||
          'Kode OTP baru berhasil dikirim ke email Anda (berlaku 5 menit).'
      );
      return res;
    } catch (err) {
      setGlobalError(err.message || 'Gagal mengirim ulang OTP');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // state
    otp,
    userId,
    waktuTersisa,

    // feedback
    isLoading,
    fieldError,
    globalError,
    verifySuccessMessage,
    resendSuccessMessage,
    setUserId,
    setFieldError,
    setGlobalError,
    setVerifySuccessMessage,
    setResendSuccessMessage,

    // actions
    handleOtpChange: (val) => setOtp(val.replace(/\D/g, '').slice(0, 6)),
    handleOtpSubmit,
    handleKirimUlang,
    formatWaktu: () => formatWaktuCountdown(waktuTersisa),
  };
};

export default useVerifikasiOTPForm;
