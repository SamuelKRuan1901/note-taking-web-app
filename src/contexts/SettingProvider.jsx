'use client';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
  const [font, setFont] = useState('sans');
  const [color, setColor] = useState('light');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warn('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const res = await fetch('api/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    if (res.status === 401) {
      toast.error('Unauthorized');
      return;
    }
    if (res.status === 402) {
      toast.error('Incorrect password');
      return;
    }
    if (res.status === 500) {
      toast.error('Internal server error');
      return;
    }
    toast.success('Password changed successfully');
    window.location.reload();
  };

  const handleChangeFont = async (newFont) => {
    setIsLoading(true);
    setFont(newFont);
    console.log(newFont);
    await fetch('api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newFont })
    });
    await getUserInfo();
    setIsLoading(false);
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
    handleChangeFont,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
    isLoading
  };
  return (
    <SettingContext.Provider value={values}>{children}</SettingContext.Provider>
  );
};
