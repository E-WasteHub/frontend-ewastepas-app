// src/main.jsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DarkModeProvider from './context/DarkMode';
import './index.css';
import RouteScrollManager from './utils/RouteScrollManager';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <DarkModeProvider>
    <BrowserRouter>
      <RouteScrollManager />
      <App />
    </BrowserRouter>
  </DarkModeProvider>
  // </React.StrictMode>
);

// PWA Service Worker Registration
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    // Jangan auto-reload, biarkan user memilih
    console.log('New content available, please refresh');

    // Optional: Show notification to user
    if (confirm('Versi baru aplikasi tersedia. Muat ulang sekarang?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
  onRegistered(registration) {
    console.log('SW Registered:', registration);
  },
  onRegisterError(error) {
    console.log('SW registration error:', error);
  },
});
