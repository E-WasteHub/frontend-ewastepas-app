// src/components/fragments/FilterCrud.jsx
import { useResponsive } from '../../../hooks/useResponsive';
import { Button, Input, Select } from '../../elements';

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
  const { isMobile, isTablet } = useResponsive();

  return (
    <div
      className={`max-w-7xl mx-auto mb-2 ${
        isMobile
          ? 'flex flex-col gap-3'
          : 'flex flex-col md:flex-row justify-between items-start md:items-center gap-4'
      }`}
    >
      {/* Kiri: Pencarian + Filter */}
      <div
        className={`flex items-center gap-3 ${
          isMobile ? 'w-full flex-col' : 'w-full flex-row'
        }`}
      >
        {/* Input pencarian */}
        <div className={isMobile ? 'w-full' : 'flex-1'}>
          <Input
            type='text'
            value={pencarian}
            onChange={(e) => setPencarian(e.target.value)}
            placeholder={placeholder}
            className='text-sm py-2 w-full'
          />
        </div>

        {/* Dropdown filter */}
        {setFilter && opsiFilter.length > 0 && (
          <div className={`mb-2 ${isMobile ? 'w-full' : 'w-40'}`}>
            <Select
              value={filter}
              onChange={setFilter}
              options={opsiFilter}
              placeholder={labelFilter}
              className='text-sm w-full'
            />
          </div>
        )}
      </div>

      {/* Kanan: Tombol Tambah */}
      {onTambah && (
        <div className={`mb-2 ${isMobile ? 'w-full' : 'flex-shrink-0'}`}>
          <Button
            onClick={onTambah}
            variant='primary'
            className={`flex items-center justify-center text-sm py-2 ${
              isMobile ? 'w-full px-4' : isTablet ? 'px-6' : 'px-12'
            }`}
          >
            Tambah
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterCrud;
