import { AlertCircle, Bell, CheckCircle, Clock } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import Badge from '../../elements/Badge';
import Card from '../../elements/Card';

const NotifikasiSection = ({ notifikasi = [] }) => {
  const { isDarkMode } = useDarkMode();

  // Function untuk mendapatkan icon berdasarkan tipe notifikasi
  const getNotificationIcon = (tipe) => {
    const iconProps = { className: 'w-5 h-5' };

    switch (tipe) {
      case 'selesai':
        return (
          <CheckCircle {...iconProps} className='w-5 h-5 text-green-500' />
        );
      case 'dalam_proses':
        return <Clock {...iconProps} className='w-5 h-5 text-yellow-500' />;
      case 'dikonfirmasi':
        return <AlertCircle {...iconProps} className='w-5 h-5 text-blue-500' />;
      default:
        return <Bell {...iconProps} className='w-5 h-5 text-gray-500' />;
    }
  };

  // Function untuk mendapatkan badge status
  const getStatusBadge = (tipe) => {
    const statusConfig = {
      selesai: { variant: 'success', text: 'Selesai' },
      dalam_proses: { variant: 'warning', text: 'Dalam Proses' },
      dikonfirmasi: { variant: 'info', text: 'Dikonfirmasi' },
      menunggu: { variant: 'secondary', text: 'Menunggu' },
    };

    const config = statusConfig[tipe] || statusConfig.menunggu;
    return (
      <Badge variant={config.variant} size='sm'>
        {config.text}
      </Badge>
    );
  };

  // Function untuk format waktu relatif
  const formatWaktuRelatif = (waktu) => {
    const sekarang = new Date();
    const waktuNotif = new Date(waktu);
    const selisih = sekarang - waktuNotif;
    const menit = Math.floor(selisih / (1000 * 60));
    const jam = Math.floor(selisih / (1000 * 60 * 60));
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));

    if (hari > 0) return `${hari} hari yang lalu`;
    if (jam > 0) return `${jam} jam yang lalu`;
    if (menit > 0) return `${menit} menit yang lalu`;
    return 'Baru saja';
  };

  if (notifikasi.length === 0) {
    return null; // Tidak tampilkan section jika tidak ada notifikasi
  }

  return (
    <Card>
      <Card.Body className='p-6'>
        <div className='flex items-center gap-2 mb-4'>
          <Bell
            className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          />
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Notifikasi Terbaru
          </h3>
        </div>

        <div className='space-y-3'>
          {notifikasi.slice(0, 3).map((notif, index) => (
            <div
              key={notif.id || index}
              className={`p-3 rounded-lg border transition-all hover:shadow-sm ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                  : 'bg-gray-50 border-gray-200 hover:bg-white'
              }`}
            >
              <div className='flex items-start gap-3'>
                <div className='flex-shrink-0 mt-1'>
                  {getNotificationIcon(notif.tipe)}
                </div>

                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-2'>
                    <div className='flex-1'>
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {notif.judul}
                      </p>
                      <p
                        className={`text-sm mt-1 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {notif.pesan}
                      </p>
                      {notif.kode_penjemputan && (
                        <p
                          className={`text-xs mt-1 font-mono ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {notif.kode_penjemputan}
                        </p>
                      )}
                    </div>

                    <div className='flex flex-col items-end gap-2'>
                      {getStatusBadge(notif.tipe)}
                      <span
                        className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {formatWaktuRelatif(notif.waktu)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default NotifikasiSection;
