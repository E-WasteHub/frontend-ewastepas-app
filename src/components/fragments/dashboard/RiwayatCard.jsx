// src/components/fragments/dashboard/RiwayatCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { Card } from '../../elements';

/**
 * Komponen RiwayatCard
 * ---------------------
 * Menampilkan informasi detail riwayat penjemputan:
 * - Kode penjemputan
 * - Status penjemputan (dengan badge warna berbeda)
 * - Tanggal, jenis sampah, kurir
 * - Alamat penjemputan
 *
 * Props:
 * - req (object): Data riwayat penjemputan
 *   { kodePenjemputan, status, tanggal, jenisSampah[], kurir, poin, alamat }
 */
const RiwayatCard = ({ req }) => {
  const { isDarkMode } = useDarkMode();

  /** Warna badge berdasarkan status */
  const statusColor =
    {
      Selesai:
        'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300',
      Dibatalkan:
        'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300',
      'Diantar Kurir ke Dropbox':
        'bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300',
      'Dijemput Kurir':
        'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300',
      'Menunggu Kurir':
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300',
    }[req.status] ||
    'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';

  return (
    <Card
      className={`p-4 sm:p-5 rounded-lg border-2 transition hover:shadow ${
        isDarkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}
    >
      {/* Header */}
      <div className='flex justify-between items-center mb-3'>
        <h4
          className={`font-medium text-sm ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          {req.kodePenjemputan}
        </h4>
        <span
          className={`inline-flex items-center font-medium rounded-full px-2.5 py-0.5 text-xs ${statusColor}`}
        >
          {req.status}
        </span>
      </div>

      {/* Detail info */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm'>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Tanggal:</span> {req.tanggal}
        </p>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Jenis:</span>{' '}
          {req.jenisSampah?.join(', ') || '-'}
        </p>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Kurir:</span>{' '}
          {req.kurir || 'Belum ditentukan'}
        </p>
        <p className='text-green-600 font-semibold'>{req.poin} poin</p>
        <p
          className={`col-span-1 sm:col-span-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } italic`}
        >
          {req.alamat}
        </p>
      </div>
    </Card>
  );
};

export default RiwayatCard;
