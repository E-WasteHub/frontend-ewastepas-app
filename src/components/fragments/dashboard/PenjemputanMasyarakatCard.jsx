import { useDarkMode } from '../../../hooks';
import { formatTanggalWaktuIndonesia } from '../../../utils/dateUtils';
import { Badge, Button, Card } from '../../elements';

// Peta status penjemputan ke style badge
const statusBadgeMap = {
  Diproses: 'warning',
  Diterima: 'info',
  Dijemput: 'secondary',
  Selesai: 'success',
  Dibatalkan: 'danger',
};

const PenjemputanMasyarakatCard = ({ req = {}, onDetail }) => {
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
        {/* Kiri: info utama */}
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

        {/* Kanan: status + tombol */}
        <div className='flex flex-col items-end space-y-6'>
          <Badge
            status={statusBadgeMap[req.status_penjemputan] || 'secondary'}
            size='sm'
          >
            {req?.status_penjemputan || '-'}
          </Badge>

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
