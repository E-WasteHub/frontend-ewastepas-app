import EdukasiSection from '../components/sections/EdukasiSection';
import HeroSection from '../components/sections/HeroSection';
import InformasiSection from '../components/sections/InformasiSection';
import KategoriSection from '../components/sections/KategoriSection';
import useDocumentTitle from '../hooks/useDocumentTitle';
import MainLayout from '../layouts/MainLayout';

const HomePage = () => {
  useDocumentTitle('EwasteHub App');

  return (
    <MainLayout>
      <HeroSection />
      <KategoriSection />
      <EdukasiSection />
      <InformasiSection />
    </MainLayout>
  );
};

export default HomePage;
