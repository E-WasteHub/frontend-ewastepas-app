// src/hooks/admin/useAdminEdukasi.js
import * as edukasiService from '../../services/edukasiService';
import useAdminCRUD from './useAdminCRUD';

/**
 * Custom hook untuk mengelola CRUD konten edukasi di halaman admin.
 * 🔹 Wrapper dari useAdminCRUD
 */
const useAdminEdukasi = () => {
  const service = {
    index: edukasiService.indexEdukasi,
    create: edukasiService.createEdukasi,
    update: edukasiService.updateEdukasi,
    delete: edukasiService.deleteEdukasi,
  };

  // Form data awal untuk edukasi
  const initialFormData = {
    judul: '',
    deskripsi: '',
    gambar: '', // misal ada upload gambar
  };

  const crud = useAdminCRUD({
    service,
    initialFormData,
    entityName: 'Edukasi',
  });

  return { ...crud };
};

export default useAdminEdukasi;
