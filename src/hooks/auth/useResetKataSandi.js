// src/hooks/useResetKataSandi.js
import { useState } from 'react';
import * as authService from '../../services/authService';

const useResetKataSandi = () => {
  // state form
  const [form, setForm] = useState({
    kata_sandi: '',
    konfirmasi_kata_sandi: '',
  });

  // state status
  const [isLoading, setIsLoading] = useState(false);
  const [pesanErrorField, setPesanErrorField] = useState({});
  const [pesanErrorGlobal, setPesanErrorGlobal] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');

  // handler perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Reset error & pesan terkait
    if (pesanErrorField[name]) {
      setPesanErrorField((prev) => ({ ...prev, [name]: '' }));
    }
    if (pesanErrorGlobal) setPesanErrorGlobal('');
    if (pesanSukses) setPesanSukses('');
  };

  // validasi form sebelum submit
  const validateForm = () => {
    const errors = {};

    if (!form.kata_sandi) {
      errors.kata_sandi = 'Kata sandi baru wajib diisi';
    } else if (form.kata_sandi.length < 6) {
      errors.kata_sandi = 'Kata sandi minimal 6 karakter';
    }

    if (!form.konfirmasi_kata_sandi) {
      errors.konfirmasi_kata_sandi = 'Konfirmasi kata sandi wajib diisi';
    } else if (form.kataSandi !== form.konfirmasi_kata_sandi) {
      errors.konfirmasi_kata_sandi = 'Konfirmasi kata sandi tidak cocok';
    }

    setPesanErrorField(errors);
    return Object.keys(errors).length === 0;
  };

  // handle submit reset
  const handleSubmitReset = async (e, otp) => {
    if (e) e.preventDefault();
    setPesanErrorGlobal('');
    setPesanSukses('');
    setPesanErrorField({});

    if (!validateForm()) return null;

    try {
      setIsLoading(true);

      const res = await authService.resetPassword({
        otp,
        kata_sandi: form.kata_sandi,
        konfirmasi_kata_sandi: form.konfirmasi_kata_sandi,
      });

      setPesanSukses(res.message || 'Reset kata sandi berhasil');
      setForm({ kata_sandi: '', konfirmasi_kata_sandi: '' });

      return res;
    } catch (err) {
      setPesanErrorGlobal(err.message || 'Reset kata sandi gagal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Data
    form,
    isLoading,
    pesanErrorField,
    pesanErrorGlobal,
    pesanSukses,

    // Actions
    handleInputChange,
    handleSubmitReset,

    // Setters opsional
    setPesanErrorGlobal,
    setPesanSukses,
  };
};

export default useResetKataSandi;
