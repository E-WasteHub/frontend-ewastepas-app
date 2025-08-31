// src/views/masyarakat/RiwayatMasyarakatView.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Pagination } from '../../../components/elements';
import { FilterCard, RiwayatCard } from '../../../components/fragments';
import usePagination from '../../../hooks/common/usePagination';
import useRiwayatMasyarakat from '../../../hooks/masyarakat/useRiwayatMasyarakat';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const itemsPerPage = 3;

const RiwayatMasyarakatView = () => {
  useDocumentTitle('Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const { sedangMemuat, riwayat } = useRiwayatMasyarakat();

  // 🔹 Pagination
  const { currentPage, setCurrentPage, paginatedData, totalPages } =
    usePagination(riwayat, itemsPerPage);

  // 🔹 Search + Filter state
  const [pencarian, setPencarian] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // 🔹 Filter berdasarkan pencarian & status
  const riwayatFilter = (paginatedData || []).filter((r) => {
    const q = pencarian.trim().toLowerCase();

    const matchSearch =
      q === '' ||
      r.kode?.toLowerCase().includes(q) ||
      r.alamat?.toLowerCase().includes(q);

    const matchStatus =
      filterStatus === 'all'
        ? true
        : r.status.toLowerCase() === filterStatus.toLowerCase();

    return matchSearch && matchStatus;
  });

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-4'>
      {/* 🔹 Sidebar kiri (Filter & Search) */}
      <div className='lg:col-span-1'>
        <FilterCard
          search={pencarian}
          setSearch={setPencarian}
          filter={filterStatus}
          setFilter={setFilterStatus}
        />
      </div>

      {/* 🔹 Konten kanan */}
      <div className='lg:col-span-3'>
        <Card
          className={`p-6 space-y-6 shadow-md rounded-xl ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-gray-200'
          }`}
        >
          {/* Header */}
          <h3
            className={`text-lg font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            📜 Daftar Riwayat
          </h3>

          {/* List Riwayat */}
          {sedangMemuat ? (
            <p className='text-gray-500 text-center'>⏳ Memuat data...</p>
          ) : riwayatFilter.length === 0 ? (
            <p className='text-gray-500 text-center'>
              📭 Belum ada riwayat penjemputan
            </p>
          ) : (
            <div className='space-y-4'>
              {riwayatFilter.map((req) => (
                <RiwayatCard
                  key={req.id}
                  req={req}
                  onDetail={() =>
                    navigate(`/dashboard/masyarakat/riwayat/${req.id}`)
                  }
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && Number.isFinite(totalPages) && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default RiwayatMasyarakatView;
