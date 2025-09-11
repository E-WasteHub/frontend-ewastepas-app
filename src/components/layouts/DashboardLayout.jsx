import useDarkMode from '../../hooks/useDarkMode';
import useResponsive from '../../hooks/useResponsive';
import Breadcrumb from '../elements/Breadcrumb';
import BottombarDashboard from '../fragments/navigation/dashboard/BottombarDashboard';
import NavbarDashboard from '../fragments/navigation/dashboard/NavbarDashboard';
import SidebarDashboard from '../fragments/navigation/dashboard/SidebarDashboard';

const DashboardLayout = ({
  children,
  customBreadcrumbs = null,
  showBreadcrumb = true,
}) => {
  const { isDarkMode } = useDarkMode();
  const { isTablet, isMobile } = useResponsive();

  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Sidebar (desktop only) */}
      <SidebarDashboard />

      {/* Main Content */}
      <div className='flex-1 flex flex-col lg:ml-64'>
        {/* Navbar offset di atas */}
        <NavbarDashboard />

        <main className='flex-1 overflow-y-auto pt-16'>
          <div className='px-4 mt-3 sm:px-6 lg:px-8 pb-24 lg:pb-8'>
            {showBreadcrumb && (
              <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
            )}

            {/* Content wrapper */}
            <div className='max-w-7xl mx-auto w-full'>{children}</div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation (mobile only) */}
      {(isTablet || isMobile) && (
        <div className='fixed bottom-0 left-0 right-0 z-40'>
          <BottombarDashboard />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
