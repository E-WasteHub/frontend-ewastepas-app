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

      // Gunakan endpoint lama saja dulu, nanti bisa ditambah filtering di backend
      const response = await verifikasiService.ambilSemuaDataBelumVerifikasi();
      console.log('Data akun verifikasi:', response);
      const rawData = ambilDataArrayAman(response);

      console.log('Raw data:', rawData);
      console.log(
        'Status yang ada:',
        rawData.map((item) => item.status_pengguna)
      );

      // Tampilkan semua data dulu untuk debug
      // Nanti bisa difilter sesuai kebutuhan
      setData(rawData);
    } catch (err) {
      console.error('  Gagal fetch akun verifikasi:', err);
      setError('Gagal memuat data akun verifikasi');
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
      console.log('📋 Detail akun response:', response);
      console.log('📋 Response data:', response?.data);
      console.log('📋 Response dokumen:', response?.dokumen);

      // Gabungkan data pengguna dengan data dokumen
      let result = null;
      if (response?.data) {
        result = {
          ...response.data,
          // Merge dokumen data into the main object
          url_dokumen_ktp: response?.dokumen?.url_dokumen_ktp || null,
          url_dokumen_sim: response?.dokumen?.url_dokumen_sim || null,
          nama_dokumen_ktp: response?.dokumen?.nama_dokumen_ktp || null,
          nama_dokumen_sim: response?.dokumen?.nama_dokumen_sim || null,
          id_dokumen: response?.dokumen?.id_dokumen || null,
        };
      }

      console.log('📋 Final result untuk detail:', result);
      console.log('📋 Final KTP URL:', result?.url_dokumen_ktp);
      console.log('📋 Final SIM URL:', result?.url_dokumen_sim);

      setDetail(result);
      return result;
    } catch (err) {
      console.error('  Gagal fetch detail akun:', err);
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

      console.log('Updating status akun:', id_pengguna, status_pengguna);

      const response = await verifikasiService.ubahStatusAkunPengguna(
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
      console.error('  Gagal update status akun:', err);
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
