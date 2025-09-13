import { Camera, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Modal from '../../elements/Modal';

const AvatarUpload = ({
  currentImage,
  onImageChange,
  isLoading = false,
  disabled = false,
}) => {
  const { isDarkMode } = useDarkMode();
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    console.log('📸 File dipilih:', file.name, file.size, file.type);

    // Validasi file
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      alert('Ukuran file maksimal 5MB');
      return;
    }

    // Cleanup preview lama jika ada
    if (previewImage && previewImage.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage);
    }

    const imageUrl = URL.createObjectURL(file);
    console.log('📸 Preview URL dibuat:', imageUrl);
    setPreviewImage(imageUrl);

    // Safety check untuk onImageChange
    if (typeof onImageChange === 'function') {
      onImageChange(file);
    } else {
      console.warn('⚠️ onImageChange prop tidak tersedia atau bukan function');
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const displayImage = previewImage || currentImage || null;

  // Reset preview hanya kalau backend balikin URL baru
  useEffect(() => {
    if (currentImage && typeof currentImage === 'string') {
      // Kalau currentImage berubah dan beda dari preview sebelumnya, reset preview
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
        setPreviewImage(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage]);

  // Cleanup preview blob
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className='flex flex-col items-start space-y-3'>
      {/* Avatar Circle */}
      <div className='relative'>
        <div
          className={`
            w-24 h-24 rounded-full overflow-hidden border-2 flex items-center justify-center relative
            ${
              isDarkMode
                ? 'border-gray-600 bg-gray-800'
                : 'border-gray-300 bg-gray-100'
            }
          `}
        >
          {displayImage ? (
            <>
              <img
                src={displayImage}
                alt='Avatar'
                className={`w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity ${
                  isLoading ? 'opacity-50' : ''
                }`}
                onClick={() => setShowPreview(true)}
              />
              {isLoading && (
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
                </div>
              )}
            </>
          ) : (
            <>
              <User
                size={32}
                className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              />
              {isLoading && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600'></div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Camera Button */}
        {!disabled && (
          <button
            type='button'
            onClick={handleClick}
            disabled={isLoading}
            className={`
              absolute -bottom-2 -right-2 p-2 rounded-full shadow-lg transition-colors
              ${
                isDarkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <Camera size={16} />
          </button>
        )}
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='hidden'
        disabled={disabled}
      />

      {/* Preview Modal */}
      {showPreview && displayImage && (
        <Modal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          title='Preview Foto Profil'
        >
          <div className='flex justify-center'>
            <img
              src={displayImage}
              alt='Preview foto profil'
              className='max-w-full max-h-96 rounded-lg'
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AvatarUpload;
