import { Route } from 'react-router-dom';

// Public Pages
import EdukasiDetailPage from '../pages/home/EdukasiDetailPage';
import EdukasiPage from '../pages/home/EdukasiPage';
import HomePage from '../pages/home/HomePage';
import KategoriPage from '../pages/home/KategoriPage';
import ManfaatPage from '../pages/home/ManfaatPage';
import PanduanAplikasiPage from '../pages/home/PanduanAplikasiPage';

/**
 * Public routes that are accessible to all users
 * These routes don't require authentication
 */
export const publicRoutes = [
  <Route key='home' path='/' element={<HomePage />} />,
  <Route key='kategori' path='/kategori' element={<KategoriPage />} />,
  <Route key='manfaat' path='/manfaat' element={<ManfaatPage />} />,
  <Route key='edukasi' path='/edukasi' element={<EdukasiPage />} />,
  <Route
    key='edukasi-detail'
    path='/edukasi/:id'
    element={<EdukasiDetailPage />}
  />,
  <Route
    key='panduan'
    path='/panduan-aplikasi'
    element={<PanduanAplikasiPage />}
  />,
];

export default publicRoutes;
