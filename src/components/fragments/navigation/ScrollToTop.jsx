import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode'; // 1. Impor hook

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useDarkMode(); // 2. Panggil hook

  // Logika untuk menampilkan tombol (sudah baik, tidak perlu diubah)
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className={`
        fixed bottom-20 right-6 z-50 p-3 rounded-full shadow-lg text-white
        transition-transform duration-200 hover:scale-110 active:scale-95 lg:bottom-8 lg:right-8
        ${isDarkMode ? 'bg-green-500' : 'bg-green-600'}
      `}
          aria-label='Scroll to top'
        >
          <ArrowUp className='h-6 w-6' strokeWidth={2.5} />
        </Motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
