// src/pages/masyarakat/PermintaanPenjemputanView.jsx
import { useState } from 'react';
import { FormPenjemputan } from '../../../components/fragments';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useToast from '../../../hooks/useToast';

const PermintaanPenjemputanView = () => {
  useDocumentTitle('Permintaan Penjemputan');
  const { showAlert } = useToast();

  const initialForm = {
    id_waktu_operasional: '',
    alamat_penjemputan: '',
    catatan: '',
  };
  const [formData, setFormData] = useState(initialForm);

  // handle reset form
  const handleReset = () => {
    setFormData(initialForm);
    showAlert('Info', 'Form berhasil direset', 'info');
  };

  // handle input formData
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormPenjemputan
      formData={formData}
      onInputChange={handleInputChange}
      showAlert={showAlert}
      onReset={handleReset}
    />
  );
};

export default PermintaanPenjemputanView;
