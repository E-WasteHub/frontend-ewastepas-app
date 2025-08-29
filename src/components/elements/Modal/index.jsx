import { X } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const Modal = ({ isOpen, onClose, title, children }) => {
  const { isDarkMode } = useDarkMode();

  if (!isOpen) return null;

  const bgStyle = isDarkMode
    ? 'bg-slate-800 text-slate-100'
    : 'bg-white text-gray-800';
  const closeHover = isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200';

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4'
      onClick={onClose}
    >
      <div
        className={`rounded-lg shadow-lg w-full max-w-md relative m-3 sm:m-6 ${bgStyle}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex justify-between items-center px-3 py-2 sm:px-4 sm:py-3 border-b border-gray-700/30'>
          {title && (
            <h2 className='text-base sm:text-lg font-semibold'>{title}</h2>
          )}
          <button
            onClick={onClose}
            aria-label='Close modal'
            className={`p-1 rounded-full transition-colors ${closeHover}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className='p-3 sm:p-6'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
