import useDarkMode from '../../../hooks/useDarkMode';

const SapaanDashboard = ({ userProfile }) => {
  const { isDarkMode } = useDarkMode();

  const getSapaan = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 17) return 'Selamat Siang';
    return 'Selamat Malam';
  };

  return (
    <div className={`${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
      <h1 className='text-2xl font-bold mb-2'>
        {getSapaan()}, {userProfile?.nama_lengkap || 'Pengguna'}!
      </h1>
      <p className={`${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
        Selamat datang di dashboard EWasteHub. Mari kelola sampah elektronik
        Anda dengan baik.
      </p>
    </div>
  );
};

export default SapaanDashboard;
