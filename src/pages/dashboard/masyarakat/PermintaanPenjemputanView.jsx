// src/views/Masyarakat/PermintaanPenjemputanView.jsx

import { useState } from 'react';
import { AlertModal, FormPenjemputan } from '../../../components/fragments';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const PermintaanPenjemputanView = () => {
  useDocumentTitle('Permintaan Penjemputan');

  const [formData, setFormData] = useState({
    waktu_dijemput: '',
    alamat_jemput: '',
    catatan: '',
  });

  const [daftarSampah, setDaftarSampah] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 state alert modal
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info',
  });

  const showAlert = (title, message, type = 'info') => {
    setAlertConfig({ title, message, type });
    setAlertOpen(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (daftarSampah.length === 0) {
      showAlert(
        'Validasi Gagal',
        'Pilih minimal satu jenis sampah.',
        'warning'
      );
      setIsSubmitting(false);
      return;
    }

    if (!formData.waktu_dijemput || !formData.alamat_jemput) {
      showAlert('Validasi Gagal', 'Lengkapi semua field wajib.', 'warning');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        daftarSampah,
        photos,
      };

      console.log('Submit:', payload);

      showAlert('Berhasil', 'Form penjemputan berhasil dikirim!', 'success');
    } catch (err) {
      console.error(err);
      showAlert('Error', 'Terjadi kesalahan saat mengirim form.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormPenjemputan
          formData={formData}
          onInputChange={handleInputChange}
          daftarSampah={daftarSampah}
          onSampahChange={setDaftarSampah}
          photos={photos}
          setPhotos={setPhotos}
          isSubmitting={isSubmitting}
          onCancel={() =>
            showAlert(
              'Dibatalkan',
              'Permintaan penjemputan dibatalkan.',
              'info'
            )
          }
          showAlert={showAlert}
        />
      </form>

      {/* 🔹 AlertModal universal (final clean) */}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </>
  );
};

export default PermintaanPenjemputanView;
