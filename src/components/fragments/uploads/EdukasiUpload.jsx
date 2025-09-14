// src/components/fragments/EdukasiUpload.jsx
import { Camera, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Modal from '../../elements/Modal';
import useToast from '../../../hooks/useToast';

// fallback default no-image
const fallbackImage = 'http://34.128.104.134:3000/public/images/no-image.jpg';

const EdukasiUpload = ({
  currentImage,
  onImageChange,
  onRemove,
  isLoading = false,
  disabled = false,
  className = '',
}) => {
  const { isDarkMode } = useDarkMode();
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  const { showAlert } = useToast();

  /* ---------------------- HANDLERS ---------------------- */
  const handleFileSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showAlert('File harus berupa gambar');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showAlert('Ukuran file maksimal 5MB');
      return;
    }

    if (previewImage?.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage);
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    onImageChange?.(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
    e.target.value = '';
  };

  const handleClick = () => {
    if (!disabled && !isLoading) fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (previewImage?.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    onImageChange?.(null);
    onRemove?.();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ---------------------- EFFECTS ---------------------- */
  useEffect(() => {
    return () => {
      if (previewImage?.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  /* ---------------------- DISPLAY ---------------------- */
  const displayImage = previewImage || currentImage;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className='flex items-center space-x-2'>
        <Camera
          size={20}
          className={isDarkMode ? 'text-green-400' : 'text-green-500'}
        />
        <h3
          className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Gambar Edukasi
        </h3>
      </div>

      {/* Upload Area / Preview */}
      {displayImage ? (
        <div className='relative w-full'>
          <div
            className={`relative rounded-lg overflow-hidden border-2 w-full h-64 ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}
          >
            <img
              src={displayImage}
              alt='Preview gambar edukasi'
              className='w-full h-full object-cover cursor-pointer'
              onClick={() => setShowPreview(true)}
              onError={(e) => (e.currentTarget.src = fallbackImage)}
            />

            {!disabled && !isLoading && (
              <div className='absolute top-2 left-2 right-2 flex justify-between'>
                <button
                  type='button'
                  onClick={handleClick}
                  className='p-1 bg-emerald-500 bg-opacity-80 text-white rounded-full hover:bg-opacity-100 transition-colors'
                >
                  <Camera size={14} />
                </button>
                <button
                  type='button'
                  onClick={handleRemove}
                  className='p-1 bg-red-500 bg-opacity-80 text-white rounded-full hover:bg-opacity-100 transition-colors'
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Jika kosong → kasih info jelas
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${
              isDarkMode
                ? 'border-gray-600 bg-gray-800'
                : 'border-gray-300 bg-gray-50'
            }
          `}
          onClick={handleClick}
        >
          <Upload size={32} className='mx-auto text-gray-400' />
          <p className='mt-2 text-sm text-gray-500'>
            Belum ada gambar (akan otomatis pakai default)
          </p>
        </div>
      )}

      {/* File Input */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/jpeg,image/png,image/gif'
        onChange={handleFileChange}
        className='hidden'
        disabled={disabled || isLoading}
      />

      {/* Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title='Preview Gambar Edukasi'
      >
        <div className='text-center space-y-4'>
          <div className='flex justify-center'>
            <img
              src={displayImage || fallbackImage}
              alt='Preview gambar edukasi'
              className='max-w-full max-h-96 rounded-lg'
              onError={(e) => (e.currentTarget.src = fallbackImage)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EdukasiUpload;
