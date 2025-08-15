import { ArrowRight, Users, Zap } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode';
import Badge from '../common/Badge';

const InformasiSection = () => {
  const { isDarkMode } = useDarkMode();

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
          <Badge variant='soft' color='green' size='md' className='mb-4'>
            <Zap className='w-4 h-4 mr-1.5' />
            Bergabung Sekarang
          </Badge>

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
          {/* Masyarakat CTA */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className='group'
          >
            <Link to='/register?role=masyarakat' className='block h-full'>
              <div
                className={`p-6 border rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 h-full ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full ${
                    isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                  }`}
                >
                  <Users
                    className={`w-6 h-6 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  />
                </div>

                <Badge color='gray' size='sm' className='mb-3'>
                  Untuk Masyarakat
                </Badge>

                <h3
                  className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Daftar sebagai Pengguna
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Mulai serahkan sampah elektronik Anda dan dapatkan poin reward
                  yang dapat ditukar dengan berbagai keuntungan menarik.
                </p>

                <div
                  className={`text-xs font-medium ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}
                >
                  <span className='flex items-center gap-1'>
                    Daftar Sekarang
                    <ArrowRight className='w-3 h-3' />
                  </span>
                </div>
              </div>
            </Link>
          </Motion.div>

          {/* Mitra Kurir CTA */}
          <Motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='group'
          >
            <Link to='/register?role=mitra-kurir' className='block h-full'>
              <div
                className={`p-6 border rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 h-full ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full ${
                    isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                  }`}
                >
                  <Zap
                    className={`w-6 h-6 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  />
                </div>

                <Badge color='gray' size='sm' className='mb-3'>
                  Untuk Mitra
                </Badge>

                <h3
                  className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Bergabung sebagai Mitra Kurir
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Jadilah bagian dari solusi dengan menjadi mitra kurir dan
                  dapatkan penghasilan tambahan sambil membantu lingkungan.
                </p>

                <div
                  className={`text-xs font-medium ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}
                >
                  <span className='flex items-center gap-1'>
                    Bergabung Sekarang
                    <ArrowRight className='w-3 h-3' />
                  </span>
                </div>
              </div>
            </Link>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default InformasiSection;
