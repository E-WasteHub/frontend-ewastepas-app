import FAQSection from '../components/sections/FAQSection';
import HeroSection from '../components/sections/HeroSection';
import KategoriSection from '../components/sections/KategoriSection';
import ManfaatSection from '../components/sections/ManfaatSection';
import useDocumentTitle from '../hooks/useDocumentTitle';
import MainLayout from '../layouts/MainLayout';

const HomePage = () => {
  useDocumentTitle('EwasteHub App');

  return (
    <MainLayout>
      <HeroSection />
      <KategoriSection />
      <ManfaatSection />
      <FAQSection id='faq' />
    </MainLayout>
  );
};

export default HomePage;
