import { useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  AlertModal,
  ConfirmModal,
  JenisCrudModal,
} from '../../../components/fragments';
import useAdminCrud from '../../../hooks/useAdminCrud';
import * as jenisService from '../../../services/jenisService';

const AdminKelolaJenisView = () => {
  const {
    data: jenis,
    isLoading,
    error,
    tambah,
    ubah,
    hapus,
    isSubmitting,
  } = useAdminCrud(jenisService);

  // State Modal CRUD
  const [crudOpen, setCrudOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  // State Confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  // State Alert
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info',
  });

  // Handler Tambah/Edit
  const handleCrudSubmit = async (formValues) => {
    if (editTarget) {
      const res = await ubah(editTarget.id_jenis, formValues);
      if (res.success) {
        setAlertConfig({
          title: 'Berhasil',
          message: 'Jenis sampah berhasil diperbarui',
          type: 'success',
        });
      } else {
        setAlertConfig({
          title: 'Gagal',
          message: res.error || 'Jenis sampah gagal diperbarui',
          type: 'error',
        });
      }
    } else {
      const res = await tambah(formValues);
      if (res.success) {
        setAlertConfig({
          title: 'Berhasil',
          message: 'Jenis sampah berhasil ditambahkan',
          type: 'success',
        });
      } else {
        setAlertConfig({
          title: 'Gagal',
          message: res.error || 'Jenis sampah gagal ditambahkan',
          type: 'error',
        });
      }
    }

    setCrudOpen(false);
    setEditTarget(null);
    setAlertOpen(true);
  };

  // Handler Hapus
  const handleDelete = async () => {
    console.log('🟢 handleDelete terpanggil, target:', confirmTarget);
    if (!confirmTarget) return;

    const res = await hapus(confirmTarget);
    if (res.success) {
      setAlertConfig({
        title: 'Berhasil',
        message: 'Jenis sampah berhasil dihapus',
        type: 'success',
      });
    } else {
      setAlertConfig({
        title: 'Gagal',
        message: res.error || 'Jenis sampah gagal dihapus',
        type: 'error',
      });
    }
    setConfirmOpen(false);
    setAlertOpen(true);
  };

  // Kolom DataTable
  const columns = [
    {
      name: 'Nama Jenis',
      selector: (row) => row.nama_jenis,
      sortable: true,
    },
    {
      name: 'Deskripsi',
      selector: (row) => row.deskripsi_jenis || '-',
    },
    {
      name: 'Kategori',
      selector: (row) => row.nama_kategori || '-',
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
              console.log('🔴 Hapus target:', row.id_jenis);
              setConfirmTarget(row.id_jenis);
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
        <h1 className='text-2xl font-bold'>Kelola Jenis Sampah</h1>
        <button
          onClick={() => {
            setEditTarget(null);
            setCrudOpen(true);
          }}
          className='px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700'
        >
          ➕ Tambah Jenis
        </button>
      </div>

      {isLoading ? (
        <p>⏳ Memuat data...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <DataTable
          columns={columns}
          data={jenis}
          pagination
          highlightOnHover
          striped
          dense
        />
      )}

      {/* Crud Modal */}
      <JenisCrudModal
        isOpen={crudOpen}
        onClose={() => {
          setCrudOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleCrudSubmit}
        initialData={editTarget}
        isLoading={isSubmitting}
        title={editTarget ? 'Edit Jenis' : 'Tambah Jenis'}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title='Konfirmasi Hapus'
        message='Apakah Anda yakin ingin menghapus jenis sampah ini?'
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

export default AdminKelolaJenisView;
