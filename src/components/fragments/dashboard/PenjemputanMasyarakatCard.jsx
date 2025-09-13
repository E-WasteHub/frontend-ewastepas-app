// src/components/fragments/dashboard/PenjemputanMasyarakatCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { formatTanggalWaktuIndonesia } from '../../../utils/dateUtils';
import { Button, Card } from '../../elements';

//    Map status ke warna (disatukan untuk riwayat + lacak)
const warnaStatusBadge = (status, isDarkMode = false) => {
  const warnaMap = {
    Diproses: {
      light: 'bg-yellow-100 text-yellow-800',
      dark: 'bg-yellow-500/20 text-yellow-300',
    },
    Diterima: {
      light: 'bg-blue-100 text-blue-800',
      dark: 'bg-blue-500/20 text-blue-300',
    },
    Dijemput: {
      light: 'bg-purple-100 text-purple-800',
      dark: 'bg-purple-500/20 text-purple-300',
    },
    Selesai: {
      light: 'bg-green-100 text-green-800',
      dark: 'bg-green-500/20 text-green-300',
    },
    Dibatalkan: {
      light: 'bg-red-100 text-red-800',
      dark: 'bg-red-500/20 text-red-300',
    },
  };

  const entry = warnaMap[status];
  if (entry) return isDarkMode ? entry.dark : entry.light;

  return isDarkMode
    ? 'bg-gray-600/30 text-gray-300'
    : 'bg-gray-100 text-gray-700';
};

const PenjemputanMasyarakatCard = ({ req = {}, onDetail }) => {
  const { isDarkMode } = useDarkMode();
  const statusColor = warnaStatusBadge(req?.status_penjemputan, isDarkMode);

  return (
    <Card
      className={`p-4 rounded-lg border transition hover:shadow-sm ${
        isDarkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className='flex items-start justify-between'>
        {/*    Kiri: info utama */}
        <div className='flex-1 pr-4 space-y-2'>
          <p
            className={`text-lg ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            <span
              className={`font-semibold ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`}
            >
              {req.kode_penjemputan}
            </span>
          </p>

          <p
            className={
              isDarkMode ? 'text-gray-400 text-xs' : 'text-gray-500 text-xs'
            }
          >
            {formatTanggalWaktuIndonesia(req.waktu_diubah)}
          </p>

          <p
            className={
              isDarkMode ? 'text-gray-200 text-sm' : 'text-gray-700 text-sm'
            }
          >
            <span className='font-semibold'>Kurir :</span>{' '}
            {req.nama_kurir || '-'}
          </p>
          <p
            className={`text-sm line-clamp-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
            title={req.alamat_penjemputan}
          >
            <span className='font-semibold'>Alamat Penjemputan:</span>{' '}
            {req.alamat_penjemputan}
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
