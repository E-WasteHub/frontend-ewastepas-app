// src/components/elements/PWAInstallPrompt.jsx
import { Download, Smartphone } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useEffect, useState } from 'react';
import useDarkMode from '../../hooks/useDarkMode';

const PWAInstallPrompt = () => {
  const { isDarkMode } = useDarkMode();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;

      if (result.outcome === 'accepted') {
        console.log('User accepted PWA install');
      } else {
        console.log('User dismissed PWA install');
      }
    } catch (error) {
      console.error('Error during PWA install:', error);
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (isInstalled) {
    return (
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg ${
          isDarkMode
            ? 'bg-green-800 text-green-100'
            : 'bg-green-100 text-green-800'
        }`}
      >
        <div className='flex items-center gap-2'>
          <Smartphone className='w-5 h-5' />
          <span className='text-sm font-medium'>App Installed!</span>
        </div>
      </Motion.div>
    );
  }

  if (!showPrompt) return null;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm ${
        isDarkMode
          ? 'bg-slate-800 text-white border border-slate-700'
          : 'bg-white text-gray-900 border border-gray-200'
      }`}
    >
      <div className='flex items-start gap-3'>
        <div
          className={`p-2 rounded-full ${
            isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
          }`}
        >
          <Download
            className={`w-5 h-5 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}
          />
        </div>

        <div className='flex-1'>
          <h3 className='font-semibold text-sm mb-1'>Install Ewastepas</h3>
          <p
            className={`text-xs mb-3 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Install aplikasi untuk akses cepat dan penggunaan offline
          </p>

          <div className='flex gap-2'>
            <button
              onClick={handleInstallClick}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                isDarkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Nanti
            </button>
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

export default PWAInstallPrompt;
