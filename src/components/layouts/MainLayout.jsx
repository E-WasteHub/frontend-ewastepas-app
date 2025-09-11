import useResponsive from '../../hooks/useResponsive';
import ScrollToTop from '../elements/ScrollToTop';
import { BottomNavbar, Footer, Navbar } from '../fragments/';

const MainLayout = ({ children }) => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>{children}</main>
      <Footer />
      <BottomNavbar />
      {/* Mencegah overlap dengan BottomNavbar di mobile/tablet */}
      {(isMobile || isTablet) && <div className='h-16' />}
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
