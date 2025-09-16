import { useMemo, useState } from 'react';
import { Loading, Pagination } from '../../../components/elements';
import {
  AdminTable,
  ConfirmModal,
  FilterCrud,
  HeaderDashboard,
  KategoriCrudModal,
} from '../../../components/fragments';
import useAdminCrud from '../../../hooks/useAdminCrud';
import usePagination from '../../../hooks/usePagination';
import useToast from '../../../hooks/useToast';
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

  const { showAlert } = useToast();

  //    State Modal CRUD
  const [crudOpen, setCrudOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  //    State Confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  //    Search state
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  // Filter data by search
  const filteredData = useMemo(() => {
    if (!search && !filter) return kategori;
    return kategori.filter((item) => {
      const matchSearch =
        !search ||
        item.nama_kategori?.toLowerCase().includes(search.toLowerCase());
      const matchFilter = !filter || item.poin_kategori >= parseInt(filter);
      return matchSearch && matchFilter;
    });
  }, [kategori, search, filter]);

  // Pagination
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, 7);

  // Handler Tambah/Edit
  const handleCrudSubmit = async (formValues) => {
    if (editTarget) {
      const res = await ubah(editTarget.id_kategori, formValues);
      showAlert(
        res.success ? 'Berhasil' : 'Gagal',
        res.success
          ? 'Kategori berhasil diperbarui'
          : res.error || 'Kategori gagal diperbarui',
        res.success ? 'success' : 'error'
      );
    } else {
      const res = await tambah(formValues);
      showAlert(
        res.success ? 'Berhasil' : 'Gagal',
        res.success
          ? 'Kategori berhasil ditambahkan'
          : res.error || 'Kategori gagal ditambahkan',
        res.success ? 'success' : 'error'
      );
    }

    setCrudOpen(false);
    setEditTarget(null);
  };

  // Handler Hapus
  const handleDelete = async () => {
    if (!confirmTarget) return;
    const res = await hapus(confirmTarget);
    showAlert(
      res.success ? 'Berhasil' : 'Gagal',
      res.success
        ? 'Kategori berhasil dihapus'
        : res.error || 'Kategori gagal dihapus',
      res.success ? 'success' : 'error'
    );
    setConfirmOpen(false);
  };

  // Kolom tabel
  const columns = [
    { name: 'Nama Kategori', selector: 'nama_kategori' },
    {
      name: 'Poin Per Kategori',
      selector: 'poin_kategori',
    },
    {
      name: 'Deskripsi',
      selector: 'deskripsi_kategori',
      cell: (row) =>
        row.deskripsi_kategori && row.deskripsi_kategori.length > 50
          ? row.deskripsi_kategori.substring(0, 50) + '...'
          : row.deskripsi_kategori || '-',
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
            className='px-3 py-1 text-xs font-medium rounded bg-yellow-500 text-white hover:bg-yellow-600'
          >
            Edit
          </button>
          <button
            onClick={() => {
              setConfirmTarget(row.id_kategori);
              setConfirmOpen(true);
            }}
            className='px-3 py-1 text-xs font-medium rounded bg-red-600 text-white hover:bg-red-700'
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <HeaderDashboard
        title='Kelola Kategori'
        subtitle='Kelola kategori sampah elektronik dan poin reward yang diberikan'
      />

      {isLoading ? (
        <Loading mode='inline' text='Memuat data...' />
      ) : error ? (
        <p className='text-red-500'>Error: {error}</p>
      ) : kategori.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <p>Belum ada data kategori.</p>
          <p>Klik tombol "Tambah Kategori" untuk menambahkan data pertama.</p>
        </div>
      ) : (
        <>
          <AdminTable
            columns={columns}
            data={paginatedData}
            topContent={
              <FilterCrud
                pencarian={search}
                setPencarian={setSearch}
                filter={filter}
                setFilter={setFilter}
                placeholder='Cari kategori...'
                opsiFilter={[
                  { value: '1', label: 'Poin ≥ 1' },
                  { value: '5', label: 'Poin ≥ 5' },
                  { value: '10', label: 'Poin ≥ 10' },
                  { value: '20', label: 'Poin ≥ 20' },
                ]}
                labelFilter='Filter Poin'
                onTambah={() => {
                  setEditTarget(null);
                  setCrudOpen(true);
                }}
              />
            }
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
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
    </div>
  );
};

export default AdminKelolaKategoriView;
