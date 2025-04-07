import arrowLeftIcon from '@/assets/images/icon-arrow-left.svg';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import DeleteIcon from '@/assets/images/icon-delete.svg';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { NoteContext } from '@/contexts/NoteProvider';
import MobileHeader from '@/components/MobileHeader';
import StatusIcon from '@/assets/images/icon-status.svg';
import TagIcon from '@/assets/images/icon-tag.svg';
import ClockIcon from '@/assets/images/icon-clock.svg';
import ConfirmBox from '@/components/ConfirmBox';
import { toast } from 'react-toastify';
import { deleteNote } from '@/libs/deleteNote';
import { archiveNote } from '@/libs/archiveNote';
import { changeNoteContent } from '@/libs/changeNoteContent';

const MobileNoteSinglePage = () => {
  const {
    noteId,
    setNoteId,
    data,
    dateFormate,
    isCancel,
    setIsCancel,
    isEditing,
    setIsEditing,
    getNotes
  } = useContext(NoteContext);
  const singleNote = data?.filter((item) => item._id === noteId)[0];
  const formattedDate = dateFormate(singleNote);
  const archived = singleNote?.isArchived;
  const [title, setTitle] = useState(singleNote?.title);
  const [tags, setTags] = useState(
    singleNote?.tags.toString().replace(/,(?=\S)/g, ', ')
  );
  const [noteContent, setNoteContent] = useState(singleNote?.content);
  const [isSave, setIsSave] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleArchiveNote = async () => {
    if (singleNote.isArchived === true) {
      toast.warn('Archived already');
      return;
    }
    const archived = await archiveNote(noteId);
    if (archived) {
      getNotes();
      toast.success('Note Archived Successfully');
    } else {
      toast.error('Failed to archive note');
    }
  };
  const handleEditTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    setIsEditing(true);
  };
  const handleEditTags = (e) => {
    e.preventDefault();

    setTags(e.target.value);
    setIsEditing(true);
  };
  const handleEditContent = (e) => {
    e.preventDefault();
    setNoteContent(e.target.value);
    setIsEditing(true);
  };
  const handleConfirmSave = async () => {
    const changed = changeNoteContent(noteId, title, tags, noteContent);
    if (changed) {
      setIsSave(false);
      // setNoteContent(filterData[0].content);
      toast.success('Note saved successfully');
      getNotes();
      setIsEditing(false);
    } else {
      toast.error('Failed to save note');
      return;
    }
    // window.setTimeout(() => window.location.reload(), 1000);
  };
  const handleConfirmCancel = () => {
    setNoteContent(singleNote.content);
    setIsEditing(false);
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
  const handleBackToNotesMenu = () => {
    if (isEditing == true) {
      setIsCancel(true);
      return;
    }
    setNoteId(0);
  };
  return (
    <div className='w-screen h-auto absolute top-0 right-0 bg-white dark:bg-slate-900'>
      <MobileHeader />
      <div className='flex items-center justify-between p-3 border-b border-slate-500'>
        <div
          className={`flex items-center justify-center w-18
                gap-1 p-1 hover:bg-slate-300 dark:hover:bg-slate-800 
                cursor-pointer rounded-md text-xs`}
          onClick={handleBackToNotesMenu}
        >
          <Image
            className='dark:invert'
            src={arrowLeftIcon}
            alt={'arrowLeft'}
            priority={false}
            width={'auto'}
            height={'auto'}
          />
          Back
        </div>
        <div className='flex items-center justify-center gap-1'>
          <div className='flex items-center justify-center gap-1'>
            <div
              className={`flex items-center justify-center w-8
                gap-1 p-1 hover:bg-slate-300 dark:hover:bg-slate-800 
                cursor-pointer rounded-md text-xs`}
              onClick={() => setIsDelete(true)}
            >
              <Image
                className='dark:invert'
                src={DeleteIcon}
                alt={'deleteIcon'}
                priority={false}
                width={'auto'}
                height={'auto'}
              />
            </div>
            <div
              className={`flex items-center justify-center w-8
                gap-1 py-1 hover:bg-slate-300 dark:hover:bg-slate-800 
                cursor-pointer rounded-md text-xs`}
              onClick={handleArchiveNote}
            >
              <Image
                className='dark:invert'
                src={ArchiveIcon}
                alt={'archiveIcon'}
                priority={false}
                width={'auto'}
                height={'auto'}
              />
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <div
              className={`flex items-center justify-center w-20
                gap-1 p-1 hover:bg-slate-300 dark:hover:bg-slate-800 
                cursor-pointer rounded-md text-xs`}
              onClick={() => setIsCancel(true)}
            >
              Cancel
            </div>
            <div
              className={`flex items-center justify-center w-18
                gap-1 py-1 hover:bg-slate-300 dark:hover:bg-slate-800 
                cursor-pointer rounded-md text-blue-600 text-xs`}
              onClick={() => setIsSave(true)}
            >
              Save Note
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='w-full h-full p-3 overflow-auto'>
          {/* note header */}
          <div className='w-full flex flex-col gap-3 pb-4 border-b border-slate-400'>
            <input
              type='text'
              value={title}
              onChange={(e) => handleEditTitle(e)}
              placeholder='Enter a title...'
              className={`w-full h-12 border-none text-xl font-bold p-2`}
            />
            <div className='flex items-center justify-start gap-3'>
              <Image
                className='dark:invert'
                src={TagIcon}
                alt='tagIcon'
                priority={false}
                width={'auto'}
                height={'auto'}
              />
              Tags
              <input
                type='text'
                value={tags}
                onChange={(e) => handleEditTags(e)}
                placeholder='Add tags separated by commas (e.g. Work, Planning)'
                className={`w-full h-7 border-none text-xs p-2`}
              />
            </div>
            {archived === true && (
              <div className='flex items-center justify-start gap-3'>
                <span className='flex items-center justify-center gap-2 dark:text-slate-300'>
                  <Image
                    className='dark:invert'
                    src={StatusIcon}
                    alt='archivedIcon'
                    priority={false}
                    width={'auto'}
                    height={'auto'}
                  />
                  Status
                </span>
                <span className='flex gap-3 text-slate-600 dark:text-slate-300'>
                  Archived
                </span>
              </div>
            )}
            <div className='flex items-center justify-start gap-3'>
              <Image
                className='dark:invert'
                src={ClockIcon}
                alt='clockIcon'
                priority={false}
                width={'auto'}
                height={'auto'}
              />
              Last edited
              <span className='flex gap-3 text-slate-500 dark:text-slate-300'>
                {formattedDate}
              </span>
            </div>
          </div>
          <textarea
            type='text'
            name='note-text'
            rows={15}
            value={noteContent}
            autoFocus={true}
            className='w-full h-96 my-4 border-0 overflow-auto p-3 bg-transparent resize-none whitespace-pre-wrap'
            onChange={(e) => handleEditContent(e)}
          ></textarea>
        </div>
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
          confirm={'Delete'}
          cancel={'Discard'}
          handleConfirm={handleConfirmDelete}
          cancelConfirm={() => setIsDelete(false)}
        />
      )}
    </div>
  );
};

export default MobileNoteSinglePage;
