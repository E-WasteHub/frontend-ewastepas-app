import { Link, useLocation } from 'react-router-dom';
import { usePengguna } from '../../../hooks';
import { itemMenuBerdasarkanPeran } from '../../../utils/menuUtils';
import { dapatkanPathDashboardBerdasarkanPeran } from '../../../utils/peranUtils';

// cari breadcrumb berdasarkan path aktif
const cariBreadcrumb = (menu, pathname) => {
  for (const item of menu) {
    if (item.jalur === pathname) return [item];
    if (item.anak) {
      const childBreadcrumb = cariBreadcrumb(item.anak, pathname);
      if (childBreadcrumb.length) return [item, ...childBreadcrumb];
    }
  }
  return [];
};

const Breadcrumb = () => {
  const location = useLocation();
  const { peran } = usePengguna();
  const role = peran || 'Masyarakat';

  // ambil menu sesuai role
  const menu = itemMenuBerdasarkanPeran[role] || [];

  // cari breadcrumb aktif
  const breadcrumb = cariBreadcrumb(menu, location.pathname);

  // root dashboard sesuai peran
  const rootDashboardPath = dapatkanPathDashboardBerdasarkanPeran(role);
  const dashboardItem = { judul: 'Dashboard', jalur: rootDashboardPath };

  // pastikan Dashboard selalu ada di paling depan, tapi tidak double kalau sudah ada
  const breadcrumbFinal =
    breadcrumb.length === 0 || breadcrumb[0].jalur !== rootDashboardPath
      ? [dashboardItem, ...breadcrumb]
      : breadcrumb;

  return (
    <nav className='mb-2 px-8'>
      <ul className='flex items-center gap-2 text-sm'>
        {breadcrumbFinal.map((item, index) => (
          <li key={item.jalur} className='flex items-center gap-2'>
            <Link
              to={item.jalur}
              className='text-green-600 hover:underline capitalize'
            >
              {item.judul}
            </Link>
            {index < breadcrumbFinal.length - 1 && <span>/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
