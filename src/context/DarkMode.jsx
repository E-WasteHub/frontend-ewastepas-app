import { createContext, useState } from 'react';

const DarkModeConText = createContext();

const DarkModeConTextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <DarkModeConText.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeConText.Provider>
  );
};

export const DarkMode = DarkModeConText;
export default DarkModeConTextProvider;
