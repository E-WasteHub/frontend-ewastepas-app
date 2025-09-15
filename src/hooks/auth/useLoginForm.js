// src/hooks/auth/useLoginForm.js
import { useCallback, useEffect, useState } from 'react';
import { login } from '../../services/authService';
import { setTokenWithExpiry } from '../../utils/authExpiredUtils';

const useLoginForm = () => {
  // state form
  const [formData, setFormData] = useState({
    email: '',
    kata_sandi: '',
    ingatSaya: false,
  });

  // state status
  const [status, setStatus] = useState({
    isLoading: false,
    pesanErrorGlobal: '',
    pesanErrorField: {},
  });

  // ambil email tersimpan (ingat saya)
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
        ingatSaya: true,
      }));
    }
  }, []);

  // auto-clear pesan error global setelah 5 detik
  useEffect(() => {
    if (!status.pesanErrorGlobal) return;
    const timer = setTimeout(() => {
      setStatus((prev) => ({ ...prev, pesanErrorGlobal: '' }));
    }, 5000);
    return () => clearTimeout(timer);
  }, [status.pesanErrorGlobal]);

  // handler input
  const handlePerubahanInput = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;

      setFormData((prev) => ({ ...prev, [name]: newValue }));

      // reset error field jika ada
      if (status.pesanErrorField[name]) {
        setStatus((prev) => ({
          ...prev,
          pesanErrorField: { ...prev.pesanErrorField, [name]: '' },
        }));
      }
    },
    [status.pesanErrorField]
  );

  // ingat email di localStorage
  const handleRememberEmail = useCallback(() => {
    if (formData.ingatSaya) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  }, [formData.email, formData.ingatSaya]);

  // simpan data login
  const simpanDataLogin = useCallback((data, token) => {
    const TTL = 12 * 60 * 60; // 12 jam
    setTokenWithExpiry(token, TTL);

    localStorage.setItem('pengguna', JSON.stringify(data));
    localStorage.setItem('peran', data.peran?.trim() || '');
  }, []);

  // submit login
  const handleSubmitLogin = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      // validasi sederhana
      if (!formData.email.includes('@')) {
        setStatus((prev) => ({
          ...prev,
          pesanErrorField: {
            ...prev.pesanErrorField,
            email: 'Gunakan format email yang valid',
          },
        }));
        return null;
      }

      try {
        setStatus({
          isLoading: true,
          pesanErrorGlobal: '',
          pesanErrorField: {},
        });

        const response = await login({
          email: formData.email,
          kata_sandi: formData.kata_sandi,
        });

        if (!response?.token) {
          throw new Error('Token tidak ditemukan dalam response');
        }

        // clear localStorage kecuali email yang diingat
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        localStorage.clear();
        if (rememberedEmail) {
          localStorage.setItem('rememberedEmail', rememberedEmail);
        }

        simpanDataLogin(response.data, response.token);
        handleRememberEmail();

        return response;
      } catch (err) {
        setStatus((prev) => ({
          ...prev,
          pesanErrorGlobal: err.message || 'Login gagal',
          isLoading: false,
        }));
        return null;
      } finally {
        setStatus((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [formData.email, formData.kata_sandi, simpanDataLogin, handleRememberEmail]
  );

  // reset form
  const resetForm = useCallback(() => {
    setFormData({
      email: localStorage.getItem('rememberedEmail') || '',
      kata_sandi: '',
      ingatSaya: Boolean(localStorage.getItem('rememberedEmail')),
    });
    setStatus({ isLoading: false, pesanErrorGlobal: '', pesanErrorField: {} });
  }, []);

  return {
    // data
    email: formData.email,
    kata_sandi: formData.kata_sandi,
    ingatSaya: formData.ingatSaya,

    // status
    isLoading: status.isLoading,
    pesanErrorGlobal: status.pesanErrorGlobal,
    pesanErrorField: status.pesanErrorField,

    // actions
    handlePerubahanInput,
    handleSubmitLogin,
    resetForm,
  };
};

export default useLoginForm;
