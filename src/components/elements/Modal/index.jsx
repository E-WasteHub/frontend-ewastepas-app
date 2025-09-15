import { X } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import { useResponsive } from '../../../hooks/useResponsive';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer = null,
  showCloseButton = true,
}) => {
  const { isDarkMode } = useDarkMode();
  const { isMobile, isTablet } = useResponsive();

  if (!isOpen) return null;

  const bgDesain = isDarkMode
    ? 'bg-slate-800 text-slate-100'
    : 'bg-white text-gray-800';

  const paddingClass = isMobile ? 'px-2 py-6' : 'px-4 py-10';
  const sizeClass = isMobile
    ? 'max-w-lg'
    : isTablet
    ? 'max-w-2xl'
    : 'max-w-3xl';
  const innerPadding = isMobile ? 'p-3' : 'p-6';

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-start bg-black/50 overflow-y-auto ${paddingClass}`}
      onClick={onClose}
    >
      <div
        className={`relative rounded-lg shadow-lg w-full m-auto ${sizeClass} ${bgDesain}`}
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
          {showCloseButton && (
            <button
              onClick={onClose}
              className='p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-slate-700/50 transition'
            >
              <X className='w-4 h-4' />
            </button>
          )}
        </div>

        {/* Content */}
        <div className={innerPadding}>{children}</div>

        {/* Footer opsional */}
        {footer && (
          <div className={`border-t border-gray-700/30 ${innerPadding}`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
