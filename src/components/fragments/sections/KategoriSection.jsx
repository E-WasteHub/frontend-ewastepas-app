import { Layers } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { kategoriData } from '../../../data/kategoriData';
import useDarkMode from '../../../hooks/useDarkMode';
import Badge from '../../elements/Badge';

const KategoriSection = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <section
      className={`px-4 py-16 md:px-8 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'
      }`}
    >
      <div className='max-w-screen-xl mx-auto'>
        {/* Header */}
        <Motion.div
          className='mb-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge variant='soft' color='green' size='md' className='mb-4'>
            <Layers className='mr-1.5 h-4 w-4' />
            Kategori Sampah Elektronik
          </Badge>
          <h2
            className={`mb-4 text-3xl font-bold md:text-4xl ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Kategori yang Kami Terima
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Serahkan berbagai jenis sampah elektronik Anda untuk didaur ulang
            secara bertanggung jawab.
          </p>
        </Motion.div>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {kategoriData.slice(0, 6).map((category, index) => {
            const { Icon } = category;
            return (
              <Motion.div
                key={category.id || index}
                className={`p-6 text-center border rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {Icon && (
                  <div
                    className={`flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full ${
                      isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
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
                  className={`mb-2 text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {category.name}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {category.description}
                </p>
                <div
                  className={`pt-4 mt-4 border-t ${
                    isDarkMode ? 'border-slate-700' : 'border-slate-200'
                  }`}
                >
                  <p
                    className={`mb-2 text-xs ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Contoh Jenis Sampah Elektronik :
                  </p>
                  <div className='flex flex-wrap justify-center gap-1'>
                    {category.items?.slice(0, 2).map((item, itemIndex) => (
                      <Badge
                        key={itemIndex}
                        color='gray'
                        size='sm'
                        className='text-xs'
                      >
                        {item}
                      </Badge>
                    ))}
                    {category.items?.length > 2 && (
                      <Badge color='gray' size='sm' className='text-xs'>
                        +{category.items.length - 2} lainnya
                      </Badge>
                    )}
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KategoriSection;
