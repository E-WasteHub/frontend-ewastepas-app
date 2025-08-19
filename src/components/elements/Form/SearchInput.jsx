import { Search } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import Input from './Input';

const SearchInput = ({ value, onChange, placeholder = 'Cari...' }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='relative w-full'>
      <Search
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-400'
        }`}
      />
      <Input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm
          focus:ring-2 focus:ring-green-500 focus:border-transparent
          ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
      />
    </div>
  );
};

export default SearchInput;
