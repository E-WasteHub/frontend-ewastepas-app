// src/services/api.js
import axios from 'axios';
import { clearAuth, getValidToken } from '../utils/authExpiredUtils';

// === 1. Buat instance axios global ===
// Semua request API akan lewat sini, jadi gampang dikontrol
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // batas waktu 10 detik
  headers: {
    'Content-Type': 'application/json',
  },
});

// === Flag global untuk hindari spam redirect ===
let isRedirecting = false;

// === 2. Interceptor Request ===
// Dipanggil sebelum request dikirim ke server
api.interceptors.request.use(
  (config) => {
    try {
      // Ambil token valid dari localStorage
      const token = getValidToken();

      // Kalau ada & masih valid → tempelin ke header
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Error attaching token', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === 3. Interceptor Response ===
// Dipanggil kalau ada response dari server (sukses/gagal)
api.interceptors.response.use(
  (response) => response, // sukses → langsung return response
  (error) => {
    try {
      const status = error.response?.status;

      // Kalau status 401/403 → token invalid/expired
      if ((status === 401 || status === 403) && !isRedirecting) {
        console.warn(
          'API unauthorized — clearing auth and redirecting to /login'
        );

        isRedirecting = true; // aktifkan flag biar ga spam redirect
        clearAuth(); // hapus token & expiry

        if (typeof window !== 'undefined') {
          // Paksa redirect ke login
          window.location.href = '/login';
        }

        // Lempar error dengan pesan yang jelas
        return Promise.reject(new Error('Unauthorized - logged out'));
      }
    } catch (e) {
      console.error('Error handling API unauthorized:', e);
    }

    // Kalau error lain (bukan 401/403) → log biasa
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
