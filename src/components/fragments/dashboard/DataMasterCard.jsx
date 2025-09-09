import { BookOpen, Box, FolderKanban, ListChecks, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import { Card } from '../../elements';

const menus = [
  {
    title: 'Kelola Kategori',
    link: '/dashboard/admin/kelola-kategori',
    icon: FolderKanban,
    desc: 'Kelola kategori sampah elektronik',
  },
  {
    title: 'Kelola Jenis',
    link: '/dashboard/admin/kelola-jenis',
    icon: ListChecks,
    desc: 'Definisikan jenis-jenis sampah elektronik',
  },
  {
    title: 'Kelola Daerah',
    link: '/dashboard/admin/kelola-daerah',
    icon: MapPin,
    desc: 'Kelola cakupan wilayah dan area layanan',
  },
  {
    title: 'Kelola Dropbox',
    link: '/dashboard/admin/kelola-dropbox',
    icon: Box,
    desc: 'Atur titik dropbox sampah elektronik',
  },
  {
    title: 'Kelola Edukasi',
    link: '/dashboard/admin/kelola-edukasi',
    icon: BookOpen,
    desc: 'Kelola materi edukasi terkait e-waste',
  },
];

const DatamasterCard = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {menus.map((menu, idx) => {
        const Icon = menu.icon;
        return (
          <Link key={idx} to={menu.link} className='block'>
            <Card className='cursor-pointer hover:shadow-lg transition-shadow duration-300'>
              <Card.Body className='flex flex-col items-center text-center space-y-2'>
                <Icon className='w-10 h-10 text-green-600' />
                <h3 className='text-lg font-semibold'>{menu.title}</h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {menu.desc}
                </p>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default DatamasterCard;
