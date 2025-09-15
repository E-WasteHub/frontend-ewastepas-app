// src/hooks/auth/usePemulihanAkun.js
import { useState } from 'react';
import * as authService from '../../services/authService';

const usePemulihanAkun = () => {
  // state form
  const [email, setEmail] = useState('');

  // state status
  const [isLoading, setIsLoading] = useState(false);
  const [pesanErrorField, setPesanErrorField] = useState('');
  const [pesanErrorGlobal, setPesanErrorGlobal] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');

  // handler perubahan input
  const handleUbahEmail = (e) => {
    setEmail(e.target.value);
    if (pesanErrorField) setPesanErrorField('');
    if (pesanErrorGlobal) setPesanErrorGlobal('');
    if (pesanSukses) setPesanSukses('');
  };

  // validasi email sederhana
  const validasiEmail = (value) => {
    if (!value) return 'Email wajib diisi';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return 'Format email tidak valid';
    return '';
  };

  // handler submit kirim link reset
  const handleKirimLinkReset = async (e) => {
    e.preventDefault();

    const errMsg = validasiEmail(email.trim());
    if (errMsg) {
      setPesanErrorField(errMsg);
      return;
    }

    try {
      setIsLoading(true);
      setPesanErrorGlobal('');
      setPesanSukses('');

      const res = await authService.kirimResetLink(email.trim());

      if (res.success) {
        setPesanSukses(res.message || 'Link reset berhasil dikirim');
        setEmail('');
      } else {
        setPesanErrorGlobal(res.message || 'Gagal mengirim link reset');
      }
    } catch (err) {
      setPesanErrorGlobal(err.message || 'Gagal mengirim link reset');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // data
    email,
    isLoading,
    pesanErrorField,
    pesanErrorGlobal,
    pesanSukses,

    // actions
    handleUbahEmail,
    handleKirimLinkReset,

    // setter langsung (jika perlu)
    setPesanErrorGlobal,
    setPesanSukses,
  };
};

export default usePemulihanAkun;
