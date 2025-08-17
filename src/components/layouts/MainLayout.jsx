import BottomNavbar from '../fragments/navigation/BottomNavbar';
import Footer from '../fragments/navigation/Footer';
import Header from '../fragments/navigation/Navbar';
import ScrollToTop from '../fragments/navigation/ScrollToTop';

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
