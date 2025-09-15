// src/services/api.js
import axios from 'axios';
import { ambilValidToken, clearAuth } from '../utils/authExpiredUtils';

// Axios instance global
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Cegah redirect berulang
let isRedirecting = false;

// Request: tambahkan token jika ada
api.interceptors.request.use(
  (config) => {
    try {
      const token = ambilValidToken();
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      console.error('Token error:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: handle error 401/403
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
        clearAuth();
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
