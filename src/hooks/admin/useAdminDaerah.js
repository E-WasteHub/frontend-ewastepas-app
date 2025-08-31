// src/hooks/admin/useAdminDaerah.js
import * as daerahService from '../../services/daerahService';
import useAdminCRUD from './useAdminCRUD';

/**
 * Custom hook untuk mengelola CRUD data daerah di halaman admin.
 * 🔹 Wrapper dari useAdminCRUD (supaya tidak duplikatif).
 */
const useAdminDaerah = () => {
  const service = {
    index: daerahService.indexDaerah,
    create: daerahService.createDaerah,
    update: daerahService.updateDaerah,
    delete: daerahService.deleteDaerah,
  };

  // Data form awal untuk entitas daerah
  const initialFormData = {
    id_daerah: '',
    nama_daerah: '',
    deskripsi_daerah: '',
  };

  const crud = useAdminCRUD({
    service,
    initialFormData,
    entityName: 'Daerah',
  });

  return { ...crud };
};

export default useAdminDaerah;
