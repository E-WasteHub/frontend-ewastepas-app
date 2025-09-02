// src/components/fragments/kurir/FilterCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { Card } from '../../elements';

const FilterCard = ({
  search,
  setSearch,
  filter,
  setFilter,
  statusOptions = [],
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Card className='p-4 space-y-5 shadow-md rounded-xl'>
      {/* Search */}
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Cari kode atau alamat...'
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
          isDarkMode
            ? 'bg-slate-800 border-slate-600 text-white focus:ring-green-600'
            : 'bg-white text-slate-800 border-gray-300 focus:ring-green-500'
        }`}
      />

      {/* Filter status */}
      {statusOptions.length > 0 && (
        <div>
          <p className='text-sm font-semibold mb-2'>Filter Status</p>
          <div className='flex flex-wrap gap-2'>
            {statusOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  filter === opt.key
                    ? 'bg-green-600 text-white border-green-600'
                    : isDarkMode
                    ? 'bg-slate-700 text-gray-300 border-slate-600 hover:bg-slate-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FilterCard;
