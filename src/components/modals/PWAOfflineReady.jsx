import { CheckCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import useDarkMode from '../../hooks/useDarkMode';
import usePWA from '../../hooks/usePWA';

const PWAOfflineReady = () => {
  const { isDarkMode } = useDarkMode();
  const { isOfflineReady } = usePWA();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (isOfflineReady) {
      setShowNotification(true);
      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOfflineReady]);

  const handleDismiss = () => {
    setShowNotification(false);
  };

  if (!showNotification) return null;

  return (
    <div className='fixed top-4 right-4 z-50 w-80'>
      <div
        className={`rounded-lg border shadow-lg p-4 ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700 text-white'
            : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        <div className='flex items-start gap-3'>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-green-600' : 'bg-green-500'
            }`}
          >
            <CheckCircle className='w-5 h-5 text-white' />
          </div>

          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-sm mb-1'>Siap Offline</h3>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}
            >
              EwasteHub sekarang dapat digunakan tanpa koneksi internet.
            </p>
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

export default PWAOfflineReady;
