import { Layers } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { Badge } from '../components';
import { kategoriData } from '../data/kategoriData';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { MainLayout } from '../layouts';

const KategoriPage = () => {
  useDocumentTitle('Kategori | E-wasteHub');
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
            <Layers className='w-4 h-4 mr-2' />
            Kategori Sampah Elektronik
          </Badge>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Kenali Jenis Sampah Elektronik
          </h1>

          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Jelajahi berbagai kategori sampah elektronik yang dapat Anda kelola
            melalui platform kami. Berdasarkan klasifikasi International
            Telecommunication Union (ITU).
          </p>
        </div>
      </section>

      {/* Categories Grid */}
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
            {kategoriData.map((category, index) => {
              const { Icon } = category;

              return (
                <Motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='h-full'
                >
                  <div
                    className={`group p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-green-500/50'
                        : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-green-500 hover:shadow-md'
                    }`}
                  >
                    {/* Icon & Title Row */}
                    <div className='flex items-center gap-4 mb-4'>
                      {Icon && (
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                            isDarkMode
                              ? 'bg-green-500/10 group-hover:bg-green-500/20'
                              : 'bg-green-100 group-hover:bg-green-200'
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isDarkMode ? 'text-green-400' : 'text-green-600'
                            }`}
                          />
                        </div>
                      )}

                      <h3
                        className={`text-lg font-semibold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {category.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed mb-4 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {category.description}
                    </p>

                    {/* Items Tags */}
                    <div className='flex flex-wrap gap-2'>
                      {category.items?.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className={`px-2 py-1 text-xs rounded-md ${
                            isDarkMode
                              ? 'bg-slate-700 text-slate-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                      {category.items?.length > 4 && (
                        <span
                          className={`px-2 py-1 text-xs rounded-md ${
                            isDarkMode
                              ? 'bg-slate-700 text-slate-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          +{category.items.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </Motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default KategoriPage;
