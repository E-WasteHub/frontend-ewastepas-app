import BottomNavbar from '../components/navigation/BottomNavbar';
import Footer from '../components/navigation/Footer';
import Header from '../components/navigation/Navbar';
import ScrollToTop from '../components/navigation/ScrollToTop';

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
