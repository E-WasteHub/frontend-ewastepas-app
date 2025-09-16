import { Users, UsersRound, Zap } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import { useResponsive } from '../../../hooks/useResponsive';
import { Badge } from '../../elements';

const InformasiSection = () => {
  const { isDarkMode } = useDarkMode();
  const { isMobile } = useResponsive();

  return (
    <section
      className={`px-4 py-16 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}
    >
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          {/* Badge */}
          <Badge variant='solid' status='success' size='md' className='mb-4'>
            <Zap className='w-4 h-4 mr-1.5' />
            Bergabung Sekarang
          </Badge>

          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Mulai Berkontribusi untuk Lingkungan
          </h2>

          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg mb-8 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Bergabunglah dengan ribuan pengguna lainnya dalam menciptakan masa
            depan yang lebih berkelanjutan melalui pengelolaan sampah elektronik
            yang bertanggung jawab.
          </p>
        </Motion.div>

        {/* CTA Cards */}
        <div
          className={`grid gap-6 sm:gap-8 mb-12 place-items-center max-w-3xl mx-auto ${
            isMobile ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {/* Masyarakat CTA */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className='group w-full'
          >
            <Link to='/register?peran=Masyarakat' className='block h-full'>
              <div
                className={`border rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 h-full text-center ${
                  isMobile ? 'p-4' : 'p-6'
                } ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div
                  className={`flex items-center justify-center mx-auto mb-4 rounded-full ${
                    isMobile ? 'w-10 h-10 mb-3' : 'w-12 h-12 mb-4'
                  } ${isDarkMode ? 'bg-green-900/50' : 'bg-green-100'}`}
                >
                  <Users
                    className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  />
                </div>

                <h3
                  className={`font-semibold ${
                    isMobile ? 'text-sm' : 'text-lg'
                  } ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                >
                  Daftar sebagai Masyarakat
                </h3>
              </div>
            </Link>
          </Motion.div>

          {/* Mitra Kurir CTA */}
          <Motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='group w-full'
          >
            <Link to='/register?peran=Mitra Kurir' className='block h-full'>
              <div
                className={`border rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 h-full text-center ${
                  isMobile ? 'p-4' : 'p-6'
                } ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div
                  className={`flex items-center justify-center mx-auto mb-4 rounded-full ${
                    isMobile ? 'w-10 h-10 mb-3' : 'w-12 h-12 mb-4'
                  } ${isDarkMode ? 'bg-green-900/50' : 'bg-green-100'}`}
                >
                  <UsersRound
                    className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  />
                </div>

                <h3
                  className={`font-semibold ${
                    isMobile ? 'text-sm' : 'text-lg'
                  } ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                >
                  Bergabung sebagai Mitra Kurir
                </h3>
              </div>
            </Link>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default InformasiSection;
