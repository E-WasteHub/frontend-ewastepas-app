// src/hooks/useLupaPasswordForm.js
import { useState } from 'react';
import * as authService from '../services/authService';

export const useLupaPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [errorField, setErrorField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input email
  const handleInputEmail = (e) => {
    setEmail(e.target.value);
    if (errorField) setErrorField('');
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  // Validasi email
  const validateEmail = (value) => {
    if (!value) return 'Email wajib diisi';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Format email tidak valid';
    return '';
  };

  // Handle submit lupa password
  const handleSubmitReset = async (e) => {
    e.preventDefault();

    // Validasi input
    const validationError = validateEmail(email);
    if (validationError) {
      setErrorField(validationError);
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');

      const res = await authService.sendResetLink(email);

      setSuccessMessage(res.message || 'Link reset berhasil dikirim');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Gagal mengirim link reset');
    } finally {
      setIsLoading(false);
    }
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
    setError, // biar bisa clearError dari view
    setSuccessMessage, // biar bisa clearSuccess dari view
  };
};
