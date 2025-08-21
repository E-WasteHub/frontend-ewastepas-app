import useDarkMode from '../../../hooks/useDarkMode';
import { Badge, Card } from '../../elements';

const RequestCard = ({ request, onClick }) => {
  const { isDarkMode } = useDarkMode();

  if (!request) return null; // ✅ fallback biar aman

  const statusColor =
    request.status === 'diambil'
      ? 'warning'
      : request.status === 'selesai'
      ? 'success'
      : 'secondary';

  return (
    <Card
      onClick={onClick}
      className={`p-4 cursor-pointer hover:shadow-md transition ${
        isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white'
      }`}
    >
      <div className='flex justify-between items-center mb-2'>
        <h4
          className={`font-medium text-sm ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {request.kodePenjemputan}
        </h4>
        <Badge intent={statusColor} size='sm'>
          {request.status}
        </Badge>
      </div>

      <p
        className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
      >
        {request.alamat}
      </p>

      <p className='text-xs mt-1 text-blue-500'>
        {new Date(request.waktuPenjemputan).toLocaleString('id-ID', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </p>

      <p className='text-xs mt-1 text-green-600 font-medium'>
        Estimasi Poin: {request.estimasiPoin}
      </p>
    </Card>
  );
};

export default RequestCard;
