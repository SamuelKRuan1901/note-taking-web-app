import { NoteContext } from '@/contexts/NoteProvider';
import React, { useContext } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import NoteSinglePage from '@/components/NoteSinglePage';
import LogoutIcon from '@/assets/images/icon-logout.svg';
import NoteItem from '@/components/NoteItem';

const DesktopContent = () => {
  const { chosen, noteId, data, setNoteId } = useContext(NoteContext);
  const filteredNotes = data.notes.filter((note) => note.tags.includes(chosen));
  const archivedNotes = data.notes.filter((note) => note.isArchived === true);

  const handleShowComponents = (chosen) => {
    if (chosen === 'Notes') {
      return data.notes.map((note) => (
        <div
          className={`${noteId === note.id ? 'bg-slate-300' : ''}`}
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
          className={`${noteId === note.id ? 'bg-slate-300' : ''}`}
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
          {settingsItems.map((item) => (
            <div
              className={`flex items-center gap-2 p-2 rounded-md 
                cursor-pointer hover:bg-slate-200 transition-all 
                duration-300`}
              key={item.name}
            >
              <Image src={item.icon} alt={item.alt} width={20} height={20} />
              {item.name}
            </div>
          ))}
          <div className='border-t border-slate-400 py-5 mt-5'>
            <div
              className={`flex items-center gap-2 p-2 rounded-md 
            cursor-pointer hover:bg-slate-200 transition-all 
            duration-300`}
            >
              <Image src={LogoutIcon} alt='logout' width={20} height={20} />
              Logout
            </div>
          </div>
        </>
      );
    } else {
      return filteredNotes.map((note) => (
        <div
          className={`${noteId === note.id ? 'bg-slate-300' : ''}`}
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
      <div className='w-72 h-full flex flex-col gap-2 pt-4 px-6 border-r border-slate-400'>
        <PrimaryButton content={'Create New Note'} />
        <div className='w-64 h-full mt-4 overflow-y-auto overflow-x-hidden'>
          {handleShowComponents(chosen)}
        </div>
      </div>
      {noteId !== null && <NoteSinglePage noteId={noteId} onClick />}
    </div>
  );
};

export default DesktopContent;
