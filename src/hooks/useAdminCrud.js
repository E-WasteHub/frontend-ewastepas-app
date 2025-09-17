import { useCallback, useEffect, useState } from 'react';

import { ambilDataArrayAman } from '../utils/penjemputanUtils';

const useAdminCrud = (service) => {
  const [dataCrud, setDataCrud] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // helper: sort by created_at kalau ada
  const sortByCreatedAt = (arr) => {
    if (!Array.isArray(arr)) return [];
    return [...arr].sort((a, b) => {
      if (a.created_at && b.created_at) {
        return new Date(b.created_at) - new Date(a.created_at); // terbaru di atas
      }
      return 0; // kalau ga ada created_at, biarkan urutan asli
    });
  };

  // ambil data
  const fetchDataCrud = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await service.ambilSemua();
      const rawData = ambilDataArrayAman(response.data, 'data');
      setDataCrud(sortByCreatedAt(rawData));
    } catch {
      setError('gagal memuat data');
      setDataCrud([]);
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchDataCrud();
  }, [fetchDataCrud]);

  // tambah data
  const tambah = async (payload) => {
    try {
      setIsSubmitting(true);
      setError('');
      const res = await service.tambah(payload);

      // jika backend mengembalikan data baru, unshift ke atas
      const newItem = res?.data?.data || res?.data;
      if (newItem) {
        setDataCrud((prev) => sortByCreatedAt([newItem, ...prev]));
      } else {
        // fallback → refetch
        await fetchDataCrud();
      }

      setMessage('data berhasil ditambahkan');
      return { success: true, data: res };
    } catch (err) {
      setError('gagal menambah data');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  // ubah data
  const ubah = async (id, payload) => {
    try {
      setIsSubmitting(true);
      setError('');
      const res = await service.ubah(id, payload);
      await fetchDataCrud();
      setMessage('data berhasil diubah');
      return { success: true, data: res };
    } catch (err) {
      setError('gagal mengubah data');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  // hapus data
  const hapus = async (id) => {
    try {
      setIsSubmitting(true);
      setError('');
      const res = await service.hapus(id);
      await fetchDataCrud();
      setMessage('data berhasil dihapus');
      return { success: true, data: res };
    } catch (err) {
      setError('gagal menghapus data');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    dataCrud,
    isLoading,
    isSubmitting,
    error,
    message,
    fetchDataCrud,
    tambah,
    ubah,
    hapus,
  };
};

export default useAdminCrud;
