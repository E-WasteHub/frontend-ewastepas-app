import useDarkMode from '../../../hooks/useDarkMode';
import Modal from '../../elements/Modal';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi',
  message = 'Apakah Anda yakin?',
  confirmText = 'Ya',
  cancelText = 'Batal',
  confirmColor = 'bg-green-600 hover:bg-green-700 text-white',
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p
        className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
      >
        {message}
      </p>

      <div className='flex justify-end space-x-2 mt-6'>
        {/* Cancel button */}
        <button
          onClick={onClose}
          className={`px-4 py-2 rounded-lg transition ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          {cancelText}
        </button>

        {/* Confirm button */}
        <button
          onClick={onConfirm}
          className={`px-4 py-2 rounded-lg transition ${confirmColor}`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
