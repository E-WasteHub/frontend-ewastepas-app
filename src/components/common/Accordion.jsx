import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import useDarkMode from '../../hooks/useDarkMode';

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { isDarkMode } = useDarkMode();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`border rounded-xl overflow-hidden shadow-sm transition-shadow duration-300 ${
        isDarkMode
          ? 'border-slate-700 bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20'
          : 'border-slate-200 bg-white hover:shadow-lg hover:shadow-slate-900/10'
      }`}
    >
      <button
        onClick={toggleAccordion}
        className={`w-full text-left px-6 py-4 font-medium transition-all duration-300 ${
          isDarkMode
            ? 'bg-slate-800 hover:bg-slate-700 text-white'
            : 'bg-white hover:bg-slate-50 text-slate-900'
        }`}
      >
        <div className='flex items-center justify-between'>
          <span className='text-sm md:text-base font-medium'>{title}</span>
          <Motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className={`transition-colors duration-200 ${
              isDarkMode
                ? 'text-slate-400 group-hover:text-slate-300'
                : 'text-slate-500 group-hover:text-slate-600'
            }`}
          >
            <ChevronDown className='w-5 h-5' />
          </Motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='overflow-hidden'
          >
            <div
              className={`px-6 py-4 text-sm border-t transition-colors duration-200 ${
                isDarkMode
                  ? 'bg-slate-800 text-slate-300 border-slate-700'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className='leading-relaxed space-y-2'>{children}</div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
