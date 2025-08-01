import { Routes } from 'react-router-dom';
import { authRoutes } from './authRoutes.jsx';
import { publicRoutes } from './publicRoutes.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* --- Rute Publik --- */}
      {publicRoutes}

      {/* --- Rute Autentikasi (Login & Register) --- */}
      {authRoutes}
    </Routes>
  );
};

export default AppRouter;
