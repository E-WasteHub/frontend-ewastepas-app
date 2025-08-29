import { useState } from 'react';
import FormPenjemputan from '../../../components/fragments/forms/FormPenjemputan';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { buatPenjemputan } from '../../../services/penjemputanService';

const PermintaanPenjemputanView = () => {
  useDocumentTitle('Permintaan Penjemputan');

  const [formData, setFormData] = useState({
    id_waktu_operasional: '',
    alamat_jemput: '',
    catatan: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (daftarSampah) => {
    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append('id_waktu_operasional', formData.id_waktu_operasional);
      formPayload.append('alamat_jemput', formData.alamat_jemput);
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

      // Debug payload
      for (let [k, v] of formPayload.entries()) {
        console.log(k, v);
      }

      const res = await buatPenjemputan(formPayload);
      showAlert('Berhasil', 'Form penjemputan berhasil dikirim!', 'success');
      console.log('✅ Response:', res);

      // reset
      setFormData({
        id_waktu_operasional: '',
        alamat_jemput: '',
        catatan: '',
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

      {/* Alert Modal */}
      {alertOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg max-w-md w-full mx-4'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold text-gray-900'>
                {alertConfig.title}
              </h3>
              <button
                onClick={() => setAlertOpen(false)}
                className='text-gray-400 hover:text-gray-600'
              >
                ✕
              </button>
            </div>
            <p
              className={
                alertConfig.type === 'success'
                  ? 'text-green-600'
                  : alertConfig.type === 'error'
                  ? 'text-red-600'
                  : alertConfig.type === 'warning'
                  ? 'text-yellow-600'
                  : 'text-gray-700'
              }
            >
              {alertConfig.message}
            </p>
            <div className='flex justify-end mt-4'>
              <button
                onClick={() => setAlertOpen(false)}
                className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PermintaanPenjemputanView;
