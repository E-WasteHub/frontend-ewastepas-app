import { NavLink, useLocation } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import { bottomMenuItemsByRole } from '../../../../utils/menuUtils';
import { detectPeranFromPath } from '../../../../utils/peranUtils';

const BottombarDashboard = ({ userRole = 'Masyarakat' }) => {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();

  const currentPeran = detectPeranFromPath(location.pathname, userRole);
  const navItems =
    bottomMenuItemsByRole[currentPeran] || bottomMenuItemsByRole['Masyarakat'];

  const bgColor = isDarkMode
    ? 'bg-slate-900/95 border-slate-700'
    : 'bg-white/95 border-slate-200';

  return (
    <nav
      className={`fixed bottom-0 z-50 w-full border-t backdrop-blur-lg ${bgColor} md:hidden`}
    >
      <div className='flex h-16 items-center px-2'>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.title === 'Dashboard'} // exact match untuk Dashboard
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-2 px-1 mx-1 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? isDarkMode
                      ? 'text-green-400'
                      : 'text-green-600'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <IconComponent
                    className={`w-5 h-5 mb-1 transition-transform ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={`text-xs ${
                      isActive ? 'font-semibold' : 'font-normal'
                    }`}
                  >
                    {item.title}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottombarDashboard;
