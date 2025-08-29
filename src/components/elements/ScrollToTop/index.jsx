import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';

const ScrollToTop = () => {
  const [tombolMuncul, setTombolMuncul] = useState(false);
  const { isDarkMode } = useDarkMode();

  // Cek posisi scroll
  useEffect(() => {
    const cekScroll = () => setTombolMuncul(window.scrollY > 300);
    window.addEventListener('scroll', cekScroll);
    return () => window.removeEventListener('scroll', cekScroll);
  }, []);

  // Scroll ke atas
  const keAtas = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const bgColor = isDarkMode ? 'bg-green-500' : 'bg-green-600';

  return (
    <AnimatePresence>
      {tombolMuncul && (
        <Motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onClick={keAtas}
          aria-label='Scroll ke atas'
          className={`fixed right-6 bottom-20 lg:bottom-10 z-50 p-3 rounded-full shadow-lg text-white transition hover:scale-110 active:scale-95 ${bgColor}`}
        >
          <ArrowUp className='h-6 w-6' strokeWidth={2.5} />
        </Motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
