'use client';
import { createContext, useState, useEffect } from 'react';

export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
  const [font, setFont] = useState('sans');
  const [color, setColor] = useState('light');

  const handleChangeFont = async (newFont) => {
    setFont(newFont);
    console.log(newFont);
    await fetch('api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newFont })
    });
  };

  const getUserInfo = async () => {
    await fetch('api/user')
      .then((res) => {
        if (res.status === 401) {
          return;
        }
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 500) {
          console.log('Internal server error');
        }
      })
      .then((data) => {
        if (data) {
          console.log(data.user);
          setFont(data.user.fontTheme);
          setColor(data.user.colorTheme);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getUserInfo();
  });

  const values = {
    font,
    setFont,
    color,
    setColor,
    handleChangeFont
  };
  return (
    <SettingContext.Provider value={values}>{children}</SettingContext.Provider>
  );
};
