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
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className='text-sm text-gray-600'>{message}</p>

      <div className='flex justify-end space-x-2 mt-6'>
        <button
          onClick={onClose}
          className='px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800'
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className={`px-4 py-2 rounded-lg ${confirmColor}`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
