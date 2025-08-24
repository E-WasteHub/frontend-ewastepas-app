// src/store/authStore.js
import { create } from 'zustand';
import * as authService from '../services/authService';

const useAuthStore = create((set) => ({
  user: null,
  peran: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  successMessage: null,

  // Login
  handleLoginSubmit: async ({ email, kata_sandi }) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const res = await authService.login({ email, kata_sandi });
      const { token, data } = res;

      set({
        user: data,
        peran: data.nama_peran,
        token,
        isAuthenticated: true,
        isLoading: false,
      });

      localStorage.setItem('token', token);
    } catch (err) {
      set({
        error: err.message || 'Email atau kata sandi salah',
        isLoading: false,
      });
    }
  },

  // Registrasi
  handleRegisterSubmit: async (payload) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const res = await authService.register(payload);
      set({
        successMessage: res.message,
        isLoading: false,
      });
      return res;
    } catch (err) {
      set({
        error: err.message || 'Registrasi gagal',
        isLoading: false,
      });
      throw err;
    }
  },

  // Verifikasi OTP
  handleVerifyOtp: async (payload) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const res = await authService.verifyOtp(payload);
      set({ successMessage: res.message, isLoading: false });
      return res;
    } catch (err) {
      set({
        error: err.message || 'Verifikasi OTP gagal',
        isLoading: false,
      });
      throw err;
    }
  },

  // Kirim link reset kata sandi
  handleSendResetLink: async (email) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const res = await authService.sendResetLink(email);
      set({ successMessage: res.message, isLoading: false });
      return res;
    } catch (err) {
      set({
        error: err.message || 'Gagal mengirim reset link',
        isLoading: false,
      });
      throw err;
    }
  },

  // Reset kata sandi
  handleResetPassword: async (payload) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const res = await authService.resetPassword(payload);
      set({ successMessage: res.message, isLoading: false });
      return res;
    } catch (err) {
      set({
        error: err.message || 'Reset password gagal',
        isLoading: false,
      });
      throw err;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, peran: null, token: null, isAuthenticated: false });
  },

  //clear error / success agar alert tidak loop
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ successMessage: null }),
  clearMessages: () => set({ error: null, successMessage: null }),
}));

export default useAuthStore;
