import {
  EdukasiSection,
  HeroSection,
  InformasiSection,
  KategoriSection,
} from '../components/fragments';
import MainLayout from '../components/layouts/MainLayout';
import useDocumentTitle from '../hooks/useDocumentTitle';

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
