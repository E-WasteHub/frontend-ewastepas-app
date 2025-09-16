import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { OfflineIndicator, SplashScreen } from './components/elements';
import useDarkMode from './hooks/useDarkMode';
import AppRouter from './routes';

const App = () => {
  const { isDarkMode } = useDarkMode();
  const [tampilkanSplash, setTampilkanSplash] = useState(true);

  // tangani penyelesaian splash screen
  const handleSplashSelesai = () => {
    setTampilkanSplash(false);
  };

  // tampilkan splash screen saat pertama kali dimuat
  useEffect(() => {
    const sudahLihatSplash = sessionStorage.getItem('hasSeenSplash');

    if (sudahLihatSplash) {
      // sudah pernah lihat splash di sesi ini
      setTampilkanSplash(false);
    } else {
      // belum pernah melihat splash
      sessionStorage.setItem('hasSeenSplash', 'true');
      setTampilkanSplash(true);
    }
  }, []);

  const classNameUtama = `min-h-screen transition-colors duration-300 overflow-x-hidden ${
    isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
  }`;

  return (
    <div className={classNameUtama}>
      {/* splash screen */}
      {tampilkanSplash && <SplashScreen onComplete={handleSplashSelesai} />}

      {/* aplikasi utama */}
      {!tampilkanSplash && (
        <>
          <AppRouter />
          <OfflineIndicator />
        </>
      )}

      {/* kontainer notifikasi toast */}
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </div>
  );
};

export default App;
