import { Upload } from 'lucide-react';
import { useRef } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';

const FileUpload = ({
  multiple = false,
  accept = 'image/*',
  onChange,
  children,
  className = '',
}) => {
  const inputRef = useRef(null);
  const { isDarkMode } = useDarkMode();

  const handleSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // reset input agar bisa pilih file dengan nama sama
    e.target.value = '';
    onChange?.(multiple ? files : files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length === 0) return;

    onChange?.(multiple ? files : files[0]);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
        ${
          isDarkMode
            ? 'border-slate-600 hover:border-green-400 bg-slate-800'
            : 'border-gray-300 hover:border-green-500 bg-white'
        }
        ${className}`}
      onClick={() => inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Default content, bisa di-override via children */}
      {children || (
        <div
          className={`${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          } flex flex-col items-center gap-2`}
        >
          <Upload className='w-6 h-6' />
          <p className='text-sm'>Klik atau tarik file ke sini</p>
          <p className='text-xs opacity-70'>
            {multiple ? 'Bisa pilih lebih dari satu file' : 'Hanya satu file'}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type='file'
        multiple={multiple}
        accept={accept}
        className='hidden'
        onChange={handleSelect}
      />
    </div>
  );
};

export default FileUpload;
