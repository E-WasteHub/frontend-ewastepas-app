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
        <NavbarDashboard />

        <main className='flex-1 overflow-y-auto pt-16'>
          <div className='p-4 lg:p-6 pb-24 lg:pb-6'>
            {showBreadcrumb && (
              <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
            )}
            {/* Content */}
            <div className='max-w-7xl w-full mx-auto'>{children}</div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation (mobile only) */}
      <div
        className={`${
          isTablet || isMobile ? 'fixed' : 'hidden'
        } bottom-0 left-0 right-0 z-40`}
      >
        <BottombarDashboard />
      </div>
    </div>
  );
};

export default DashboardLayout;
