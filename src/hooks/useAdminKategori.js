// src/hooks/useAdminKategori.js
import * as kategoriService from '../services/kategoriService';
import useAdminCRUD from './useAdminCRUD';

/**
 * Custom hook untuk mengelola CRUD kategori di halaman admin.
 * Menggunakan useAdminCRUD untuk mengurangi duplikasi kode.
 */
const useAdminKategori = () => {
  const service = {
    index: kategoriService.indexKategori,
    create: kategoriService.createKategori,
    update: kategoriService.updateKategori,
    delete: kategoriService.deleteKategori,
  };

  const initialFormData = {
    nama_kategori: '',
    deskripsi_kategori: '',
    poin_kategori: 0,
  };

  const {
    data: kategoriData,
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
    entityName: 'kategori',
  });

  return {
    kategoriData,
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
  };
};

export default useAdminKategori;
