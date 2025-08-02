import BottomNavbar from '../components/layout/BottomNavbar';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Navbar';
import ScrollToTop from '../components/layout/ScrollToTop';

const MainLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow'>{children}</main>
      <Footer />
      <BottomNavbar />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
