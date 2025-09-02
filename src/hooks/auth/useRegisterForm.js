import { useCallback, useState } from 'react';
import * as authService from '../../services/authService';

const useRegisterForm = () => {
  /** 🔹 State untuk input form */
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    kata_sandi: '',
    konfirmasi_kata_sandi: '',
  });
  const [peran, setPeran] = useState('');

  /** 🔹 State untuk status & feedback */
  const [isLoading, setIsLoading] = useState(false);
  const [errorField, setErrorField] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 📌 Handle perubahan input teks
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Hapus error pada field yang sedang diedit
    if (errorField[name]) {
      setErrorField((prev) => ({ ...prev, [name]: '' }));
    }
    setErrorMessage('');
  };

  // 📌 Handle pilih peran
  const handlePeranSelect = (value) => {
    setPeran(value);
    setErrorField((prev) => ({ ...prev, peran: '' }));
  };

  // 📌 Validasi input sebelum submit
  const validateForm = () => {
    const errors = {};

    if (!peran) errors.peran = 'Silakan pilih peran Anda';
    if (!formData.nama_lengkap.trim()) {
      errors.nama_lengkap = 'Nama wajib diisi';
    }
    if (!formData.email) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }
    if (!formData.kata_sandi) {
      errors.kata_sandi = 'Kata sandi wajib diisi';
    } else if (formData.kata_sandi.length < 6) {
      errors.kata_sandi = 'Kata sandi minimal 6 karakter';
    }
    if (!formData.konfirmasi_kata_sandi) {
      errors.konfirmasi_kata_sandi = 'Konfirmasi kata sandi wajib diisi';
    } else if (formData.kata_sandi !== formData.konfirmasi_kata_sandi) {
      errors.konfirmasi_kata_sandi = 'Konfirmasi kata sandi tidak cocok';
    }

    setErrorField(errors);
    return Object.keys(errors).length === 0;
  };

  // 📌 Submit form ke backend
  const handleRegisterSubmit = async () => {
    if (!validateForm()) return null;

    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const res = await authService.register({
        ...formData,
        id_peran: peran,
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

  // 📌 Helper untuk clear pesan
  const clearError = useCallback(() => setErrorMessage(''), []);
  const clearSuccess = useCallback(() => setSuccessMessage(''), []);

  return {
    // State input
    formData,
    peran,

    // Status & feedback
    isLoading,
    errorField,
    error: errorMessage,
    successMessage,

    // Actions
    handleInputChange,
    handlePeranSelect,
    handleRegisterSubmit,
    clearError,
    clearSuccess,
  };
};

export default useRegisterForm;
