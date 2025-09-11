import { ChevronLeft, ChevronRight } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const { isDarkMode } = useDarkMode();

  if (totalPages <= 1) return null;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const desainBtn =
    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors';
  const aktifBtn = isDarkMode
    ? 'text-gray-200 hover:bg-gray-700'
    : 'text-gray-700 hover:bg-gray-200';
  const matikanBtn = 'opacity-50 cursor-not-allowed';

  const warnaTeks = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className='flex items-center justify-center gap-2 mt-8'>
      {/* Tombol Sebelumnya */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPrev}
        className={`${desainBtn} ${canPrev ? aktifBtn : matikanBtn}`}
      >
        <ChevronLeft size={16} /> Sebelumnya
      </button>

      {/* Info Halaman */}
      <span className={`px-4 py-2 text-sm font-medium ${warnaTeks}`}>
        {currentPage} / {totalPages}
      </span>

      {/* Tombol Selanjutnya */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNext}
        className={`${desainBtn} ${canNext ? aktifBtn : matikanBtn}`}
      >
        Selanjutnya <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
