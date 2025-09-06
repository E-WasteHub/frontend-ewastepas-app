// src/pages/admin/edukasi/AdminKelolaEdukasiView.jsx
import { useMemo, useState } from 'react';
import { Loading, Pagination } from '../../../components/elements';
import {
  AdminTable,
  ConfirmModal,
  EdukasiCrudModal,
  FilterCrud,
} from '../../../components/fragments';
import useAdminCrud from '../../../hooks/useAdminCrud';
import usePagination from '../../../hooks/usePagination';
import useToast from '../../../hooks/useToast';
import * as edukasiService from '../../../services/edukasiService';

const AdminKelolaEdukasiView = () => {
  const {
    data: edukasi,
    isLoading,
    error,
    tambah,
    ubah,
    hapus,
    isSubmitting,
  } = useAdminCrud(edukasiService);

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
    if (!search && !filter) return edukasi;
    return edukasi.filter((item) => {
      const matchSearch =
        !search ||
        item.judul_konten?.toLowerCase().includes(search.toLowerCase()) ||
        item.isi_konten?.toLowerCase().includes(search.toLowerCase());
      let matchFilter = true;
      if (filter === 'with-image') {
        matchFilter = !!item.gambar;
      } else if (filter === 'without-image') {
        matchFilter = !item.gambar;
      }
      return matchSearch && matchFilter;
    });
  }, [edukasi, search, filter]);

  // Pagination
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, 7);

  // Tambah / Ubah
  const handleCrudSubmit = async (formValues) => {
    if (editTarget) {
      const res = await ubah(editTarget.id_konten, formValues);
      showAlert(
        res.success ? 'Berhasil' : 'Gagal',
        res.success
          ? 'Konten edukasi berhasil diperbarui'
          : res.error || 'Konten edukasi gagal diperbarui',
        res.success ? 'success' : 'error'
      );
    } else {
      const res = await tambah(formValues);
      showAlert(
        res.success ? 'Berhasil' : 'Gagal',
        res.success
          ? 'Konten edukasi berhasil ditambahkan'
          : res.error || 'Konten edukasi gagal ditambahkan',
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
        ? 'Konten edukasi berhasil dihapus'
        : res.error || 'Konten edukasi gagal dihapus',
      res.success ? 'success' : 'error'
    );
    setConfirmOpen(false);
  };

  const columns = [
    {
      name: 'Judul',
      selector: 'judul_konten',
      sortable: true,
    },
    {
      name: 'Isi Konten',
      selector: 'isi_konten',
      cell: (row) => row.isi_konten?.slice(0, 50) + '...' || '-',
    },
    {
      name: 'Gambar',
      cell: (row) =>
        row.gambar ? (
          <img
            src={row.gambar}
            alt={row.judul_konten}
            className='h-12 w-12 object-cover rounded'
          />
        ) : (
          '-'
        ),
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
              setConfirmTarget(row.id_konten);
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
        <h1 className='text-2xl font-bold'>Kelola Edukasi</h1>
        <p className='text-gray-600'>
          Kelola konten edukasi tentang pengelolaan sampah elektronik yang ramah
          lingkungan
        </p>
      </div>

      {isLoading ? (
        <Loading mode='inline' text='Memuat data...' />
      ) : error ? (
        <p className='text-red-500'>Error: {error}</p>
      ) : edukasi.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <p>Belum ada konten edukasi.</p>
          <p>Klik tombol "Tambah Edukasi" untuk menambahkan data pertama.</p>
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
                placeholder='Cari konten edukasi...'
                filterOptions={[
                  { value: 'with-image', label: 'Dengan Gambar' },
                  { value: 'without-image', label: 'Tanpa Gambar' },
                ]}
                filterLabel='Filter Gambar'
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
      <EdukasiCrudModal
        isOpen={crudOpen}
        onClose={() => {
          setCrudOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleCrudSubmit}
        initialData={editTarget}
        isLoading={isSubmitting}
        title={editTarget ? 'Edit Edukasi' : 'Tambah Edukasi'}
      />

      {/* Modal Confirm */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title='Konfirmasi Hapus'
        message='Apakah Anda yakin ingin menghapus konten edukasi ini?'
        confirmType='danger'
        confirmText='Hapus'
        cancelText='Batal'
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AdminKelolaEdukasiView;
