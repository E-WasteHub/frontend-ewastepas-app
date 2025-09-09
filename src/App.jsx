import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OfflineIndicator, SplashScreen } from './components/elements';
import useDarkMode from './hooks/useDarkMode';
import AppRouter from './routes';

const App = () => {
  const { isDarkMode } = useDarkMode();
  const [showSplash, setShowSplash] = useState(true);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Show splash screen on first load
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}
    >
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main App */}
      {!showSplash && (
        <>
          <AppRouter />

          {/* PWA Components */}
          <OfflineIndicator />
        </>
      )}

      {/* React-Toastify Container */}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
        className='mt-16'
      />
    </div>
  );
};

export default App;
