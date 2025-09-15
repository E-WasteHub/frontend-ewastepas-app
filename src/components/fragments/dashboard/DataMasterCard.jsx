// src/components/fragments/dashboard/DataMasterCard.jsx
import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import { Card } from '../../elements';
import { adminMasterMenus } from '../../../utils/menuUtils';

const DataMasterCard = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {adminMasterMenus.map((menu) => {
        const Icon = menu.icon;
        return (
          <Link key={menu.path} to={menu.path} className='block'>
            <Card className='cursor-pointer hover:shadow-lg transition-shadow duration-300'>
              <Card.Body className='flex flex-col items-center text-center space-y-2'>
                <Icon className='w-10 h-10 text-green-600' />
                <h3 className='text-lg font-semibold'>{menu.title}</h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {menu.description}
                </p>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default DataMasterCard;
