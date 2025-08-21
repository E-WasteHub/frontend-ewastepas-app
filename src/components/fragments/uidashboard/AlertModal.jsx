// src/components/fragments/AlertModal.jsx
import { Button, Modal } from '../../elements';

const AlertModal = ({ isOpen, onClose, title, message, type }) => {
  if (!isOpen) return null;

  const colorClass =
    type === 'success'
      ? 'text-green-600'
      : type === 'error'
      ? 'text-red-600'
      : type === 'warning'
      ? 'text-yellow-600'
      : 'text-gray-700';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className='space-y-4'>
        <p className={colorClass}>{message}</p>
        <div className='flex justify-end'>
          <Button onClick={onClose}>Ok</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
