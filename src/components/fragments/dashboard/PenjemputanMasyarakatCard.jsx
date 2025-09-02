// src/components/fragments/dashboard/PenjemputanMasyarakatCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { Button, Card } from '../../elements';

// 🔹 Map status ke warna (disatukan untuk riwayat + lacak)
const getStatusColor = (status_penjemputan, isDarkMode) => {
  const map = {
    'Menunggu Kurir': isDarkMode
      ? 'bg-yellow-800/40 text-yellow-300'
      : 'bg-yellow-100 text-yellow-700',
    'Dijemput Kurir': isDarkMode
      ? 'bg-blue-800/40 text-blue-300'
      : 'bg-blue-100 text-blue-700',
    'Diantar Kurir ke Dropbox': isDarkMode
      ? 'bg-indigo-800/40 text-indigo-300'
      : 'bg-indigo-100 text-indigo-700',
    Selesai: isDarkMode
      ? 'bg-green-800/40 text-green-300'
      : 'bg-green-100 text-green-700',
    Dibatalkan: isDarkMode
      ? 'bg-red-800/40 text-red-300'
      : 'bg-red-100 text-red-700',
  };

  return (
    map[status_penjemputan] ||
    (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700')
  );
};

const PenjemputanMasyarakatCard = ({ req = {}, onDetail }) => {
  const { isDarkMode } = useDarkMode();
  const statusColor = getStatusColor(req?.status_penjemputan, isDarkMode);

  return (
    <Card
      className={`p-4 rounded-lg border transition hover:shadow-sm ${
        isDarkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className='flex items-start justify-between'>
        {/* Left: informasi utama */}
        <div className='flex-1 pr-4 gap-1.5 flex flex-col'>
          {/* Kode */}
          <p
            className={`text-sm font-bold mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Kode Penjemputan :{' '}
            <span className='text-green-600 font-semibold ml-1'>
              {req?.kode_penjemputan || '-'}
            </span>
          </p>

          {/* Tanggal / waktu */}
          <p
            className={`text-sm mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Tanggal:{' '}
            <span className='font-semibold'>
              {req?.tanggal || req?.waktu_ditambah || '-'}
            </span>
          </p>

          {/* Kurir */}
          {req?.nama_kurir && (
            <p
              className={`text-sm mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Nama Kurir:{' '}
              <span className='font-semibold'>
                {req.nama_kurir || 'Belum ditentukan'}
              </span>
            </p>
          )}

          {/* Alamat */}
          <p
            className={`text-sm mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
            title={req?.alamat_penjemputan}
          >
            Alamat Penjemputan :{' '}
            <span className='text-xs font-semibold'>
              {req?.alamat_penjemputan || '-'}
            </span>
          </p>
        </div>

        {/* Right: status + poin + tombol */}
        <div className='flex flex-col items-end space-y-6'>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColor}`}
          >
            {req?.status_penjemputan || '-'}
          </span>

          {/* Button detail */}
          <Button
            type='button'
            onClick={onDetail}
            className={`mt-12 !px-4 !py-2 text-xs font-medium rounded-md border transition
            ${
              isDarkMode
                ? 'text-green-400 border-green-400 hover:bg-slate-700'
                : 'text-green-600 border-green-600 hover:bg-green-50'
            }`}
          >
            Detail
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PenjemputanMasyarakatCard;
