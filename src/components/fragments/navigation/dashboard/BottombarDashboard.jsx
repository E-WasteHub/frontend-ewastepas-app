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
      className={`fixed bottom-0 z-50 w-full border-t backdrop-blur-lg ${bgColor}`}
    >
      <div className='flex h-16 items-center px-2'>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isRootDashboard = item.path.split('/').length === 3;

          // cek apakah salah satu child aktif
          const isChildActive = item.children?.some((child) =>
            location.pathname.startsWith(child.path)
          );

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={isRootDashboard}
              className='flex flex-col items-center justify-center flex-1 py-2 px-1 mx-1 rounded-lg transition-all duration-200'
              aria-label={item.title}
            >
              {({ isActive }) => {
                // kalau child aktif, override isActive jadi true
                const active = isActive || isChildActive;

                const activeColor = isDarkMode
                  ? 'text-green-400'
                  : 'text-green-600';
                const inactiveColor = isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-800';

                return (
                  <>
                    <IconComponent
                      className={`w-5 h-5 mb-1 transition-transform ${
                        active ? 'scale-110' : 'scale-100'
                      } ${active ? activeColor : inactiveColor}`}
                      strokeWidth={active ? 2.5 : 2}
                    />
                    <span
                      className={`text-xs ${
                        active
                          ? `font-semibold ${activeColor}`
                          : `font-normal ${inactiveColor}`
                      }`}
                    >
                      {item.title}
                    </span>
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottombarDashboard;
