// src/components/fragments/modals/AlertModal.jsx
import { Button, Modal } from '../../elements';

const typeStyles = {
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400',
};

const AlertModal = ({ isOpen, onClose, title, message, type = 'info' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {/* Pesan */}
      <p className={`text-sm ${typeStyles[type] || typeStyles.info}`}>
        {message}
      </p>

      {/* Footer */}
      <div className='flex justify-end mt-6'>
        <Button
          onClick={onClose}
          variant={
            type === 'success'
              ? 'primary'
              : type === 'error'
              ? 'danger'
              : type === 'warning'
              ? 'warning'
              : 'info'
          }
        >
          Ok
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
