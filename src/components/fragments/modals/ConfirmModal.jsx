import useDarkMode from '../../../hooks/useDarkMode';
import { Button, Modal } from '../../elements';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi',
  message = 'Apakah Anda yakin?',
  confirmText = 'Ya',
  cancelText = 'Batal',
  confirmType = 'danger', // 'primary' | 'danger' | 'warning' | 'success'
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

      <div className='flex justify-end gap-3 mt-6'>
        <Button variant='secondary' onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className={confirmStyles[confirmType]}
        >
          {isLoading ? 'Memproses...' : confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
