// src/components/fragments/kurir/PenjemputanKurirCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { formatTanggalWaktuIndonesia } from '../../../utils/dateUtils';
import { Button, Card } from '../../elements';

// Utility: warna badge status
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

const PenjemputanKurirCard = ({
  req,
  onAmbil,
  onDetail,
  isAktif = false,
  disabled = false,
}) => {
  const { isDarkMode } = useDarkMode();

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
            {formatTanggalWaktuIndonesia(req.waktu_ditambah)}
          </p>

          <p
            className={
              isDarkMode ? 'text-gray-200 text-sm' : 'text-gray-700 text-sm'
            }
          >
            <span className='font-semibold'>Masyarakat:</span>{' '}
            {req.nama_masyarakat || '-'}
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

        {/*    Kanan: status + tombol */}
        <div className='flex flex-col items-end space-y-3'>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${warnaStatusBadge(
              req.status_penjemputan,
              isDarkMode
            )}`}
          >
            {req.status_penjemputan}
          </span>

          {/* Jika dari daftar → tombol Ambil */}
          {!isAktif && req.status_penjemputan === 'Diproses' && onAmbil && (
            <Button
              type='button'
              onClick={() => !disabled && onAmbil?.(req.id_penjemputan)}
              disabled={disabled}
              className={`mt-10 !px-4 !py-2 text-xs font-medium rounded-md border transition
                ${
                  disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : isDarkMode
                    ? 'text-green-400 border-green-400 hover:bg-slate-700'
                    : 'text-green-600 border-green-600 hover:bg-green-50'
                }`}
            >
              Ambil
            </Button>
          )}

          {/* Jika dari riwayat → tombol Detail */}
          {onDetail &&
            ['Selesai', 'Dibatalkan'].includes(req.status_penjemputan) && (
              <Button
                type='button'
                onClick={() => onDetail?.(req.id_penjemputan)}
                className={`mt-10 !px-4 !py-2 text-xs font-medium rounded-md
                ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Detail
              </Button>
            )}
        </div>
      </div>
    </Card>
  );
};

export default PenjemputanKurirCard;
