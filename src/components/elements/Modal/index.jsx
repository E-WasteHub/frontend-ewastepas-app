import { X } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import { useResponsive } from '../../../hooks/useResponsive';

const Modal = ({ isOpen, onClose, title, children }) => {
  const { isDarkMode } = useDarkMode();
  const { isMobile } = useResponsive();

  if (!isOpen) return null;

  const bgDesain = isDarkMode
    ? 'bg-slate-800 text-slate-100'
    : 'bg-white text-gray-800';
  const tutupHover = isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${
        isMobile ? 'px-2' : 'px-4'
      }`}
      onClick={onClose}
    >
      <div
        className={`rounded-lg shadow-lg w-full max-w-md relative ${
          isMobile ? 'm-3' : 'm-6'
        } ${bgDesain}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center border-b border-gray-700/30 ${
            isMobile ? 'px-3 py-2' : 'px-4 py-3'
          }`}
        >
          {title && (
            <h2
              className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label='Close modal'
            className={`p-1 rounded-full transition-colors ${tutupHover}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className={isMobile ? 'p-3' : 'p-6'}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
