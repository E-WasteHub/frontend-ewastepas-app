import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import Card from '../../elements/Card';
import QuickActionCard from '../../elements/QuickActionCard';

const QuickActions = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleBuatPermintaan = () => {
    navigate('/dashboard/masyarakat/penjemputan');
  };

  const handleLacakPenjemputan = () => {
    navigate('/dashboard/masyarakat/lacak');
  };

  return (
    <Card>
      <Card.Body className='py-6'>
        <h3
          className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Akses Cepat
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <QuickActionCard
            icon={Plus}
            title='Buat Permintaan'
            onClick={handleBuatPermintaan}
          />
          <QuickActionCard
            icon={Search}
            title='Lacak Penjemputan'
            onClick={handleLacakPenjemputan}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuickActions;
