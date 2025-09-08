// src/components/elements/OfflineIndicator.jsx
import { WifiOff } from 'lucide-react';
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

export default OfflineIndicator;
