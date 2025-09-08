// src/components/elements/SplashScreen.jsx
import { Leaf, Recycle } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <Motion.div
      className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-green-700'
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='text-center'>
        {/* Logo Container */}
        <Motion.div
          className='relative mb-8'
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Background Circle */}
          <Motion.div
            className='w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm'
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {/* Inner Icons */}
            <div className='relative'>
              <Motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Recycle className='w-12 h-12 text-white' />
              </Motion.div>
              <Motion.div
                className='absolute -top-2 -right-2'
                animate={{
                  y: [-2, 2, -2],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Leaf className='w-6 h-6 text-green-200' />
              </Motion.div>
            </div>
          </Motion.div>
        </Motion.div>

        {/* App Name */}
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className='text-4xl font-bold text-white mb-2'>EWasteHub</h1>
          <p className='text-green-100 text-lg font-medium'>
            Antar Jemput Sampah Elektronik
          </p>
        </Motion.div>

        {/* Loading Indicator */}
        <Motion.div
          className='mt-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className='flex justify-center space-x-1'>
            {[0, 1, 2].map((i) => (
              <Motion.div
                key={i}
                className='w-2 h-2 bg-white rounded-full'
                animate={{
                  y: [-3, 3, -3],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
};

export default SplashScreen;
