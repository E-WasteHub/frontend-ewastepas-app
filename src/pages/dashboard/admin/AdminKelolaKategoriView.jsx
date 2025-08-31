import { Edit, Trash2 } from 'lucide-react';
import { Button, Input, Textarea } from '../../../components/elements';
import { AdminDataTable, UniversalModal } from '../../../components/fragments';

const AdminKelolaKategoriView = () => {
  const {
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
  } = useAdminKategori();

  // ✅ Kolom Tabel
  const columns = [
    {
      name: 'Nama Kategori',
      selector: (row) => row.nama_kategori,
      sortable: true,
    },
    {
      name: 'Deskripsi',
      selector: (row) => row.deskripsi_kategori,
      wrap: true,
    },
    {
      name: 'Poin',
      selector: (row) => row.poin_kategori,
      sortable: true,
      width: '120px',
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          <Button size='sm' variant='outline' onClick={() => handleEdit(row)}>
            <Edit className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='danger'
            onClick={() => setDeleteId(row.id_kategori)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminDataTable
        title='Kelola Kategori'
        columns={columns}
        data={kategoriData}
        loading={isLoading}
        onAdd={handleCreate}
        addButtonText='Tambah Kategori'
        noDataText='Belum ada data kategori'
      />

      <UniversalModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={formMode === 'create' ? 'Tambah Kategori' : 'Edit Kategori'}
        type='form'
        onConfirm={handleSubmit}
        confirmText='Simpan'
      >
        <Input
          label='Nama Kategori'
          value={formData.nama_kategori}
          onChange={(e) => handleFormChange('nama_kategori', e.target.value)}
          required
        />
        <Textarea
          label='Deskripsi'
          value={formData.deskripsi_kategori}
          onChange={(e) =>
            handleFormChange('deskripsi_kategori', e.target.value)
          }
        />
        <Input
          type='number'
          label='Poin'
          value={formData.poin_kategori}
          onChange={(e) => handleFormChange('poin_kategori', e.target.value)}
          required
        />
      </UniversalModal>

      <UniversalModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title='Hapus Kategori?'
        type='confirm'
        onConfirm={handleDelete}
        confirmText='Hapus'
        confirmVariant='danger'
      >
        <p className='text-sm text-gray-500'>
          Apakah Anda yakin ingin menghapus kategori ini?
        </p>
      </UniversalModal>

      <Toast config={alertConfig} />
    </>
  );
};

export default AdminKelolaKategoriView;
