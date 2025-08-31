// src/views/masyarakat/LacakPenjemputanView.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Pagination } from '../../../components/elements';
import { LacakCard } from '../../../components/fragments/';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useLacakPenjemputan from '../../../hooks/useLacakPenjemputan';

const ITEMS_PER_PAGE = 3;

const LacakPenjemputanView = () => {
  useDocumentTitle('Lacak Penjemputan');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { permintaan, loading } = useLacakPenjemputan();

  // 🔹 State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(permintaan.length / ITEMS_PER_PAGE);

  // 🔹 Slice data sesuai halaman
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = permintaan.slice(startIdx, startIdx + ITEMS_PER_PAGE);

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
        {/* 🔹 Sidebar: Search + Filter */}
        <div className='lg:col-span-1 space-y-6'>
          <Card
            className={`p-4 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} border`}
          >
            <input
              type='text'
              placeholder='🔍 Cari kode atau alamat...'
              className='w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:outline-none'
            />

            <div className='mt-4'>
              <p className='text-sm font-semibold mb-2'>Filter Status</p>
              <ul className='space-y-2 text-sm'>
                <li className='cursor-pointer hover:text-green-600'>
                  📋 Semua
                </li>
                <li className='cursor-pointer text-yellow-600'>
                  ⏳ Sedang Proses
                </li>
                <li className='cursor-pointer text-blue-600'>🚚 Dijemput</li>
                <li className='cursor-pointer text-indigo-600'>📦 Diantar</li>
                <li className='cursor-pointer text-green-600'>✅ Selesai</li>
                <li className='cursor-pointer text-red-600'>❌ Dibatalkan</li>
              </ul>
            </div>
          </Card>
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

            {loading ? (
              <p className='text-gray-500'>⏳ Memuat data...</p>
            ) : permintaan.length === 0 ? (
              <p className='text-gray-500'>Belum ada permintaan</p>
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
