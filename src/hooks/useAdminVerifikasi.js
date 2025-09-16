import { useCallback, useEffect, useState } from 'react';
import * as verifikasiService from '../services/verifikasiService';
import { ambilDataArrayAman } from '../utils/penjemputanUtils';

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

      const response = await verifikasiService.ambilSemuaDataBelumVerifikasi();
      const rawData = ambilDataArrayAman(response);

      // tampilkan semua data untuk verifikasi admin
      setData(rawData || []);
    } catch {
      setError('gagal memuat data akun verifikasi');
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
      const response = await verifikasiService.ambilDetailAkunPengguna(
        id_pengguna
      );

      // gabungkan data pengguna dengan data dokumen
      let result = null;
      if (response?.data) {
        result = {
          ...response.data,
          // merge dokumen data ke dalam objek utama
          url_dokumen_ktp: response?.dokumen?.url_dokumen_ktp || null,
          url_dokumen_sim: response?.dokumen?.url_dokumen_sim || null,
          nama_dokumen_ktp: response?.dokumen?.nama_dokumen_ktp || null,
          nama_dokumen_sim: response?.dokumen?.nama_dokumen_sim || null,
          id_dokumen: response?.dokumen?.id_dokumen || null,
        };
      }

      setDetail(result);
      return result;
    } catch {
      setError('gagal memuat detail akun');
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

      const response = await verifikasiService.ubahStatusAkunPengguna(
        id_pengguna,
        status_pengguna
      );

      if (response?.data || response?.message) {
        await fetchData();
        return { success: true };
      } else {
        throw new Error(response?.message || 'update gagal');
      }
    } catch (err) {
      setError('gagal memperbarui status akun');
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
