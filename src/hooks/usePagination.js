// src/hooks/common/usePagination.js
import { useMemo, useState } from 'react';

const usePagination = (data, pageSize = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  // total halaman
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / pageSize);
  }, [data, pageSize]);

  // potong data sesuai halaman
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  // fungsi untuk reset halaman ke awal kalau data berubah
  const resetPage = () => setCurrentPage(1);

  return {
    currentPage, // halaman saat ini
    setCurrentPage, // setter halaman
    totalPages, // jumlah total halaman
    paginatedData, // data hasil slice
    pageSize, // ukuran per halaman
    resetPage, // reset ke halaman awal
  };
};

export default usePagination;
