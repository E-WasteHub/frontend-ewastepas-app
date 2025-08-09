import { createContext, useEffect, useState } from 'react';

const DarkModeConText = createContext();

const DarkModeConTextProvider = ({ children }) => {
  // Function to detect system preference
  const getSystemPreference = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  // Function to get initial theme
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');

      if (savedTheme) {
        return savedTheme === 'dark';
      }

      // If no saved preference, use system preference
      return getSystemPreference();
    }
    return false;
  };

  const [isDarkMode, setIsDarkModeState] = useState(getInitialTheme);

  // Custom setter that also updates localStorage
  const setIsDarkMode = (value) => {
    setIsDarkModeState(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', value ? 'dark' : 'light');
    }
  };

  // Apply theme to document
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
    <DarkModeConText.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeConText.Provider>
  );
};

export const DarkMode = DarkModeConText;
export default DarkModeConTextProvider;
