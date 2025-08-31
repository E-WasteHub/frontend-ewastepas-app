// src/hooks/admin/useAdminKategori.js
import * as kategoriService from '../../services/kategoriService';
import useAdminCRUD from './useAdminCRUD';

const useAdminKategori = () => {
  // 🔹 Definisikan service untuk kategori
  const service = {
    index: kategoriService.indexKategori,
    create: kategoriService.createKategori,
    update: kategoriService.updateKategori,
    delete: kategoriService.deleteKategori,
  };

  // 🔹 Data form awal untuk kategori
  const initialFormData = {
    nama_kategori: '',
    deskripsi_kategori: '',
    poin_kategori: 0,
  };

  // 🔹 Gunakan hook CRUD umum
  const crud = useAdminCRUD({
    service,
    initialFormData,
    entityName: 'Kategori',
  });

  // Langsung return semua hasil dari useAdminCRUD
  return { ...crud };
};

export default useAdminKategori;
