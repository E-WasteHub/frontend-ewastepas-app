import { Camera, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Modal from '../../elements/Modal';

const SampahUpload = ({
  gambarSampah = [],
  onGambarChange,
  disabled = false,
}) => {
  const { isDarkMode } = useDarkMode();
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // Only take first file
    if (!file.type.startsWith('image/')) return;

    const imageUrl = URL.createObjectURL(file);
    const newImage = {
      file,
      url: imageUrl,
      name: file.name,
      id: Date.now(),
    };

    // Replace existing image if any, or add new one (max 1 image)
    onGambarChange([newImage]);
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    handleFileSelect(files);
    e.target.value = '';
  };

  const handleRemoveImage = () => {
    onGambarChange([]);
  };

  const handlePreviewImage = (image) => {
    setPreviewImage(image);
    setShowPreview(true);
  };

  return (
    <div className='space-y-4'>
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
          Foto Sampah Elektronik
        </h3>
      </div>

      {/* Upload Area - Show only when no images */}
      {gambarSampah.length === 0 ? (
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer
            ${
              isDarkMode
                ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
            }
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
                Upload Foto Sampah
              </p>
              <p
                className={`mt-1 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Klik untuk memilih foto sampah e-waste
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
                src={gambarSampah[0].url}
                alt='Sampah'
                className='w-full h-full object-cover cursor-pointer'
                onClick={() => handlePreviewImage(gambarSampah[0])}
              />

              {/* Top Action Buttons */}
              {!disabled && (
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
                    onClick={handleRemoveImage}
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
        accept='image/*'
        onChange={handleFileChange}
        className='hidden'
        disabled={disabled}
      />

      {/* Preview Modal using Modal component */}
      <Modal
        isOpen={showPreview}
        onClose={() => {
          setShowPreview(false);
          setPreviewImage(null);
        }}
        title='Preview Foto Sampah'
      >
        <div className='text-center space-y-4'>
          <div className='flex justify-center'>
            <img
              src={previewImage?.url}
              alt='Preview foto sampah'
              className='max-w-full max-h-96 rounded-lg'
            />
          </div>
          <div className='space-y-2'>
            <p
              className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {previewImage?.name}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SampahUpload;
