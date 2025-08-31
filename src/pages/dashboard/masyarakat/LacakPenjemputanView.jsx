// src/views/masyarakat/LacakPenjemputanView.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Pagination } from '../../../components/elements';
import { LacakCard } from '../../../components/fragments/';
import FilterCard from '../../../components/fragments/dashboard/FilterCard';
import useLacakPenjemputan from '../../../hooks/masyarakat/useLacakPenjemputan';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const itemsPerPage = 3;

const LacakPenjemputanView = () => {
  useDocumentTitle('Lacak Penjemputan');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  // pastikan daftarPenjemputan selalu array agar tidak error saat mengakses .length / .slice
  // hook mengembalikan { daftarPenjemputan, isLoading }
  const { daftarPenjemputan = [], isLoading } = useLacakPenjemputan();

  // 🔹 State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  // 🔹 Search + Filter state (used by FilterCard)
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  // apply search + status filter before pagination
  const filteredPermintaan = (daftarPenjemputan || []).filter((p) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      (p.kode && String(p.kode).toLowerCase().includes(q)) ||
      (p.alamat && String(p.alamat).toLowerCase().includes(q));
    const matchesFilter =
      filter === 'all' ||
      (filter === 'aktif' &&
        ['Menunggu Kurir', 'Dijemput Kurir', 'Diantar ke Dropbox'].includes(
          p.status
        )) ||
      (filter === 'selesai' && p.status === 'Selesai') ||
      (filter === 'dibatalkan' && p.status === 'Dibatalkan');

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil((filteredPermintaan.length || 0) / itemsPerPage);

  // 🔹 Slice data sesuai halaman
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = filteredPermintaan.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  // jika data berubah dan currentPage melebihi totalPages, sesuaikan
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [filteredPermintaan, totalPages, currentPage]);

  return (
    <div className='max-w-7xl mx-auto px-4 space-y-6'>
      {/* Header */}
      <h2
        className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Lacak Penjemputan
        <p
          className={`text-lg font-normal ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Pantau status permintaan penjemputan sampah elektronik Anda
        </p>
      </h2>

      {/* Grid layout */}
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* 🔹 Sidebar: Search + Filter (using FilterCard) */}
        <div className='lg:col-span-1 space-y-6'>
          <FilterCard
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />
        </div>

        {/* 🔹 Daftar Permintaan */}
        <div className='lg:col-span-3'>
          <Card
            className={`p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} border`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Daftar Permintaan
            </h3>

            {isLoading ? (
              <p className='text-gray-500 text-center'>Memuat data...</p>
            ) : daftarPenjemputan.length === 0 ? (
              <p className='text-gray-500 text-center'>Belum ada permintaan</p>
            ) : (
              <>
                <div className='grid grid-cols-1 gap-4'>
                  {currentData.map((req) => (
                    <LacakCard
                      key={req.id}
                      req={req}
                      onDetail={() =>
                        navigate(`/dashboard/masyarakat/lacak/${req.id}`)
                      }
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LacakPenjemputanView;
