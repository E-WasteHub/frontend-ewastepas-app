import { useCallback, useState } from 'react';
import * as authService from '../../services/authService';

const useRegisterForm = () => {
  // state data form
  const [formRegistrasi, setFormRegistrasi] = useState({
    nama_lengkap: '',
    email: '',
    kata_sandi: '',
    konfirmasi_kata_sandi: '',
  });
  const [peran, setPeran] = useState('');

  // state status ui
  const [isLoading, setIsLoading] = useState(false);
  const [errorField, setErrorField] = useState({});
  const [pesanError, setPesanError] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');

  // handler input teks
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormRegistrasi((prev) => ({ ...prev, [name]: value }));

      // reset error field spesifik
      if (errorField[name]) {
        setErrorField((prev) => ({ ...prev, [name]: '' }));
      }
      setPesanError('');
    },
    [errorField]
  );

  // handler pilih peran
  const handlePeranSelect = useCallback((value) => {
    setPeran(value);
    setErrorField((prev) => ({ ...prev, peran: '' }));
    setPesanError('');
  }, []);

  // validasi form sebelum submit
  const validateForm = useCallback(() => {
    const errors = {};

    if (!peran) errors.peran = 'Silakan pilih peran Anda';
    if (!formRegistrasi.nama_lengkap.trim())
      errors.nama_lengkap = 'Nama wajib diisi';

    if (!formRegistrasi.email.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formRegistrasi.email.trim())
    ) {
      errors.email = 'Format email tidak valid';
    }

    if (!formRegistrasi.kata_sandi) {
      errors.kata_sandi = 'Kata sandi wajib diisi';
    } else if (formRegistrasi.kata_sandi.length < 6) {
      errors.kata_sandi = 'Kata sandi minimal 6 karakter';
    }

    if (!formRegistrasi.konfirmasi_kata_sandi) {
      errors.konfirmasi_kata_sandi = 'Konfirmasi kata sandi wajib diisi';
    } else if (
      formRegistrasi.kata_sandi !== formRegistrasi.konfirmasi_kata_sandi
    ) {
      errors.konfirmasi_kata_sandi = 'Konfirmasi kata sandi tidak cocok';
    }

    setErrorField(errors);
    return Object.keys(errors).length === 0;
  }, [formRegistrasi, peran]);

  // submit form register
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return null;

    try {
      setIsLoading(true);
      setPesanError('');
      setPesanSukses('');

      const payload = {
        ...formRegistrasi,
        email: formRegistrasi.email.trim(),
        nama_lengkap: formRegistrasi.nama_lengkap.trim(),
        peran,
      };

      const res = await authService.register(payload);
      setPesanSukses(res.message || 'Registrasi berhasil');
      return res;
    } catch (err) {
      setPesanError(err.message || 'Registrasi gagal');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [formRegistrasi, peran, validateForm]);

  // helper clear pesan
  const clearError = useCallback(() => setPesanError(''), []);
  const clearSuccess = useCallback(() => setPesanSukses(''), []);

  return {
    // data
    formRegistrasi,
    peran,

    // status
    isLoading,
    errorField,
    pesanError,
    pesanSukses,

    // actions
    handleChange,
    handlePeranSelect,
    handleSubmit,
    clearError,
    clearSuccess,
  };
};

export default useRegisterForm;
