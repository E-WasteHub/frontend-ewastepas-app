import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // Untuk validasi role nanti
import useDarkMode from '../../hooks/useDarkMode';
import BottombarDashboard from '../fragments/navigation/dashboard/BottombarDashboard';
import BreadcrumbDashboard from '../fragments/navigation/dashboard/BreadcrumbDashboard';
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
  // const { user } = useAuthStore(); // Untuk validasi role nanti
  // const navigate = useNavigate(); // Untuk validasi role nanti
  // const location = useLocation(); // Untuk validasi role nanti

  // Mendapatkan role dari user yang login (untuk validasi nanti)
  /*
  const getUserRole = () => {
    if (!user || !user.role) return 'masyarakat';

    const role = user.role.toLowerCase();

    // Normalize role format
    if (role === 'mitra kurir' || role === 'mitrakurir') {
      return 'mitra-kurir';
    }

    return role;
  };

  const userRole = getUserRole(); // Untuk validasi role nanti
  */

  // Validasi akses berdasarkan role dan path (DISABLED untuk fokus tampilan)
  /*
  useEffect(() => {
    const currentPath = location.pathname;

    // Skip validasi jika tidak ada user (untuk development)
    if (!user) return;

    // Cek apakah user mengakses path yang sesuai dengan rolenya
    const isValidAccess = () => {
      if (currentPath.startsWith('/dashboard/masyarakat') && userRole === 'masyarakat') {
        return true;
      }
      if (currentPath.startsWith('/dashboard/admin') && userRole === 'admin') {
        return true;
      }
      if (currentPath.startsWith('/dashboard/mitra-kurir') && userRole === 'mitra-kurir') {
        return true;
      }
      return false;
    };

    // Redirect ke dashboard yang sesuai jika akses tidak valid
    if (!isValidAccess()) {
      const redirectPath = `/dashboard/${userRole}`;
      if (currentPath !== redirectPath) {
        navigate(redirectPath, { replace: true });
      }
    }
  }, [location.pathname, userRole, user, navigate]);
  */

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
              <BreadcrumbDashboard customBreadcrumbs={customBreadcrumbs} />
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
