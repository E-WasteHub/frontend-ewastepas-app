import { useNavigate } from 'react-router-dom';
import { Card, Pagination } from '../../../components/elements';
import { FilterCard, RiwayatCard } from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useRiwayatMasyarakat from '../../../hooks/useRiwayatMasyarakat';

const RiwayatMasyarakatView = () => {
  useDocumentTitle('Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const {
    loading,
    paginatedRequests,
    totalPages,
    currentPage,
    search,
    filter,
    setSearch,
    setFilter,
    setCurrentPage,
  } = useRiwayatMasyarakat();

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-4'>
      {/* Sidebar kiri (Filter & Search) */}
      <div className='lg:col-span-1'>
        <FilterCard
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      {/* Konten kanan */}
      <div className='lg:col-span-3'>
        <Card
          className={`p-6 space-y-6 shadow-md rounded-xl ${
            isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
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
          {loading ? (
            <p className='text-gray-500 text-center'>⏳ Memuat data...</p>
          ) : paginatedRequests.length === 0 ? (
            <p className='text-gray-500 text-center'>
              📭 Belum ada riwayat penjemputan
            </p>
          ) : (
            <div className='space-y-4'>
              {paginatedRequests.map((req) => (
                <RiwayatCard
                  key={req.id}
                  req={req}
                  onDetail={() =>
                    navigate(`/dashboard/masyarakat/lacak/${req.id}`)
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
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default RiwayatMasyarakatView;
