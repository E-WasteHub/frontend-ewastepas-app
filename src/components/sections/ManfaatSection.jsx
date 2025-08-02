import { Sparkles } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { manfaatData } from '../../data/manfaatData';
import useDarkMode from '../../hooks/useDarkMode';

const ManfaatSection = () => {
  const { isDarkMode } = useDarkMode();

  // Function to truncate text
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <section
      className={`px-4 py-12 sm:py-16 ${
        isDarkMode ? 'bg-slate-900' : 'bg-white'
      }`}
    >
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <Motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className={`inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full ${
              isDarkMode
                ? 'text-green-300 bg-green-900/30'
                : 'text-green-700 bg-green-100'
            }`}
          >
            <Sparkles className='w-4 h-4 mr-1.5' />
            Manfaat E-wasteHub
          </div>

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Mengapa Memilih E-wasteHub?
          </h2>

          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Bergabunglah dengan ribuan pengguna yang telah merasakan manfaat
            nyata dari pengelolaan e-waste yang bertanggung jawab.
          </p>
        </Motion.div>

        {/* Benefits Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12'>
          {manfaatData.slice(0, 4).map((benefit, index) => {
            const { Icon } = benefit;

            return (
              <Motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='group'
              >
                <div
                  className={`p-6 rounded-2xl h-full transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-green-500/50'
                      : 'bg-gray-50 hover:bg-white border border-gray-200 hover:border-green-500 hover:shadow-md'
                  }`}
                >
                  {/* Icon */}
                  {Icon && (
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors ${
                        isDarkMode
                          ? 'bg-green-500/10 group-hover:bg-green-500/20'
                          : 'bg-green-100 group-hover:bg-green-200'
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className='text-center'>
                    <h3
                      className={`text-lg font-semibold mb-3 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {benefit.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {truncateText(benefit.description, 80)}
                    </p>
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        {manfaatData.length > 4 && (
          <Motion.div
            className='text-end'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to='/manfaat'
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                isDarkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } hover:shadow-lg hover:scale-105`}
            >
              <span>Lihat Semua Manfaat</span>
            </Link>
          </Motion.div>
        )}
      </div>
    </section>
  );
};

export default ManfaatSection;
