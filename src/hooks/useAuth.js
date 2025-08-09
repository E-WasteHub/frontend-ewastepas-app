import { useEffect, useState } from 'react';

const useAuth = () => {
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    namaLengkap: '',
    email: '',
    password: '',
    konfirmasiPassword: '',
    role: '',
    setujuSyarat: false,
  });

  // Common states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] = useState(false);

  // Set initial role from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role');
    if (
      roleParam &&
      (roleParam === 'masyarakat' || roleParam === 'mitra-kurir')
    ) {
      setRegisterData((prev) => ({
        ...prev,
        role: roleParam,
      }));
    }
  }, []);

  // Update login form fields
  const updateLoginField = (field, value) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update register form fields
  const updateRegisterField = (field, value) => {
    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Password visibility toggles
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleKonfirmasiPassword = () => {
    setShowKonfirmasiPassword((prev) => !prev);
  };

  // Login validation
  const validateLogin = () => {
    const { email, password } = loginData;

    if (!email || !password) {
      return 'Email dan password wajib diisi.';
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Format email tidak valid.';
    }

    return null;
  };

  // Register validation
  const validateRegister = () => {
    const {
      namaLengkap,
      email,
      password,
      konfirmasiPassword,
      role,
      setujuSyarat,
    } = registerData;

    if (!namaLengkap || !email || !password || !konfirmasiPassword || !role) {
      return 'Semua field wajib diisi.';
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Format email tidak valid.';
    }

    if (password.length < 8) {
      return 'Password minimal 8 karakter.';
    }

    if (password !== konfirmasiPassword) {
      return 'Password dan konfirmasi password tidak cocok.';
    }

    if (!setujuSyarat) {
      return 'Anda harus menyetujui Syarat & Ketentuan untuk mendaftar.';
    }

    return null;
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const validationError = validateLogin();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Mock success
      alert('Login berhasil (mocked)');

      // TODO: Handle successful login (redirect, store tokens, etc.)
    } catch (error) {
      setError('Login gagal. Silakan coba lagi.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const validationError = validateRegister();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Mock success
      alert('Registrasi berhasil (mocked)');

      // TODO: Handle successful registration (redirect, show success message, etc.)
    } catch (error) {
      setError('Registrasi gagal. Silakan coba lagi.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset login form
  const resetLoginForm = () => {
    setLoginData({
      email: '',
      password: '',
      rememberMe: false,
    });
    setError('');
    setShowPassword(false);
  };

  // Reset register form
  const resetRegisterForm = () => {
    setRegisterData({
      namaLengkap: '',
      email: '',
      password: '',
      konfirmasiPassword: '',
      role: '',
      setujuSyarat: false,
    });
    setError('');
    setShowPassword(false);
    setShowKonfirmasiPassword(false);
  };

  // Reset all forms and states
  const resetAllForms = () => {
    resetLoginForm();
    resetRegisterForm();
  };

  // Clear error
  const clearError = () => {
    setError('');
  };

  return {
    // Login-related
    loginData,
    updateLoginField,
    handleLogin,
    resetLoginForm,
    validateLogin,

    // Register-related
    registerData,
    updateRegisterField,
    handleRegister,
    resetRegisterForm,
    validateRegister,

    // Common states
    isLoading,
    error,
    showPassword,
    showKonfirmasiPassword,

    // Common actions
    togglePassword,
    toggleKonfirmasiPassword,
    resetAllForms,
    clearError,
  };
};

export default useAuth;
