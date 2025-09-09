import ScrollToTop from '../elements/ScrollToTop';
import { BottomNavbar, Footer, Navbar } from '../fragments/';

const MainLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>{children}</main>
      <Footer />
      <BottomNavbar />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
