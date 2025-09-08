import useDarkMode from '../../hooks/useDarkMode';
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
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation (mobile only) */}
      <div className='hidden fixed bottom-0 left-0 right-0 z-40'>
        <BottombarDashboard />
      </div>
    </div>
  );
};

export default DashboardLayout;
