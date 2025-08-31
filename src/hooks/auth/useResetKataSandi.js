// src/hooks/useResetKataSandi.js
import { useState } from 'react';
import * as authService from '../../services/authService';

const useResetKataSandi = () => {
  const [kataSandi, setKataSandi] = useState('');
  const [konfirmasiKataSandi, setKonfirmasiKataSandi] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorField, setErrorField] = useState('');

  // input kata sandi
  const handleInputKataSandi = (e) => {
    setKataSandi(e.target.value);
    setError('');
    setErrorField('');
    setSuccessMessage('');
  };

  // input konfirmasi kata sandi
  const handleInputKonfirmasiKataSandi = (e) => {
    setKonfirmasiKataSandi(e.target.value);
    setError('');
    setErrorField('');
    setSuccessMessage('');
  };

  // clear error
  const clearError = () => {
    setError('');
    setErrorField('');
  };

  // clear success
  const clearSuccess = () => {
    setSuccessMessage('');
  };

  // submit reset
  const handleSubmitReset = async (e, otp) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // validasi input
    if (!kataSandi) {
      setError('Kata sandi baru wajib diisi');
      setErrorField('kataSandi');
      return;
    }
    if (kataSandi.length < 6) {
      setError('Kata sandi minimal 6 karakter');
      setErrorField('kataSandi');
      return;
    }
    if (!konfirmasiKataSandi) {
      setError('Konfirmasi kata sandi wajib diisi');
      setErrorField('konfirmasiKataSandi');
      return;
    }
    if (kataSandi !== konfirmasiKataSandi) {
      setError('Konfirmasi kata sandi tidak cocok');
      setErrorField('konfirmasiKataSandi');
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.resetPassword({
        otp, // pastikan otp dikirim
        kata_sandi: kataSandi,
        konfirmasi_kata_sandi: konfirmasiKataSandi,
      });
      setSuccessMessage(res.message || 'Reset kata sandi berhasil');
      setKataSandi('');
      setKonfirmasiKataSandi('');
    } catch (err) {
      setError(err.message || 'Reset kata sandi gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // state
    kataSandi,
    konfirmasiKataSandi,
    isLoading,
    error,
    errorField,
    successMessage,
    // actions
    handleInputKataSandi,
    handleInputKonfirmasiKataSandi,
    handleSubmitReset,
    clearError,
    clearSuccess,
    setError,
    setSuccessMessage,
  };
};

export default useResetKataSandi;
