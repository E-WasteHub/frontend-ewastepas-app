import { X } from 'lucide-react';
import { useEffect } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = '',
}) => {
  const { isDarkMode } = useDarkMode();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  // Size variants
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 ${
          isDarkMode ? 'bg-black/70' : 'bg-gray-500/50'
        } transition-opacity`}
        onClick={handleBackdropClick}
      />

      {/* Modal container */}
      <div className='flex min-h-full items-center justify-center p-4'>
        <div
          className={`
            relative w-full ${
              sizeClasses[size]
            } transform rounded-lg shadow-xl transition-all
            ${
              isDarkMode
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-200'
            }
            ${className}
          `}
        >
          {/* Header */}
          {(title || onClose) && (
            <div
              className={`
              flex items-center justify-between p-6 border-b
              ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
            `}
            >
              {title && (
                <h3
                  className={`
                  text-lg font-semibold
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}
                >
                  {title}
                </h3>
              )}

              {onClose && (
                <button
                  onClick={onClose}
                  className={`
                    p-2 rounded-full transition-colors
                    ${
                      isDarkMode
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300'
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }
                  `}
                  aria-label='Close modal'
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className='p-6'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
