import { useDarkMode } from '../../../hooks';

const SapaanDashboard = ({ pengguna, subtitle }) => {
  const { isDarkMode } = useDarkMode();

  const hour = new Date().getHours();

  let sapaan = 'Halo';
  if (hour < 12) {
    sapaan = 'Selamat Pagi';
  } else if (hour < 17) {
    sapaan = 'Selamat Siang';
  } else {
    sapaan = 'Selamat Malam';
  }

  const textColor = isDarkMode ? 'text-white' : 'text-slate-800';

  return (
    <div className={textColor}>
      <h1 className='text-2xl font-bold mb-1'>
        {sapaan}, {pengguna?.nama_lengkap || 'Pengguna'}!
      </h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default SapaanDashboard;
