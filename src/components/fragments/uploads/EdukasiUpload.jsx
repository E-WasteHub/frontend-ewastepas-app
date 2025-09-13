import { Camera, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Modal from '../../elements/Modal';

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

  const handleFileSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
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
    fileInputRef.current.value = '';
    onRemove?.();
  };

  const handlePreviewImage = () => {
    setShowPreview(true);
  };

  // Reset preview kalau currentImage berubah (misalnya setelah save berhasil)
  useEffect(() => {
    if (currentImage) setPreviewImage(null);
  }, [currentImage]);

  // Cleanup blob URL
  useEffect(() => {
    return () => {
      if (previewImage?.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

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

      {/* Upload Area - Show only when no image */}
      {!displayImage ? (
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer
            ${
              isDarkMode
                ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
            }
            ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={handleClick}
        >
          <div className='text-center space-y-4'>
            <div
              className={`
                rounded-full inline-block p-4
                ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}
              `}
            >
              <Upload
                size={32}
                className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              />
            </div>

            <div>
              <p
                className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {isLoading ? 'Mengunggah...' : 'Upload Gambar Edukasi'}
              </p>
              <p
                className={`mt-1 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Klik untuk memilih gambar (JPG, PNG, GIF hingga 5MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Single Image Preview */
        <div className='space-y-3'>
          <div className='relative w-full'>
            <div
              className={`
                relative rounded-lg overflow-hidden border-2 w-full h-64
                ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}
              `}
            >
              <img
                src={displayImage}
                alt='Preview gambar edukasi'
                className='w-full h-full object-cover cursor-pointer'
                onClick={handlePreviewImage}
                onError={(e) => (e.target.src = '/fallback.png')}
              />

              {/* Top Action Buttons */}
              {!disabled && !isLoading && (
                <div className='absolute top-2 left-2 right-2 flex justify-between'>
                  {/* Replace Photo Button */}
                  <button
                    type='button'
                    onClick={handleClick}
                    className='p-1 bg-emerald-500 bg-opacity-80 text-white rounded-full hover:bg-opacity-100 transition-colors'
                  >
                    <Camera size={14} />
                  </button>

                  {/* Remove Button */}
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
              src={displayImage}
              alt='Preview gambar edukasi'
              className='max-w-full max-h-96 rounded-lg'
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EdukasiUpload;
