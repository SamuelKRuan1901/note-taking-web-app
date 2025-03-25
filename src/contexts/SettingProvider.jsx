'use client';
import { createContext, useState } from 'react';

export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
  const [font, setFont] = useState('sans');

  const values = {
    font,
    setFont
  };
  return (
    <SettingContext.Provider value={values}>{children}</SettingContext.Provider>
  );
};
