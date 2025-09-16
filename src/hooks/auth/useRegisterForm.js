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

  // state feedback UI
  const [isLoading, setIsLoading] = useState(false);
  const [errorField, setErrorField] = useState({});
  const [pesanError, setPesanError] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');

  // handler input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errorField[name]) {
      setErrorField((prev) => ({ ...prev, [name]: '' }));
    }
    setPesanError('');
  };

  const handlePeranSelect = useCallback((value) => {
    setPeran(value);
    setErrorField((prev) => ({ ...prev, peran: '' }));
  }, []);

  // validasi form sebelum submit
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

  // handle submit form
  const handleSubmit = async () => {
    if (!validateForm()) return null;

    try {
      setIsLoading(true);
      setPesanError('');
      setPesanSukses('');

      const res = await authService.register({ ...form, peran });
      setPesanSukses(res.message || 'Registrasi berhasil');
      return res;
    } catch (err) {
      setPesanError(err.message || 'Registrasi gagal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // helper untuk clear pesan
  const clearError = useCallback(() => setPesanError(''), []);
  const clearSuccess = useCallback(() => setPesanSukses(''), []);

  return {
    // Data form
    form,
    peran,

    // Status
    isLoading,
    errorField,
    pesanError,
    pesanSukses,

    // Actions
    handleChange,
    handlePeranSelect,
    handleSubmit,
    clearError,
    clearSuccess,
  };
};

export default useRegisterForm;
