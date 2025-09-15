// src/components/fragments/FilterCrud.jsx
import { Plus } from 'lucide-react';
import Input from '../../elements/Input/Input';
import Select from '../../elements/Select';

const FilterCrud = ({
  pencarian,
  setPencarian,
  filter,
  setFilter,
  onTambah,
  placeholder = 'Cari data...',
  opsiFilter = [],
  labelFilter = 'Filter',
}) => {
  return (
    <div className='max-w-7xl mx-auto mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
      {/* Kiri: Pencarian + Filter */}
      <div className='flex items-center gap-3 w-full'>
        {/* Input pencarian */}
        <div className='flex-1'>
          <Input
            type='text'
            value={pencarian}
            onChange={(e) => setPencarian(e.target.value)}
            placeholder={placeholder}
            className='text-sm py-2'
          />
        </div>

        {/* Dropdown filter */}
        {setFilter && opsiFilter.length > 0 && (
          <div className='w-40'>
            <Select
              value={filter}
              onChange={setFilter}
              options={opsiFilter}
              placeholder={labelFilter}
              className='text-sm'
            />
          </div>
        )}
      </div>

      {/* Kanan: Tombol Tambah */}
      {onTambah && (
        <button
          onClick={onTambah}
          className='flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition'
        >
          <Plus size={16} /> Tambah
        </button>
      )}
    </div>
  );
};

export default FilterCrud;
