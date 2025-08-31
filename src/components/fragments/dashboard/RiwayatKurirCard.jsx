// src/components/fragments/dashboard/RiwayatKurirCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';

/**
 * Komponen RiwayatKurirCard
 * --------------------------
 * Menampilkan informasi riwayat penjemputan khusus untuk kurir:
 * - Kode penjemputan
 * - Status dengan warna berbeda
 * - Nama pemesan, alamat, tanggal
 * - Total poin dan pendapatan
 * - Expand/collapse untuk detail
 *
 * Props:
 * - req (object): Data riwayat penjemputan
 * - isSelected (boolean): Status expand/collapse
 * - onToggle (function): Handler untuk toggle detail
 */
const RiwayatKurirCard = ({ req, isSelected, onToggle }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`rounded-lg border transition overflow-hidden shadow-sm ${
        isSelected
          ? isDarkMode
            ? 'border-green-500 bg-slate-800/60'
            : 'border-green-400 bg-slate-50'
          : isDarkMode
          ? 'bg-gray-800/40 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Ringkasan */}
      <div className='flex flex-col sm:flex-row justify-between gap-4 p-5'>
        {/* Info kiri */}
        <div className='space-y-2 text-sm'>
          <p
            className={`font-semibold text-base ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Kode Penjemputan:{' '}
            <span className='text-green-500'>{req.kodePenjemputan}</span>
          </p>
          <p
            className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } text-xs`}
          >
            Tanggal Penjemputan: {req.tanggalPenjemputan}
          </p>

          <p
            className={`${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            } text-sm`}
          >
            Masyarakat:{' '}
            <span className='font-medium'>{req.namaPemesan || '-'}</span>
          </p>

          <p
            className={`line-clamp-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } text-sm`}
          >
            Alamat: {req.alamat}
          </p>
        </div>

        {/* Info kanan */}
        <div className='text-right space-y-2 sm:min-w-[130px]'>
          <span
            className={`inline-block text-xs px-3 py-1 rounded-md font-medium ${
              req.status === 'selesai'
                ? isDarkMode
                  ? 'bg-green-900/70 text-green-400'
                  : 'bg-green-100 text-green-700'
                : req.status === 'dibatalkan'
                ? isDarkMode
                  ? 'bg-red-900/30 text-red-400'
                  : 'bg-red-100 text-red-700'
                : isDarkMode
                ? 'bg-yellow-900/30 text-yellow-400'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {req.status}
          </span>
          <p className='text-sm text-green-500 font-semibold'>
            {req.totalPoin} poin
          </p>
        </div>
      </div>

      {/* Toggle detail */}
      <button
        onClick={onToggle}
        className={`w-full px-5 py-3 text-xs sm:text-sm border-t flex items-center justify-center sm:justify-end gap-2 font-medium ${
          isDarkMode
            ? 'border-gray-700 text-green-400 hover:bg-gray-700/30'
            : 'border-gray-200 text-green-700 hover:bg-green-50'
        }`}
      >
        {isSelected ? 'Tutup Detail' : 'Lihat Detail'}
        <span className='text-xs'>{isSelected ? '▲' : '▼'}</span>
      </button>

      {isSelected && (
        <div
          className={`px-4 py-5 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className='space-y-3 text-sm'>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              <span className='font-medium'>Catatan:</span> {req.catatan}
            </p>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              <span className='font-medium'>Pendapatan:</span> Rp{' '}
              {req.pendapatan?.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatKurirCard;
