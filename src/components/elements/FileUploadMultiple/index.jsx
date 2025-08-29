import { Plus, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Modal from '../Modal';

const FileUploadBox = ({
  label = 'Foto Sampah',
  files = [],
  onFilesChange,
  accept,
}) => {
  const fileInputRef = useRef(null);
  const { isDarkMode } = useDarkMode();
  const [previewFile, setPreviewFile] = useState(null);

  // Tambah file
  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    onFilesChange([...files, ...newFiles]);
    e.target.value = '';
  };

  // Drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    onFilesChange([...files, ...newFiles]);
  };

  // Hapus file
  const handleRemove = (index) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className='flex-1 space-y-2'>
      {files.length === 0 ? (
        // Tampilan pertama kali (drag & drop box)
        <div>
          <h3
            className={`font-medium mb-2 ${
              isDarkMode ? 'text-slate-100' : 'text-gray-800'
            }`}
          >
            {label}
          </h3>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer
              ${
                isDarkMode
                  ? 'border-slate-600 hover:border-green-400 bg-slate-800'
                  : 'border-gray-300 hover:border-green-500 bg-white'
              }`}
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div
              className={`${
                isDarkMode ? 'text-slate-400' : 'text-gray-500'
              } flex flex-col items-center gap-2`}
            >
              <Upload className='w-6 h-6' />
              <p className='text-sm'>Klik atau tarik file ke sini</p>
              <p className='text-xs opacity-70'>JPEG/PNG hingga 5MB</p>
            </div>
          </div>
        </div>
      ) : (
        // Kalau sudah ada foto → header + tombol tambah foto sejajar + grid foto
        <div className='space-y-3'>
          <div className='flex justify-between items-center'>
            <h3
              className={`font-medium ${
                isDarkMode ? 'text-slate-100' : 'text-gray-800'
              }`}
            >
              {label}
            </h3>

            <button
              type='button'
              onClick={() => fileInputRef.current.click()}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-md border border-dashed border-gray-400 ${
                isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
              }`}
            >
              <Plus className='w-4 h-4' /> Tambah Foto
            </button>
          </div>

          {/* Grid foto responsif */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
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
        </div>
      )}

      {/* Input file hidden */}
      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        multiple
        className='hidden'
        onChange={handleFileSelect}
      />

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
            className='max-h-[70vh] rounded-md'
          />
        )}
      </Modal>
    </div>
  );
};

export default FileUploadBox;
