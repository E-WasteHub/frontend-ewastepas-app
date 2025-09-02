// src/views/masyarakat/RiwayatMasyarakatView.jsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Pagination } from '../../../components/elements';
import {
  FilterCard,
  PenjemputanMasyarakatCard,
} from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useMasyarakat from '../../../hooks/useMasyarakat';
import usePagination from '../../../hooks/usePagination';

const itemsPerPage = 3;

// Utils Filter statusOptions :
const statusOptionsMasyarakat = [
  { key: 'all', label: 'Semua' },
  { key: 'Diproses', label: 'Diproses' },
  { key: 'Diterima', label: 'Diterima' },
  { key: 'Dijemput', label: 'Dijemput' },
  { key: 'Selesai', label: 'Selesai' },
  { key: 'Dibatalkan', label: 'Dibatalkan' },
];

const RiwayatMasyarakatView = () => {
  useDocumentTitle('Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // 🔹 Ambil data riwayat dari hook
  const { riwayat, isLoading: sedangMemuat } = useMasyarakat();

  // 🔹 Search + Filter state
  const [pencarian, setPencarian] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // 🔹 Filter berdasarkan pencarian & status
  const filteredRiwayat = useMemo(() => {
    let result = riwayat;

    // filter status
    if (filterStatus !== 'all') {
      result = result.filter(
        (r) =>
          r.status_penjemputan?.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // search by kode / alamat
    if (pencarian.trim() !== '') {
      const q = pencarian.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.kode_penjemputan?.toLowerCase().includes(q) ||
          r.alamat_penjemputan?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [riwayat, filterStatus, pencarian]);

  // 🔹 Pagination (setelah filter & search)
  const { currentPage, setCurrentPage, paginatedData, totalPages } =
    usePagination(filteredRiwayat, itemsPerPage);

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
          Daftar riwayat penjemputan sampah elektronik Anda
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
            statusOptions={statusOptionsMasyarakat}
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

            {sedangMemuat ? (
              <p className='text-gray-500 text-center'>⏳ Memuat data...</p>
            ) : paginatedData.length === 0 ? (
              <p className='text-gray-500 text-center'>
                📭 Belum ada riwayat penjemputan
              </p>
            ) : (
              <div className='space-y-4'>
                {paginatedData.map((req) => (
                  <PenjemputanMasyarakatCard
                    key={req.id_penjemputan}
                    req={req}
                    onDetail={() =>
                      navigate(
                        `/dashboard/masyarakat/riwayat/${req.id_penjemputan}`
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

export default RiwayatMasyarakatView;
