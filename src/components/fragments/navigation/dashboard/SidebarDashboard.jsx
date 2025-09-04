import { Link, useLocation } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import usePengguna from '../../../../hooks/usePengguna';
import { menuItemsByRole } from '../../../../utils/menuUtils';
import { LogoApp } from '../../../elements/';

const SidebarDashboard = () => {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();

  // Ambil role pakai helper dari peranUtils
  const { peran } = usePengguna();

  // Ambil menu items berdasarkan peran
  const menuItems = menuItemsByRole[peran] || menuItemsByRole['Masyarakat'];

  const isActiveLink = (path) => location.pathname === path;

  return (
    <div
      className={`hidden lg:flex lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:w-64 lg:h-full border-r shadow-xl ${
        isDarkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}
      style={{ zIndex: 1000 }}
    >
      {/* Logo/Header */}
      <div
        className={`flex items-center justify-center p-4 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-slate-300'
        }`}
      >
        <LogoApp size='lg' withText={true} textSize='xl' />
      </div>

      {/* User Role Badge */}
      <div className='p-4'>
        <div
          className={`flex items-center space-x-2 p-3 rounded-lg ${
            isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              peran === 'Admin'
                ? isDarkMode
                  ? 'bg-red-600'
                  : 'bg-red-500'
                : peran === 'Mitra Kurir'
                ? isDarkMode
                  ? 'bg-blue-600'
                  : 'bg-blue-500'
                : isDarkMode
                ? 'bg-green-600'
                : 'bg-green-500'
            }`}
          >
            <span className='text-white text-xs font-medium'>
              {peran === 'Admin' ? 'A' : peran === 'Mitra Kurir' ? 'K' : 'M'}
            </span>
          </div>
          <span
            className={`text-sm font-medium ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {peran === 'Masyarakat'
              ? 'Masyarakat'
              : peran === 'Admin'
              ? 'Admin'
              : 'Mitra Kurir'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-4 pb-4 space-y-1 overflow-y-auto'>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActiveLink(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? isDarkMode
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-green-300 text-slate-700 shadow-sm'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <IconComponent
                className={`mr-3 h-5 w-5 ${
                  isActive
                    ? isDarkMode
                      ? 'text-white'
                      : 'text-green-800'
                    : isDarkMode
                    ? 'text-slate-400 group-hover:text-white'
                    : 'text-slate-500 group-hover:text-slate-700'
                }`}
              />
              <span className='truncate'>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarDashboard;
