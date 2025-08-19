import useDarkMode from '../../../hooks/useDarkMode';
import { Card, FilterGroup, FilterOption, SearchInput } from '../../elements';

const FilterCard = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  daftarPermintaan = [],
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Card className='p-6'>
      <h3
        className={`text-lg font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Cari & Filter
      </h3>

      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Cari kode atau alamat...'
      />

      <div className='mt-4'>
        <FilterGroup title='Filter Status:'>
          <FilterOption
            label='Semua Status'
            count={daftarPermintaan.length}
            active={statusFilter === 'all'}
            onClick={() => setStatusFilter('all')}
          />
          <FilterOption
            label='Sedang Proses'
            count={
              daftarPermintaan.filter((r) => r.status !== 'Penjemputan Selesai')
                .length
            }
            active={statusFilter === 'active'}
            onClick={() => setStatusFilter('active')}
            color='orange'
          />
          <FilterOption
            label='Selesai'
            count={
              daftarPermintaan.filter((r) => r.status === 'Penjemputan Selesai')
                .length
            }
            active={statusFilter === 'completed'}
            onClick={() => setStatusFilter('completed')}
            color='green'
          />
        </FilterGroup>
      </div>
    </Card>
  );
};

export default FilterCard;
