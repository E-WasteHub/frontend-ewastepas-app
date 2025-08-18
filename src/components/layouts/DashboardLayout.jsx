import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // Untuk validasi role nanti
import useDarkMode from '../../hooks/useDarkMode';
import { Breadcrumb } from '../elements';
import BottombarDashboard from '../fragments/navigation/dashboard/BottombarDashboard';
import NavbarDashboard from '../fragments/navigation/dashboard/NavbarDashboard';
import SidebarDashboard from '../fragments/navigation/dashboard/SidebarDashboard';
// import useAuthStore from '../store/authStore'; // Untuk validasi role nanti

const DashboardLayout = ({
  children,
  customBreadcrumbs = null,
  showBreadcrumb = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode } = useDarkMode();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Sidebar - Fixed position */}
      <SidebarDashboard isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col lg:ml-64'>
        {/* Navbar - Fixed at top */}
        <NavbarDashboard onToggleSidebar={toggleSidebar} />

        {/* Content Container with proper scrolling */}
        <main className='flex-1 overflow-y-auto pt-16'>
          <div className='p-4 lg:p-6 pb-24 lg:pb-6'>
            {/* Breadcrumb */}
            {showBreadcrumb && (
              <Breadcrumb
                customBreadcrumbs={customBreadcrumbs}
                homeLabel='Dashboard'
                homePath='/dashboard'
              />
            )}
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottombarDashboard />
    </div>
  );
};

export default DashboardLayout;
