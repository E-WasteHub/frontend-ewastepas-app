import {
  BookCopyIcon,
  Database,
  FileText,
  MapPin,
  Package,
} from 'lucide-react';
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
          {dataMasterItems.map((item) => (
            <DataMasterCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDataMasterView;
