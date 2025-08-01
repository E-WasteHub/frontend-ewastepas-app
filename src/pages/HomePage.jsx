import {
  FAQSection,
  HeroSection,
  KategoriSection,
  ManfaatSection,
} from '../components';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { MainLayout } from '../layouts';

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
