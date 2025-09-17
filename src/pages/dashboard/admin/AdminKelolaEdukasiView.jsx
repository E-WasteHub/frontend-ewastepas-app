// src/pages/admin/edukasi/AdminKelolaEdukasiView.jsx
import { useMemo, useState } from 'react';
import { Button, Loading, Pagination } from '../../../components/elements';
import {
  AdminTable,
  ConfirmModal,
  EdukasiCrudModal,
  FilterCrud,
  HeaderDashboard,
} from '../../../components/fragments';
import {
  useAdminCrud,
  useDarkMode,
  useDocumentTitle,
  usePagination,
  useToast,
} from '../../../hooks';
import * as edukasiService from '../../../services/edukasiService';

const AdminKelolaEdukasiView = () => {
  useDocumentTitle('Kelola Edukasi');
  const {
    dataCrud: edukasi,
    isLoading,
    error,
    tambah,
    ubah,
    hapus,
    isSubmitting,
  } = useAdminCrud(edukasiService);

  const { showAlert } = useToast();
  const { isDarkMode } = useDarkMode();

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
        matchFilter = !!(item.gambar_url || item.gambar);
      } else if (filter === 'without-image') {
        matchFilter = !(item.gambar_url || item.gambar);
      }
      return matchSearch && matchFilter;
    });
  }, [edukasi, search, filter]);

  // Pagination
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, 7);

  // tambah atau ubah
  const handleCrudSubmit = async (formValues) => {
    try {
      if (editTarget) {
        await ubah(editTarget.id_konten, formValues);
        showAlert('Berhasil', 'Konten edukasi berhasil diperbarui', 'success');
      } else {
        await tambah(formValues);
        showAlert('Berhasil', 'Konten edukasi berhasil ditambahkan', 'success');
      }
    } catch (error) {
      showAlert(
        'Gagal',
        error.response?.data?.message ||
          error.message ||
          'terjadi kesalahan saat menyimpan data',
        'error'
      );
    }

    setCrudOpen(false);
    setEditTarget(null);
  };

  // hapus
  const handleDelete = async () => {
    if (!confirmTarget) return;
    try {
      await hapus(confirmTarget);
      showAlert('Berhasil', 'Konten edukasi berhasil dihapus', 'success');
    } catch (error) {
      showAlert(
        'Gagal',
        error.response?.data?.message ||
          error.message ||
          'Konten edukasi gagal dihapus',
        'error'
      );
    }
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
      cell: (row) =>
        row.isi_konten
          ? row.isi_konten.replace(/<[^>]+>/g, '').slice(0, 50) + '...'
          : '-',
    },
    {
      name: 'Gambar',
      cell: (row) => {
        const imageUrl = row.gambar_url || row.gambar;
        const fallbackImage =
          'https://34.128.104.134:3000/public/images/no-image.jpg';
        return (
          <img
            src={imageUrl || fallbackImage}
            alt={row.judul_konten}
            className='h-12 w-12 object-cover rounded'
            onError={(e) => {
              console.warn('Image failed to load:', imageUrl);
              e.currentTarget.src = fallbackImage;
            }}
          />
        );
      },
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
      <HeaderDashboard
        title='Kelola Edukasi'
        subtitle='Kelola konten edukasi tentang pengelolaan sampah elektronik yang ramah lingkungan'
      />

      {isLoading ? (
        <Loading mode='inline' text='Memuat data...' />
      ) : error ? (
        <p className='text-red-500'>Error: {error}</p>
      ) : edukasi.length === 0 ? (
        <div
          className={`text-center py-10 px-6 rounded-lg border transition-colors ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700 text-slate-200'
              : 'bg-slate-100 border-slate-300 text-slate-700'
          }`}
        >
          <p className='text-lg font-semibold mb-2 text-red-500'>
            Belum ada konten edukasi
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
            Tambah Edukasi
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
                placeholder='Cari konten edukasi...'
                opsiFilter={[
                  { value: 'with-image', label: 'Dengan Gambar' },
                  { value: 'without-image', label: 'Tanpa Gambar' },
                ]}
                labelFilter='Filter Gambar'
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
