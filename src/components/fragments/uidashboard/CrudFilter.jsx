// src/components/fragments/uidashboard/CrudFilter.jsx
import { Search } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const CrudFilter = ({ searchTerm, onSearch, filterStatus, onFilterChange }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`p-4 rounded-lg shadow-sm flex items-center gap-2 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } `}
    >
      {/* Search Input */}
      <div className='relative flex-1'>
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4
            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
        />
        <input
          type='text'
          value={searchTerm} // <- penting
          onChange={(e) => onSearch(e.target.value)} // <- penting
          placeholder='Cari...'
          className={`pl-10 pr-4 py-2 w-full rounded-lg border
            ${
              isDarkMode
                ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
            }`}
        />
      </div>

      {/* Dropdown status */}
      <select
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
        className={`px-3 py-2 rounded-lg border
          ${
            isDarkMode
              ? 'bg-gray-700 text-white border-gray-600'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
      >
        <option value='all'>Semua</option>
        <option value='aktif'>Aktif</option>
        <option value='nonaktif'>Nonaktif</option>
      </select>
    </div>
  );
};

export default CrudFilter;
