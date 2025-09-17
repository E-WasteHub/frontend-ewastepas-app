import { useCallback, useEffect, useState } from 'react';

const useAdminMonitoring = (service) => {
  const [dataTransaksiAdmin, setDataTransaksiAdmin] = useState([]);
  const [detailTransaksiAdmin, setDetailTransaksiAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState('');

  // ambil semua transaksi
  const fetchDataTransaksiAdmin = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await service.ambilSemuaTransaksi();

      // gunakan pola yang sama seperti useAdminCrud
      const rawData = Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data)
        ? response.data
        : [];

      setDataTransaksiAdmin(rawData);
    } catch {
      setError('Gagal memuat transaksi');
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchDataTransaksiAdmin();
  }, [fetchDataTransaksiAdmin]);

  // ambil detail transaksi
  const fetchDetailTransaksiAdmin = useCallback(
    async (id) => {
      try {
        setIsDetailLoading(true);
        const response = await service.detailTransaksi(id);
        const rawData = response?.data?.data || null;
        setDetailTransaksiAdmin(rawData);
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
    dataTransaksiAdmin,
    detailTransaksiAdmin,
    isLoading,
    isDetailLoading,
    error,
    fetchDataTransaksiAdmin,
    fetchDetailTransaksiAdmin,
    setDetailTransaksiAdmin,
  };
};

export default useAdminMonitoring;
