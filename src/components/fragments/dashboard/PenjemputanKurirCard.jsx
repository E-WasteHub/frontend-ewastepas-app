// src/components/fragments/kurir/PenjemputanKurirCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { Button, Card } from '../../elements';

// Simple utility functions
const formatTanggalWaktuID = (tanggal) => {
  if (!tanggal) return '-';
  const d = new Date(tanggal);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const warnaStatusBadge = (status, isDarkMode = false) => {
  const warnaMap = {
    Selesai: {
      light: 'bg-green-100 text-green-800',
      dark: 'bg-green-800/30 text-green-300',
    },
    Dibatalkan: {
      light: 'bg-red-100 text-red-800',
      dark: 'bg-red-800/30 text-red-300',
    },
    'Diantar ke Dropbox': {
      light: 'bg-blue-100 text-blue-800',
      dark: 'bg-blue-800/30 text-blue-300',
    },
    'Dijemput Kurir': {
      light: 'bg-purple-100 text-purple-800',
      dark: 'bg-purple-800/30 text-purple-300',
    },
    'Menunggu Kurir': {
      light: 'bg-yellow-100 text-yellow-800',
      dark: 'bg-yellow-600/40 text-yellow-300',
    },
  };

  const entry = warnaMap[status];
  if (entry) return isDarkMode ? entry.dark : entry.light;

  return isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
};

const PenjemputanKurirCard = ({
  req,
  onAmbil,
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
        {/* 🔹 Kiri: info utama */}
        <div className='flex-1 pr-4 space-y-1'>
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
            {formatTanggalWaktuID(req.waktu_ditambah)}
          </p>

          <p
            className={
              isDarkMode ? 'text-gray-200 text-sm' : 'text-gray-700 text-sm'
            }
          >
            <span className='font-semibold'>Masyarakat:</span>{' '}
            {req.nama_masyarakat}
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

        {/* 🔹 Kanan: status + tombol */}
        <div className='flex flex-col items-end space-y-3'>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${warnaStatusBadge(
              req.status_penjemputan
            )}`}
          >
            {req.status_penjemputan}
          </span>

          {!isAktif && req.status_penjemputan === 'Diproses' && (
            <Button
              type='button'
              onClick={() => !disabled && onAmbil?.(req.id_penjemputan)}
              disabled={disabled}
              className={`!px-3 !py-1 text-xs font-medium rounded-md border transition
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
        </div>
      </div>
    </Card>
  );
};

export default PenjemputanKurirCard;
