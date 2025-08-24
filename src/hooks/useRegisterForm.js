// src/hooks/useRegisterForm.js
import { useState } from 'react';
import useAuthStore from '../store/authStore';

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    kata_sandi: '',
    konfirmasi_kata_sandi: '',
  });

  // ✅ nilai awal kosong
  const [peran, setPeran] = useState('');

  // state untuk validasi field
  const [errorField, setErrorField] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // state global dari store
  const error = useAuthStore((state) => state.error); // global error dari backend
  const successMessage = useAuthStore((state) => state.successMessage);

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

  // submit ke store -> backend
  const handleRegisterSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await useAuthStore.getState().handleRegisterSubmit({
        ...formData,
        id_peran: peran, // backend butuh `id_peran`
      });
    } catch (err) {
      console.error('Register error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    peran,
    isLoading,
    errorField,
    error,
    successMessage,
    handleInputChange,
    handlePeranSelect,
    handleRegisterSubmit,
  };
};
