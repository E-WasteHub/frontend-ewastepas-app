import { useState } from 'react';
import Loading from '../../../components/elements/Loading';
import FormPenjemputan from '../../../components/fragments/forms/FormPenjemputan';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {
  processPhotoUpload,
  submitPermintaanPenjemputan,
} from '../../../services/permintaanPenjemputanService';

const PermintaanPenjemputanView = () => {
  const { isDarkMode } = useDarkMode();
  useDocumentTitle('Permintaan Penjemputan');

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
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
          <Loading
            variant='spinner'
            size='lg'
            text='Mengirim permintaan...'
            isDarkMode={isDarkMode}
          />
        </div>
      )}

      {/* Form Content */}
      <div className='py-8 px-4'>
        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
    </div>
  );
};

export default PermintaanPenjemputanView;
