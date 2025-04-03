import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import Image from 'next/image';
import TagIcon from '@/assets/images/icon-tag.svg';
import ClockIcon from '@/assets/images/icon-clock.svg';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { NoteContext } from '@/contexts/NoteProvider';
import ConfirmBox from '@/components/ConfirmBox';

const CreateNote = () => {
  const { title, setTitle, content, setContent, tags, setTags, getNotes } =
    useContext(NoteContext);
  const [isCancel, setIsCancel] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const handleSaveNote = async () => {
    if (!title || !content || !tags) {
      toast.error('all fields are required');
      return;
    }
    const newDate = new Date();
    const newNote = {
      title: title.charAt(0).toUpperCase() + title.slice(1, title.length),
      content: content,
      tags: tags
        .split(',')
        .map(
          (tag) =>
            tag.trim().charAt(0).toUpperCase() +
            tag.trim().slice(1).toLowerCase()
        ),
      lastEdited: newDate.toISOString(),
      isArchived: false
    };
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    });

    if (res.status === 200) {
      setTitle('');
      setContent('');
      setTags('');
      getNotes();
      toast.success('Created a new note');
      setIsSave(false);
    } else {
      toast.error('Failed to save note');
      setIsSave(false);
      return;
    }
  };
  const handleSave = () => {
    if (!title || !content || !tags) {
      setIsSave(false);
      toast.error('Please fill all fields');
      return;
    }
    setIsSave(true);
  };
  const handleCancel = () => {
    if (!title || !content || !tags) {
      setIsCancel(false);
      return;
    }
    setIsCancel(true);
  };
  const handleConfirmCancel = () => {
    setIsCancel(false);
    setTitle('');
    setContent('');
    setTags('');
    toast.info('Changes discarded');
  };

  return (
    <div className='w-full h-full flex text-xs relative'>
      {/* add note header area */}
      <div className='w-full h-full p-3 pb-3 overflow-auto'>
        <div className='w-full flex flex-col gap-3 pb-4 border-b border-slate-400'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setTags(e.target.value)}
              placeholder='Add tags separated by commas (e.g. Work, Planning)'
              className={`w-full h-7 border-none text-xs p-2`}
            />
          </div>
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
              Not yet saved
            </span>
          </div>
        </div>
        <textarea
          name='note-text'
          rows={15}
          cols={50}
          className='w-full h-auto my-4 border-0 overflow-auto p-3  bg-transparent resize-none whitespace-pre-wrap'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Start typing your note here...'
        ></textarea>
      </div>
      <div className='w-44 py-2 px-2 border-l border-slate-400 flex flex-col justify-between gap-4'>
        <div className='w-full py-2 border-slate-400 flex flex-col gap-1'>
          <PrimaryButton content={'Save Note'} onClick={handleSave} />
          <SecondaryButton content={'Cancel'} onClick={handleCancel} />
        </div>
        {/* )} */}
      </div>
      {isCancel && (
        <ConfirmBox
          confirm={'Discard changes'}
          cancel={'Keep Editing'}
          handleConfirm={handleConfirmCancel}
          cancelConfirm={() => setIsCancel(false)}
        />
      )}
      {isSave && (
        <ConfirmBox
          confirm={'Confirm save'}
          cancel={'Continue Editing'}
          handleConfirm={handleSaveNote}
          cancelConfirm={() => setIsSave(false)}
        />
      )}
    </div>
  );
};

export default CreateNote;
