import { Link, useLocation } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import { bottomMenuItemsByRole } from '../../../../utils/menuUtils';
import { detectPeranFromPath } from '../../../../utils/peranUtils';

const BottombarDashboard = ({ userRole = 'Masyarakat' }) => {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();

  // Ambil peran dari path atau fallback ke prop
  const currentPeran = detectPeranFromPath(location.pathname, userRole);
  const navItems =
    bottomMenuItemsByRole[currentPeran] || bottomMenuItemsByRole['Masyarakat'];

  // Styling warna
  const bgColor = isDarkMode
    ? 'bg-slate-900/95 border-slate-700'
    : 'bg-white/95 border-slate-200';
  const textColor = isDarkMode ? 'text-slate-400' : 'text-slate-600';
  const activeColor = isDarkMode ? 'text-green-400' : 'text-green-600';

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed bottom-0 z-50 w-full border-t backdrop-blur-lg ${bgColor} lg:hidden`}
    >
      <div className='flex h-16 items-center px-2'>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActiveLink(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center flex-1 py-2 px-1
                transition-all duration-200 rounded-lg mx-1
                ${isActive ? activeColor : textColor}
                ${isActive ? 'bg-green-50/20' : ''}
              `}
            >
              <IconComponent
                className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs leading-none ${
                  isActive ? 'font-semibold' : 'font-normal'
                }`}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottombarDashboard;
