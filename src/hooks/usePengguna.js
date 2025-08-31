import { useEffect, useState } from 'react';

const storageKey = 'pengguna';

const usePengguna = () => {
  const [pengguna, setPenggunaState] = useState(null);

  // Ambil dari localStorage saat mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setPenggunaState(JSON.parse(stored));
      }
    } catch (err) {
      console.error('❌ Gagal parse localStorage pengguna:', err);
      setPenggunaState(null);
    }
  }, []);

  // Fungsi untuk update user
  const setPengguna = (data) => {
    try {
      if (data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
        setPenggunaState(data);
      } else {
        localStorage.removeItem(storageKey);
        setPenggunaState(null);
      }
    } catch (err) {
      console.error('❌ Gagal update pengguna:', err);
    }
  };

  // Fungsi untuk hapus user
  const hapusPengguna = () => {
    try {
      localStorage.removeItem(storageKey);
      setPenggunaState(null);
    } catch (err) {
      console.error('❌ Gagal hapus pengguna:', err);
    }
  };

  return { pengguna, setPengguna, hapusPengguna };
};

export default usePengguna;
