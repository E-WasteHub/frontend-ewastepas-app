import { useState } from 'react';

const useLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Email dan password wajib diisi.');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Mock success
      alert('Login berhasil (mocked)');
    } catch (error) {
      setError('Login gagal. Silakan coba lagi.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      rememberMe: false,
    });
    setError('');
    setShowPassword(false);
  };

  return {
    formData,
    isLoading,
    error,
    showPassword,
    updateField,
    togglePassword,
    handleSubmit,
    resetForm,
  };
};

export default useLogin;
