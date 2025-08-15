import { useEffect, useState } from 'react';

export const useLoginForm = () => {
  // State sesuai dengan identifikasi atribut LoginView
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Load remembered email saat component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // Fungsi sesuai dengan identifikasi fungsi LoginView
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    // Clear error saat user mulai mengetik
    if (error) setError('');

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'rememberMe') {
      setRememberMe(checked);
    }
  };

  const handleLoginSubmit = async () => {
    // Validasi input
    if (!email || !password) {
      setError('Email dan password wajib diisi');
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format email tidak valid');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Implementasi AuthController.login()
      // Sementara ini hanya simulasi
      console.log('Data login:', { email, password, rememberMe });

      // Simpan email jika "Ingat Saya" dicentang
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Simulasi delay API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Redirect berdasarkan peran pengguna setelah login berhasil
      console.log('Login berhasil');
    } catch {
      setError('Email atau kata sandi salah');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return {
    // State
    email,
    password,
    isLoading,
    error,
    showPassword,
    rememberMe,
    // Actions
    handleInputChange,
    handleLoginSubmit,
    toggleShowPassword,
  };
};
