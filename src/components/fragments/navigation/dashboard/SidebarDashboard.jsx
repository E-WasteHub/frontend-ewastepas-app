import { NavLink, useLocation } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import usePengguna from '../../../../hooks/usePengguna';
import { itemMenuBerdasarkanPeran } from '../../../../utils/menuUtils';
import { LogoApp } from '../../../elements/';

const SidebarDashboard = () => {
  const { isDarkMode } = useDarkMode();
  const { peran } = usePengguna();
  const location = useLocation();

  const peranKey = peran || 'Masyarakat';
  const menuItems =
    itemMenuBerdasarkanPeran[peranKey] ||
    itemMenuBerdasarkanPeran['Masyarakat'];

  const peranConfig = {
    Admin: {
      label: 'Admin',
      short: 'A',
      color: isDarkMode ? 'bg-red-600' : 'bg-red-500',
    },
    'Mitra Kurir': {
      label: 'Mitra Kurir',
      short: 'K',
      color: isDarkMode ? 'bg-blue-600' : 'bg-blue-500',
    },
    Masyarakat: {
      label: 'Masyarakat',
      short: 'M',
      color: isDarkMode ? 'bg-green-600' : 'bg-green-500',
    },
  };

  const peranPengguna = peranConfig[peranKey] || peranConfig['Masyarakat'];

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
          isDarkMode ? 'border-slate-700' : 'border-slate-200'
        }`}
      >
        <LogoApp size='lg' withText textSize='xl' />
      </div>

      {/* User Role Badge */}
      <div className='p-4'>
        <div
          className={`flex items-center space-x-2 p-3 rounded-lg ${
            isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${peranPengguna.color}`}
          >
            <span className='text-white text-xs font-medium'>
              {peranPengguna.short}
            </span>
          </div>
          <span
            className={`text-sm font-medium ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {peranPengguna.label}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-4 pb-4 space-y-1 overflow-y-auto'>
        {menuItems.map((item) => {
          const IconComponent = item.ikon;
          const isRootDashboard = item.jalur.split('/').length === 3;

          // aktif kalau: match persis, atau anaknya match
          const isChildActive = item.anak?.some((child) =>
            location.pathname.startsWith(child.jalur)
          );

          const isActive =
            (isRootDashboard && location.pathname === item.jalur) ||
            (!isRootDashboard && location.pathname.startsWith(item.jalur)) ||
            isChildActive;

          return (
            <NavLink
              key={item.jalur}
              to={item.jalur}
              end={isRootDashboard}
              className={() =>
                `group flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? isDarkMode
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-green-200 text-slate-800 shadow-sm'
                    : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <IconComponent className='mr-3 h-5 w-5' />
              <span className='truncate'>{item.judul}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarDashboard;
