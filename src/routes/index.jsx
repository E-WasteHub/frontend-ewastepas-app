import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes } from './authRoutes.jsx';
import { dashboardRoutes } from './dashboardRoutes.jsx';
import { publicRoutes } from './publicRoutes.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* --- Rute Publik --- */}
      {publicRoutes}

      {/* --- Rute Autentikasi (Login & Register) --- */}
      {authRoutes}

      {/* --- Rute dashboard --- */}
      {dashboardRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <Suspense
              fallback={
                <div className='flex items-center justify-center min-h-screen'>
                  <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-500'></div>
                </div>
              }
            >
              <route.element />
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
