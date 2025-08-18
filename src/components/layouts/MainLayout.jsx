import ScrollToTop from '../elements/ScrollToTop';
import BottomNavbar from '../fragments/navigation/BottomNavbar';
import Footer from '../fragments/navigation/Footer';
import Header from '../fragments/navigation/Navbar';

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
