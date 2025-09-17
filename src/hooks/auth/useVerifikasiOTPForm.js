import { useEffect, useRef, useState } from 'react';
import * as authService from '../../services/authService';
import {
  ambilSisaWaktuOtp,
  hapusOtp,
  simpanOtpDenganKadaluarsa,
} from '../../utils/authUtils';
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
  const [pesanResend, setPesanResend] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // state timer
  const [waktuTersisa, setWaktuTersisa] = useState(0);
  const intervalRef = useRef(null);

  // inisialisasi timer sekali saat mount
  useEffect(() => {
    setWaktuTersisa(ambilSisaWaktuOtp());
  }, []);

  // interval countdown sekali
  useEffect(() => {
    if (waktuTersisa <= 0) return;

    intervalRef.current = setInterval(() => {
      setWaktuTersisa((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          hapusOtp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [waktuTersisa]);

  // submit otp
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
        kode_otp: String(otp).padStart(6, '0'),
      });

      setPesanSukses(res.message || 'Verifikasi berhasil');

      // bersihkan storage
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      hapusOtp();

      // arahkan ke login setelah delay
      setTimeout(() => setRedirectToLogin(true), 1500);

      return res;
    } catch (err) {
      setErrorGlobal(err.message || 'Verifikasi OTP gagal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // resend otp
  const handleResend = async () => {
    if (!userEmail) {
      setErrorField('Email tidak ditemukan, silakan daftar ulang');
      return;
    }
    try {
      setIsLoading(true);
      setPesanResend('');
      setErrorGlobal('');

      const res = await authService.kirimUlangOtp(userEmail);

      // reset timer
      simpanOtpDenganKadaluarsa(5 * 60);
      setWaktuTersisa(5 * 60);
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
    pesanResend,
    redirectToLogin,

    // actions
    handleOtpChange: (val) => setOtp(val.replace(/\D/g, '').slice(0, 6)),
    handleOtpSubmit,
    handleResend,
    formatWaktu: () => formatWaktuCountdown(waktuTersisa),

    // clear helpers
    clearErrorField: () => setErrorField(''),
    clearErrorGlobal: () => setErrorGlobal(''),
    clearPesanSukses: () => setPesanSukses(''),
    clearPesanResend: () => setPesanResend(''),
    clearRedirect: () => setRedirectToLogin(false),
  };
};

export default useVerifikasiOTPForm;
