import { Route } from 'react-router-dom';

// Public Pages
import EdukasiPage from '../pages/EdukasiPage';
import FaqPage from '../pages/FaqPage';
import HomePage from '../pages/HomePage';
import KategoriPage from '../pages/KategoriPage';
import ManfaatPage from '../pages/ManfaatPage';
import PanduanAplikasiPage from '../pages/PanduanAplikasiPage';

/**
 * Public routes that are accessible to all users
 * These routes don't require authentication
 */
export const publicRoutes = [
  <Route key='home' path='/' element={<HomePage />} />,
  <Route key='kategori' path='/kategori' element={<KategoriPage />} />,
  <Route key='manfaat' path='/manfaat' element={<ManfaatPage />} />,
  <Route key='edukasi' path='/edukasi' element={<EdukasiPage />} />,
  <Route key='faq' path='/faq' element={<FaqPage />} />,
  <Route
    key='panduan'
    path='/panduan-aplikasi'
    element={<PanduanAplikasiPage />}
  />,
];

export default publicRoutes;
