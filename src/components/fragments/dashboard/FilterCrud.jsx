// src/components/fragments/FilterCrud.jsx
import { Plus } from 'lucide-react';
import Input from '../../elements/Input/Input';
import Select from '../../elements/Select';

const FilterCrud = ({
  search,
  setSearch,
  filter,
  setFilter,
  onAdd,
  placeholder = 'Cari data...',
  filterOptions = [],
  filterLabel = 'Filter',
}) => {
  return (
    <div className='max-w-7xl mx-auto mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
      {/* Kiri: Search + Filter */}
      <div className='flex items-center gap-3 w-full'>
        {/* Search panjang */}
        <div className='flex-1'>
          <Input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className='text-sm py-2'
          />
        </div>

        {/* Filter kecil */}
        {setFilter && filterOptions.length > 0 && (
          <div className='w-40 pb-2'>
            <Select
              value={filter}
              onChange={setFilter}
              options={filterOptions}
              placeholder={filterLabel}
              className='text-sm'
            />
          </div>
        )}
      </div>

      {/* Kanan: Tombol Tambah */}
      {onAdd && (
        <button
          onClick={onAdd}
          className='flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition'
        >
          <Plus size={16} /> Tambah
        </button>
      )}
    </div>
  );
};

export default FilterCrud;
