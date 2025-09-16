import { createContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  // deteksi preferensi sistem
  const dapatkanPreferensiSistem = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  // dapatkan tema awal
  const dapatkanTemaAwal = () => {
    if (typeof window !== 'undefined') {
      const temaTersimpan = localStorage.getItem('theme');

      if (temaTersimpan) {
        return temaTersimpan === 'dark';
      }

      // jika tidak ada preferensi tersimpan, gunakan preferensi sistem
      return dapatkanPreferensiSistem();
    }
    return false;
  };

  const [isDarkMode, setIsDarkModeState] = useState(dapatkanTemaAwal);

  // setter kustom yang juga memperbarui localstorage
  const setIsDarkMode = (value) => {
    setIsDarkModeState(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', value ? 'dark' : 'light');
    }
  };

  // terapkan tema ke dokumen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const DarkMode = DarkModeContext;
export default DarkModeProvider;
