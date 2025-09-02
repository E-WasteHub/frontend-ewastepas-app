// src/views/kurir/RiwayatMitraKurirView.jsx
import { useState } from 'react';
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

const itemsPerPage = 5;

const RiwayatMitraKurirView = () => {
  useDocumentTitle('Riwayat Penjemputan Kurir');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // 🔹 Ambil data riwayat dari hook kurir
  const { riwayat, isLoading } = useMitraKurir();

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
      r.kode_penjemputan?.toLowerCase().includes(q) ||
      r.alamat_penjemputan?.toLowerCase().includes(q);

    const matchStatus =
      filterStatus === 'all'
        ? true
        : r.status?.toLowerCase() === filterStatus.toLowerCase();

    return matchSearch && matchStatus;
  });

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

      {/* 🔹 Grid layout */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Sidebar filter */}
        <div className='lg:col-span-1'>
          <FilterCard
            search={pencarian}
            setSearch={setPencarian}
            filter={filterStatus}
            setFilter={setFilterStatus}
          />
        </div>

        {/* Konten kanan */}
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
              Daftar Riwayat Penjemputan
            </h3>

            {/* List Riwayat */}
            {isLoading ? (
              <p className='text-gray-500 text-center'>⏳ Memuat data...</p>
            ) : riwayatFilter.length === 0 ? (
              <p className='text-gray-500 text-center'>
                📭 Belum ada riwayat penjemputan
              </p>
            ) : (
              <div className='space-y-4'>
                {riwayatFilter.map((req) => (
                  <PenjemputanKurirCard
                    key={req.id_penjemputan}
                    req={req}
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
