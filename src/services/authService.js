// src/services/authService.js
import api from './api';

// Verify Admin
export const verifikasiAdmin = async (kode_otp) => {
  try {
    const response = await api.post(`/masuk/${kode_otp}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Verifikasi admin gagal' };
  }
};

// Registrasi
export const register = async (payload) => {
  try {
    const response = await api.post('/akun/daftar', {
      nama_lengkap: payload.nama_lengkap,
      email: payload.email,
      kata_sandi: payload.kata_sandi,
      konfirmasi_kata_sandi: payload.konfirmasi_kata_sandi,
      peran: payload.peran,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registrasi gagal' };
  }
};

// Login
export const login = async (payload) => {
  try {
    const response = await api.post('/masuk', {
      email: payload.email,
      kata_sandi: payload.kata_sandi,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login gagal' };
  }
};

// Logout
export const logout = async () => {
  try {
    const response = await api.post('/keluar');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout gagal' };
  }
};

// Verifikasi OTP
export const verifyOtp = async (payload) => {
  try {
    const response = await api.post('/akun/verifikasi', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Verifikasi OTP gagal' };
  }
};

// Kirim link reset kata sandi
export const sendResetLink = async (email) => {
  try {
    const response = await api.post('/pemulihan/kirim-otp', { email });
    return { success: true, ...response.data };
  } catch (error) {
    const msg = error.response?.data?.message;
    const success = /terkirim/i.test(msg);
    return { success, message: msg || 'Gagal mengirim reset link' };
  }
};

// Reset kata sandi
export const resetPassword = async (payload) => {
  try {
    const response = await api.put('/pemulihan/reset-kata-sandi', {
      otp: payload.otp,
      kata_sandi: payload.kata_sandi,
      konfirmasi_kata_sandi: payload.konfirmasi_kata_sandi,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Reset kata sandi gagal' };
  }
};

// Ambil semua data verifikasi pengguna untuk admin
export const indexVerifikasiPengguna = async () => {
  try {
    const response = await api.get('/akun/belum-verifikasi');
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: 'Gagal mengambil data verifikasi pengguna',
      }
    );
  }
};

// Kirim ulang OTP (resend)
export const resendOtp = async (email) => {
  try {
    const response = await api.post('/akun/kirim-ulang-otp', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Gagal mengirim ulang OTP' };
  }
};
