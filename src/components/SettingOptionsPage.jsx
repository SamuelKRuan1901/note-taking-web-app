import ChangePassword from '@/components/ChangePassword';
import ColorTheme from '@/components/ColorTheme';
import FontTheme from '@/components/FontTheme';
import React from 'react';

const SettingOptionsPage = ({ noteId }) => {
  const handleShowComponents = (noteId) => {
    console.log(noteId);
    switch (noteId) {
      case 'Color Theme':
        return <ColorTheme />;
      case 'Font Theme':
        return <FontTheme />;
      case 'Change Password':
        return <ChangePassword />;
      default:
        return <ColorTheme />;
    }
  };
  return <>{handleShowComponents(noteId)}</>;
};

export default SettingOptionsPage;
