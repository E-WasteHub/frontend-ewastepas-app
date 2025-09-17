import EdukasiSection from '../components/fragments/sections/EdukasiSection';
import HeroSection from '../components/fragments/sections/HeroSection';
import InformasiSection from '../components/fragments/sections/InformasiSection';
import KategoriSection from '../components/fragments/sections/KategoriSection';
import MainLayout from '../components/layouts/MainLayout';
import useDocumentTitle from '../hooks/useDocumentTitle';

const HomeView = () => {
  useDocumentTitle('Ewastepas App');

  return (
    <MainLayout>
      <HeroSection />
      <KategoriSection />
      <EdukasiSection />
      <InformasiSection />
    </MainLayout>
  );
};

export default HomeView;
