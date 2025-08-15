import { Route } from 'react-router-dom';

// Public View
import EdukasiDetailView from '../pages/EdukasiDetailView';
import EdukasiView from '../pages/EdukasiView';
import HomeView from '../pages/HomeView';
import PanduanAplikasiView from '../pages/PanduanAplikasiView';

/**
 * Public routes that are accessible to all users
 * These routes don't require authentication
 */
export const publicRoutes = [
  <Route key='home' path='/' element={<HomeView />} />,
  <Route key='edukasi' path='/edukasi' element={<EdukasiView />} />,
  <Route
    key='edukasi-detail'
    path='/edukasi/:id'
    element={<EdukasiDetailView />}
  />,
  <Route
    key='panduan'
    path='/panduan-aplikasi'
    element={<PanduanAplikasiView />}
  />,
];

export default publicRoutes;
