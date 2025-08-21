import useDarkMode from '../../../hooks/useDarkMode';

const SapaanDashboard = ({ userProfile, subtitle }) => {
  const { isDarkMode } = useDarkMode();

  const hour = new Date().getHours();
  const sapaan =
    hour < 12 ? 'Selamat Pagi' : hour < 17 ? 'Selamat Siang' : 'Selamat Malam';

  return (
    <div className={isDarkMode ? 'text-white' : 'text-slate-800'}>
      <h1 className='text-2xl font-bold mb-2'>
        {sapaan}, {userProfile?.nama_lengkap || 'Pengguna'}!
      </h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default SapaanDashboard;
