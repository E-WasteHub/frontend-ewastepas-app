import { Link, useLocation } from 'react-router-dom';

// Ubah teks dari "user-profile" -> "User Profile"
const formatPathName = (nama) =>
  nama
    .replace(/-/g, ' ') // ubah "-" jadi spasi
    .replace(/\b\w/g, (char) => char.toUpperCase()); // kapital huruf pertama

const Breadcrumb = ({ customItems }) => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  // Buat breadcrumb otomatis kalau customItems nggak ada
  const generatedItems = pathParts.slice(1).map((part, index) => {
    const fullPath = '/' + pathParts.slice(0, index + 2).join('/');
    return {
      label: formatPathName(part),
      path: fullPath,
    };
  });

  const breadcrumbItems = customItems || generatedItems;

  return (
    <nav className='mb-4 px-8'>
      <ul className='flex items-center gap-2 text-sm'>
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className='flex items-center gap-2'>
            <Link
              to={item.path}
              className='text-green-600 hover:underline capitalize'
            >
              {item.label}
            </Link>
            {index < breadcrumbItems.length - 1 && <span>/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
