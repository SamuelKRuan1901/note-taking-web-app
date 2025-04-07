import { NoteContext } from '@/contexts/NoteProvider';
import React, { useContext } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import NoteSinglePage from '@/components/NoteSinglePage';
import LogoutIcon from '@/assets/images/icon-logout.svg';
import NoteItem from '@/components/NoteItem';
import SunIcon from '@/assets/images/icon-sun.svg';
import FontIcon from '@/assets/images/icon-font.svg';
import LockIcon from '@/assets/images/icon-lock.svg';
import StickyNote from '@/assets/images/sticky-note.png';
import Image from 'next/image';
import SettingOptionsPage from '@/components/SettingOptionsPage';
import CreateNote from '@/components/CreateNote';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
const DesktopContent = () => {
  // const data = require('@/app/api/data.json');
  const {
    chosen,
    noteId,
    setNoteId,
    data,
    search,
    setIsEditing,
    isEditing,
    setIsCancel
  } = useContext(NoteContext);
  const filteredNotes = data?.filter((note) => note.tags.includes(chosen));
  const filteredNotesWithSearch = data?.filter((note) =>
    note.tags.includes(
      search.charAt(0).toUpperCase() +
        search.slice(1, search.length).toLowerCase()
    )
  );
  const archivedNotes = data?.filter((note) => note.isArchived === true);
  const singleNote = data?.filter((item) => item._id === noteId)[0];
  const settingsItems = [
    {
      id: 1,
      name: 'Color Theme',
      icon: SunIcon,
      alt: 'themeIcon'
    },
    {
      id: 2,
      name: 'Font Theme',
      icon: FontIcon,
      alt: 'fontIcon'
    },
    {
      id: 3,
      name: 'Change Password',
      icon: LockIcon,
      alt: 'lockIcon'
    }
  ];

  const handleLogout = () => {
    // logout logic and redirect to Login page
    signOut();
    toast.success('Logout success');
  };
  const handleChoseNote = (note) => {
    if (note !== noteId && isEditing === true) {
      toast.error('Cannot switch notes while editing');
      setIsCancel(true);
      return;
    }
    setNoteId(note);
    setIsEditing(false);
  };

  const handleShowComponents = (chosen) => {
    if (chosen === 'Notes') {
      return data?.map((note) => (
        <div
          className={`${
            noteId === note._id ? 'bg-slate-300 dark:bg-slate-700' : ''
          } select-none`}
          key={note._id}
          onClick={() => handleChoseNote(note._id)}
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
            noteId === note._id ? 'bg-slate-300 dark:bg-slate-700' : ''
          }`}
          key={note._id}
          onClick={() => handleChoseNote(note._id)}
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
              onClick={() => setNoteId(item.id)}
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
              {'Logout'}
            </div>
          </div>
        </>
      );
    } else if (chosen === 'Search') {
      return filteredNotesWithSearch.map((note) => (
        <div
          className={`${
            noteId === note._id ? 'bg-slate-300 dark:bg-slate-700' : ''
          }`}
          key={note._id}
          onClick={() => setNoteId(note._id)}
        >
          <NoteItem
            title={note.title}
            tags={note.tags}
            date={note.lastEdited}
          />
        </div>
      ));
    } else {
      return filteredNotes.map((note) => (
        <div
          className={`${
            noteId === note._id ? 'bg-slate-300 dark:bg-slate-700' : ''
          }`}
          key={note._id}
          onClick={() => handleChoseNote(note._id)}
        >
          <NoteItem
            key={note._id}
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
        {chosen !== 'Settings' && (
          <PrimaryButton
            content={'Create New Note'}
            onClick={() => setNoteId(null)}
          />
        )}
        <div className='w-52 h-screen mt-2 overflow-y-auto overflow-x-hidden'>
          {handleShowComponents(chosen)}
        </div>
      </div>
      {typeof noteId === 'string' && <NoteSinglePage singleNote={singleNote} />}
      {[1, 2, 3].includes(noteId) && <SettingOptionsPage noteId={noteId} />}
      {noteId === null && <CreateNote />}
      {noteId === 0 && (
        <div className='w-full h-full text-xl font-semibold flex flex-col items-center justify-center gap-10 py-20'>
          <Image
            className='dark:invert-50'
            src={StickyNote}
            alt={'StickyNote'}
            priority={true}
            width={'auto'}
            height={'auto'}
          />
          Keep notes close, keep ideas closer.
        </div>
      )}
    </div>
  );
};

export default DesktopContent;
