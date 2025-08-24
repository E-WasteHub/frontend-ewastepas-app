import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

export const useLoginForm = () => {
  const handleLoginSubmitStore = useAuthStore(
    (state) => state.handleLoginSubmit
  );
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error); // error global (API)

  // state lokal untuk form input
  const [email, setEmail] = useState('');
  const [kata_sandi, setKataSandi] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // field-level error (frontend validation)
  const [errorField, setErrorField] = useState({});

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

    // clear error per field kalau diubah
    setErrorField((prev) => ({ ...prev, [name]: '' }));
  };

  // validasi frontend
  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
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
  const handleLoginSubmit = async () => {
    if (!validateForm()) return; // stop kalau validasi gagal

    await handleLoginSubmitStore({ email, kata_sandi });

    // simpan email kalau "ingat saya"
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  return {
    // State
    email,
    kata_sandi,
    rememberMe,
    isLoading,
    error, // global error dari backend
    errorField, // field-level errors
    // Actions
    handleInputChange,
    handleLoginSubmit,
  };
};
