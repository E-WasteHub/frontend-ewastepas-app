// src/hooks/useLoginForm.js
import { useEffect, useState } from 'react';
import * as authService from '../services/authService';
import { setTokenWithExpiry } from '../utils/authExpiry';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [kata_sandi, setKataSandi] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // error global dari API
  const [errorField, setErrorField] = useState({}); // error per field

  // load remembered email saat pertama kali render
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // handle perubahan input
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'kata_sandi') setKataSandi(value);
    if (name === 'rememberMe') setRememberMe(checked);

    // clear error field kalau diubah
    setErrorField((prev) => ({ ...prev, [name]: '' }));
    setError('');
  };

  // validasi frontend
  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!kata_sandi) {
      newErrors.kata_sandi = 'Kata sandi wajib diisi';
    } else if (kata_sandi.length < 6) {
      newErrors.kata_sandi = 'Kata sandi minimal 6 karakter';
    }

    setErrorField(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle submit form login
  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError('');
      // 🔑 Hapus semua data lama (misalnya token hasil register sebelum verifikasi)
      localStorage.clear();

      const res = await authService.login({ email, kata_sandi });

      // kalau berhasil → simpan token baru beserta expiry di localStorage
      if (res?.token) {
        // set token expiry ke 12 jam (43200 detik) supaya user otomatis logout.
        const DEFAULT_TTL = 12 * 60 * 60;
        setTokenWithExpiry(res.token, DEFAULT_TTL);

        // simpan pengguna & peran dari backend
        if (res.data) {
          localStorage.setItem('pengguna', JSON.stringify(res.data));
          localStorage.setItem('peran', res.data.nama_peran);
        }
      }

      // simpan email kalau centang "ingat saya"
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      return res; // biar bisa dipakai di view
    } catch (err) {
      setError(err.message || 'Login gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    email,
    kata_sandi,
    rememberMe,
    isLoading,
    error,
    errorField,
    // Actions
    handleInputChange,
    handleLoginSubmit,
  };
};
