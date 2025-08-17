import { useState } from 'react';
import Loading from '../../../components/elements/Loading';
import FormPenjemputan from '../../../components/fragments/form/FormPenjemputan';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {
  processPhotoUpload,
  submitPermintaanPenjemputan,
} from '../../../services/permintaanPenjemputanService';

const PermintaanPenjemputanView = () => {
  const { isDarkMode } = useDarkMode();
  useDocumentTitle('Permintaan Penjemputan - E-WasteHub');

  // Form state
  const [formData, setFormData] = useState({
    alamat_jemput: '',
    waktu_dijemput: '',
    id_waktu_operasional: '',
    id_dropbox: '',
    catatan: '',
    sampah: [],
  });

  // UI State
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle photo upload
  const handlePhotoUpload = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newPhotos = await processPhotoUpload(files);
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
    e.target.value = '';
  };

  // Handle remove photo
  const handleRemovePhoto = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset form atau redirect
    console.log('Form cancelled');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        photos: photos,
      };

      const result = await submitPermintaanPenjemputan(submitData);

      if (result.success) {
        alert('Permintaan penjemputan berhasil dikirim!');
        // Reset form atau redirect
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim permintaan');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen lg:min-h-auto flex flex-col'>
      {/* Header - Fixed */}
      <div className='flex-shrink-0 px-4 md:px-6 lg:px-8 py-3 md:py-4'>
        <div className='max-w-7xl mx-auto'>
          <h1
            className={`text-lg md:text-xl lg:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Permintaan Penjemputan
          </h1>
          <p
            className={`text-sm md:text-base mt-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Mari berkontribusi untuk lingkungan yang lebih bersih!
          </p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className='absolute inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
          <Loading
            variant='spinner'
            size='lg'
            text='Mengirim permintaan...'
            isDarkMode={isDarkMode}
          />
        </div>
      )}

      {/* Form Content - Fill remaining space */}
      <div className='flex-1 lg:flex-initial'>
        <form onSubmit={handleSubmit} className='h-full lg:h-auto'>
          {/* Form Body - Conditional scrolling */}
          <div
            className={`overflow-y-auto lg:overflow-y-visible px-4 md:px-6 lg:px-8 py-4 md:py-6 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}
          >
            <div className='max-w-7xl mx-auto'>
              <FormPenjemputan
                formData={formData}
                onInputChange={handleInputChange}
                daftarSampah={formData.sampah}
                onSampahChange={(newSampah) =>
                  setFormData((prev) => ({ ...prev, sampah: newSampah }))
                }
                photos={photos}
                onPhotoUpload={handlePhotoUpload}
                onPhotoRemove={handleRemovePhoto}
                isSubmitting={isSubmitting}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermintaanPenjemputanView;
