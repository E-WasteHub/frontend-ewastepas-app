import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ customBreadcrumbs }) => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  // Kalau ada customBreadcrumbs, pakai itu. Kalau tidak, generate otomatis
  const breadcrumbs =
    customBreadcrumbs ||
    segments.slice(1).map((segment, index) => {
      const path = '/' + segments.slice(0, index + 2).join('/');

      // Format label -> capitalize + ganti dash dengan spasi
      const label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return { label, path };
    });

  return (
    <nav className='mb-4 px-8'>
      <ul className='flex items-center gap-2 text-sm'>
        {breadcrumbs.map((crumb, index) => (
          <li
            key={`${index}-${crumb.path}`}
            className='flex items-center gap-2'
          >
            <Link
              to={crumb.path}
              className='text-green-600 hover:underline capitalize'
            >
              {crumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
