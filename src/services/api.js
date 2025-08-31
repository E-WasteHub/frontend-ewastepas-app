// src/services/api.js
import axios from 'axios';
import { clearAuth, getToken } from '../utils/authExpiredUtils';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor request → tambahin token kalau ada
api.interceptors.request.use(
  (config) => {
    try {
      const token = getToken();
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

// Interceptor response → bisa handle refresh token atau error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika backend mengembalikan 403, anggap token tidak valid/izin habis
    // → clear auth (hapus token) dan redirect ke halaman login.
    try {
      const status = error.response?.status;
      if (status === 403) {
        console.warn(
          'API 403 received — clearing auth and redirecting to /login'
        );
        clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        // optionally reject with a clear message
        return Promise.reject(new Error('Unauthorized (403) - logged out'));
      }
    } catch (e) {
      console.error('Error handling API 403:', e);
    }

    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
