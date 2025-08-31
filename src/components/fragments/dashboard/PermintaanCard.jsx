// src/components/fragments/dashboard/PermintaanCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { Card } from '../../elements';

/**
 * Komponen PermintaanCard
 * ------------------------
 * Menampilkan informasi detail permintaan penjemputan untuk kurir:
 * - Kode penjemputan
 * - Status penjemputan (dengan badge warna berbeda)
 * - Tanggal, jenis sampah, alamat
 * - Poin yang akan didapat
 *
 * Props:
 * - permintaan (object): Data permintaan penjemputan
 *   { kodePenjemputan, status, tanggal, jenisSampah[], alamat, poin, kurir }
 */
const PermintaanCard = ({ permintaan }) => {
  const { isDarkMode } = useDarkMode();

  /** Warna badge berdasarkan status */
  const statusColor =
    permintaan.status === 'Diproses'
      ? 'warning'
      : permintaan.status === 'Selesai'
      ? 'success'
      : permintaan.status === 'Dibatalkan'
      ? 'danger'
      : 'warning';

  const statusColorClass =
    statusColor === 'success'
      ? 'bg-green-100 text-green-800'
      : statusColor === 'danger'
      ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800';

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
          {permintaan.kodePenjemputan}
        </h4>
        <span
          className={`inline-flex items-center font-medium rounded-full px-2.5 py-0.5 text-xs ${statusColorClass}`}
        >
          {permintaan.status}
        </span>
      </div>

      {/* Body (2 grid) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm'>
        {/* Kolom 1 */}
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Tanggal:</span> {permintaan.tanggal}
        </p>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Jenis:</span>{' '}
          {permintaan.jenisSampah?.join(', ') || '-'}
        </p>

        {/* Kolom 2 */}
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
          <span className='font-medium'>Kurir:</span>{' '}
          {permintaan.kurir || 'Belum ditentukan'}
        </p>
        <p className='text-green-600 font-semibold'>{permintaan.poin} poin</p>

        {/* Full width row */}
        <p
          className={`col-span-1 sm:col-span-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } italic`}
        >
          {permintaan.alamat}
        </p>
      </div>
    </Card>
  );
};

export default PermintaanCard;
