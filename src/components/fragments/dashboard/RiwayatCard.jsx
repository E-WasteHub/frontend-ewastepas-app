import { Calendar, MapPin, Star, User } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import Badge from '../../elements/Badge';

const RiwayatCard = ({ riwayat, index }) => {
  const { isDarkMode } = useDarkMode();

  // Function untuk format tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Function untuk mendapatkan status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'secondary', text: 'Menunggu' },
      dalam_proses: { variant: 'warning', text: 'Dalam Proses' },
      dijemput: { variant: 'warning', text: 'Dijemput' },
      selesai: { variant: 'success', text: 'Selesai' },
      dibatalkan: { variant: 'danger', text: 'Dibatalkan' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge variant={config.variant} size='sm'>
        {config.text}
      </Badge>
    );
  };

  return (
    <div
      className={`p-4 rounded-lg border transition-all hover:shadow-md ${
        isDarkMode
          ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
          : 'bg-gray-50 border-gray-200 hover:bg-white'
      }`}
    >
      <div className='space-y-3'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:justify-between md:items-start space-y-2 md:space-y-0'>
          <div className='flex-1'>
            <h3
              className={`font-semibold text-lg ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {riwayat.kode_penjemputan ||
                `EWH-${String(index + 1).padStart(3, '0')}`}
            </h3>
            <div className='flex items-center gap-2 mt-1'>
              <Calendar
                className={`w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
              <span
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {formatDate(
                  riwayat.tanggal_permintaan ||
                    riwayat.waktu_ditambah ||
                    riwayat.tanggal
                )}
              </span>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0 sm:space-x-4'>
            <div>{getStatusBadge(riwayat.status)}</div>
            <div className='flex items-center gap-1'>
              <Star className='w-4 h-4 text-green-500' />
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {riwayat.total_poin || 0} poin
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <p
              className={`text-xs font-medium mb-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Kurir:
            </p>
            <div className='flex items-center gap-2'>
              <User
                className={`w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
              <span
                className={`text-sm ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {riwayat.kurir || 'Belum ditentukan'}
              </span>
            </div>
          </div>

          <div>
            <p
              className={`text-xs font-medium mb-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Lokasi:
            </p>
            <div className='flex items-start gap-2'>
              <MapPin
                className={`w-4 h-4 mt-0.5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
              <span
                className={`text-sm ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {riwayat.alamat_jemput ||
                  riwayat.alamat ||
                  'Alamat tidak tersedia'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0'>
          <div className='flex items-center gap-4 text-xs'>
            <span
              className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {(riwayat.sampah || []).length} item sampah
            </span>
            {riwayat.dropbox && (
              <span
                className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Dropbox: {riwayat.dropbox}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatCard;
