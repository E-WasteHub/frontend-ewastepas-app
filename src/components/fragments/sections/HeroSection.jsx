import { Leaf } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ewasteDark from '../../../assets/img/ewasteDark.png';
import ewasteLight from '../../../assets/img/ewasteLight.png';
import useDarkMode from '../../../hooks/useDarkMode';
import useResponsive from '../../../hooks/useResponsive';
import { Badge, Button } from '../../elements';

const HeroSection = () => {
  const { isDarkMode } = useDarkMode();
  const { isMobile, isDesktop } = useResponsive(); // ✅ pakai hooks

  return (
    <>
      {isMobile && (
        <section
          className={`relative flex items-center min-h-screen px-4 ${
            isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
          }`}
        >
          {/* Dekorasi background */}
          <div
            className={`absolute top-0 right-0 w-72 h-72 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl ${
              isDarkMode ? 'bg-green-500/10' : 'bg-green-400/20'
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 w-96 h-96 translate-y-1/2 -translate-x-1/2 rounded-full blur-2xl ${
              isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'
            }`}
          />

          <div className='relative z-10 flex flex-col-reverse items-center w-full max-w-7xl gap-8 py-16 mx-auto'>
            {/* Left Content */}
            <Motion.div
              className='flex-1 text-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Badge variant='solid' intent='success' size='md'>
                <Leaf className='mr-1.5 h-4 w-4' />
                Solusi Ramah Lingkungan
              </Badge>

              <h1
                className={`mt-4 text-4xl font-bold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Yuk Antar Jemput
                <span
                  className={`block mt-2 bg-gradient-to-r bg-clip-text text-transparent ${
                    isDarkMode
                      ? 'from-green-400 to-green-500'
                      : 'from-green-500 to-green-700'
                  }`}
                >
                  Sampah Elektronik
                </span>
              </h1>

              <p
                className={`max-w-xl mx-auto mt-4 text-lg leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Ubah sampah elektronik Anda menjadi nilai tambah. Lindungi
                lingkungan dan dapatkan insentif dari setiap kontribusi Anda.
              </p>

              <div className='flex flex-col justify-center gap-4 mt-8'>
                <Link to='/register'>
                  <Button className='w-full !px-12 py-3 !text-base font-semibold'>
                    Mulai Sekarang
                  </Button>
                </Link>
                <Link to='/panduan-aplikasi'>
                  <Button
                    variant='secondary'
                    className={`w-full !px-10 py-3 !text-base font-semibold ${
                      isDarkMode
                        ? 'text-white hover:bg-gray-600'
                        : 'text-slate-900 hover:bg-gray-200'
                    }`}
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </Motion.div>

            {/* Right Visual */}
            <Motion.div className='flex items-center justify-center flex-1 w-full'>
              <div className='w-full mt-12 max-w-sm'>
                <Motion.img
                  src={isDarkMode ? ewasteDark : ewasteLight}
                  alt='Ewastepas Illustration'
                  className='object-contain w-full h-full filter drop-shadow-2xl'
                  animate={{ y: [0, -30, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </Motion.div>
          </div>
        </section>
      )}

      {isDesktop && (
        <section
          className={`relative flex items-center min-h-screen px-8 ${
            isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
          }`}
        >
          {/* Dekorasi background */}
          <div
            className={`absolute top-0 right-0 w-72 h-72 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl ${
              isDarkMode ? 'bg-green-500/10' : 'bg-green-400/20'
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 w-96 h-96 translate-y-1/2 -translate-x-1/2 rounded-full blur-2xl ${
              isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'
            }`}
          />

          <div className='relative z-10 flex flex-row items-center w-full max-w-7xl gap-16 py-16 mx-auto'>
            {/* Left Content */}
            <Motion.div className='flex-1 text-left'>
              <Badge variant='solid' intent='success' size='md'>
                <Leaf className='mr-1.5 h-4 w-4' />
                Solusi Ramah Lingkungan
              </Badge>

              <h1
                className={`mt-4 text-6xl font-bold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Yuk Antar Jemput
                <span
                  className={`block mt-2 bg-gradient-to-r bg-clip-text text-transparent ${
                    isDarkMode
                      ? 'from-green-400 to-green-500'
                      : 'from-green-500 to-green-700'
                  }`}
                >
                  Sampah Elektronik
                </span>
              </h1>

              <p
                className={`max-w-xl mt-4 text-lg leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Ubah sampah elektronik Anda menjadi nilai tambah. Lindungi
                lingkungan dan dapatkan insentif dari setiap kontribusi Anda.
              </p>

              <div className='flex flex-row justify-start gap-4 mt-8'>
                <Link to='/register'>
                  <Button className='w-auto !px-12 py-3 !text-base font-semibold'>
                    Mulai Sekarang
                  </Button>
                </Link>
                <Link to='/panduan-aplikasi'>
                  <Button
                    variant='secondary'
                    className={`w-auto !px-10 py-3 !text-base font-semibold ${
                      isDarkMode
                        ? 'text-white hover:bg-gray-600'
                        : 'text-slate-900 hover:bg-gray-200'
                    }`}
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </Motion.div>

            {/* Right Visual */}
            <Motion.div className='flex items-center justify-center flex-1 w-full'>
              <div className='w-full mt-12 max-w-md'>
                <Motion.img
                  src={isDarkMode ? ewasteDark : ewasteLight}
                  alt='Ewastepas Illustration'
                  className='object-contain w-full h-full filter drop-shadow-2xl'
                  animate={{ y: [0, -30, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </Motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;
