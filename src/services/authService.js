// src/services/authService.js
import api from './api';

// Helper: ambil pesan error dari response atau error object
const ambilPesanError = (error, defaultMessage) => {
  return (
    error?.response?.data?.error?.message || // wrapper backend
    error?.response?.data?.message || // pesan langsung
    error?.message || // axios error
    defaultMessage
  );
};

/** Login pengguna */
export const login = async (payload) => {
  try {
    const res = await api.post('/masuk', {
      email: payload.email,
      kata_sandi: payload.kata_sandi,
    });
    return res.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'Login gagal') };
  }
};

/** Logout pengguna */
export const logout = async () => {
  try {
    const res = await api.post('/keluar');
    return res.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'Logout gagal') };
  }
};

/** Registrasi akun baru */
export const register = async (payload) => {
  try {
    const res = await api.post('/akun/daftar', {
      nama_lengkap: payload.nama_lengkap,
      email: payload.email,
      kata_sandi: payload.kata_sandi,
      konfirmasi_kata_sandi: payload.konfirmasi_kata_sandi,
      peran: payload.peran,
    });
    return res.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'Registrasi gagal') };
  }
};

/** Verifikasi akun dengan kode OTP */
export const verifikasiOtp = async (payload) => {
  try {
    const res = await api.post('/akun/verifikasi', payload);
    return res.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'Verifikasi OTP gagal') };
  }
};

/** Kirim ulang kode OTP */
export const kirimUlangOtp = async (email) => {
  try {
    const res = await api.post('/akun/kirim-ulang-otp', { email });
    return res.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'Gagal mengirim ulang OTP') };
  }
};

/** Kirim link reset ke email */
export const kirimResetLink = async (email) => {
  try {
    const res = await api.post('/pemulihan/kirim-otp', { email });
    return { success: true, ...res.data };
  } catch (error) {
    return {
      success: false,
      message: ambilPesanError(error, 'Gagal mengirim reset link'),
    };
  }
};

/** Reset kata sandi dengan OTP */
export const resetPassword = async (payload) => {
  try {
    const res = await api.put('/pemulihan/reset-kata-sandi', {
      otp: payload.otp,
      kata_sandi: payload.kata_sandi,
      konfirmasi_kata_sandi: payload.konfirmasi_kata_sandi,
    });
    return res.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'Reset kata sandi gagal') };
  }
};

/** Verifikasi admin dengan kode OTP */
export const verifikasiAdmin = async (kode_otp) => {
  try {
    const res = await api.post(`/masuk/${kode_otp}`);
    return res.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'Verifikasi admin gagal') };
  }
};

/** Ambil semua pengguna yang belum diverifikasi */
export const ambilSemuaPenggunaBelumDiverifikasi = async () => {
  try {
    const res = await api.get('/akun/belum-verifikasi');
    return res.data;
  } catch (error) {
    throw {
      message: ambilPesanError(
        error,
        'Gagal mengambil data verifikasi pengguna'
      ),
    };
  }
};
