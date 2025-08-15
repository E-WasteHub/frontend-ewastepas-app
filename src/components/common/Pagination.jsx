import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isDarkMode = false,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={`flex items-center justify-center gap-2 mt-12 ${className}`}
    >
      {/* Previous Button */}
      <button
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          !canPrev
            ? 'opacity-50 cursor-not-allowed'
            : isDarkMode
            ? 'text-slate-300 hover:text-green-400 hover:bg-slate-800'
            : 'text-slate-600 hover:text-green-600 hover:bg-gray-100'
        }`}
        aria-label='Halaman sebelumnya'
      >
        <ChevronLeft size={16} />
        Sebelumnya
      </button>

      {/* Page Numbers */}
      <div className='flex gap-1'>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-green-600 text-white'
                : isDarkMode
                ? 'text-slate-300 hover:text-green-400 hover:bg-slate-800'
                : 'text-slate-600 hover:text-green-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => canNext && onPageChange(currentPage + 1)}
        disabled={!canNext}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          !canNext
            ? 'opacity-50 cursor-not-allowed'
            : isDarkMode
            ? 'text-slate-300 hover:text-green-400 hover:bg-slate-800'
            : 'text-slate-600 hover:text-green-600 hover:bg-gray-100'
        }`}
        aria-label='Halaman selanjutnya'
      >
        Selanjutnya
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
