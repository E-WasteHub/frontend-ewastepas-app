import { motion as Motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { faqData } from '../../data/faqData';
import useDarkMode from '../../hooks/useDarkMode';
import Accordion from '../common/Accordion';

const FAQSection = ({ id = '' }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <section
      id={id}
      className={`px-4 py-16 md:px-8 ${
        isDarkMode ? 'bg-slate-800' : 'bg-slate-50'
      }`}
    >
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <Motion.div
          className='mb-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`mb-4 text-3xl font-bold md:text-4xl ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Pertanyaan yang Sering Diajukan
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Temukan jawaban untuk pertanyaan umum seputar layanan E-wasteHub dan
            pengelolaan sampah elektronik.
          </p>
        </Motion.div>

        {/* FAQ List */}
        <div className='space-y-4'>
          {faqData && faqData.length > 0 ? (
            faqData.slice(0, 5).map((faq, index) => (
              <Motion.div
                key={faq.id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Accordion title={faq.question}>
                  <p>{faq.answer}</p>
                </Accordion>
              </Motion.div>
            ))
          ) : (
            <div className='py-8 text-center'>
              <p
                className={`text-lg ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Data FAQ sedang dimuat...
              </p>
            </div>
          )}
        </div>

        {/* View All Button */}
        {faqData.length > 5 && (
          <div className='mt-8 text-end'>
            <Link
              to='/faq'
              className='inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors'
            >
              Lihat Semua FAQ
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
