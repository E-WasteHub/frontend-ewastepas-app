import { Button, Modal } from '../../elements';

const UniversalModal = ({
  isOpen,
  onClose,
  title,
  children,
  // kept for parity with previous API
  onConfirm,
  confirmText = 'Simpan',
  confirmVariant = 'primary',
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className='space-y-4'>{children}</div>

      <div className='flex justify-end gap-3 mt-6'>
        <Button variant='secondary' onClick={onClose} disabled={isLoading}>
          Batal
        </Button>

        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className={
            confirmVariant === 'danger'
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : confirmVariant === 'warning'
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : confirmVariant === 'success'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }
        >
          {isLoading ? 'Memproses...' : confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default UniversalModal;
