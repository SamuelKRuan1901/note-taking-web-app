import NoteItem from '@/components/NoteItem';
import { NoteContext } from '@/contexts/NoteProvider';
import { useContext } from 'react';
import MobileNoteSinglePage from '@/components/MobileNoteSinglePage';
import MobileHeader from '@/components/MobileHeader';
import { toast } from 'react-toastify';

const MobileAllNotes = () => {
  const { data, noteId, setNoteId, isEditing, setIsEditing, setIsCancel } =
    useContext(NoteContext);
  const singleNote = data?.filter((item) => item._id === noteId)[0];

  const handleChoseNote = (note) => {
    if (note !== noteId && isEditing === true) {
      toast.error('Cannot switch notes while editing');
      setIsCancel(true);
      return;
    }
    setNoteId(note);
    setIsEditing(false);
  };

  return (
    <div className='w-screen h-screen relative'>
      <MobileHeader />
      <h1 className='text-xl p-2 font-semibold'>All Notes</h1>
      <div
        className={`${
          noteId !== 0 && typeof noteId === 'string' ? 'hidden' : ''
        }`}
      >
        {data?.map((note) => (
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
        ))}
      </div>
      {noteId !== 0 && typeof noteId === 'string' && <MobileNoteSinglePage />}
    </div>
  );
};

export default MobileAllNotes;
