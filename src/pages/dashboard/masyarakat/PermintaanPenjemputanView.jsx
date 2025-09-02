// src/pages/masyarakat/PermintaanPenjemputanView.jsx
import { useState } from 'react';
import { AlertModal, FormPenjemputan } from '../../../components/fragments';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { buatPenjemputan } from '../../../services/penjemputanService';

const PermintaanPenjemputanView = () => {
  useDocumentTitle('Permintaan Penjemputan');

  // 🔹 state utama untuk form
  const [formData, setFormData] = useState({
    id_waktu_operasional: '',
    alamat_penjemputan: '',
    catatan: '',
  });

  // 🔹 state loading submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 state alert modal
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info',
  });

  // show alert reusable
  const showAlert = (title, message, type = 'info') => {
    setAlertConfig({ title, message, type });
    setAlertOpen(true);
  };

  // handle input formData
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // handle submit ke backend
  const handleSubmit = async (daftarSampah) => {
    setIsSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append('id_waktu_operasional', formData.id_waktu_operasional);
      formPayload.append('alamat_penjemputan', formData.alamat_penjemputan);
      formPayload.append('catatan', formData.catatan);

      daftarSampah.forEach((s, idx) => {
        formPayload.append(`sampah[${idx}][id_kategori]`, s.id_kategori);
        formPayload.append(`sampah[${idx}][id_jenis]`, s.id_jenis);
        formPayload.append(`sampah[${idx}][jumlah_sampah]`, s.jumlah_sampah);
        formPayload.append(
          `sampah[${idx}][catatan_sampah]`,
          s.catatan_sampah || ''
        );
        if (s.gambar) {
          formPayload.append(`sampah[${idx}][gambar]`, s.gambar);
        }
      });

      await buatPenjemputan(formPayload);
      showAlert('Berhasil', 'Form penjemputan berhasil dikirim!', 'success');

      // reset form
      setFormData({
        id_waktu_operasional: '',
        alamat_penjemputan: '',
        catatan: '',
        daftarSampah: [],
      });
    } catch (err) {
      console.error('❌ Error submit:', err);
      showAlert('Error', 'Terjadi kesalahan saat mengirim form.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormPenjemputan
        formData={formData}
        onInputChange={handleInputChange}
        isSubmitting={isSubmitting}
        onCancel={() =>
          showAlert('Dibatalkan', 'Permintaan penjemputan dibatalkan.', 'info')
        }
        showAlert={showAlert}
        onSubmit={handleSubmit}
      />

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
