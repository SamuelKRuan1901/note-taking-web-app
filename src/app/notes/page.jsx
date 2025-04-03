'use client';
import DesktopNotesPage from '@/app/notes/components/DesktopNotesPage';
import MobileNotesPage from '@/app/notes/components/MobileNotesPage';
import { SettingContext } from '@/contexts/SettingProvider';
import { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const NotesPage = () => {
  const [screenSize, setScreenSize] = useState();
  const { font } = useContext(SettingContext);
  const session = useSession();

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
      px-4 rounded-md overflow-x-hidden 
      ${font === 'sans' && 'font-sans'} 
      ${font === 'serif' && 'font-serif'}
      ${font === 'mono' && 'font-mono'}`}
    >
      {session.status === 'loading' && (
        <div className='w-full h-full flex justify-center items-center'>
          <p className='text-lg font-bold'>Loading...</p>
        </div>
      )}
      {session.status === 'unauthenticated' && (
        <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
          <p className='text-lg font-bold'>Please login to continue</p>
          <Link
            href='/login'
            className='text-lg font-bold text-blue-500 p-2 border rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
          >
            Login
          </Link>
        </div>
      )}
      {session.status === 'authenticated' && (
        <>
          {screenSize <= 1024 && <MobileNotesPage />}
          {screenSize > 1024 && <DesktopNotesPage />}
        </>
      )}
    </section>
  );
};

export default NotesPage;
