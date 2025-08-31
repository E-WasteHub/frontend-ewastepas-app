// src/components/fragments/dashboard/DataMasterCard.jsx
import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import { Button, Card } from '../../elements';

/**
 * Komponen DataMasterCard
 * ------------------------
 * Menampilkan kartu untuk setiap item data master dengan ikon, deskripsi, dan tombol aksi.
 * Digunakan di AdminDataMasterView.
 *
 * Props:
 * - item (object): Data item master
 *   { id, title, description, icon, path, color, stats, lastUpdate }
 */
const DataMasterCard = ({ item }) => {
  const { isDarkMode } = useDarkMode();
  const IconComponent = item.icon;

  return (
    <Card
      className={`w-full md:w-[48%] lg:w-[31%] flex flex-col text-center p-6 border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className='flex flex-col items-center flex-grow'>
        <div className={`p-3 rounded-lg ${item.color} mb-4`}>
          <IconComponent className='h-8 w-8 text-white' />
        </div>
        <h3
          className={`text-lg font-semibold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`text-sm leading-relaxed ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {item.description}
        </p>
        {item.stats && (
          <div className='mt-3 text-xs text-gray-500'>
            <p>{item.stats}</p>
            {item.lastUpdate && <p>Update: {item.lastUpdate}</p>}
          </div>
        )}
      </div>
      <div className='mt-6'>
        <Link to={item.path} className='block'>
          <Button
            variant='primary'
            className='w-full flex items-center justify-center space-x-2 group'
          >
            <span>Kelola Data</span>
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default DataMasterCard;
