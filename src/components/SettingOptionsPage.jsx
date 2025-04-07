import ChangePassword from '@/components/ChangePassword';
import ColorTheme from '@/components/ColorTheme';
import FontTheme from '@/components/FontTheme';
import React from 'react';

const SettingOptionsPage = ({ noteId }) => {
  const handleShowComponents = (noteId) => {
    switch (noteId) {
      case 1:
        return <ColorTheme />;
      case 2:
        return <FontTheme />;
      case 3:
        return <ChangePassword />;
      default:
        return <ColorTheme />;
    }
  };
  return <>{handleShowComponents(noteId)}</>;
};

export default SettingOptionsPage;
