// src/hooks/useToast.js
import { toast } from 'react-toastify';

const useToast = () => {
  const showToast = (message, type = 'info', options = {}) => {
    const defaultOptions = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    };

    switch (type) {
      case 'success':
        return toast.success(message, defaultOptions);
      case 'error':
        return toast.error(message, defaultOptions);
      case 'warning':
        return toast.warning(message, defaultOptions);
      case 'info':
      default:
        return toast.info(message, defaultOptions);
    }
  };

  // Helper function untuk compatibility dengan syntax lama
  const showAlert = (title, message, type = 'info') => {
    const fullMessage = title ? `${title}: ${message}` : message;
    return showToast(fullMessage, type);
  };

  return {
    showToast,
    showAlert,
    // Alias untuk backward compatibility
    success: (message, options) => showToast(message, 'success', options),
    error: (message, options) => showToast(message, 'error', options),
    warning: (message, options) => showToast(message, 'warning', options),
    info: (message, options) => showToast(message, 'info', options),
  };
};

export default useToast;
