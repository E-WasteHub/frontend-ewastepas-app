// src/hooks/useRegisterForm.js
import { useState } from 'react';
import * as authService from '../services/authService'; // langsung panggil service

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    kata_sandi: '',
    konfirmasi_kata_sandi: '',
  });

  const [peran, setPeran] = useState('');
  const [errorField, setErrorField] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // error global
  const [successMessage, setSuccessMessage] = useState(''); // pesan sukses

  // handle perubahan input teks
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error field yang sedang diubah
    if (errorField[name]) {
      setErrorField((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // handle perubahan peran
  const handlePeranSelect = (peranValue) => {
    setPeran(peranValue);
    setErrorField((prev) => ({ ...prev, peran: '' }));
  };

  // validasi frontend
  const validateForm = () => {
    const newErrors = {};
    if (!peran) newErrors.peran = 'Silakan pilih peran Anda';

    if (!formData.nama_lengkap.trim()) {
      newErrors.nama_lengkap = 'Nama wajib diisi';
    }

    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Format email tidak valid';
      }
    }

    if (!formData.kata_sandi) {
      newErrors.kata_sandi = 'Kata sandi wajib diisi';
    } else if (formData.kata_sandi.length < 6) {
      newErrors.kata_sandi = 'Kata sandi minimal 6 karakter';
    }

    if (!formData.konfirmasi_kata_sandi) {
      newErrors.konfirmasi_kata_sandi = 'Konfirmasi kata sandi wajib diisi';
    } else if (formData.kata_sandi !== formData.konfirmasi_kata_sandi) {
      newErrors.konfirmasi_kata_sandi = 'Konfirmasi kata sandi tidak cocok';
    }

    setErrorField(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit langsung ke backend
  const handleRegisterSubmit = async () => {
    if (!validateForm()) return null;

    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');

      const res = await authService.register({
        ...formData,
        id_peran: peran,
      });

      setSuccessMessage(res.message || 'Registrasi berhasil');
      return res; // biar bisa dipakai di FormRegister
    } catch (err) {
      console.error('Register error:', err);
      setError(err.message || 'Registrasi gagal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    formData,
    peran,
    isLoading,
    errorField,
    error,
    successMessage,
    setError,
    setSuccessMessage,
    // Action
    handleInputChange,
    handlePeranSelect,
    handleRegisterSubmit,
  };
};
