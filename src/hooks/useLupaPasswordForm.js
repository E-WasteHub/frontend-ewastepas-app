// src/hooks/useLupaPasswordForm.js
import { useState } from 'react';
import useAuthStore from '../store/authStore';

export const useLupaPasswordForm = () => {
  const handleSendResetLinkStore = useAuthStore(
    (state) => state.handleSendResetLink
  );
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error); // 🔹 error global (backend)
  const successMessage = useAuthStore((state) => state.successMessage);

  const [email, setEmail] = useState('');
  const [errorField, setErrorField] = useState(''); // 🔹 khusus validasi frontend

  // Handle input email
  const handleInputEmail = (e) => {
    setEmail(e.target.value);
    setErrorField(''); // reset error input tiap user ngetik
  };

  // Handle submit lupa password
  const handleSubmitReset = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!email) {
      setErrorField('Email wajib diisi');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorField('Format email tidak valid');
      return;
    }

    // Panggil store untuk kirim reset link
    await handleSendResetLinkStore(email);

    // Kosongkan email setelah sukses
    setEmail('');
  };

  return {
    // State
    email,
    isLoading,
    error,
    errorField,
    successMessage,
    // Actions
    handleInputEmail,
    handleSubmitReset,
  };
};
