// src/pages/masyarakat/PermintaanPenjemputanView.jsx
import { useRef, useState } from 'react';
import { FormPenjemputan } from '../../../components/fragments';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useToast from '../../../hooks/useToast';
import { buatPenjemputan } from '../../../services/penjemputanService';

const PermintaanPenjemputanView = () => {
  useDocumentTitle('Permintaan Penjemputan');

  // ref untuk memanggil reset dari child
  const formRef = useRef(null);

  // toast hook
  const { showAlert } = useToast();

  // state utama untuk form
  const [formData, setFormData] = useState({
    id_waktu_operasional: '',
    alamat_penjemputan: '',
    catatan: '',
  });

  // state loading submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle input formData
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // handle reset
  const handleReset = () => {
    setFormData({
      id_waktu_operasional: '',
      alamat_penjemputan: '',
      catatan: '',
    });
    showAlert('Info', 'Form berhasil direset', 'info');
  };

  // handle submit ke backend
  const handleSubmit = async (daftarSampahFromForm) => {
    console.log('🔍 Submit data:', {
      formData,
      daftarSampahFromForm,
      sampahLength: daftarSampahFromForm?.length,
    });

    setIsSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append('id_waktu_operasional', formData.id_waktu_operasional);
      formPayload.append('alamat_penjemputan', formData.alamat_penjemputan);
      formPayload.append('catatan', formData.catatan);

      // Gunakan daftarSampah yang dikirim dari FormPenjemputan
      if (
        Array.isArray(daftarSampahFromForm) &&
        daftarSampahFromForm.length > 0
      ) {
        daftarSampahFromForm.forEach((s, idx) => {
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
      } else {
        throw new Error('Daftar sampah kosong atau bukan array');
      }

      await buatPenjemputan(formPayload);
      showAlert('Berhasil', 'Form penjemputan berhasil dikirim!', 'success');

      // Reset form data di parent
      setFormData({
        id_waktu_operasional: '',
        alamat_penjemputan: '',
        catatan: '',
      });

      // Trigger reset di child component melalui ref
      if (formRef.current?.resetForm) {
        formRef.current.resetForm();
      }
    } catch (err) {
      console.error('❌ Error submit:', err);
      showAlert('Error', 'Terjadi kesalahan saat mengirim form.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormPenjemputan
      ref={formRef}
      formData={formData}
      onInputChange={handleInputChange}
      isSubmitting={isSubmitting}
      showAlert={showAlert}
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  );
};

export default PermintaanPenjemputanView;
