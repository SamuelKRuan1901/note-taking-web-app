'use client';
import DesktopNotesPage from '@/app/notes/components/DesktopNotesPage';
import MobileNotesPage from '@/app/notes/components/MobileNotesPage';
import { useEffect, useState } from 'react';

const NotesPage = () => {
  const [screenSize, setScreenSize] = useState();

  useEffect(() => {
    setScreenSize(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenSize(window.innerWidth);
    });
  }, [screenSize]);

  return (
    <section
      className={`w-screen h-screen flex justify-center 
      items-center min-lg:my-0 min-lg:px-0 my-16 
      px-4 rounded-md overflow-x-hidden`}
    >
      {screenSize < 1024 && <MobileNotesPage />}
      {screenSize > 1024 && <DesktopNotesPage />}
    </section>
  );
};

export default NotesPage;
