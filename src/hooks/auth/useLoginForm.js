// src/hooks/auth/useLoginForm.js
import { useCallback, useEffect, useState } from 'react';
import { login } from '../../services/authService';
import {
  hapusAutentikasi,
  simpanTokenDenganKadaluarsa,
} from '../../utils/authUtils';

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

  // handler input
  const handlePerubahanInput = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;

      setFormData((prev) => ({ ...prev, [name]: newValue }));

      // reset error field kalau user mulai ngetik lagi
      if (status.pesanErrorField[name]) {
        setStatus((prev) => ({
          ...prev,
          pesanErrorField: { ...prev.pesanErrorField, [name]: '' },
        }));
      }

      // reset error global saat user interaksi
      if (status.pesanErrorGlobal) {
        setStatus((prev) => ({ ...prev, pesanErrorGlobal: '' }));
      }
    },
    [status.pesanErrorField, status.pesanErrorGlobal]
  );

  // simpan / hapus email di localStorage
  const handleRememberEmail = useCallback(() => {
    if (formData.ingatSaya) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  }, [formData.email, formData.ingatSaya]);

  // simpan data login (token + user info)
  const simpanDataLogin = useCallback((data, token) => {
    const TTL = 12 * 60 * 60; // 12 jam
    simpanTokenDenganKadaluarsa(token, TTL);

    localStorage.setItem('pengguna', JSON.stringify(data));
    localStorage.setItem('peran', data.peran?.trim() || '');
  }, []);

  // submit login
  const handleSubmitLogin = useCallback(
    async (e) => {
      if (e) e.preventDefault();

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

        // === Admin OTP case ===
        if (response?.message?.includes('OTP')) {
          return {
            success: true,
            data: response?.data,
            message: response.message,
            isAdminOtp: true,
          };
        }

        // === Validasi wajib data pengguna ===
        if (!response?.data) {
          throw new Error('Data pengguna tidak ditemukan dalam response');
        }

        // === User Belum Aktif case ===
        if (response.data.status_pengguna === 'Belum Aktif') {
          localStorage.setItem('userId', response.data.id_pengguna);
          localStorage.setItem('userEmail', response.data.email);
          return {
            redirectToOtp: true,
            data: response.data,
            message: response.message,
          };
        }

        // === User aktif (butuh token) ===
        if (!response?.token) {
          throw new Error('Token tidak ditemukan dalam response');
        }

        // hapus data login lama tapi jangan hapus rememberedEmail
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        hapusAutentikasi();
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
