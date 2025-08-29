import { Camera, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { FileUpload, Modal } from '../../elements/';

const AvatarUpload = ({ file, onFileChange, size = 96 }) => {
  const { isDarkMode } = useDarkMode();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className='relative w-fit'>
      {/* Avatar box */}
      <div
        className='relative rounded-full overflow-hidden border-4 border-green-300 cursor-pointer'
        style={{ width: size, height: size }}
        onClick={() => file && setIsPreviewOpen(true)}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt='Avatar'
            className='w-full h-full object-cover'
          />
        ) : (
          <div
            className={`flex items-center justify-center w-full h-full ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}
          >
            <User className='w-1/3 h-1/3 text-gray-400' />
          </div>
        )}

        {/* Tombol hapus */}
        {file && (
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onFileChange(null);
            }}
            className='absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700'
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Tombol kamera */}
      <button
        type='button'
        onClick={() => inputRef.current.click()}
        className='absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md'
      >
        <Camera size={16} />
      </button>

      {/* FileUpload dasar (hidden input trigger) */}
      <FileUpload
        ref={inputRef}
        accept='image/jpeg,image/png'
        onChange={(f) => onFileChange(f)}
        className='hidden'
      />

      {/* Modal preview */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title='Preview Foto Profil'
      >
        {previewUrl && (
          <img
            src={previewUrl}
            alt='Preview Avatar'
            className='max-h-[70vh] rounded-md mx-auto'
          />
        )}
      </Modal>
    </div>
  );
};

export default AvatarUpload;
