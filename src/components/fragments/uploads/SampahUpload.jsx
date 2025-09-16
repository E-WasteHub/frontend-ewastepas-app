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

  // pilih file dari input
  const pilihFile = (files) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    const imageUrl = URL.createObjectURL(file);
    const newImage = {
      file,
      url: imageUrl,
      name: file.name,
      id: Date.now(),
    };

    // hanya simpan satu gambar (replace jika ada)
    onGambarChange([newImage]);
  };

  // buka input file
  const bukaInputFile = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  // handle ubah file
  const ubahFile = (e) => {
    const files = e.target.files;
    pilihFile(files);
    e.target.value = '';
  };

  // hapus gambar
  const hapusGambar = () => {
    onGambarChange([]);
  };

  // lihat preview gambar
  const lihatPreviewGambar = (image) => {
    setPreviewImage(image);
    setShowPreview(true);
  };

  return (
    <div className='space-y-4'>
      {/* header */}
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

      {/* area upload (tampil jika belum ada gambar) */}
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
          onClick={bukaInputFile}
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
        // preview single image
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
                alt='foto sampah elektronik'
                className='w-full h-full object-cover cursor-pointer'
                onClick={() => lihatPreviewGambar(gambarSampah[0])}
              />

              {/* tombol aksi di atas gambar */}
              {!disabled && (
                <div className='absolute top-2 left-2 right-2 flex justify-between'>
                  {/* ganti foto */}
                  <button
                    type='button'
                    onClick={bukaInputFile}
                    className='p-1 bg-emerald-500 bg-opacity-80 text-white rounded-full hover:bg-opacity-100 transition-colors'
                  >
                    <Camera size={14} />
                  </button>

                  {/* hapus foto */}
                  <button
                    type='button'
                    onClick={hapusGambar}
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

      {/* input file */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={ubahFile}
        className='hidden'
        disabled={disabled}
      />

      {/* modal preview */}
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
              alt='preview foto sampah'
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
