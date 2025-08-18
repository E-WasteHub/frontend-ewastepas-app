// src/services/authService.js

// import api from './api'; // <-- ganti dengan axios instance jika sudah ada

// =======================
// REGISTER
// =======================
export const register = (payload) => {
  // payload harus sesuai entity Pengguna (tanpa id karena auto increment)
  // contoh: { nama_lengkap, email, kata_sandi, no_telepon, alamat_pengguna, id_peran }
  return Promise.resolve({
    data: {
      message: 'Registrasi berhasil (dummy)',
      user: {
        id_pengguna: Date.now(),
        ...payload,
        poin_pengguna: 0,
        gambar_pengguna: null,
        kode_otp: '123456',
        kadaluarsa_otp: new Date(Date.now() + 5 * 60000), // 5 menit
        waktu_dibuat: new Date(),
      },
    },
  });

  // versi backend asli
  // return api.post("/auth/register", payload);
};

// =======================
// LOGIN
// =======================
export const login = (payload) => {
  // payload: { email, kata_sandi }
  return Promise.resolve({
    data: {
      token: 'dummy-token',
      user: {
        id_pengguna: 1,
        nama_lengkap: 'Dummy User',
        email: payload.email,
        id_peran: 2, // contoh: masyarakat
      },
    },
  });

  // versi backend asli
  // return api.post("/auth/login", payload);
};

// =======================
// LOGOUT
// =======================
export const logout = () => {
  return Promise.resolve({
    data: { message: 'Logout berhasil (dummy)' },
  });

  // versi backend asli
  // return api.post("/auth/logout");
};

// =======================
// VERIFY OTP
// =======================
export const verifyOtp = (otp) => {
  return Promise.resolve({
    data: {
      message: 'OTP valid (dummy)',
      kode_otp: otp,
    },
  });

  // versi backend asli
  // return api.post("/auth/verify-otp", { kode_otp: otp });
};

// =======================
// SEND RESET LINK
// =======================
export const sendResetLink = (email) => {
  return Promise.resolve({
    data: { message: `Link reset dikirim ke ${email}` },
  });

  // versi backend asli
  // return api.post("/auth/send-reset-link", { email });
};
