// src/hooks/useAdminCRUD.js
import { useCallback, useEffect, useState } from 'react';

const useAdminCRUD = ({
  service,
  initialFormData,
  namaCrud = 'data',
  additionalFetch = null,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [formData, setFormData] = useState(initialFormData);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // ✅ Bungkus fetchData dengan useCallback
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await service.index();
      setData(res?.data || []);

      if (additionalFetch) await additionalFetch();
    } catch (err) {
      console.error(`❌ Gagal ambil ${namaCrud}:`, err);
      setError(`Tidak dapat memuat ${namaCrud}`);
    } finally {
      setIsLoading(false);
    }
  }, [service, namaCrud, additionalFetch]);
  // 🔹 dependencies penting: service, namaCrud, additionalFetch

  // ✅ Sekarang aman dipanggil di useEffect
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ➕ Buka modal untuk tambah data baru
  const handleCreate = () => {
    setFormMode('create');
    setFormData(initialFormData);
    setModalOpen(true);
  };

  // ✏️ Buka modal untuk edit data
  const handleEdit = (item) => {
    setFormMode('edit');
    setFormData(item);
    setModalOpen(true);
  };

  // ❌ Tutup modal + reset form
  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData(initialFormData);
  };

  // 💾 Submit form → create atau update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'create') {
        await service.create(formData);
        setSuccess(`${namaCrud} berhasil ditambahkan`);
      } else {
        // otomatis cari field id_*
        const idField = Object.keys(formData).find((key) =>
          key.includes('id_')
        );
        await service.update(formData[idField], formData);
        setSuccess(`${namaCrud} berhasil diperbarui`);
      }
      fetchData(); // refresh data setelah sukses
      handleCloseModal();
    } catch (err) {
      console.error(`❌ Error submit ${namaCrud}:`, err);
      setError(`Gagal menyimpan ${namaCrud}`);
    }
  };

  // 🗑️ Hapus data
  const handleDelete = async () => {
    try {
      await service.delete(deleteId);
      setSuccess(`${namaCrud} berhasil dihapus`);
      fetchData();
    } catch (err) {
      console.error(`❌ Error delete ${namaCrud}:`, err);
      setError(`Gagal menghapus ${namaCrud}`);
    } finally {
      setDeleteId(null);
    }
  };

  // 🔧 Update field form (kontrol input)
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    // data & state utama
    data,
    isLoading,
    modalOpen,
    formMode,
    formData,
    deleteId,
    success,
    error,

    // setter untuk reset pesan
    setSuccess,
    setError,
    setDeleteId,

    // actions
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
