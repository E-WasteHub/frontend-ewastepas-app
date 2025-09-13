import { useEffect, useState } from 'react';

const usePengguna = () => {
  const [pengguna, setPenggunaState] = useState(null);
  const [peran, setPeranState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function untuk load data dari localStorage
  const loadFromStorage = () => {
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
    }
  };

  useEffect(() => {
    // Load initial data
    loadFromStorage();
    setIsLoading(false);

    // Listen untuk custom profile update events
    const handleProfileUpdate = (event) => {
      console.log('🔄 Profile update event detected:', event.detail.type);
      // Debounce untuk prevent multiple calls
      setTimeout(() => {
        loadFromStorage();
      }, 100);
    };

    // Listen untuk storage changes dari tab/window lain
    const handleStorageChange = (event) => {
      if (event.key === 'pengguna' || event.key === 'peran') {
        console.log('🔄 Storage change detected:', event.key);
        loadFromStorage();
      }
    };

    // Add event listeners
    window.addEventListener('profileUpdated', handleProfileUpdate);
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
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

        // Dispatch custom event untuk notify komponen lain
        window.dispatchEvent(
          new CustomEvent('profileUpdated', {
            detail: { type: 'profileUpdate', data },
          })
        );
      } else {
        localStorage.removeItem('pengguna');
        localStorage.removeItem('peran');
        setPenggunaState(null);
        setPeranState(null);

        // Dispatch event untuk profile cleared
        window.dispatchEvent(
          new CustomEvent('profileUpdated', {
            detail: { type: 'profileCleared' },
          })
        );
      }
    } catch (err) {
      console.error('❌ Gagal update pengguna:', err);
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
