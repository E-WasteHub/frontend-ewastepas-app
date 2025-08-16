import {
  ChevronRight,
  Database,
  FileText,
  MapPin,
  Package,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminDataMasterView = () => {
  const { isDarkMode } = useDarkMode();

  // Data master items
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
      title: 'Kelola Konten Edukasi',
      description:
        'Mengelola konten edukasi terkait sampah elektronik dan daur ulang.',
      icon: MapPin,
      path: '/dashboard/admin/kelola-edukasi',
      color: 'bg-orange-500',
      stats: '12 Daerah',
      lastUpdate: '5 jam yang lalu',
    },
  ];

  const filteredItems = dataMasterItems;

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header Section */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
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
        </div>

        {/* Data Master Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {filteredItems.map((item) => {
            const IconComponent = item.icon;

            return (
              <Card
                key={item.id}
                className={`p-6 ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-750'
                    : 'bg-white hover:bg-gray-50'
                } transition-all duration-200 hover:shadow-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    {/* Icon and Title */}
                    <div className='flex items-center space-x-3 mb-3'>
                      <div>
                        <h3
                          className={`text-lg font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link to={item.path} className='block'>
                      <Button
                        variant='primary'
                        className='w-full flex items-center justify-center space-x-2 group'
                      >
                        <span>Kelola Data</span>
                        <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className='text-center py-12'>
            <Database
              className={`h-12 w-12 mx-auto mb-4 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`}
            />
            <h3
              className={`text-lg font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Tidak ada data master ditemukan
            </h3>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              Coba gunakan kata kunci pencarian yang berbeda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDataMasterView;
