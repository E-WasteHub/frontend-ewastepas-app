// src/hooks/auth/useVerifikasiOTPForm.js
import { useEffect, useState } from 'react';
import * as authService from '../../services/authService';
import { formatWaktuCountdown } from '../../utils/dateUtils';

const useVerifikasiOTPForm = () => {
  // state form
  const [otp, setOtp] = useState('');
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail') || null;

  // state pesan & error
  const [errorField, setErrorField] = useState('');
  const [errorGlobal, setErrorGlobal] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');
  const [pesanLogin, setPesanLogin] = useState('');
  const [pesanResend, setPesanResend] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // state timer
  const [waktuTersisa, setWaktuTersisa] = useState(0);

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

  // update timer setiap detik
  useEffect(() => {
    if (waktuTersisa <= 0) {
      localStorage.removeItem('otpExpiresAt');
      return;
    }
    const interval = setInterval(
      () => setWaktuTersisa((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(interval);
  }, [waktuTersisa]);

  // Handler submit OTP
  const handleOtpSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!otp) return setErrorField('Kode OTP wajib diisi');
    if (otp.length !== 6) return setErrorField('Kode OTP harus 6 digit');
    if (waktuTersisa <= 0) return setErrorField('Kode OTP sudah kadaluarsa');
    if (!userId) return setErrorField('User tidak ditemukan, daftar ulang');

    try {
      setIsLoading(true);
      setPesanSukses('');
      setErrorGlobal('');

      const res = await authService.verifikasiOtp({
        id_pengguna: userId,
        kode_otp: otp,
      });

      setPesanSukses(res.message || 'Verifikasi berhasil');

      // bersihkan storage
      localStorage.removeItem('userId');
      localStorage.removeItem('otpExpiresAt');
      localStorage.removeItem('userEmail');

      // arahkan ke login setelah 1.5 detik
      setTimeout(() => {
        setPesanSukses('');
        setPesanLogin('Silahkan login dengan akun Anda');
        setTimeout(() => setPesanLogin('arahkanKeLogin'), 2000);
      }, 1500);

      return res;
    } catch (err) {
      setErrorGlobal(err.message || 'Verifikasi OTP gagal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // handler resend OTP
  const handleResend = async () => {
    if (!userEmail) {
      setErrorField('Email tidak ditemukan, silakan daftar ulang');
      setTimeout(() => setErrorField(''), 2500);
      return;
    }
    try {
      setIsLoading(true);
      setPesanResend('');
      setErrorGlobal('');

      const res = await authService.kirimUlangOtp(userEmail);

      // reset timer
      const seconds = 300;
      localStorage.setItem(
        'otpExpiresAt',
        (Date.now() + seconds * 1000).toString()
      );
      setWaktuTersisa(seconds);
      setOtp('');
      setPesanResend(
        res.message || 'Kode OTP baru berhasil dikirim (berlaku 5 menit).'
      );

      return res;
    } catch (err) {
      setErrorGlobal(err.message || 'Gagal mengirim ulang OTP');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // state
    otp,
    waktuTersisa,
    isLoading,
    errorField,
    errorGlobal,
    pesanSukses,
    pesanLogin,
    pesanResend,

    // actions
    handleOtpChange: (val) => setOtp(val.replace(/\D/g, '').slice(0, 6)),
    handleOtpSubmit,
    handleResend,
    formatWaktu: () => formatWaktuCountdown(waktuTersisa),

    // clear helpers
    clearPesanSukses: () => setPesanSukses(''),
    clearPesanLogin: () => setPesanLogin(''),
    clearPesanResend: () => setPesanResend(''),
  };
};

export default useVerifikasiOTPForm;
