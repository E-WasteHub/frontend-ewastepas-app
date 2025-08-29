import {
  BookCopyIcon,
  Database,
  FileText,
  MapPin,
  Package,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminDataMasterView = () => {
  const { isDarkMode } = useDarkMode();
  const dataMasterItems = [
    {
      id: 'kategori',
      title: 'Kelola Kategori',
      description:
        'Mengelola kategori sampah elektronik seperti perangkat mobile, komputer, dll.',
      icon: Database,
      path: '/dashboard/admin/kelola-kategori',
      color: 'bg-blue-500',
      stats: '8 Kategori',
      lastUpdate: '2 hari yang lalu',
    },
    {
      id: 'jenis',
      title: 'Kelola Jenis',
      description:
        'Mengelola jenis-jenis sampah elektronik berdasarkan kategori yang ada.',
      icon: FileText,
      path: '/dashboard/admin/kelola-jenis',
      color: 'bg-green-500',
      stats: '24 Jenis',
      lastUpdate: '1 hari yang lalu',
    },
    {
      id: 'dropbox',
      title: 'Kelola Dropbox',
      description:
        'Mengelola lokasi dropbox sebagai titik pengumpulan sampah elektronik.',
      icon: Package,
      path: '/dashboard/admin/kelola-dropbox',
      color: 'bg-purple-500',
      stats: '15 Lokasi',
      lastUpdate: '3 jam yang lalu',
    },
    {
      id: 'daerah',
      title: 'Kelola Daerah',
      description:
        'Mengelola wilayah operasional untuk mengelompokkan lokasi dropbox.',
      icon: MapPin,
      path: '/dashboard/admin/kelola-daerah',
      color: 'bg-orange-500',
      stats: '12 Daerah',
      lastUpdate: '5 jam yang lalu',
    },
    {
      id: 'edukasi',
      title: 'Kelola Edukasi',
      description:
        'Mengelola semua konten edukasi untuk menambah wawasan masyarakat terkait sampah elektronik.',
      icon: BookCopyIcon,
      path: '/dashboard/admin/kelola-edukasi',
      color: 'bg-emerald-500',
      stats: '12 Daerah',
      lastUpdate: '5 jam yang lalu',
    },
  ];

  return (
    <div className='max-w-7xl mx-auto p-4 md:p-6'>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Data Master
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } mt-1`}
          >
            Kelola semua data master sistem E-WasteHub
          </p>
        </div>

        {/* Cards Grid */}
        <div className='flex flex-wrap justify-center gap-6'>
          {dataMasterItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={item.id}
                // PERUBAHAN DI SINI: Tambahkan class untuk lebar card
                className={`w-full md:w-[48%] lg:w-[31%] flex flex-col text-center p-6 border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
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
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDataMasterView;
