import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';

import App from './App';
import DarkModeProvider from './context/DarkMode';
import './index.css';
import RouteScrollManager from './utils/RouteScrollManager';

// render aplikasi utama
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <RouteScrollManager />
        <App />
      </BrowserRouter>
    </DarkModeProvider>
  </React.StrictMode>
);

// registrasi service worker untuk pwa
const updateSW = registerSW({
  onNeedRefresh() {
    // tampilkan konfirmasi untuk memuat ulang aplikasi
    if (confirm('versi baru aplikasi tersedia. muat ulang sekarang?')) {
      updateSW(true);
    }
  },
  // aplikasi siap digunakan secara offline
  onOfflineReady() {},
  // service worker berhasil terdaftar
  onRegistered() {},
  // terjadi error saat registrasi service worker
  onRegisterError() {},
});
