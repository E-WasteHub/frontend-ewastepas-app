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

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto ${
        isMobile ? 'px-2 py-6' : 'px-4 py-10'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative rounded-lg shadow-lg w-full ${
          isMobile ? 'max-w-lg' : 'max-w-3xl'
        } ${bgDesain}`}
        style={{ margin: 'auto' }}
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
        </div>

        {/* Content */}
        <div className={isMobile ? 'p-3' : 'p-6'}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
