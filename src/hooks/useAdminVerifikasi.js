import { useCallback, useEffect, useState } from 'react';
import * as verifikasiService from '../services/verifikasiService';
import { ambilDataArrayAman } from '../utils/penjemputanUtils';

const useAdminVerifikasi = () => {
  const [dataVerifikasiAdmin, setDataVerifikasiAdmin] = useState([]);
  const [detailVerifikasiAdmin, setDetailVerifikasiAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===== FETCH SEMUA AKUN BELUM VERIFIKASI =====
  const fetchDataVerifikasiAdmin = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await verifikasiService.ambilSemuaDataBelumVerifikasi();
      const rawData = ambilDataArrayAman(response);

      // tampilkan semua data untuk verifikasi admin
      setDataVerifikasiAdmin(rawData || []);
    } catch {
      setError('gagal memuat data akun verifikasi');
      setDataVerifikasiAdmin([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataVerifikasiAdmin();
  }, [fetchDataVerifikasiAdmin]);

  // ===== FETCH DETAIL AKUN =====
  const fetchDetailVerifikasiAdmin = async (id_pengguna) => {
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

      setDetailVerifikasiAdmin(result);
      return result;
    } catch {
      setError('gagal memuat detail akun');
      setDetailVerifikasiAdmin(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ===== UPDATE STATUS AKUN =====
  const updateStatusVerifikasiAdmin = async (id_pengguna, status_pengguna) => {
    try {
      setIsSubmitting(true);
      setError('');

      const response = await verifikasiService.ubahStatusAkunPengguna(
        id_pengguna,
        status_pengguna
      );

      if (response?.data || response?.message) {
        await fetchDataVerifikasiAdmin();
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
    dataVerifikasiAdmin,
    detailVerifikasiAdmin,
    isLoading,
    error,
    isSubmitting,
    fetchDataVerifikasiAdmin,
    fetchDetailVerifikasiAdmin,
    updateStatusVerifikasiAdmin,
  };
};

export default useAdminVerifikasi;
