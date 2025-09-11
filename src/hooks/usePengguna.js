import { useEffect, useState } from 'react';

const usePengguna = () => {
  const [pengguna, setPenggunaState] = useState(null);
  const [peran, setPeranState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedPengguna = localStorage.getItem('pengguna');
      const savedPeran = localStorage.getItem('peran');

      if (savedPengguna) {
        const penggunaData = JSON.parse(savedPengguna);
        setPenggunaState(penggunaData);

        // Gunakan peran asli dari backend tanpa normalisasi
        const role = penggunaData.peran || savedPeran;
        if (role) {
          localStorage.setItem('peran', role);
          setPeranState(role);
        }
      } else {
        // kalau nggak ada data di localStorage
        setPenggunaState(null);
        setPeranState(null);
      }
    } catch (error) {
      console.error('Error parsing pengguna data:', error);
      setPenggunaState(null);
      setPeranState(null);
    } finally {
      // apapun hasilnya, loading harus selesai
      setIsLoading(false);
    }
  }, []);

  const setPengguna = (data) => {
    try {
      if (data) {
        localStorage.setItem('pengguna', JSON.stringify(data));
        setPenggunaState(data);

        if (data.peran) {
          localStorage.setItem('peran', data.peran);
          setPeranState(data.peran);
        }
      } else {
        localStorage.removeItem('pengguna');
        localStorage.removeItem('peran');
        setPenggunaState(null);
        setPeranState(null);
      }
    } catch (err) {
      console.error('  Gagal update pengguna:', err);
    }
  };

  const setPeran = (role) => {
    try {
      if (role) {
        localStorage.setItem('peran', role);
        setPeranState(role);
      } else {
        localStorage.removeItem('peran');
        setPeranState(null);
      }
    } catch (err) {
      console.error('  Gagal update peran:', err);
    }
  };

  const hapusPengguna = () => {
    try {
      localStorage.removeItem('pengguna');
      localStorage.removeItem('peran');
      setPenggunaState(null);
      setPeranState(null);
    } catch (err) {
      console.error('  Gagal hapus pengguna:', err);
    }
  };

  return {
    pengguna,
    peran,
    isLoading,
    setPengguna,
    setPeran,
    hapusPengguna,
  };
};

export default usePengguna;
