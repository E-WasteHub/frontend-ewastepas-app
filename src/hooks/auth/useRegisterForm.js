// src/hooks/auth/useRegisterForm.js
import { useCallback, useState } from 'react';
import * as authService from '../../services/authService';

const useRegisterForm = () => {
  // state form
  const [form, setForm] = useState({
    nama_lengkap: '',
    email: '',
    kata_sandi: '',
    konfirmasi_kata_sandi: '',
  });
  const [peran, setPeran] = useState('');

  // state feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorField, setErrorField] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // handler perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // reset error hanya untuk field yang diubah
    if (errorField[name]) {
      setErrorField((prev) => ({ ...prev, [name]: '' }));
    }
    setErrorMessage('');
  };

  // handler perubahan select peran
  const handlePeranSelect = (value) => {
    setPeran(value);
    setErrorField((prev) => ({ ...prev, peran: '' }));
  };

  // validasi form
  const validateForm = () => {
    const errors = {};

    if (!peran) errors.peran = 'Silakan pilih peran Anda';
    if (!form.nama_lengkap.trim()) errors.nama_lengkap = 'Nama wajib diisi';

    if (!form.email) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Format email tidak valid';
    }

    if (!form.kata_sandi) {
      errors.kata_sandi = 'Kata sandi wajib diisi';
    } else if (form.kata_sandi.length < 6) {
      errors.kata_sandi = 'Kata sandi minimal 6 karakter';
    }

    if (!form.konfirmasi_kata_sandi) {
      errors.konfirmasi_kata_sandi = 'Konfirmasi kata sandi wajib diisi';
    } else if (form.kata_sandi !== form.konfirmasi_kata_sandi) {
      errors.konfirmasi_kata_sandi = 'Konfirmasi kata sandi tidak cocok';
    }

    setErrorField(errors);
    return Object.keys(errors).length === 0;
  };

  // handler submit form
  const handleSubmit = async () => {
    if (!validateForm()) return null;

    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const res = await authService.register({
        ...form,
        peran,
      });

      setSuccessMessage(res.message || 'Registrasi berhasil');
      return res;
    } catch (err) {
      setErrorMessage(err.message || 'Registrasi gagal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // clear feedback
  const clearError = useCallback(() => setErrorMessage(''), []);
  const clearSuccess = useCallback(() => setSuccessMessage(''), []);

  return {
    // Data form
    form,
    peran,

    // Status
    isLoading,
    errorField,
    errorMessage,
    successMessage,

    // Actions
    handleChange,
    handlePeranSelect,
    handleSubmit,
    clearError,
    clearSuccess,
  };
};

export default useRegisterForm;
