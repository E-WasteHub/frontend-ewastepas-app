// src/components/elements/OfflineIndicator/OfflineIndicator.jsx
import { WifiOff, X } from 'lucide-react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { useEffect, useState } from 'react';
import usePWA from '../../../hooks/usePWA';
import { useResponsive } from '../../../hooks/useResponsive';

const OfflineIndicator = () => {
  const { isOnline } = usePWA();
  const { isTablet, isDesktop } = useResponsive();
  const [visible, setVisible] = useState(!isOnline);

  useEffect(() => {
    if (!isOnline) setVisible(true);
    else setVisible(false);
  }, [isOnline]);

  if (!visible) return null;

  // Responsiveness
  let containerClass = 'max-w-sm';
  if (isTablet) containerClass = 'max-w-md';
  if (isDesktop) containerClass = 'max-w-lg';

  return (
    <AnimatePresence>
      <Motion.div
        key='offline-indicator'
        className={`fixed top-4 left-4 right-4 z-40 mx-auto ${containerClass}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className='bg-amber-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3'>
          <WifiOff className='w-5 h-5 flex-shrink-0' />
          <div className='flex-1 text-left'>
            <p className='text-sm font-medium'>Mode Offline</p>
            <p className='text-xs opacity-90'>
              Beberapa konten tersedia secara offline
            </p>
          </div>
          <button
            onClick={() => setVisible(false)}
            className='ml-2 p-1 rounded-full hover:bg-amber-600/40'
            aria-label='Tutup notifikasi offline'
          >
            <X className='w-4 h-4' />
          </button>
        </div>
      </Motion.div>
    </AnimatePresence>
  );
};

export default OfflineIndicator;
