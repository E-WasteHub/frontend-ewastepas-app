// src/hooks/usePemulihanAkun.js
import { useState } from 'react';
import * as authService from '../../services/authService';

const usePemulihanAkun = () => {
  /** 🔹 State utama */
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /** 🔹 State feedback */
  const [errorInput, setErrorInput] = useState('');
  const [errorGlobal, setErrorGlobal] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');

  /** 📌 Handler perubahan input email */
  const ubahEmail = (e) => {
    setEmail(e.target.value);
    if (errorInput) setErrorInput('');
    if (errorGlobal) setErrorGlobal('');
    if (pesanSukses) setPesanSukses('');
  };

  /** 📌 Validasi email sederhana */
  const validasiEmail = (value) => {
    if (!value) return 'Email wajib diisi';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Format email tidak valid';
    return '';
  };

  /** 📌 Kirim link reset password */
  const kirimLinkReset = async (e) => {
    e.preventDefault();
    const errMsg = validasiEmail(email);
    if (errMsg) {
      setErrorInput(errMsg);
      return;
    }

    try {
      setIsLoading(true);
      setErrorGlobal('');
      setPesanSukses('');

      const res = await authService.sendResetLink(email);
      setPesanSukses(res.message || 'Link reset berhasil dikirim');
      setEmail('');
    } catch (err) {
      setErrorGlobal(err.message || 'Gagal mengirim link reset');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    email,
    isLoading,
    errorInput,
    errorGlobal,
    pesanSukses,

    // Actions
    ubahEmail,
    kirimLinkReset,
    setErrorGlobal,
    setPesanSukses,
  };
};

export default usePemulihanAkun;
