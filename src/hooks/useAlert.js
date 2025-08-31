// src/hooks/useAlert.js
import { useState } from 'react';

/**
 * Custom hook untuk mengelola alert/toast notifications.
 * Mengurangi duplikasi kode alert di hooks lainnya.
 */
const useAlert = () => {
  const [alertConfig, setAlertConfig] = useState(null);

  // ✅ Show alert dengan auto close
  const showAlert = (title, message, type = 'info', duration = 3000) => {
    setAlertConfig({ title, message, type });

    if (duration > 0) {
      setTimeout(() => setAlertConfig(null), duration);
    }
  };

  // ✅ Close alert manually
  const closeAlert = () => {
    setAlertConfig(null);
  };

  // ✅ Show success alert
  const showSuccess = (title, message) => {
    showAlert(title, message, 'success');
  };

  // ✅ Show error alert
  const showError = (title, message) => {
    showAlert(title, message, 'error');
  };

  // ✅ Show info alert
  const showInfo = (title, message) => {
    showAlert(title, message, 'info');
  };

  // ✅ Show warning alert
  const showWarning = (title, message) => {
    showAlert(title, message, 'warning');
  };

  return {
    alertConfig,
    showAlert,
    closeAlert,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};

export default useAlert;
