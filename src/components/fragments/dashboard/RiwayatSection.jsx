import { useNavigate } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import Button from '../../elements/Button';
import Card from '../../elements/Card';
import RiwayatCard from './RiwayatCard';

const RiwayatSection = ({ riwayatTerbaru = [] }) => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLihatSemuaRiwayat = () => {
    navigate('/dashboard/riwayat');
  };

  return (
    <Card>
      <Card.Body className='p-6'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0'>
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Riwayat Penjemputan Terbaru
          </h3>
          {riwayatTerbaru.length > 0 && (
            <Button
              onClick={handleLihatSemuaRiwayat}
              variant='primary'
              size='sm'
              className='!py-2'
            >
              Lihat Semua
            </Button>
          )}
        </div>

        {riwayatTerbaru.length === 0 ? (
          <div className='text-center py-8'>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Belum ada riwayat penjemputan
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {riwayatTerbaru.slice(0, 2).map((riwayat, index) => (
              <RiwayatCard
                key={riwayat.id_penjemputan || riwayat.id || index}
                riwayat={riwayat}
                index={index}
              />
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default RiwayatSection;
