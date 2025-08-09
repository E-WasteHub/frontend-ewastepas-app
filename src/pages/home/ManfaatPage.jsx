import { Award } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import Badge from '../../components/common/Badge';
import { manfaatData } from '../../data/manfaatData';
import useDarkMode from '../../hooks/useDarkMode';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import MainLayout from '../../layouts/MainLayout';

const ManfaatPage = () => {
  useDocumentTitle('Manfaat | E-wasteHub');
  const { isDarkMode } = useDarkMode();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        className={`px-4 py-12 mt-12 sm:py-16 md:py-20 text-center ${
          isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
        }`}
      >
        <div className='max-w-4xl mx-auto'>
          <Badge
            variant='soft'
            color='green'
            size='md'
            className='mb-4 sm:mb-6'
          >
            <Award className='w-4 h-4 mr-2' />
            Dampak Positif E-wasteHub
          </Badge>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Manfaat Nyata untuk Masa Depan
          </h1>

          <p
            className={`max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Kontribusi Anda dalam pengelolaan e-waste menciptakan dampak positif
            yang berkelanjutan untuk lingkungan dan masyarakat.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section
        className={`px-4 py-8 sm:py-12 ${
          isDarkMode ? 'bg-slate-900/50' : 'bg-white'
        }`}
      >
        <div className='max-w-7xl mx-auto'>
          <Motion.div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {manfaatData.map((benefit, index) => {
              const { Icon } = benefit;

              return (
                <Motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className={`group p-6 rounded-2xl transition-all duration-300 h-full ${
                      isDarkMode
                        ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-green-500/50'
                        : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-green-500 hover:shadow-md'
                    }`}
                  >
                    {/* Icon & Title */}
                    <div className='text-center mb-4'>
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

                      <h3
                        className={`text-xl font-bold mb-3 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {benefit.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed text-center ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {benefit.description}
                    </p>

                    {/* Optional: Add metrics or additional info */}
                    {benefit.metric && (
                      <div className='mt-4 pt-4 border-t border-slate-200 dark:border-slate-700'>
                        <div
                          className={`text-center text-2xl font-bold ${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          }`}
                        >
                          {benefit.metric}
                        </div>
                        {benefit.metricLabel && (
                          <div
                            className={`text-xs text-center mt-1 ${
                              isDarkMode ? 'text-slate-500' : 'text-slate-500'
                            }`}
                          >
                            {benefit.metricLabel}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Motion.div>
              );
            })}
          </Motion.div>

          {/* Call to Action */}
          <div className='mt-12 sm:mt-16 text-center'>
            <Badge variant='soft' color='green' size='md'>
              <span>🌱</span>
              <span className='ml-2'>
                Bergabunglah dan rasakan manfaatnya langsung!
              </span>
            </Badge>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ManfaatPage;
