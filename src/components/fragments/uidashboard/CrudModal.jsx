import Modal from '../../elements/Modal';

const CrudModal = ({ isOpen, onClose, title, children, onSubmit, footer }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className='space-y-4'>{children}</div>

      {/* Footer (action buttons) */}
      <div className='flex justify-end space-x-2 mt-6'>
        {footer ? (
          footer
        ) : (
          <>
            <button
              onClick={onClose}
              className='px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800'
            >
              Batal
            </button>
            {onSubmit && (
              <button
                onClick={onSubmit}
                className='px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white'
              >
                Simpan
              </button>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default CrudModal;
