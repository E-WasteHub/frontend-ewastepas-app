import { useState } from 'react';

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error untuk field yang sedang diubah
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    // Clear submit errors
    if (submitError) setSubmitError('');
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Validasi nama
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap harus diisi';
    } else if (formData.nama.trim().length < 2) {
      newErrors.nama = 'Nama lengkap minimal 2 karakter';
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Validasi password
    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }

    // Validasi confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    // Validasi role
    if (!formData.role) {
      newErrors.role = 'Silakan pilih peran Anda';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      // Simulasi API call - ganti dengan service yang sebenarnya
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log data yang akan dikirim
      console.log('Data registrasi:', {
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
        peran: formData.role,
      });

      setSubmitSuccess(
        'Registrasi berhasil! Silakan cek email untuk verifikasi.'
      );

      // Reset form setelah berhasil
      setFormData({
        nama: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
      });
    } catch (error) {
      console.error('Error registrasi:', error);
      setSubmitError('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    handleInputChange,
    handleSubmit,
    validateForm,
  };
};
