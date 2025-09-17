import { ambilPesanError } from '../utils/errorUtils';
import api from './api';

// login pengguna
export const login = async (payload) => {
  try {
    const res = await api.post('/masuk', {
      email: payload.email,
      kata_sandi: payload.kata_sandi,
    });
    return res.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'login gagal') };
  }
};

// logout pengguna
export const logout = async () => {
  try {
    const res = await api.post('/keluar');
    return res.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'logout gagal') };
  }
};

// registrasi akun baru
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
    const res = await api.post('/akun/verifikasi-otp', payload);
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

    // Pastikan response memiliki struktur yang benar
    if (!res.data) {
      throw new Error('Response tidak valid dari server');
    }

    return res.data;
  } catch (error) {
    console.error('Error dalam verifikasiAdmin:', error);
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
