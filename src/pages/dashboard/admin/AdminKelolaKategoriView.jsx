import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Loading } from '../../../components/elements';
import {
  AlertModal,
  ConfirmModal,
  KategoriCrudModal,
} from '../../../components/fragments/';
import useAdminCrud from '../../../hooks/useAdminCrud';
import * as kategoriService from '../../../services/kategoriService';

const AdminKelolaKategoriView = () => {
  const {
    data: kategori,
    isLoading,
    error,
    tambah,
    ubah,
    hapus,
    isSubmitting,
  } = useAdminCrud(kategoriService);

  // State Modal CRUD
  const [crudOpen, setCrudOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  // State Confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  // AlertModal state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'success',
  });

  // Handler Tambah/Edit
  const handleCrudSubmit = async (formValues) => {
    if (editTarget) {
      const res = await ubah(editTarget.id_kategori, formValues);
      if (res.success) {
        setAlertConfig({
          title: 'Berhasil',
          message: 'Kategori berhasil diperbarui',
          type: 'success',
        });
        setAlertOpen(true);
      } else {
        setAlertConfig({
          title: 'Gagal',
          message: res.error || 'Kategori gagal diperbarui',
          type: 'error',
        });
        setAlertOpen(true);
      }
    } else {
      const res = await tambah(formValues);
      if (res.success) {
        setAlertConfig({
          title: 'Berhasil',
          message: 'Kategori berhasil ditambahkan',
          type: 'success',
        });
        setAlertOpen(true);
      } else {
        setAlertConfig({
          title: 'Gagal',
          message: res.error || 'Kategori gagal ditambahkan',
          type: 'error',
        });
        setAlertOpen(true);
      }
    }

    setCrudOpen(false);
    setEditTarget(null);
  };

  // Handler Hapus
  const handleDelete = async () => {
    if (!confirmTarget) return;
    const res = await hapus(confirmTarget);
    if (res.success) {
      setAlertConfig({
        title: 'Berhasil',
        message: 'Kategori berhasil dihapus',
        type: 'success',
      });
      setAlertOpen(true);
    } else {
      setAlertConfig({
        title: 'Gagal',
        message: res.error || 'Kategori gagal dihapus',
        type: 'error',
      });
      setAlertOpen(true);
    }
    setConfirmOpen(false);
  };

  // Kolom DataTable
  const columns = [
    {
      name: 'Nama Kategori',
      selector: (row) => row.nama_kategori,
      sortable: true,
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          <button
            onClick={() => {
              setEditTarget(row);
              setCrudOpen(true);
            }}
            className='px-3 py-1 bg-yellow-500 text-white rounded'
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => {
              setConfirmTarget(row.id_kategori);
              setConfirmOpen(true);
            }}
            className='px-3 py-1 bg-red-600 text-white rounded'
          >
            🗑 Hapus
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Kelola Kategori</h1>
        <button
          onClick={() => {
            setEditTarget(null);
            setCrudOpen(true);
          }}
          className='px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700'
        >
          ➕ Tambah Kategori
        </button>
      </div>

      {isLoading ? (
        <Loading mode='inline' text='Memuat data...' />
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <DataTable
          columns={columns}
          data={kategori}
          pagination
          highlightOnHover
          striped
          dense
        />
      )}

      {/* Crud Modal */}
      <KategoriCrudModal
        isOpen={crudOpen}
        onClose={() => {
          setCrudOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleCrudSubmit}
        initialData={editTarget}
        isLoading={isSubmitting}
        title={editTarget ? 'Edit Kategori' : 'Tambah Kategori'}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title='Konfirmasi Hapus'
        message='Apakah Anda yakin ingin menghapus kategori ini?'
        confirmType='danger'
        confirmText='Hapus'
        cancelText='Batal'
        isLoading={isSubmitting}
      />

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
};

export default AdminKelolaKategoriView;
