// src/hooks/useAdminCRUD.js
import { useEffect, useState } from 'react';

/**
 * Custom hook universal untuk operasi CRUD di halaman admin.
 * Mengurangi duplikasi kode di hooks admin lainnya.
 *
 * @param {Object} config - Konfigurasi hook
 * @param {Object} config.service - Service object dengan method CRUD
 * @param {Object} config.initialFormData - Data form initial
 * @param {string} config.entityName - Nama entitas untuk pesan (contoh: "kategori")
 * @param {Function} config.additionalFetch - Function tambahan untuk fetch data lain
 */
const useAdminCRUD = ({
  service,
  initialFormData,
  entityName = 'data',
  additionalFetch = null,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk modal
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' | 'edit'
  const [formData, setFormData] = useState(initialFormData);

  // Alert state
  const [alertConfig, setAlertConfig] = useState(null);

  // Delete confirmation
  const [deleteId, setDeleteId] = useState(null);

  // ✅ Fetch data utama
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await service.index();
      console.log(`📌 ${entityName} data:`, res);
      setData(res?.data || []);

      // Jalankan fetch tambahan jika ada
      if (additionalFetch) {
        await additionalFetch();
      }
    } catch (err) {
      console.error(`❌ Gagal ambil ${entityName}:`, err);
      showAlert('Gagal', `Tidak dapat memuat ${entityName}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Handler Alert
  const showAlert = (title, message, type = 'info') => {
    setAlertConfig({ title, message, type });
    setTimeout(() => setAlertConfig(null), 3000);
  };

  // ✅ Handle open create modal
  const handleCreate = () => {
    setFormMode('create');
    setFormData(initialFormData);
    setModalOpen(true);
  };

  // ✅ Handle open edit modal
  const handleEdit = (item) => {
    setFormMode('edit');
    setFormData(item);
    setModalOpen(true);
  };

  // ✅ Handle close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData(initialFormData);
  };

  // ✅ Handler Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'create') {
        await service.create(formData);
        showAlert('Berhasil', `${entityName} berhasil ditambahkan`, 'success');
      } else {
        const idField = Object.keys(formData).find((key) =>
          key.includes('id_')
        );
        await service.update(formData[idField], formData);
        showAlert('Berhasil', `${entityName} berhasil diperbarui`, 'success');
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      console.error(`❌ Error submit ${entityName}:`, err);
      showAlert('Error', 'Terjadi kesalahan', 'error');
    }
  };

  // ✅ Handle delete
  const handleDelete = async () => {
    try {
      await service.delete(deleteId);
      showAlert('Berhasil', `${entityName} dihapus`, 'success');
      fetchData();
    } catch (err) {
      console.error(`❌ Error delete ${entityName}:`, err);
      showAlert('Error', `Gagal menghapus ${entityName}`, 'error');
    } finally {
      setDeleteId(null);
    }
  };

  // ✅ Handle form data change
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    data,
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
    refetch: fetchData,
  };
};

export default useAdminCRUD;
