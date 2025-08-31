// src/hooks/useAdminDropbox.js
import { useState } from 'react';
import * as daerahService from '../services/daerahService';
import * as dropboxService from '../services/dropboxService';
import useAdminCRUD from './useAdminCRUD';

/**
 * Custom hook untuk mengelola CRUD dropbox di halaman admin.
 * Menggunakan useAdminCRUD untuk mengurangi duplikasi kode.
 * Memiliki fetch tambahan untuk data daerah.
 */
const useAdminDropbox = () => {
  const [daerahOptions, setDaerahOptions] = useState([]);

  const service = {
    index: dropboxService.indexDropbox,
    create: dropboxService.createDropbox,
    update: dropboxService.updateDropbox,
    delete: dropboxService.deleteDropbox,
  };

  const initialFormData = {
    nama_dropbox: '',
    longitude: '',
    latitude: '',
    id_daerah: '',
  };

  // ✅ Fetch daerah untuk dropdown
  const fetchDaerah = async () => {
    try {
      const res = await daerahService.indexDaerah();
      console.log('📌 Daftar Daerah:', res?.data);
      setDaerahOptions(res?.data || []);
    } catch (err) {
      console.error('Gagal ambil daerah:', err);
    }
  };

  const {
    data: dropboxData,
    isLoading,
    modalOpen,
    formMode,
    formData,
    alertConfig,
    deleteId,
    setDeleteId,
    handleCreate,
    handleEdit,
    handleCloseModal,
    handleSubmit,
    handleDelete,
    handleFormChange,
    refetch,
  } = useAdminCRUD({
    service,
    initialFormData,
    entityName: 'dropbox',
    additionalFetch: fetchDaerah,
  });

  // Override handleEdit untuk format id_daerah sebagai string
  const handleEditDropbox = (dropbox) => {
    handleEdit({
      ...dropbox,
      id_daerah: String(dropbox.id_daerah),
    });
  };

  return {
    dropboxData,
    daerahOptions,
    isLoading,
    modalOpen,
    formMode,
    formData,
    alertConfig,
    deleteId,
    setDeleteId,
    handleCreate,
    handleEdit: handleEditDropbox,
    handleCloseModal,
    handleSubmit,
    handleDelete,
    handleFormChange,
    refetch,
  };
};

export default useAdminDropbox;
