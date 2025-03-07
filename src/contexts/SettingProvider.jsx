'use client';
import { createContext, useState } from 'react';

export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
  const [chosenOption, setChosenOption] = useState(0);

  const values = {
    chosenOption,
    setChosenOption
  };
  return (
    <SettingContext.Provider value={values}>{children}</SettingContext.Provider>
  );
};
