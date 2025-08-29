import { Camera, User, X } from 'lucide-react';
import { useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Modal from '../Modal';

const AvatarUpload = ({ file, onFileChange, size = 96 }) => {
  const fileInputRef = useRef(null);
  const { isDarkMode } = useDarkMode();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileSelect = (e) => {
    const f = e.target.files?.[0];
    if (f) onFileChange(f);
  };

  return (
    <div className='relative w-fit'>
      {/* Avatar Preview */}
      <div
        className='relative rounded-full overflow-hidden border-4 border-green-300 cursor-pointer'
        style={{ width: size, height: size }}
        onClick={() => file && setIsPreviewOpen(true)}
      >
        {file ? (
          <img
            src={URL.createObjectURL(file)}
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

      {/* Tombol ganti foto */}
      <button
        type='button'
        onClick={() => fileInputRef.current.click()}
        className='absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md'
      >
        <Camera size={16} />
      </button>

      {/* Input File */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/jpeg,image/png'
        className='hidden'
        onChange={handleFileSelect}
      />

      {/* Modal Preview */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title='Preview Foto Profil'
      >
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt='Preview Avatar'
            className='max-h-[70vh] rounded-md mx-auto'
          />
        )}
      </Modal>
    </div>
  );
};

export default AvatarUpload;
