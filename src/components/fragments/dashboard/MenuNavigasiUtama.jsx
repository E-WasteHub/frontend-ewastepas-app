import { BookOpen, History, Plus, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import Card from '../../elements/Card';

const MenuNavigasiUtama = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'buat-permintaan',
      title: 'Buat Permintaan Penjemputan',
      description: 'Ajukan penjemputan sampah elektronik',
      icon: Plus,
      path: '/dashboard/masyarakat/penjemputan',
      color: 'green',
    },
    {
      id: 'lacak-penjemputan',
      title: 'Lacak Penjemputan',
      description: 'Pantau status penjemputan Anda',
      icon: Search,
      path: '/dashboard/masyarakat/lacak',
      color: 'blue',
    },
    {
      id: 'riwayat-transaksi',
      title: 'Riwayat Transaksi',
      description: 'Lihat semua transaksi sebelumnya',
      icon: History,
      path: '/dashboard/masyarakat/riwayat',
      color: 'purple',
    },
    {
      id: 'edukasi',
      title: 'Edukasi',
      description: 'Pelajari tentang e-waste dan lingkungan',
      icon: BookOpen,
      path: '/edukasi',
      color: 'orange',
    },
    {
      id: 'profil',
      title: 'Profil',
      description: 'Kelola data pribadi Anda',
      icon: User,
      path: '/dashboard/profil',
      color: 'gray',
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      green: {
        icon: isDarkMode ? 'text-green-400' : 'text-green-500',
        bg: isDarkMode ? 'bg-green-500/10' : 'bg-green-50',
        hover: isDarkMode ? 'hover:bg-green-500/20' : 'hover:bg-green-100',
      },
      blue: {
        icon: isDarkMode ? 'text-blue-400' : 'text-blue-500',
        bg: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50',
        hover: isDarkMode ? 'hover:bg-blue-500/20' : 'hover:bg-blue-100',
      },
      purple: {
        icon: isDarkMode ? 'text-purple-400' : 'text-purple-500',
        bg: isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50',
        hover: isDarkMode ? 'hover:bg-purple-500/20' : 'hover:bg-purple-100',
      },
      orange: {
        icon: isDarkMode ? 'text-orange-400' : 'text-orange-500',
        bg: isDarkMode ? 'bg-orange-500/10' : 'bg-orange-50',
        hover: isDarkMode ? 'hover:bg-orange-500/20' : 'hover:bg-orange-100',
      },
      gray: {
        icon: isDarkMode ? 'text-gray-400' : 'text-gray-500',
        bg: isDarkMode ? 'bg-gray-500/10' : 'bg-gray-50',
        hover: isDarkMode ? 'hover:bg-gray-500/20' : 'hover:bg-gray-100',
      },
    };
    return colorMap[color] || colorMap.gray;
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <Card>
      <Card.Body className='p-6'>
        <h3
          className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Menu Navigasi Utama
        </h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const colors = getColorClasses(item.color);

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.path)}
                className={`group p-4 rounded-lg border transition-all duration-200 text-left ${
                  isDarkMode
                    ? 'border-gray-600 hover:border-gray-500'
                    : 'border-gray-200 hover:border-gray-300'
                } ${colors.hover}`}
              >
                <div className='flex flex-col items-center text-center space-y-3'>
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-full ${colors.bg} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>

                  {/* Content */}
                  <div>
                    <h4
                      className={`font-semibold text-sm mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MenuNavigasiUtama;
