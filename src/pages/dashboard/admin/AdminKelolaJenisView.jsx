import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Loading } from '../../../components/elements';
import { ConfirmModal, JenisCrudModal } from '../../../components/fragments';
import useAdminCrud from '../../../hooks/useAdminCrud';
import useToast from '../../../hooks/useToast';
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

  const { showAlert } = useToast();

  // State Modal CRUD
  const [crudOpen, setCrudOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  // State Confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  // Handler Tambah/Edit
  const handleCrudSubmit = async (formValues) => {
    if (editTarget) {
      const res = await ubah(editTarget.id_jenis, formValues);
      showAlert(
        res.success ? 'Berhasil' : 'Gagal',
        res.success
          ? 'Jenis sampah berhasil diperbarui'
          : res.error || 'Jenis sampah gagal diperbarui',
        res.success ? 'success' : 'error'
      );
    } else {
      const res = await tambah(formValues);
      showAlert(
        res.success ? 'Berhasil' : 'Gagal',
        res.success
          ? 'Jenis sampah berhasil ditambahkan'
          : res.error || 'Jenis sampah gagal ditambahkan',
        res.success ? 'success' : 'error'
      );
    }

    setCrudOpen(false);
    setEditTarget(null);
  };

  // Handler Hapus
  const handleDelete = async () => {
    console.log('🟢 handleDelete terpanggil, target:', confirmTarget);
    if (!confirmTarget) return;

    const res = await hapus(confirmTarget);
    showAlert(
      res.success ? 'Berhasil' : 'Gagal',
      res.success
        ? 'Jenis sampah berhasil dihapus'
        : res.error || 'Jenis sampah gagal dihapus',
      res.success ? 'success' : 'error'
    );
    setConfirmOpen(false);
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
        <Loading mode='inline' text='Memuat data...' />
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
    </div>
  );
};

export default AdminKelolaJenisView;
