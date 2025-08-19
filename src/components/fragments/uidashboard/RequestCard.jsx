import useDarkMode from '../../../hooks/useDarkMode';
import { Badge, Card } from '../../elements';

const RequestCard = ({ request, onClick }) => {
  const { isDarkMode } = useDarkMode();

  const statusColor =
    request.status === 'Penjemputan Selesai'
      ? 'success'
      : request.status === 'Sedang Diproses'
      ? 'warning'
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
          {request.kode}
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
      <p className='text-xs mt-1 text-blue-500'>{request.tanggal}</p>
    </Card>
  );
};

export default RequestCard;
