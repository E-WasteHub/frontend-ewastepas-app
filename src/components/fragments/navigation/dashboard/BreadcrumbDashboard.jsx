import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';

const BreadcrumbDashboard = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();

  // Function to generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Define route mappings for better display names
    const routeMap = {
      dashboard: 'Dashboard',
      masyarakat: 'Masyarakat',
      admin: 'Admin',
      'mitra-kurir': 'Mitra Kurir',
      penjemputan: 'Buat Permintaan',
      lacak: 'Lacak Penjemputan',
      riwayat: 'Riwayat Transaksi',
      profil: 'Profil',
      'data-master': 'Data Master',
      'kelola-daerah': 'Kelola Daerah',
      'kelola-dropbox': 'Kelola Dropbox',
      'kelola-jenis': 'Kelola Jenis',
      'kelola-edukasi': 'Kelola Edukasi',
      verifikasi: 'Verifikasi Akun',
      transaksi: 'Transaksi',
      permintaan: 'Permintaan Tersedia',
      aktif: 'Penjemputan Aktif',
      dokumen: 'Unggah Dokumen',
      edukasi: 'Konten Edukasi',
      kategori: 'Kategori',
      pengaturan: 'Pengaturan',
    };

    const breadcrumbs = [
      {
        name: 'Beranda',
        path: '/',
        icon: Home,
      },
    ];

    let currentPath = '';

    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      const isLast = index === pathnames.length - 1;

      breadcrumbs.push({
        name:
          routeMap[pathname] ||
          pathname.charAt(0).toUpperCase() + pathname.slice(1),
        path: currentPath,
        isLast,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = customBreadcrumbs || generateBreadcrumbs();

  return (
    <nav className='mb-4' aria-label='Breadcrumb'>
      <ol className='flex items-center space-x-1 text-sm'>
        {breadcrumbs.map((breadcrumb, index) => {
          const IconComponent = breadcrumb.icon;

          return (
            <li key={breadcrumb.path} className='flex items-center'>
              {index > 0 && (
                <ChevronRight
                  className={`w-3 h-3 mx-1 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                />
              )}

              {breadcrumb.isLast ? (
                <span
                  className={`font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className={`transition-colors ${
                    isDarkMode
                      ? 'text-gray-500 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbDashboard;
