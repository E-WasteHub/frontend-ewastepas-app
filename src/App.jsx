import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

      {/* ✅ React-Toastify Container */}
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
        className='mt-16' // Offset untuk navbar
      />
    </div>
  );
};

export default App;
