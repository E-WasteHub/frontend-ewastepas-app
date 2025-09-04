import { useCallback, useEffect, useState } from 'react';
import * as verifikasiService from '../services/verifikasiService';

const useAdminVerifikasi = () => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===== FETCH SEMUA AKUN BELUM VERIFIKASI =====
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await verifikasiService.indexBelumVerifikasi();
      console.log('Data akun belum diverifikasi:', response);
      const rawData = Array.isArray(response) ? response : response?.data || [];
      setData(rawData);
    } catch (err) {
      console.error('❌ Gagal fetch akun belum verifikasi:', err);
      setError('Gagal memuat data akun belum diverifikasi');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ===== FETCH DETAIL AKUN =====
  const fetchDetail = async (id_pengguna) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await verifikasiService.selectAkunPengguna(id_pengguna);
      console.log('Detail akun:', response);
      const result = response?.data || null; // ✅ ambil data aja
      setDetail(result);
      return result;
    } catch (err) {
      console.error('❌ Gagal fetch detail akun:', err);
      setError('Gagal memuat detail akun');
      setDetail(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ===== UPDATE STATUS AKUN =====
  const updateStatus = async (id_pengguna, status_pengguna) => {
    try {
      setIsSubmitting(true);
      setError('');

      const response = await verifikasiService.updateStatusAkunPengguna(
        id_pengguna,
        status_pengguna
      );

      console.log('Response update status akun:', response);

      if (response?.data || response?.message) {
        await fetchData();
        return { success: true };
      } else {
        throw new Error(response?.message || 'Update gagal');
      }
    } catch (err) {
      console.error('❌ Gagal update status akun:', err);
      setError('Gagal memperbarui status akun');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    detail,
    isLoading,
    error,
    isSubmitting,
    fetchData,
    fetchDetail,
    updateStatus,
  };
};

export default useAdminVerifikasi;
