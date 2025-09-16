import useDarkMode from '../../../hooks/useDarkMode';
import { Button, Modal } from '../../elements';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'konfirmasi',
  message = 'apakah anda yakin?',
  confirmText = 'ya',
  cancelText = 'batal',
  confirmType = 'danger',
  isLoading = false,
}) => {
  const { isDarkMode } = useDarkMode();

  // mapping style tombol confirm
  const confirmStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p
        className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
      >
        {message}
      </p>

      <div className='flex justify-end gap-3 mt-4'>
        <Button variant='secondary' onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className={confirmStyles[confirmType]}
        >
          {isLoading ? 'memproses...' : confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
