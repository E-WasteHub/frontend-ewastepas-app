import { Search } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const SearchInput = ({ value, onChange, placeholder = 'Cari...' }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex items-center w-full rounded-lg border ${
        isDarkMode
          ? 'bg-gray-700 border-green-600'
          : 'bg-white border-green-300'
      }`}
    >
      <Search
        className={`ml-3 w-4 h-4 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-400'
        }`}
      />
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`flex-1 px-3 py-3 bg-transparent focus:outline-none text-sm ${
          isDarkMode
            ? 'text-white placeholder-gray-400'
            : 'text-gray-900 placeholder-gray-500'
        }`}
      />
    </div>
  );
};

export default SearchInput;
