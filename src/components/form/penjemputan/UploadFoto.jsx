import { ExternalLink, X } from 'lucide-react';
import { useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Button from '../../common/Button';
import Modal from '../../common/Modal';

/**
 * Komponen untuk upload dan mengelola foto sampah
 */
const UploadFoto = ({ photos, onPhotoUpload, onPhotoRemove }) => {
  const { isDarkMode } = useDarkMode();
  const fileInputRef = useRef(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Handler untuk photo upload
  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      await onPhotoUpload(e);
    }
  };

  // Handler untuk buka file dialog
  const handleAddMorePhotos = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = (photoId) => {
    if (confirm('Yakin ingin menghapus foto ini?')) {
      onPhotoRemove(photoId);
    }
  };

  // Handler untuk preview foto di modal
  const handlePreviewPhoto = (photo) => {
    setPreviewPhoto(photo);
    setShowPreviewModal(true);
  };

  return (
    <div className='space-y-3 md:space-y-4'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0'>
        <h3
          className={`text-base md:text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Foto Sampah ({photos.length} foto)
        </h3>

        {photos.length > 0 && (
          <Button
            onClick={handleAddMorePhotos}
            variant='primary'
            size='sm'
            type='button'
            className='flex items-center gap-1 text-sm px-3 md:px-4 py-1.5 md:py-2 w-full sm:w-auto'
          >
            Tambah Foto
          </Button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type='file'
        multiple
        accept='image/*'
        onChange={handleFileSelect}
        className='hidden'
      />

      {/* Upload area - hanya tampil jika belum ada foto */}
      {photos.length === 0 && (
        <label
          className={`block w-full p-4 md:p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDarkMode
              ? 'border-gray-600 hover:border-gray-500 bg-gray-800'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
        >
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={handleFileSelect}
            className='hidden'
          />
          <div className='text-center'>
            <div
              className={`text-2xl md:text-3xl mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              📷
            </div>
            <p
              className={`text-xs md:text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Klik untuk upload foto sampah
            </p>
            <p
              className={`text-xs mt-1 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              Maksimal 5MB per foto
            </p>
          </div>
        </label>
      )}

      {photos.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3'>
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`relative group border rounded-lg overflow-hidden ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}
            >
              <div className='aspect-square'>
                <img
                  src={photo.url || photo.preview}
                  alt={`Sampah ${index + 1}`}
                  className='w-full h-full object-cover cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreviewPhoto(photo);
                  }}
                />
              </div>

              {/* Overlay buttons */}
              <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center gap-1'>
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreviewPhoto(photo);
                  }}
                  className='opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 hover:bg-blue-600 text-white p-1 md:p-1.5 rounded-full'
                  title='Lihat foto'
                >
                  <ExternalLink size={12} className='md:w-3.5 md:h-3.5' />
                </button>
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePhoto(photo.id);
                  }}
                  className='opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-1 md:p-1.5 rounded-full'
                  title='Hapus foto'
                >
                  <X size={12} className='md:w-3.5 md:h-3.5' />
                </button>
              </div>

              {/* File name - smaller text */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-0.5 md:p-1 text-xs truncate ${
                  isDarkMode
                    ? 'bg-gray-900 text-gray-300'
                    : 'bg-white text-gray-700'
                } bg-opacity-90`}
              >
                {photo.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Preview Foto */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title={previewPhoto?.name || 'Preview Foto'}
        size='lg'
      >
        <div className='text-center'>
          {previewPhoto ? (
            <img
              src={previewPhoto.url || previewPhoto.preview}
              alt={previewPhoto.name || 'Preview'}
              className='max-w-full max-h-96 mx-auto rounded-lg'
              onError={(e) => {
                console.error('Image load error:', e);
                console.log(
                  'Photo URL:',
                  previewPhoto.url || previewPhoto.preview
                );
              }}
            />
          ) : (
            <div className='p-8 text-gray-500'>Foto tidak dapat dimuat</div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UploadFoto;
