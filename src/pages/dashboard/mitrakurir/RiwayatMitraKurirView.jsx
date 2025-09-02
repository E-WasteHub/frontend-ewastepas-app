// src/views/kurir/RiwayatMitraKurirView.jsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Pagination } from '../../../components/elements';
import {
  FilterCard,
  PenjemputanKurirCard,
} from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useMitraKurir from '../../../hooks/useMitraKurir';
import usePagination from '../../../hooks/usePagination';

const itemsPerPage = 3;

// 🔹 Daftar status khusus untuk Riwayat Mitra Kurir
const statusOptionsKurir = [
  { key: 'all', label: 'Semua' },
  { key: 'Selesai', label: 'Selesai' },
  { key: 'Dibatalkan', label: 'Dibatalkan' },
];

const RiwayatMitraKurirView = () => {
  useDocumentTitle('Riwayat Penjemputan Kurir');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // 🔹 Ambil data riwayat dari hook kurir
  const { riwayat, isLoading } = useMitraKurir();

  // 🔹 State filter + search
  const [pencarian, setPencarian] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // 🔹 Filter data
  const filteredData = useMemo(() => {
    let result = riwayat;

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
  }, [riwayat, filterStatus, pencarian]);

  // 🔹 Pagination
  const { currentPage, setCurrentPage, paginatedData, totalPages } =
    usePagination(filteredData, itemsPerPage);

  return (
    <div className='max-w-7xl mx-auto px-4 space-y-6'>
      {/* Header */}
      <h2
        className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Riwayat Penjemputan
        <p
          className={`text-lg font-normal ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Daftar riwayat penjemputan yang telah Anda kerjakan.
        </p>
      </h2>

      {/* Layout grid */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Sidebar filter */}
        <div className='lg:col-span-1'>
          <FilterCard
            search={pencarian}
            setSearch={setPencarian}
            filter={filterStatus}
            setFilter={setFilterStatus}
            statusOptions={statusOptionsKurir}
          />
        </div>

        {/* Konten daftar riwayat */}
        <div className='lg:col-span-3'>
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
              <p className='text-gray-500 text-center'>⏳ Memuat data...</p>
            ) : paginatedData.length === 0 ? (
              <p className='text-gray-500 text-center'>
                📭 Belum ada riwayat penjemputan
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
