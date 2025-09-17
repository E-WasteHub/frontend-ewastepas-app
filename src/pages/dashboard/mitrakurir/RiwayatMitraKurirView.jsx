// src/views/kurir/RiwayatMitraKurirView.jsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Loading, Pagination } from '../../../components/elements';
import {
  FilterCard,
  HeaderDashboard,
  PenjemputanKurirCard,
} from '../../../components/fragments';
import {
  useDarkMode,
  useDocumentTitle,
  useMitraKurir,
  usePagination,
} from '../../../hooks';

const itemsPerPage = 3;

//    Daftar status khusus untuk Riwayat Mitra Kurir
const statusOptionsKurir = [
  { key: 'all', label: 'Semua' },
  { key: 'Selesai', label: 'Selesai' },
  { key: 'Dibatalkan', label: 'Dibatalkan' },
];

const RiwayatMitraKurirView = () => {
  useDocumentTitle('Riwayat Penjemputan Kurir');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // Ambil data riwayat dari hook kurir
  const { riwayatMitraKurir, isLoading } = useMitraKurir();

  // State filter + search
  const [pencarian, setPencarian] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter data
  const filteredData = useMemo(() => {
    let result = riwayatMitraKurir;

    if (filterStatus !== 'all') {
      result = result.filter((r) => r.status_penjemputan === filterStatus);
    }

    if (pencarian.trim() !== '') {
      const q = pencarian.toLowerCase();
      result = result.filter(
        (r) =>
          r.kode_penjemputan?.toLowerCase().includes(q) ||
          r.alamat_penjemputan?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [riwayatMitraKurir, filterStatus, pencarian]);

  // Pagination
  const { currentPage, setCurrentPage, paginatedData, totalPages } =
    usePagination(filteredData, itemsPerPage);

  return (
    <div className='max-w-7xl mx-auto px-4 space-y-6'>
      {/* Header */}
      <HeaderDashboard
        title='Riwayat Penjemputan'
        subtitle='Daftar riwayat penjemputan yang telah Anda kerjakan.'
      />

      {/* Layout grid */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Sidebar filter */}
        <div className='col-span-1 lg:col-span-1 lg:sticky lg:top-24'>
          <FilterCard
            search={pencarian}
            setSearch={setPencarian}
            filter={filterStatus}
            setFilter={setFilterStatus}
            statusOptions={statusOptionsKurir}
          />
        </div>

        {/* Konten daftar riwayat */}
        <div className='col-span-1 lg:col-span-3'>
          <Card
            className={`p-6 space-y-6 shadow-md rounded-xl ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Daftar Riwayat Penjemputan
            </h3>

            {isLoading ? (
              <Loading mode='inline' text='Memuat data...' />
            ) : paginatedData.length === 0 ? (
              <p className='text-gray-500 text-center'>
                Belum ada riwayat penjemputan
              </p>
            ) : (
              <div className='space-y-4'>
                {paginatedData.map((req) => (
                  <PenjemputanKurirCard
                    key={req.id_penjemputan}
                    req={req}
                    isAktif={false}
                    onDetail={() =>
                      navigate(
                        `/dashboard/mitra-kurir/riwayat/${req.id_penjemputan}`
                      )
                    }
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RiwayatMitraKurirView;
