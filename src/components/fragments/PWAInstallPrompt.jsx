import { Download, Smartphone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import useDarkMode from '../../hooks/useDarkMode';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
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

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Hide for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Check if user dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      if (dismissedTime > sevenDaysAgo) {
        setShowPrompt(false);
        return;
      }
    }
  }, []);

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className='fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96'>
      <div
        className={`rounded-lg border shadow-lg p-4 ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700 text-white'
            : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        <div className='flex items-start gap-3'>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
            }`}
          >
            <Smartphone className='w-5 h-5 text-white' />
          </div>

          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-sm mb-1'>Install EwasteHub</h3>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}
            >
              Install aplikasi untuk akses lebih cepat dan pengalaman yang lebih
              baik.
            </p>

            <div className='flex gap-2 mt-3'>
              <button
                onClick={handleInstall}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <Download className='w-4 h-4' />
                Install
              </button>
              <button
                onClick={handleDismiss}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isDarkMode
                    ? 'text-slate-300 hover:bg-slate-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Nanti Saja
              </button>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className={`p-1 rounded-full transition-colors ${
              isDarkMode
                ? 'text-slate-400 hover:bg-slate-700'
                : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            <X className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
