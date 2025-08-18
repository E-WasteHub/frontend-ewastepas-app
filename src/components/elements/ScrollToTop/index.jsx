import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useDarkMode();

  // Cek posisi scroll
  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll ke atas
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {isVisible && (
        <Motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onClick={scrollToTop}
          className={`
            fixed lg:bottom-10 bottom-20 right-6 z-50 p-3 rounded-full shadow-lg text-white
            transition hover:scale-110 active:scale-95
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
