// src/hooks/auth/usePemulihanAkun.js
import { useState } from 'react';
import * as authService from '../../services/authService';

const usePemulihanAkun = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errorInput, setErrorInput] = useState('');
  const [errorGlobal, setErrorGlobal] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');

  const ubahEmail = (e) => {
    setEmail(e.target.value);
    if (errorInput) setErrorInput('');
    if (errorGlobal) setErrorGlobal('');
    if (pesanSukses) setPesanSukses('');
  };

  const validasiEmail = (value) => {
    if (!value) return 'Email wajib diisi';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Format email tidak valid';
    return '';
  };

  const kirimLinkReset = async (e) => {
    e.preventDefault();

    const errMsg = validasiEmail(email?.trim());
    if (errMsg) {
      setErrorInput(errMsg);
      return;
    }

    try {
      setIsLoading(true);
      setErrorGlobal('');
      setPesanSukses('');

      const res = await authService.sendResetLink(email.trim());

      if (res.success) {
        setPesanSukses(res.message || 'Link reset berhasil dikirim');
        setEmail('');
      } else {
        setErrorGlobal(res.message || 'Gagal mengirim link reset');
      }
    } catch (err) {
      setErrorGlobal(err.message || 'Gagal mengirim link reset');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    isLoading,
    errorInput,
    errorGlobal,
    pesanSukses,
    ubahEmail,
    kirimLinkReset,
    setErrorGlobal,
    setPesanSukses,
  };
};

export default usePemulihanAkun;
