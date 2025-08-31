import { useEffect, useState } from 'react';
import * as authService from '../../services/authService';
import { setTokenWithExpiry } from '../../utils/authExpiredUtils';

export const useLoginForm = () => {
  // --- State Form ---
  const [email, setEmail] = useState('');
  const [kata_sandi, setKataSandi] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // --- State UI ---
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // --- Init remembered email ---
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // --- Handler Input ---
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'email') setEmail(value);
    if (name === 'kata_sandi') setKataSandi(value);
    if (name === 'rememberMe') setRememberMe(checked);

    // Clear error saat user mengubah field
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    setGlobalError('');
  };

  // --- Validasi frontend ---
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) errors.email = 'Email wajib diisi';
    else if (!emailRegex.test(email)) errors.email = 'Format email tidak valid';

    if (!kata_sandi) errors.kata_sandi = 'Kata sandi wajib diisi';
    else if (kata_sandi.length < 6)
      errors.kata_sandi = 'Kata sandi minimal 6 karakter';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- Submit login ---
  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setGlobalError('');
      localStorage.clear();

      const res = await authService.login({ email, kata_sandi });

      if (res?.token) {
        const DEFAULT_TTL = 12 * 60 * 60; // 12 jam
        setTokenWithExpiry(res.token, DEFAULT_TTL);

        if (res.data) {
          localStorage.setItem('pengguna', JSON.stringify(res.data));
          localStorage.setItem('peran', res.data.peran?.trim());
        }
      }

      if (rememberMe) localStorage.setItem('rememberedEmail', email);
      else localStorage.removeItem('rememberedEmail');

      return res;
    } catch (err) {
      setGlobalError(err.message || 'Login gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    kata_sandi,
    rememberMe,
    isLoading,
    error: globalError,
    errorField: fieldErrors,
    handleInputChange,
    handleLoginSubmit,
  };
};
