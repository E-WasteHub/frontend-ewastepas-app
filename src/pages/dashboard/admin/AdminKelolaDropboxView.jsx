// src/pages/admin/dropbox/AdminKelolaDropboxView.jsx
import { useMemo, useState } from 'react';
import { Loading, Pagination } from '../../../components/elements';
import {
  AdminTable,
  ConfirmModal,
  DropboxCrudModal,
  FilterCrud,
} from '../../../components/fragments';
import useAdminCrud from '../../../hooks/useAdminCrud';
import usePagination from '../../../hooks/usePagination';
import useToast from '../../../hooks/useToast';
import * as dropboxService from '../../../services/dropboxService';

const AdminKelolaDropboxView = () => {
  const {
    data: dropbox,
    isLoading,
    error,
    tambah,
    ubah,
    hapus,
    isSubmitting,
  } = useAdminCrud(dropboxService);

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
    if (!search && !filter) return dropbox;
    return dropbox.filter((item) => {
      const matchSearch =
        !search ||
        item.nama_dropbox?.toLowerCase().includes(search.toLowerCase()) ||
        item.nama_daerah?.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        !filter ||
        item.nama_daerah?.toLowerCase().includes(filter.toLowerCase());
      return matchSearch && matchFilter;
    });
  }, [dropbox, search, filter]);

  // Get unique areas for filter
  const areaOptions = useMemo(() => {
    const uniqueAreas = [
      ...new Set(dropbox.map((item) => item.nama_daerah).filter(Boolean)),
    ];
    return uniqueAreas.map((area) => ({
      value: area,
      label: area,
    }));
  }, [dropbox]);

  // Pagination
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, 7);

  // Tambah / Ubah
  const handleCrudSubmit = async (formValues) => {
    if (editTarget) {
      const res = await ubah(editTarget.id_dropbox, formValues);
      showAlert(
        res.success ? 'Berhasil' : 'Gagal',
        res.success
          ? 'Dropbox berhasil diperbarui'
          : res.error || 'Dropbox gagal diperbarui',
        res.success ? 'success' : 'error'
      );
    } else {
      const res = await tambah(formValues);
      showAlert(
        res.success ? 'Berhasil' : 'Gagal',
        res.success
          ? 'Dropbox berhasil ditambahkan'
          : res.error || 'Dropbox gagal ditambahkan',
        res.success ? 'success' : 'error'
      );
    }

    setCrudOpen(false);
    setEditTarget(null);
  };

  // Hapus
  const handleDelete = async () => {
    if (!confirmTarget) return;
    const res = await hapus(confirmTarget);
    showAlert(
      res.success ? 'Berhasil' : 'Gagal',
      res.success
        ? 'Dropbox berhasil dihapus'
        : res.error || 'Dropbox gagal dihapus',
      res.success ? 'success' : 'error'
    );
    setConfirmOpen(false);
  };

  const columns = [
    {
      name: 'Nama Dropbox',
      selector: 'nama_dropbox',
      sortable: true,
    },
    {
      name: 'Koordinat',
      selector: 'koordinat',
      cell: (row) => `${row.latitude}, ${row.longitude}`,
    },
    {
      name: 'Daerah',
      selector: 'nama_daerah',
      cell: (row) => row.nama_daerah || '-',
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
              setConfirmTarget(row.id_dropbox);
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
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold'>Kelola Dropbox</h1>
        <p className='text-gray-600'>
          Kelola lokasi dropbox untuk pengumpulan sampah elektronik di berbagai
          daerah
        </p>
      </div>

      {isLoading ? (
        <Loading mode='inline' text='Memuat data...' />
      ) : error ? (
        <p className='text-red-500'>Error: {error}</p>
      ) : dropbox.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <p>Belum ada data dropbox.</p>
          <p>Klik tombol "Tambah Dropbox" untuk menambahkan data pertama.</p>
        </div>
      ) : (
        <>
          <AdminTable
            columns={columns}
            data={paginatedData}
            topContent={
              <FilterCrud
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                placeholder='Cari dropbox...'
                filterOptions={areaOptions}
                filterLabel='Filter Daerah'
                onAdd={() => {
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

      {/* Modal CRUD */}
      <DropboxCrudModal
        isOpen={crudOpen}
        onClose={() => {
          setCrudOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleCrudSubmit}
        initialData={editTarget}
        isLoading={isSubmitting}
        title={editTarget ? 'Edit Dropbox' : 'Tambah Dropbox'}
      />

      {/* Modal Confirm */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title='Konfirmasi Hapus'
        message='Apakah Anda yakin ingin menghapus dropbox ini?'
        confirmType='danger'
        confirmText='Hapus'
        cancelText='Batal'
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AdminKelolaDropboxView;
