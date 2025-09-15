// src/components/fragments/kurir/FilterCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { Card } from '../../elements';

const FilterCard = ({
  pencarian,
  setPencarian,
  filter,
  setFilter,
  statusOptions = [],
}) => {
  const { isDarkMode } = useDarkMode();

  // Desain input pencarian
  const inputClass = `w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
    isDarkMode
      ? 'bg-slate-800 border-slate-600 text-white focus:ring-green-600'
      : 'bg-white border-gray-300 text-slate-800 focus:ring-green-500'
  }`;

  // Desain tombol filter status
  const tombolFilterClass = (aktif) =>
    `px-3 py-1 rounded-full text-sm border transition-colors ${
      aktif
        ? 'bg-green-600 text-white border-green-600'
        : isDarkMode
        ? 'bg-slate-700 text-gray-300 border-slate-600 hover:bg-slate-600'
        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
    }`;

  return (
    <Card className='p-4 space-y-5 shadow-md rounded-xl'>
      {/* Input pencarian */}
      <input
        type='text'
        value={pencarian}
        onChange={(e) => setPencarian(e.target.value)}
        placeholder='Cari kode atau alamat...'
        className={inputClass}
      />

      {/* Filter status */}
      {statusOptions.length > 0 && (
        <div>
          <p
            className={`text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-slate-200' : 'text-slate-700'
            }`}
          >
            Filter Status
          </p>
          <div className='flex flex-wrap gap-2'>
            {statusOptions.map((opsi) => (
              <button
                key={opsi.key}
                onClick={() => setFilter(opsi.key)}
                className={tombolFilterClass(filter === opsi.key)}
              >
                {opsi.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FilterCard;
