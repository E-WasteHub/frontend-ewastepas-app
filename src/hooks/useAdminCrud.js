// src/hooks/useAdminCrud.js
import { useCallback, useEffect, useState } from 'react';
import { ambilDataArrayAman } from '../utils/penjemputanUtils';

const useAdminCrud = (service) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // ===== Fetch Data =====
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await service.ambilSemua();
      const rawData = ambilDataArrayAman(response);
      setData(rawData);
    } catch (err) {
      setError('Gagal memuat data', err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ===== Tambah Data =====
  const tambah = async (payload) => {
    try {
      setIsSubmitting(true);
      setError('');
      const res = await service.tambah(payload);
      await fetchData();
      setMessage('Data berhasil ditambahkan');
      return { success: true, data: res };
    } catch (err) {
      console.error('❌ Gagal tambah data:', err);
      setError('Gagal menambah data');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== Ubah Data =====
  const ubah = async (id, payload) => {
    try {
      setIsSubmitting(true);
      setError('');
      const res = await service.ubah(id, payload);
      await fetchData();
      setMessage('Data berhasil diubah');
      return { success: true, data: res };
    } catch (err) {
      console.error('❌ Gagal update data:', err);
      setError('Gagal mengubah data');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== Hapus Data =====
  const hapus = async (id) => {
    try {
      setIsSubmitting(true);
      setError('');
      const res = await service.hapus(id);
      await fetchData();
      setMessage('Data berhasil dihapus');
      return { success: true, data: res };
    } catch (err) {
      console.error('❌ Gagal hapus data:', err);
      setError('Gagal menghapus data');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    isLoading,
    isSubmitting,
    error,
    message,
    fetchData,
    tambah,
    ubah,
    hapus,
  };
};

export default useAdminCrud;
