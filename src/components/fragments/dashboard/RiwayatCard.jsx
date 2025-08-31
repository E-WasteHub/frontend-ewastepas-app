// src/components/fragments/dashboard/RiwayatCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { Button, Card } from '../../elements';

const RiwayatCard = ({ req, onDetail }) => {
  const { isDarkMode } = useDarkMode();

  const statusColors = {
    Selesai: isDarkMode
      ? 'bg-green-800/40 text-green-300'
      : 'bg-green-100 text-green-700',
    Dibatalkan: isDarkMode
      ? 'bg-red-800/40 text-red-300'
      : 'bg-red-100 text-red-700',
  };

  const statusColor =
    statusColors[req?.status] ||
    (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700');

  return (
    <Card
      className={`p-4 rounded-lg border transition hover:shadow-sm ${
        isDarkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header: kode + status */}
      <div className='flex items-center justify-between mb-2'>
        <span className='text-sm font-semibold text-green-600'>
          {req?.kodePenjemputan || '-'}
        </span>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColor}`}
        >
          {req?.status}
        </span>
      </div>

      {/* Info ringkas */}
      <div className='grid grid-cols-2 text-xs sm:text-sm mb-2'>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          {req?.tanggal}
        </p>
        <p
          className={`text-right ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Kurir: {req?.kurir || 'Belum ditentukan'}
        </p>
      </div>

      {/* Poin */}
      <p className='text-green-500 text-sm font-semibold mb-2'>
        +{req?.poin || 0} poin
      </p>

      {/* Alamat */}
      <p
        className={`text-xs line-clamp-2 mb-3 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
        title={req?.alamat}
      >
        {req?.alamat}
      </p>

      {/* Footer: tombol kecil */}
      <div className='flex justify-end'>
        <Button
          type='button'
          onClick={onDetail}
          className={`px-3 py-1 text-xs font-medium rounded-md border transition
            ${
              isDarkMode
                ? 'text-green-400 border-green-400 hover:bg-slate-700'
                : 'text-green-600 border-green-600 hover:bg-green-50'
            }`}
        >
          Detail
        </Button>
      </div>
    </Card>
  );
};

export default RiwayatCard;
