'use client';
import BorderButton from '@/components/BorderButton';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import DeleteIcon from '@/assets/images/icon-delete.svg';
import NoteHeader from '@/components/NoteHeader';
import { useContext, useEffect, useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { NoteContext } from '@/contexts/NoteProvider';
import ConfirmBox from '@/components/ConfirmBox';
import { toast } from 'react-toastify';
import { deleteNote } from '@/libs/deleteNote';
import { archiveNote } from '@/libs/archiveNote';
import { changeNoteContent } from '@/libs/changeNoteContent';

const NoteSinglePage = () => {
  const { noteId, data, dateFormate, getNotes, setNoteId } =
    useContext(NoteContext);
  const filterData = data?.filter((item) => item._id === noteId);
  const formattedDate = dateFormate(filterData[0]);
  const [noteContent, setNoteContent] = useState(filterData[0].content);
  const [showBtn, setShowBtn] = useState(false);
  const [changeContent, setChangeContent] = useState('');
  const [isCancel, setIsCancel] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleArchiveNote = async () => {
    const archived = await archiveNote(noteId);
    if (archived) {
      getNotes();
      toast.success('Note Archived Successfully');
    } else {
      toast.error('Failed to archive note');
    }
  };

  const handleEditNote = (e) => {
    e.preventDefault();
    setNoteContent(e.target.value);
    setShowBtn(true);
  };

  console.log(noteContent);

  const handleConfirmSave = async () => {
    const changed = changeNoteContent(noteId, noteContent);

    if (changed) {
      setShowBtn(false);
      setIsSave(false);
      // setNoteContent(filterData[0].content);
      toast.success('Note saved successfully');
    } else {
      toast.error('Failed to save note');
    }
  };

  const handleConfirmCancel = () => {
    setNoteContent(filterData[0].content);
    setShowBtn(false);
    setIsCancel(false);
  };

  const handleConfirmDelete = async () => {
    const deleted = await deleteNote(noteId);
    if (deleted) {
      setIsDelete(false);
      getNotes();
      toast.success('Note deleted');
      setNoteId(null);
    } else {
      toast.error('Failed to delete note');
    }
  };

  return (
    <div className='w-full h-full flex text-xs'>
      <div className='w-full h-full p-3 overflow-auto'>
        <NoteHeader
          title={filterData[0]?.title}
          tags={filterData[0]?.tags}
          date={formattedDate}
          archived={filterData[0]?.isArchived}
        />
        <textarea
          name='note-text'
          rows={15}
          cols={50}
          value={noteContent}
          className='w-full h-full my-4 border-0 overflow-auto p-3'
          onChange={(e) => handleEditNote(e)}
        ></textarea>
      </div>
      <div className='w-44 py-2 px-2 border-l border-slate-400 flex flex-col justify-between gap-4'>
        <div className='w-full flex flex-col gap-3'>
          <BorderButton
            content={'Archive Note'}
            icon={ArchiveIcon}
            onClick={handleArchiveNote}
          />
          <BorderButton
            content={'Delete Note'}
            icon={DeleteIcon}
            onClick={() => setIsDelete(true)}
          />
        </div>
        {showBtn === true && (
          <div className='w-full py-2 border-slate-400 flex flex-col gap-1'>
            <PrimaryButton
              content={'Save Note'}
              onClick={() => setIsSave(true)}
            />
            <SecondaryButton
              content={'Cancel'}
              onClick={() => setIsCancel(true)}
            />
          </div>
        )}
      </div>
      {isCancel && (
        <ConfirmBox
          confirm={'Confirm Cancel'}
          cancel={'Continue Editing'}
          handleConfirm={handleConfirmCancel}
          cancelConfirm={() => setIsCancel(false)}
        />
      )}
      {isSave && (
        <ConfirmBox
          confirm={'Confirm save'}
          cancel={'Continue Editing'}
          handleConfirm={handleConfirmSave}
          cancelConfirm={() => setIsSave(false)}
        />
      )}
      {isDelete && (
        <ConfirmBox
          confirm={'Confirm save'}
          cancel={'Continue Editing'}
          handleConfirm={handleConfirmDelete}
          cancelConfirm={() => setIsDelete(false)}
        />
      )}
    </div>
  );
};

export default NoteSinglePage;
