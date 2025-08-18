import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      {/* Modal Box */}
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative'>
        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          {title && <h2 className='text-lg font-semibold'>{title}</h2>}
          <button onClick={onClose} aria-label='Close modal'>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
