import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';

const ROUTE_MAP = {
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

const Breadcrumb = ({
  customBreadcrumbs = null,
  homeLabel = 'Beranda',
  homePath = '/',
}) => {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: homeLabel, path: homePath, icon: Home }];

    let currentPath = '';
    pathnames.forEach((p, idx) => {
      currentPath += `/${p}`;
      breadcrumbs.push({
        name: ROUTE_MAP[p] || p.charAt(0).toUpperCase() + p.slice(1),
        path: currentPath,
        isLast: idx === pathnames.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = customBreadcrumbs || generateBreadcrumbs();

  return (
    <nav className='mb-4' aria-label='Breadcrumb'>
      <ol className='flex items-center space-x-1 text-sm'>
        {breadcrumbs.map((b, i) => (
          <li key={b.path} className='flex items-center'>
            {i > 0 && (
              <ChevronRight
                className={`w-3 h-3 mx-1 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              />
            )}
            {b.isLast ? (
              <span
                className={`font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {b.name}
              </span>
            ) : (
              <Link
                to={b.path}
                className={`transition-colors ${
                  isDarkMode
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {b.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
