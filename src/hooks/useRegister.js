import { useState } from 'react';

const useRegister = () => {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    password: '',
    konfirmasiPassword: '',
    setujuSyarat: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleKonfirmasiPassword = () => {
    setShowKonfirmasiPassword((prev) => !prev);
  };

  const validateForm = () => {
    const { namaLengkap, email, password, konfirmasiPassword, setujuSyarat } =
      formData;

    if (!namaLengkap || !email || !password || !konfirmasiPassword) {
      return 'Semua field wajib diisi.';
    }

    if (password !== konfirmasiPassword) {
      return 'Password dan konfirmasi password tidak cocok.';
    }

    if (!setujuSyarat) {
      return 'Anda harus menyetujui Syarat & Ketentuan untuk mendaftar.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const validationError = validateForm();
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
    } catch (error) {
      setError('Registrasi gagal. Silakan coba lagi.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      namaLengkap: '',
      email: '',
      password: '',
      konfirmasiPassword: '',
      setujuSyarat: false,
    });
    setError('');
    setShowPassword(false);
    setShowKonfirmasiPassword(false);
  };

  return {
    formData,
    isLoading,
    error,
    showPassword,
    showKonfirmasiPassword,
    updateField,
    togglePassword,
    toggleKonfirmasiPassword,
    handleSubmit,
    resetForm,
  };
};

export default useRegister;
