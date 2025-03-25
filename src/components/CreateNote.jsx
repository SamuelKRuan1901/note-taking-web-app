import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import Image from 'next/image';
import TagIcon from '@/assets/images/icon-tag.svg';
import ClockIcon from '@/assets/images/icon-clock.svg';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { NoteContext } from '@/contexts/NoteProvider';

const CreateNote = () => {
  const {
    data,
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    isCancel,
    setIsCancel
  } = useContext(NoteContext);

  const handelSaveNote = () => {
    if (!title || !content || !tags) {
      toast.error('all fields are required');
      return;
    }
    const newNote = {
      id: data.notes[data.notes.length - 1].id + 1,
      title: title,
      content: content,
      tags: tags
        .split(',')
        .map(
          (tag) =>
            tag.trim().charAt(0).toUpperCase() +
            tag.trim().slice(1).toLowerCase()
        ),
      lastEdited: new Date().toISOString(),
      isArchived: false
    };
    data.notes.push(newNote);
    setTitle('');
    setContent('');
    setTags('');
    toast.success('Saved Note');
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
      <form className='w-full h-full p-3 pb-3 overflow-auto'>
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
          className='w-full h-full my-4 border-0 overflow-auto p-3'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Start typing your note here...'
        ></textarea>
      </form>
      <div className='w-44 py-2 px-2 border-l border-slate-400 flex flex-col justify-between gap-4'>
        <div className='w-full py-2 border-slate-400 flex flex-col gap-1'>
          <PrimaryButton content={'Save Note'} onClick={handelSaveNote} />
          <SecondaryButton content={'Cancel'} onClick={handleCancel} />
        </div>
        {/* )} */}
      </div>
      {isCancel && (
        <div className='w-screen h-screen bg-slate-800/80 fixed top-0 left-0 flex justify-center items-center'>
          <div className='w-96 h-20 bg-white flex gap-4 p-4 rounded-md'>
            <PrimaryButton
              content={'Confirm Cancel'}
              onClick={handleConfirmCancel}
            />
            <SecondaryButton
              content={'Continue Editing'}
              onClick={() => setIsCancel(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNote;
