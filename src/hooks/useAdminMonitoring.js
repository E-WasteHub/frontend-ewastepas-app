import { useCallback, useEffect, useState } from 'react';

const useAdminMonitoring = (service) => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState('');

  // ambil semua transaksi
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await service.ambilSemuaTransaksi();

      // gunakan pola yang sama seperti useAdminCrud
      const rawData = Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data)
        ? response.data
        : [];

      setData(rawData);
    } catch {
      setError('Gagal memuat transaksi');
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ambil detail transaksi
  const fetchDetail = useCallback(
    async (id) => {
      try {
        setIsDetailLoading(true);
        const response = await service.detailTransaksi(id);
        const rawData = response?.data?.data || null;
        setDetail(rawData);
        return rawData;
      } catch {
        setError('gagal memuat detail transaksi');
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
