import { NoteContext } from '@/contexts/NoteProvider';
import React, { useContext } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import NoteSinglePage from '@/components/NoteSinglePage';
import LogoutIcon from '@/assets/images/icon-logout.svg';
import NoteItem from '@/components/NoteItem';
import SunIcon from '@/assets/images/icon-sun.svg';
import FontIcon from '@/assets/images/icon-font.svg';
import LockIcon from '@/assets/images/icon-lock.svg';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import SettingOptionsPage from '@/components/SettingOptionsPage';
import CreateNote from '@/components/CreateNote';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
const DesktopContent = () => {
  const { chosen, noteId, data, setNoteId } = useContext(NoteContext);
  const filteredNotes = data.notes.filter((note) => note.tags.includes(chosen));
  const archivedNotes = data.notes.filter((note) => note.isArchived === true);
  const settingsItems = [
    {
      name: 'Color Theme',
      icon: SunIcon,
      alt: 'themeIcon'
    },
    {
      name: 'Font Theme',
      icon: FontIcon,
      alt: 'fontIcon'
    },
    {
      name: 'Change Password',
      icon: LockIcon,
      alt: 'lockIcon'
    }
  ];

  const handleLogout = () => {
    // logout logic and redirect to Login page
    signOut();
    toast.success('Logout success');
    redirect('/login');
  };

  const handleShowComponents = (chosen) => {
    if (chosen === 'Notes') {
      return data.notes.map((note) => (
        <div
          className={`${
            noteId === note.id ? 'bg-slate-300 dark:bg-slate-700' : ''
          }`}
          key={note.id}
          onClick={() => setNoteId(note.id)}
        >
          <NoteItem
            title={note.title}
            tags={note.tags}
            date={note.lastEdited}
          />
        </div>
      ));
    } else if (chosen === 'Archived') {
      return archivedNotes.map((note) => (
        <div
          className={`${
            noteId === note.id ? 'bg-slate-300 dark:bg-slate-700' : ''
          }`}
          key={note.id}
          onClick={() => setNoteId(note.id)}
        >
          <NoteItem
            title={note.title}
            tags={note.tags}
            date={note.lastEdited}
          />
        </div>
      ));
    } else if (chosen === 'Settings') {
      return (
        // setting menu
        <>
          {settingsItems?.map((item) => (
            <div
              className={`flex items-center gap-1 p-1 rounded-md 
                cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-all mb-2
                duration-300 ${
                  noteId === item.name ? 'bg-slate-300 dark:bg-slate-700' : ''
                }`}
              key={item.name}
              onClick={() => setNoteId(item.name)}
            >
              <Image
                className='dark:invert'
                src={item.icon}
                alt={item.alt}
                width={20}
                height={20}
              />
              {item.name}
            </div>
          ))}
          <div className='border-t border-slate-400 py-5 mt-5'>
            <div
              className={`flex items-center gap-2 p-2 rounded-md 
            cursor-pointer hover:bg-slate-200 transition-all 
            duration-300 dark:hover:bg-slate-700`}
              onClick={handleLogout}
            >
              <Image
                className='dark:invert'
                src={LogoutIcon}
                alt='logout'
                width={20}
                height={20}
              />
              Logout
            </div>
          </div>
        </>
      );
    } else {
      return filteredNotes.map((note) => (
        <div
          className={`${
            noteId === note.id ? 'bg-slate-300 dark:bg-slate-700' : ''
          }`}
          key={note.id}
          onClick={() => setNoteId(note.id)}
        >
          <NoteItem
            key={note.id}
            title={note.title}
            tags={note.tags}
            date={note.lastEdited}
          />
        </div>
      ));
    }
  };
  return (
    <div className='w-full h-full flex justify-start items-start'>
      <div className='w-56 h-full flex flex-col gap-1 pt-4 px-2 border-r border-l border-slate-400'>
        <PrimaryButton
          content={'Create New Note'}
          onClick={() => setNoteId(null)}
        />
        <div className='w-52 h-screen mt-2 overflow-y-auto overflow-x-hidden'>
          {handleShowComponents(chosen)}
        </div>
      </div>
      {typeof noteId === 'number' && <NoteSinglePage noteId={noteId} />}
      {typeof noteId === 'string' && <SettingOptionsPage noteId={noteId} />}
      {noteId === null && <CreateNote />}
    </div>
  );
};

export default DesktopContent;
