import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Loading, Pagination } from '../../../components/elements';
import {
  FilterCard,
  PenjemputanMasyarakatCard,
} from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useMasyarakat from '../../../hooks/useMasyarakat';

// Utils Filter statusOptions :
const statusOptionsMasyarakat = [
  { key: 'all', label: 'Semua' },
  { key: 'Diproses', label: 'Diproses' },
  { key: 'Diterima', label: 'Diterima' },
  { key: 'Dijemput', label: 'Dijemput' },
];

const LacakPenjemputanView = () => {
  useDocumentTitle('Lacak Penjemputan');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // 🔹 ambil data dari hook
  const { daftarPenjemputan, isLoading } = useMasyarakat();

  // 🔹 state untuk filter & search
  // 🔹 Search + Filter state
  const [pencarian, setPencarian] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // 🔹 filter data
  const filteredData = useMemo(() => {
    let result = daftarPenjemputan;

    // filter status
    if (filterStatus !== 'all') {
      result = result.filter(
        (r) =>
          r.status_penjemputan?.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // search kode/alamat
    if (pencarian) {
      const q = pencarian.toLowerCase();
      result = result.filter(
        (d) =>
          d.kode_penjemputan?.toLowerCase().includes(q) ||
          d.alamat_penjemputan?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [daftarPenjemputan, pencarian, filterStatus]);

  // 🔹 pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

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
        {/* Sidebar filter */}
        <div className='lg:col-span-1 space-y-6'>
          <FilterCard
            search={pencarian}
            setSearch={setPencarian}
            filter={filterStatus}
            setFilter={setFilterStatus}
            statusOptions={statusOptionsMasyarakat}
          />
        </div>

        {/* Daftar permintaan */}
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
              <Loading mode='inline' text='Memuat data...' />
            ) : currentData.length === 0 ? (
              <p className='text-gray-500 text-center'>Belum ada permintaan</p>
            ) : (
              <>
                <div className='grid grid-cols-1 gap-4'>
                  {currentData.map((req) => (
                    <PenjemputanMasyarakatCard
                      key={req.id_penjemputan}
                      req={req}
                      onDetail={() =>
                        navigate(
                          `/dashboard/masyarakat/lacak/${req.id_penjemputan}`
                        )
                      }
                    />
                  ))}
                </div>

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
