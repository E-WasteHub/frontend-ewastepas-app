import axios from 'axios';

import { ambilTokenValid, hapusAutentikasi } from '../utils/authExpiredUtils';

// axios instance global
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// cegah redirect berulang
let isRedirecting = false;

// request: tambahkan token jika ada
api.interceptors.request.use(
  (config) => {
    try {
      const token = ambilTokenValid();
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
    } catch {
      // token error diabaikan
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response: handle error 401/403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const status = error.response?.status;
      const currentPath = window.location.pathname;

      if ((status === 401 || status === 403) && !isRedirecting) {
        if (currentPath === '/login') return Promise.reject(error);

        console.warn('Unauthorized, redirect ke /login');
        isRedirecting = true;
        hapusAutentikasi();
        window.location.href = '/login';
        return Promise.reject(new Error('Unauthorized - logged out'));
      }
    } catch (err) {
      console.error('Response handler error:', err);
    }

    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
