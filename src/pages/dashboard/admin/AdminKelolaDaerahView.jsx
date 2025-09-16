// src/pages/admin/daerah/AdminKelolaDaerahView.jsx
import { useMemo, useState } from 'react';
import { Loading, Pagination } from '../../../components/elements';
import {
  AdminTable,
  ConfirmModal,
  DaerahCrudModal,
  FilterCrud,
  HeaderDashboard,
} from '../../../components/fragments';
import useAdminCrud from '../../../hooks/useAdminCrud';
import usePagination from '../../../hooks/usePagination';
import useToast from '../../../hooks/useToast';
import * as daerahService from '../../../services/daerahService';

const AdminKelolaDaerahView = () => {
  const {
    data: daerah,
    isLoading,
    error,
    tambah,
    ubah,
    hapus,
    isSubmitting,
  } = useAdminCrud(daerahService);

  const { showAlert } = useToast();

  const [crudOpen, setCrudOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  // Search state
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  // Filter data by search
  const filteredData = useMemo(() => {
    if (!search && !filter) return daerah;
    return daerah.filter((item) => {
      const matchSearch =
        !search ||
        item.nama_daerah?.toLowerCase().includes(search.toLowerCase());
      let matchFilter = true;
      if (filter === 'A-M') {
        matchFilter = item.nama_daerah?.[0]?.toLowerCase() <= 'm';
      } else if (filter === 'N-Z') {
        matchFilter = item.nama_daerah?.[0]?.toLowerCase() > 'm';
      }
      return matchSearch && matchFilter;
    });
  }, [daerah, search, filter]);

  // Pagination
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, 7);

  // Handler Tambah/Edit
  const handleCrudSubmit = async (formValues) => {
    if (editTarget) {
      const res = await ubah(editTarget.id_daerah, formValues);
      showAlert(
        res.success ? 'Berhasil' : 'Gagal',
        res.success
          ? 'Daerah berhasil diperbarui'
          : res.error || 'Daerah gagal diperbarui',
        res.success ? 'success' : 'error'
      );
    } else {
      const res = await tambah(formValues);
      showAlert(
        res.success ? 'Berhasil' : 'Gagal',
        res.success
          ? 'Daerah berhasil ditambahkan'
          : res.error || 'Daerah gagal ditambahkan',
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
        ? 'Daerah berhasil dihapus'
        : res.error || 'Daerah gagal dihapus',
      res.success ? 'success' : 'error'
    );
    setConfirmOpen(false);
  };

  const columns = [
    {
      name: 'Nama Daerah',
      selector: 'nama_daerah',
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
            className='px-3 py-1 text-xs font-medium rounded bg-yellow-500 text-white hover:bg-yellow-600'
          >
            Edit
          </button>
          <button
            onClick={() => {
              setConfirmTarget(row.id_daerah);
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
        title='Kelola Daerah'
        subtitle='Kelola daftar daerah untuk penempatan dropbox dan layanan penjemputan'
      />

      {isLoading ? (
        <Loading mode='inline' text='Memuat data...' />
      ) : error ? (
        <p className='text-red-500'>Error: {error}</p>
      ) : daerah.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <p>Belum ada data daerah.</p>
          <p>Klik tombol "Tambah Daerah" untuk menambahkan data pertama.</p>
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
                placeholder='Cari daerah...'
                opsiFilter={[
                  { value: 'A-M', label: 'A - M' },
                  { value: 'N-Z', label: 'N - Z' },
                ]}
                labelFilter='Filter Abjad'
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
      <DaerahCrudModal
        isOpen={crudOpen}
        onClose={() => {
          setCrudOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleCrudSubmit}
        initialData={editTarget}
        isLoading={isSubmitting}
        title={editTarget ? 'Edit Daerah' : 'Tambah Daerah'}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title='Konfirmasi Hapus'
        message='Apakah Anda yakin ingin menghapus daerah ini?'
        confirmType='danger'
        confirmText='Hapus'
        cancelText='Batal'
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AdminKelolaDaerahView;
