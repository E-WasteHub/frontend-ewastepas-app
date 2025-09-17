import { useMemo, useState } from 'react';
import { Button, Loading, Pagination } from '../../../components/elements';
import {
  AdminTable,
  ConfirmModal,
  FilterCrud,
  HeaderDashboard,
  JenisCrudModal,
} from '../../../components/fragments';
import { useDarkMode, useDocumentTitle } from '../../../hooks';
import useAdminCrud from '../../../hooks/useAdminCrud';
import usePagination from '../../../hooks/usePagination';
import useToast from '../../../hooks/useToast';
import * as jenisService from '../../../services/jenisService';

const AdminKelolaJenisView = () => {
  useDocumentTitle('Kelola Jenis');
  const {
    dataCrud: jenis,
    isLoading,
    error,
    tambah,
    ubah,
    hapus,
    isSubmitting,
  } = useAdminCrud(jenisService);

  const { showAlert } = useToast();
  const { isDarkMode } = useDarkMode();

  // State Modal CRUD
  const [crudOpen, setCrudOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  // State Confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  // Search state
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  // Filter data by search
  const filteredData = useMemo(() => {
    if (!search && !filter) return jenis;
    return jenis.filter((item) => {
      const matchSearch =
        !search ||
        item.nama_jenis?.toLowerCase().includes(search.toLowerCase()) ||
        item.nama_kategori?.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        !filter ||
        item.nama_kategori?.toLowerCase().includes(filter.toLowerCase());
      return matchSearch && matchFilter;
    });
  }, [jenis, search, filter]);

  // Pagination
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, 10);

  // Get unique categories for filter
  const categoryOptions = useMemo(() => {
    const uniqueCategories = [
      ...new Set(jenis.map((item) => item.nama_kategori).filter(Boolean)),
    ];
    return uniqueCategories.map((category) => ({
      value: category,
      label: category,
    }));
  }, [jenis]);

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
      selector: 'nama_jenis',
      sortable: true,
    },
    {
      name: 'Deskripsi',
      selector: 'deskripsi_jenis',
      cell: (row) => row.deskripsi_jenis || '-',
    },
    {
      name: 'Kategori',
      selector: 'nama_kategori',
      cell: (row) => row.nama_kategori || '-',
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
              setConfirmTarget(row.id_jenis);
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
        title='Kelola Jenis Sampah'
        subtitle='Kelola jenis-jenis sampah elektronik berdasarkan kategori yang tersedia'
      />

      {isLoading ? (
        <Loading mode='inline' text='Memuat data...' />
      ) : error ? (
        <p className='text-red-500'>Error: {error}</p>
      ) : jenis.length === 0 ? (
        <div
          className={`text-center py-10 px-6 rounded-lg border transition-colors ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-gray-200'
              : 'bg-gray-100 border-gray-300 text-gray-700'
          }`}
        >
          <p className='text-lg font-semibold mb-2'>
            Belum ada data jenis sampah
          </p>
          <p className='text-sm mb-6'>
            Klik tombol di bawah untuk menambahkan data pertama.
          </p>

          <Button
            onClick={() => {
              setEditTarget(null);
              setCrudOpen(true);
            }}
            variant='primary'
            className={`px-6 py-2 text-sm font-medium rounded shadow-md ${
              isDarkMode
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Tambah Jenis
          </Button>
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
                placeholder='Cari jenis sampah...'
                opsiFilter={categoryOptions}
                labelFilter='Filter Kategori'
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
