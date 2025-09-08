// src/components/elements/OfflineIndicator.jsx
import { Download, WifiOff } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import usePWA from '../../hooks/usePWA';

const OfflineIndicator = () => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <Motion.div
      className='fixed top-4 left-4 right-4 z-40 mx-auto max-w-sm'
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='bg-amber-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3'>
        <WifiOff className='w-5 h-5 flex-shrink-0' />
        <div className='flex-1'>
          <p className='text-sm font-medium'>Mode Offline</p>
          <p className='text-xs opacity-90'>Konten edukasi tersedia offline</p>
        </div>
      </div>
    </Motion.div>
  );
};

// Komponen untuk install prompt
export const InstallPrompt = () => {
  const { showInstallPrompt, installApp, hideInstallPrompt, canInstall } =
    usePWA();

  if (!showInstallPrompt || !canInstall) return null;

  return (
    <Motion.div
      className='fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-sm'
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='bg-green-600 text-white p-4 rounded-lg shadow-lg'>
        <div className='flex items-start gap-3'>
          <Download className='w-5 h-5 flex-shrink-0 mt-0.5' />
          <div className='flex-1'>
            <h3 className='font-medium text-sm'>Install EWasteHub</h3>
            <p className='text-xs opacity-90 mt-1'>
              Akses cepat dan konten edukasi offline
            </p>
          </div>
        </div>

        <div className='flex gap-2 mt-3'>
          <button
            onClick={installApp}
            className='flex-1 bg-white text-green-600 px-3 py-2 rounded-md text-xs font-medium hover:bg-green-50 transition-colors'
          >
            Install
          </button>
          <button
            onClick={hideInstallPrompt}
            className='px-3 py-2 text-xs text-white/80 hover:text-white transition-colors'
          >
            Nanti
          </button>
        </div>
      </div>
    </Motion.div>
  );
};

export default OfflineIndicator;
