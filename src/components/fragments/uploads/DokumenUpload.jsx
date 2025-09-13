import { FileText, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import Modal from '../../elements/Modal';

const DokumenUpload = ({
  jenisDokumen = 'KTP',
  dokumenSaatIni,
  onDokumenChange,
  disabled = false,
}) => {
  const { isDarkMode } = useDarkMode();
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validasi file
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file maksimal 10MB');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    // Safety check untuk onDokumenChange
    if (typeof onDokumenChange === 'function') {
      onDokumenChange(file);
    } else {
      console.warn(
        '⚠️ onDokumenChange prop tidak tersedia atau bukan function'
      );
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

  const displayImage = previewImage || dokumenSaatIni;

  return (
    <div className='space-y-3'>
      {/* Header */}
      <div className='flex items-center space-x-2'>
        <FileText
          size={16}
          className={isDarkMode ? 'text-green-400' : 'text-green-500'}
        />
        <h3
          className={`text-sm font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {jenisDokumen}
        </h3>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-4 transition-all cursor-pointer
          ${
            isDarkMode
              ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
        onClick={handleClick}
      >
        {displayImage ? (
          /* Image Preview */
          <div className='space-y-3'>
            <div className='flex justify-center'>
              <img
                src={displayImage}
                alt={`Preview ${jenisDokumen}`}
                className='max-h-32 rounded-lg shadow-sm cursor-pointer hover:opacity-80 transition-opacity'
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPreview(true);
                }}
              />
            </div>
            <p
              className={`text-xs text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Klik untuk ganti file
            </p>
          </div>
        ) : (
          /* Upload Placeholder */
          <div className='text-center space-y-2'>
            <div
              className={`p-3 rounded-full inline-block ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            >
              <Upload
                size={24}
                className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              />
            </div>
            <div>
              <p
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Upload {jenisDokumen}
              </p>
              <p
                className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Klik untuk pilih file
              </p>
            </div>
          </div>
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
          title={`Preview ${jenisDokumen}`}
        >
          <div className='flex justify-center'>
            <img
              src={displayImage}
              alt={`Preview ${jenisDokumen}`}
              className='max-w-full max-h-96 rounded-lg'
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DokumenUpload;
