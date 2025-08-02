import PWAInstallPrompt from './components/modals/PWAInstallPrompt';
import PWAOfflineReady from './components/modals/PWAOfflineReady';
import PWAUpdatePrompt from './components/modals/PWAUpdatePrompt';
import useDarkMode from './hooks/useDarkMode';
import AppRouter from './routes';

const App = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}
    >
      <AppRouter />
      <PWAUpdatePrompt />
      <PWAInstallPrompt />
      <PWAOfflineReady />
    </div>
  );
};

export default App;
