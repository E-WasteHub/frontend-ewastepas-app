import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className='flex items-center justify-center gap-2 mt-8'>
      {/* Sebelumnya Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPrev}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
          canPrev
            ? 'text-gray-700 hover:bg-gray-200'
            : 'opacity-50 cursor-not-allowed'
        }`}
      >
        <ChevronLeft size={16} /> Sebelumnya
      </button>

      {/* Current Page Info */}
      <span className='px-4 py-2 text-sm font-medium'>
        {currentPage} / {totalPages}
      </span>

      {/* Selanjutnya Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNext}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
          canNext
            ? 'text-gray-700 hover:bg-gray-200'
            : 'opacity-50 cursor-not-allowed'
        }`}
      >
        Selanjutnya <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
