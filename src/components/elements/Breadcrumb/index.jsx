import { Link, useLocation } from 'react-router-dom';
import usePengguna from '../../../hooks/usePengguna';
import { menuItemsByRole } from '../../../utils/menuUtils';

// rekursif cari path di menu
const findBreadcrumb = (items, pathname) => {
  for (const item of items) {
    if (item.path === pathname) return [item];
    if (item.children) {
      const child = findBreadcrumb(item.children, pathname);
      if (child.length) return [item, ...child];
    }
  }
  return [];
};

const Breadcrumb = () => {
  const location = useLocation();
  const { peran } = usePengguna();
  const role = peran || 'Masyarakat';

  const menuItems = menuItemsByRole[role] || [];

  const breadcrumbItems = findBreadcrumb(menuItems, location.pathname);

  // root dashboard sesuai role
  const rootDashboardPath =
    role === 'Admin'
      ? '/dashboard/admin'
      : role === 'Mitra Kurir'
      ? '/dashboard/mitra-kurir'
      : '/dashboard/masyarakat';

  const dashboardItem = { title: 'Dashboard', path: rootDashboardPath };

  // cegah double dashboard
  const finalItems =
    breadcrumbItems.length === 0 ||
    breadcrumbItems[0].path !== rootDashboardPath
      ? [dashboardItem, ...breadcrumbItems]
      : breadcrumbItems;

  return (
    <nav className='mb-4 px-8'>
      <ul className='flex items-center gap-2 text-sm'>
        {finalItems.map((item, index) => (
          <li key={item.path} className='flex items-center gap-2'>
            <Link
              to={item.path}
              className='text-green-600 hover:underline capitalize'
            >
              {item.title}
            </Link>
            {index < finalItems.length - 1 && <span>/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
