import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { FileUpload, Modal } from '../../elements';

const FileUploadMultiple = ({
  label = 'Foto',
  files = [],
  onFilesChange,
  accept,
}) => {
  const [previewFile, setPreviewFile] = useState(null);
  const { isDarkMode } = useDarkMode();

  const handleRemove = (index) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center'>
        {label && <h3 className='font-medium'>{label}</h3>}
        {files.length > 0 && (
          <button
            type='button'
            onClick={() => document.getElementById('multi-upload-btn').click()}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-md border border-dashed border-gray-400 ${
              isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
            }`}
          >
            <Plus className='w-4 h-4' /> Tambah Foto
          </button>
        )}
      </div>

      {files.length === 0 ? (
        <FileUpload
          multiple
          accept={accept}
          onChange={(newFiles) => onFilesChange([...files, ...newFiles])}
        />
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {files.map((file, i) => (
            <div key={i} className='relative'>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className='h-24 w-full object-cover rounded cursor-pointer'
                onClick={() => setPreviewFile(file)}
              />
              <button
                type='button'
                onClick={() => handleRemove(i)}
                className='absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow-md'
              >
                <X className='w-4 h-4' />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal Preview */}
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

export default FileUploadMultiple;
