import { useState } from 'react';

export const useLupaPasswordForm = () => {
  // State sesuai dengan identifikasi atribut LupaPasswordView
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Fungsi sesuai dengan identifikasi fungsi LupaPasswordView
  const tanganiInputEmail = (e) => {
    setEmail(e.target.value);
    // Clear error dan success message saat user mulai mengetik
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const tanganiSubmitReset = async (e) => {
    e.preventDefault();

    // Validasi format email
    if (!email) {
      setError('Email wajib diisi');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format email tidak valid');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      await kirimTautanReset();
    } catch {
      // Error handling sudah dilakukan di fungsi kirimTautanReset
    } finally {
      setIsLoading(false);
    }
  };

  const kirimTautanReset = async () => {
    try {
      // TODO: Implementasi AuthController.lupaPassword()
      // Sementara ini hanya simulasi
      console.log('Mengirim tautan reset ke email:', email);

      // Simulasi delay API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulasi random success/error untuk testing
      const isSuccess = Math.random() > 0.3; // 70% success rate

      if (isSuccess) {
        tampilkanPesanSukses();
      } else {
        tampilkanError('Email tidak ditemukan dalam sistem');
      }
    } catch {
      tampilkanError(
        'Terjadi kesalahan saat mengirim email. Silakan coba lagi.'
      );
    }
  };

  const tampilkanPesanSukses = () => {
    setSuccessMessage(
      'Tautan reset kata sandi telah dikirim ke email Anda. Silakan periksa kotak masuk dan folder spam.'
    );
    setEmail(''); // Clear email setelah berhasil
  };

  const tampilkanError = (pesanError) => {
    setError(pesanError);
  };

  const resetForm = () => {
    setEmail('');
    setError('');
    setSuccessMessage('');
  };

  return {
    // State
    email,
    isLoading,
    successMessage,
    error,
    // Actions
    tanganiInputEmail,
    tanganiSubmitReset,
    kirimTautanReset,
    tampilkanPesanSukses,
    tampilkanError,
    resetForm,
  };
};
