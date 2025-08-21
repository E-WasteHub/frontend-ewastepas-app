// src/components/fragments/RiwayatCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { Badge, Card } from '../../elements';

const RiwayatCard = ({ data }) => {
  const { isDarkMode } = useDarkMode();

  if (!data) return null;

  const statusColor =
    data.status === 'Diproses'
      ? 'warning'
      : data.status === 'Selesai'
      ? 'success'
      : data.status === 'Dibatalkan'
      ? 'danger'
      : 'warning';

  return (
    <Card
      className={`p-6 md:p-5 rounded-lg border-2 transition hover:shadow ${
        isDarkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}
    >
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <h4
          className={`font-medium text-sm ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.kodePenjemputan}
        </h4>
        <Badge intent={statusColor} size='sm'>
          {data.status}
        </Badge>
      </div>

      {/* Body (2 grid) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm'>
        {/* Kolom 1 */}
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Tanggal:</span> {data.tanggal}
        </p>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Jenis:</span>{' '}
          {data.jenisSampah?.join(', ') || '-'}
        </p>

        {/* Kolom 2 */}
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Kurir:</span>{' '}
          {data.kurir || 'Belum ditentukan'}
        </p>
        <p className='text-green-600 font-semibold'>{data.poin} poin</p>

        {/* Full width row */}
        <p
          className={`col-span-1 sm:col-span-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } italic`}
        >
          {data.alamat}
        </p>
      </div>
    </Card>
  );
};

export default RiwayatCard;
