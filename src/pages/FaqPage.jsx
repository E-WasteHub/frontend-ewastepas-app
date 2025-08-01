import { ChevronDown, HelpCircle, Mail, Phone } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useState } from 'react';
import { Badge, Button } from '../components';
import { faqData } from '../data/faqData';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { MainLayout } from '../layouts';

const FaqPage = () => {
  useDocumentTitle('FAQ | E-wasteHub');
  const { isDarkMode } = useDarkMode();
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, faqData.length));
  };

  const showLess = () => {
    setVisibleCount(5);
    setActiveIndex(null); // Close any open FAQ
  };

  const visibleFaqs = faqData.slice(0, visibleCount);
  const hasMore = visibleCount < faqData.length;

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
            <HelpCircle className='w-4 h-4 mr-2' />
            Pusat Bantuan
          </Badge>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Pertanyaan yang Sering Diajukan
          </h1>

          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Temukan jawaban untuk pertanyaan umum tentang layanan dan proses di
            E-wasteHub.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section
        className={`px-4 py-8 sm:py-12 ${
          isDarkMode ? 'bg-slate-900/50' : 'bg-white'
        }`}
      >
        <div className='max-w-4xl mx-auto'>
          {/* FAQ List */}
          <div className='space-y-4 mb-12 sm:mb-16'>
            {visibleFaqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className={`rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? isDarkMode
                          ? 'border-green-500/50 bg-slate-800'
                          : 'border-green-500 bg-white shadow-md'
                        : isDarkMode
                        ? 'border-slate-700/50 bg-slate-800/50 hover:bg-slate-800'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    {/* Question Header */}
                    <button
                      className='w-full flex items-center justify-between p-6 text-left'
                      onClick={() => toggleFaq(index)}
                    >
                      <h3
                        className={`text-lg font-semibold pr-4 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {faq.question}
                      </h3>

                      <ChevronDown
                        size={20}
                        className={`flex-shrink-0 transition-transform duration-300 ${
                          isActive ? 'rotate-180' : ''
                        } ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
                      />
                    </button>

                    {/* Answer Content */}
                    {isActive && (
                      <div
                        className={`px-6 pb-6 border-t ${
                          isDarkMode ? 'border-slate-700' : 'border-gray-200'
                        }`}
                      >
                        <div className='pt-4'>
                          <p
                            className={`text-sm leading-relaxed ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Motion.div>
              );
            })}
          </div>

          {/* Load More / Show Less Section */}
          {faqData.length > 5 && (
            <div className='text-center mb-12 sm:mb-16'>
              {hasMore ? (
                <div className='space-y-4'>
                  <Button
                    variant='secondary'
                    onClick={loadMore}
                    className='px-8 py-3'
                  >
                    Lihat {Math.min(5, faqData.length - visibleCount)} FAQ
                    Lainnya
                  </Button>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Menampilkan {visibleCount} dari {faqData.length} pertanyaan
                  </p>
                </div>
              ) : (
                <div className='space-y-4'>
                  <Button
                    variant='outline'
                    onClick={showLess}
                    className='px-8 py-3'
                  >
                    Tampilkan Lebih Sedikit
                  </Button>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Menampilkan semua {faqData.length} pertanyaan
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Contact Section */}
          <div
            className={`p-6 sm:p-8 text-center rounded-2xl border ${
              isDarkMode
                ? 'bg-slate-800/50 border-slate-700/50'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <h3
              className={`text-xl sm:text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Tidak Menemukan Jawaban?
            </h3>

            <p
              className={`mb-6 text-sm sm:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Tim kami siap membantu Anda 24/7.
            </p>

            <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4'>
              <Button
                variant='primary'
                className='flex items-center justify-center gap-2'
                onClick={() =>
                  (window.location.href = 'mailto:hubungi@ewastehub.com')
                }
              >
                <Mail size={16} />
                <span>Hubungi via Email</span>
              </Button>

              <Button
                variant='secondary'
                className='flex items-center justify-center gap-2'
                onClick={() =>
                  window.open('https://wa.me/6281234567890', '_blank')
                }
              >
                <Phone size={16} />
                <span>Hubungi via WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FaqPage;
