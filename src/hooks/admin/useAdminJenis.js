// src/hooks/admin/useAdminJenis.js
import * as jenisService from '../../services/jenisService';
import useAdminCRUD from './useAdminCRUD';

/**
 * Custom hook untuk mengelola CRUD jenis sampah di halaman admin.
 * 🔹 Cukup menjadi wrapper dari useAdminCRUD
 */
const useAdminJenis = () => {
  // Definisi service khusus untuk "Jenis"
  const service = {
    index: jenisService.indexJenis,
    create: jenisService.createJenis,
    update: jenisService.updateJenis,
    delete: jenisService.deleteJenis,
  };

  // State awal untuk form jenis
  const initialFormData = {
    nama_jenis: '',
    id_kategori_sampah: '', // misalnya perlu relasi ke kategori
  };

  // Gunakan hook CRUD generik
  const crud = useAdminCRUD({
    service,
    initialFormData,
    entityName: 'Jenis',
  });

  return { ...crud };
};

export default useAdminJenis;
