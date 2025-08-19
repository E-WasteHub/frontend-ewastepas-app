import { Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Modal from '../Modal';

const FileUploadSingle = ({ label, file, onFileChange, accept }) => {
  const fileInputRef = useRef(null);
  const { isDarkMode } = useDarkMode();
  const [previewFile, setPreviewFile] = useState(null);

  const handleSelect = (e) => {
    const selected = e.target.files[0];
    if (selected) onFileChange(selected);
    e.target.value = '';
  };

  const handleRemove = () => {
    onFileChange(null);
  };

  return (
    <div className='space-y-2'>
      <h3
        className={`font-medium ${
          isDarkMode ? 'text-slate-100' : 'text-gray-800'
        }`}
      >
        {label}
      </h3>

      {!file ? (
        // Box kosong
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${
              isDarkMode
                ? 'border-slate-600 hover:border-green-400 bg-slate-800'
                : 'border-gray-300 hover:border-green-500 bg-white'
            }`}
          onClick={() => fileInputRef.current.click()}
        >
          <div
            className={`${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            } flex flex-col items-center gap-2`}
          >
            <Upload className='w-6 h-6' />
            <p className='text-sm'>Klik atau tarik file ke sini</p>
            <p className='text-xs opacity-70'>JPEG/PNG max 5MB</p>
          </div>
        </div>
      ) : (
        // Sudah ada file → tampilkan preview
        <div className='relative w-full'>
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className='h-32 w-full object-cover rounded cursor-pointer'
            onClick={() => setPreviewFile(file)}
          />
          <button
            type='button'
            onClick={handleRemove}
            className='absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow-md'
          >
            <X className='w-4 h-4' />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        className='hidden'
        onChange={handleSelect}
      />

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
            className='max-h-[70vh] rounded-md'
          />
        )}
      </Modal>
    </div>
  );
};

export default FileUploadSingle;
