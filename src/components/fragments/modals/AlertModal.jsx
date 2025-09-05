// Stub AlertModal for backward compatibility - use react-toastify instead
import useDarkMode from '../../../hooks/useDarkMode';

const AlertModal = ({ isOpen, onClose, title, message }) => {
  // This is a stub - the actual AlertModal has been removed
  // Use useToast hook instead for new implementations
  console.warn('AlertModal is deprecated. Use useToast hook instead.');

  const { isDarkMode } = useDarkMode();

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        className={`p-6 rounded-lg max-w-md mx-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h3 className='text-lg font-semibold mb-4'>{title}</h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {message}
        </p>
        <div className='flex justify-end'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
