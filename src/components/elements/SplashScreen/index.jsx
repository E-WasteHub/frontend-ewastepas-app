// src/components/elements/SplashScreen/SplashScreen.jsx
import { motion as Motion } from 'motion/react';
import { useEffect, useState } from 'react';
import ewasteDark from '../../../assets/img/ewasteDark.png';
import ewasteLight from '../../../assets/img/ewasteLight.png';
import useDarkMode from '../../../hooks/useDarkMode';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <Motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-900'
          : 'bg-gradient-to-br from-green-50 via-white/80 to-emerald-50'
      }`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='text-center'>
        {/* Logo Container */}
        <Motion.div
          className='mb-6'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className='w-24 h-24 mx-auto mb-4  rounded-3xl flex items-center justify-center shadow-lg'>
            <img
              src={isDarkMode ? ewasteDark : ewasteLight}
              alt='Ewastepas Logo'
              className='w-16 h-16 object-contain'
            />
          </div>
        </Motion.div>

        {/* App Name */}
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1
            className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            } mb-2`}
          >
            Ewastepas
          </h1>
          <p
            className={`text-base ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Antar Jemput Sampah Elektronik
          </p>
        </Motion.div>

        {/* Simple Loading Indicator */}
        <Motion.div
          className='mt-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div
            className={`w-8 h-8 mx-auto border-2 ${
              isDarkMode ? 'border-white' : 'border-slate-900'
            } border-t-transparent rounded-full animate-spin`}
          ></div>
        </Motion.div>
      </div>
    </Motion.div>
  );
};

export default SplashScreen;
