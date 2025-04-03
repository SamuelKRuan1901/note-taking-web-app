'use client';
import BorderButton from '@/components/BorderButton';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import DeleteIcon from '@/assets/images/icon-delete.svg';
import StatusIcon from '@/assets/images/icon-status.svg';
import Image from 'next/image';
import TagIcon from '@/assets/images/icon-tag.svg';
import ClockIcon from '@/assets/images/icon-clock.svg';
import { useContext, useEffect, useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { NoteContext } from '@/contexts/NoteProvider';
import ConfirmBox from '@/components/ConfirmBox';
import { toast } from 'react-toastify';
import { deleteNote } from '@/libs/deleteNote';
import { archiveNote } from '@/libs/archiveNote';
import { changeNoteContent } from '@/libs/changeNoteContent';
import NoteHeader from '@/components/NoteHeader';

const NoteSinglePage = ({ singleNote }) => {
  const {
    noteId,
    dateFormate,
    getNotes,
    setNoteId,
    isEditing,
    setIsEditing,
    isCancel,
    setIsCancel
  } = useContext(NoteContext);

  const formattedDate = dateFormate(singleNote);
  const archived = singleNote?.isArchived;
  const viewTitle = singleNote?.title;
  const viewTags = singleNote?.tags;
  const viewContent = singleNote?.content;
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
    if (title && tags && noteContent) {
      setIsSave(false);
      setIsEditing(false);
      return;
    }
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
    window.setTimeout(() => window.location.reload(), 1000);
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

  return (
    <div className='w-full h-full flex text-xs'>
      {isEditing === false && (
        <div className='w-full h-full p-3 overflow-auto'>
          <NoteHeader
            title={viewTitle}
            tags={viewTags}
            date={formattedDate}
            archived={singleNote?.isArchived}
            editHeader={() => setIsEditing(true)}
          />
          <p
            className='w-full h-96 my-4 border-0 overflow-auto p-3 bg-transparent resize-none whitespace-pre-wrap'
            onClick={() => setIsEditing(true)}
          >
            {viewContent}
          </p>
        </div>
      )}
      {isEditing === true && (
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
                width={18}
                height={18}
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
                    width={18}
                    height={18}
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
                width={18}
                height={18}
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
            autoFocus={false}
            className='w-full h-96 my-4 border-0 overflow-auto p-3 bg-transparent resize-none whitespace-pre-wrap'
            onChange={(e) => handleEditContent(e)}
          ></textarea>
        </div>
      )}
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
        {isEditing === true && (
          <div className='w-full py-2 border-slate-400 flex flex-col gap-2 mb-24'>
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
          confirm={'Delete'}
          cancel={'Discard'}
          handleConfirm={handleConfirmDelete}
          cancelConfirm={() => setIsDelete(false)}
        />
      )}
    </div>
  );
};

export default NoteSinglePage;
