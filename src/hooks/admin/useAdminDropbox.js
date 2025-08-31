// src/hooks/admin/useAdminDropbox.js
import { useState } from 'react';
import * as daerahService from '../../services/daerahService';
import * as dropboxService from '../../services/dropboxService';
import useAdminCRUD from './useAdminCRUD';

/**
 * Custom hook untuk mengelola CRUD Dropbox di halaman admin.
 * 🔹 Wrapper tipis dari useAdminCRUD
 * 🔹 Ada tambahan fetch data daerah untuk dropdown
 */
const useAdminDropbox = () => {
  const [daerahOptions, setDaerahOptions] = useState([]);

  // Service untuk operasi CRUD Dropbox
  const service = {
    index: dropboxService.indexDropbox,
    create: dropboxService.createDropbox,
    update: dropboxService.updateDropbox,
    delete: dropboxService.deleteDropbox,
  };

  // Data form awal untuk Dropbox
  const initialFormData = {
    id_dropbox: '',
    nama_dropbox: '',
    longitude: '',
    latitude: '',
    id_daerah: '',
  };

  // Fetch daftar daerah untuk kebutuhan dropdown
  const fetchDaerah = async () => {
    try {
      const res = await daerahService.indexDaerah();
      setDaerahOptions(res?.data || []);
    } catch (err) {
      console.error('❌ Gagal ambil daftar daerah:', err);
    }
  };

  // Panggil hook CRUD generik
  const crud = useAdminCRUD({
    service,
    initialFormData,
    entityName: 'Dropbox',
    additionalFetch: fetchDaerah,
  });

  // Custom: saat edit, pastikan id_daerah dikonversi ke string (untuk select input)
  const handleEditDropbox = (dropbox) => {
    crud.handleEdit({
      ...dropbox,
      id_daerah: String(dropbox.id_daerah || ''),
    });
  };

  return {
    ...crud, // spread semua hasil dari useAdminCRUD
    daerahOptions, // tambahan khusus untuk dropdown
    handleEdit: handleEditDropbox, // override handleEdit
  };
};

export default useAdminDropbox;
