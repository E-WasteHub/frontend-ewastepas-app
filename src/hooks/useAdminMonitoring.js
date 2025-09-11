// src/hooks/useAdminMonitoring.js
import { useCallback, useEffect, useState } from 'react';

const useAdminMonitoring = (service) => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState('');

  // fetch semua transaksi
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await service.ambilSemua();

      // Menggunakan pola yang sama seperti useAdminCrud
      const rawData = Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data)
        ? response.data
        : [];

      setData(rawData);
    } catch (err) {
      console.error('  Gagal fetch transaksi:', err);
      setError('Gagal memuat transaksi');
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // fetch detail transaksi
  const fetchDetail = useCallback(
    async (id) => {
      try {
        setIsDetailLoading(true);
        const response = await service.detail(id);
        const rawData = response?.data?.data || null;
        console.log('Detail transaksi:', rawData);
        setDetail(rawData);
        return rawData;
      } catch (err) {
        console.error('  Gagal fetch detail transaksi:', err);
        setError('Gagal memuat detail transaksi');
        return null;
      } finally {
        setIsDetailLoading(false);
      }
    },
    [service]
  );

  return {
    data,
    detail,
    isLoading,
    isDetailLoading,
    error,
    fetchData,
    fetchDetail,
    setDetail,
  };
};

export default useAdminMonitoring;
