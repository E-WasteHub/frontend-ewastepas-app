import { useCallback, useEffect, useState } from 'react';

export const useVerifikasiOTPForm = () => {
  // State sesuai dengan identifikasi atribut VerifikasiOTPView
  const [kodeOTP, setKodeOTP] = useState('');
  const [timer, setTimer] = useState(300); // 5 menit = 300 detik
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [canResend, setCanResend] = useState(false);

  // Fungsi sesuai dengan identifikasi fungsi VerifikasiOTPView
  const tanganiInputOTP = (value) => {
    // Hanya izinkan angka dan maksimal 6 digit
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setKodeOTP(numericValue);

    // Clear error saat user mulai mengetik
    if (error) setError('');
  };

  const tanganiSubmitOTP = async (e) => {
    e.preventDefault();

    // Validasi kode OTP
    if (!kodeOTP) {
      setError('Kode OTP wajib diisi');
      return;
    }

    if (kodeOTP.length !== 6) {
      setError('Kode OTP harus 6 digit');
      return;
    }

    // Cek apakah timer sudah habis
    if (timer <= 0) {
      setError('Kode OTP sudah kadaluarsa. Silakan kirim ulang OTP.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Implementasi AuthController.verifikasiOTP()
      // Sementara ini hanya simulasi
      console.log('Memverifikasi OTP:', kodeOTP);

      // Simulasi delay API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulasi validasi OTP
      const isValidOTP = kodeOTP === '123456'; // Simulasi OTP yang benar

      if (isValidOTP) {
        console.log('Verifikasi berhasil, akun telah terverifikasi');
        // TODO: Redirect ke halaman login atau dashboard
        alert('Verifikasi berhasil! Akun Anda telah terverifikasi.');
      } else {
        tampilkanError('Kode OTP tidak valid. Silakan periksa kembali.');
      }
    } catch {
      tampilkanError('Terjadi kesalahan saat verifikasi. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const kirimUlangOTP = async () => {
    setIsLoading(true);
    setError('');

    try {
      // TODO: Implementasi AuthController.kirimUlangOTP()
      // Sementara ini hanya simulasi
      console.log('Mengirim ulang OTP...');

      // Simulasi delay API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset timer dan status
      setTimer(300); // Reset ke 5 menit
      setIsTimerActive(true);
      setCanResend(false);
      setKodeOTP(''); // Clear OTP input

      console.log('OTP baru telah dikirim');
      alert('OTP baru telah dikirim ke email Anda');
    } catch {
      tampilkanError('Gagal mengirim ulang OTP. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const tampilkanError = (pesanError) => {
    setError(pesanError);
  };

  // Timer countdown function
  const jalankanTimer = useCallback(() => {
    if (timer > 0 && isTimerActive) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsTimerActive(false);
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timer, isTimerActive]);

  // Jalankan timer saat component mount atau timer direset
  useEffect(() => {
    const cleanup = jalankanTimer();
    return cleanup;
  }, [jalankanTimer]);

  // Format timer untuk display (MM:SS)
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
    isTimerActive,
    canResend,
    // Actions
    tanganiInputOTP,
    tanganiSubmitOTP,
    kirimUlangOTP,
    tampilkanError,
    formatTimer,
  };
};
