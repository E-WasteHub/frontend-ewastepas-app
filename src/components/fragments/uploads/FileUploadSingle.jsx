import { X } from 'lucide-react';
import { useState } from 'react';
import { FileUpload, Modal } from '../../elements';

const FileUploadSingle = ({ label, file, onFileChange, accept }) => {
  const [previewFile, setPreviewFile] = useState(null);

  return (
    <div className='space-y-2'>
      {label && <h3 className='font-medium'>{label}</h3>}

      {!file ? (
        <FileUpload accept={accept} onChange={(f) => onFileChange(f)} />
      ) : (
        <div className='relative w-full'>
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className='h-32 w-full object-cover rounded cursor-pointer'
            onClick={() => setPreviewFile(file)}
          />
          <button
            type='button'
            onClick={() => onFileChange(null)}
            className='absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow-md'
          >
            <X className='w-4 h-4' />
          </button>
        </div>
      )}

      {/* Modal preview */}
      <Modal
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        title={`Preview ${label}`}
      >
        {previewFile && (
          <img
            src={URL.createObjectURL(previewFile)}
            alt='Preview'
            className='max-h-[70vh] rounded-md mx-auto'
          />
        )}
      </Modal>
    </div>
  );
};

export default FileUploadSingle;
