// src/pages/masyarakat/PermintaanPenjemputanView.jsx
import { useRef, useState } from 'react';
import { FormPenjemputan } from '../../../components/fragments';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useToast from '../../../hooks/useToast';

const PermintaanPenjemputanView = () => {
  useDocumentTitle('Permintaan Penjemputan');
  const { showAlert } = useToast();
  const formRef = useRef(null);

  const initialForm = {
    id_waktu_operasional: '',
    alamat_penjemputan: '',
    catatan: '',
  };
  const [formData, setFormData] = useState(initialForm);

  // handle input formData umum
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(initialForm);
  };

  return (
    <FormPenjemputan
      ref={formRef}
      formData={formData}
      onInputChange={handleInputChange}
      onReset={handleReset}
      showAlert={showAlert}
    />
  );
};

export default PermintaanPenjemputanView;
