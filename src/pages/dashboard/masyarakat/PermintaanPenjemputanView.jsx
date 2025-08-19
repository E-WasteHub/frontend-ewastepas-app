import { useState } from 'react';
import FormPenjemputan from '../../../components/fragments/forms/FormPenjemputan';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const PermintaanPenjemputanView = () => {
  useDocumentTitle('Permintaan Penjemputan');
  const [formData, setFormData] = useState({
    waktu_dijemput: '',
    alamat_jemput: '',
    catatan: '',
  });

  const [daftarSampah, setDaftarSampah] = useState([]);
  const [photos, setPhotos] = useState([]); // langsung array of File
  const [isSubmitting, setIsSubmitting] = useState(false);

  // perubahan input text/textarea
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validasi sederhana
    if (daftarSampah.length === 0) {
      alert('Pilih minimal satu jenis sampah');
      setIsSubmitting(false);
      return;
    }
    if (!formData.waktu_dijemput || !formData.alamat_jemput) {
      alert('Lengkapi semua field wajib');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        daftarSampah,
        photos, // langsung array File
      };

      console.log('Submit:', payload);

      // TODO: kirim ke API pakai fetch/axios
      alert('Form penjemputan terkirim!');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat mengirim form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPenjemputan
        formData={formData}
        onInputChange={handleInputChange}
        daftarSampah={daftarSampah}
        onSampahChange={setDaftarSampah}
        photos={photos}
        setPhotos={setPhotos}
        isSubmitting={isSubmitting}
        onCancel={() => console.log('batal')}
      />
    </form>
  );
};

export default PermintaanPenjemputanView;
