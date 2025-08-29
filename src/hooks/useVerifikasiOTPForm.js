import { useCallback, useEffect, useState } from 'react';
import * as authService from '../services/authService';

export const useVerifikasiOTPForm = () => {
  /** 🔹 State utama */
  const [otp, setOtp] = useState(''); // Menyimpan kode OTP (6 digit)
  const [userId, setUserId] = useState(null); // ID user dari localStorage

  /** 🔹 State feedback */
  const [fieldError, setFieldError] = useState(''); // Error khusus input OTP
  const [globalError, setGlobalError] = useState(''); // Error umum dari backend
  const [successMessage, setSuccessMessage] = useState(''); // Pesan sukses
  const [isLoading, setIsLoading] = useState(false);

  /** 🔹 State timer */
  const [waktuTersisa, setWaktuTersisa] = useState(300); // 5 menit
  const [isTimerAktif, setIsTimerAktif] = useState(true);
  const [bisaKirimUlang, setBisaKirimUlang] = useState(false);

  // 📌 Handle perubahan OTP
  const handleOtpChange = (value) => {
    const angkaOnly = value.replace(/\D/g, '').slice(0, 6);
    setOtp(angkaOnly);

    if (fieldError) setFieldError('');
  };

  // 📌 Submit OTP ke backend
  const handleOtpSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validasi input
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

      setSuccessMessage(res.message || 'Verifikasi berhasil');
      return res;
    } catch (err) {
      setGlobalError(err.message || 'Verifikasi OTP gagal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // 📌 Kirim ulang OTP
  const handleKirimUlang = async () => {
    if (!userId) {
      setFieldError('User tidak ditemukan untuk resend OTP');
      return;
    }

    try {
      await authService.resendOtp(userId);
      setWaktuTersisa(300); // reset 5 menit
      setIsTimerAktif(true);
      setBisaKirimUlang(false);
      setOtp('');
      setGlobalError('');
    } catch (err) {
      setGlobalError(err.message || 'Gagal mengirim ulang OTP');
    }
  };

  // 📌 Jalankan timer countdown
  const mulaiTimer = useCallback(() => {
    if (waktuTersisa > 0 && isTimerAktif) {
      const intervalId = setInterval(() => {
        setWaktuTersisa((sisa) => {
          if (sisa <= 1) {
            setIsTimerAktif(false);
            setBisaKirimUlang(true);
            return 0;
          }
          return sisa - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [waktuTersisa, isTimerAktif]);

  useEffect(() => {
    const stopTimer = mulaiTimer();
    return stopTimer;
  }, [mulaiTimer]);

  // 📌 Format menit:detik
  const formatWaktu = () => {
    const menit = Math.floor(waktuTersisa / 60);
    const detik = waktuTersisa % 60;
    return `${menit.toString().padStart(2, '0')}:${detik
      .toString()
      .padStart(2, '0')}`;
  };

  return {
    // State
    otp,
    userId,
    waktuTersisa,
    isTimerAktif,
    bisaKirimUlang,
    isLoading,
    fieldError,
    globalError,
    successMessage,

    // Setters
    setUserId,
    setFieldError,
    setGlobalError,
    setSuccessMessage,

    // Actions
    handleOtpChange,
    handleOtpSubmit,
    handleKirimUlang,
    formatWaktu,
  };
};
