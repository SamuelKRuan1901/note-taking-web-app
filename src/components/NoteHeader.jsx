import TagIcon from '@/assets/images/icon-tag.svg';
import ClockIcon from '@/assets/images/icon-clock.svg';
import StatusIcon from '@/assets/images/icon-status.svg';
import Image from 'next/image';

const NoteHeader = ({ title, tags, date, archived = false }) => {
  return (
    <div className='text-xs w-full flex flex-col gap-1 border-b border-slate-400 pb-5'>
      <h1 className='text-lg font-bold py-2'>{title}</h1>
      <div className='flex items-center justify-start gap-3'>
        <span className='flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300'>
          <Image
            className='dark:invert'
            src={TagIcon}
            alt='tagIcon'
            width={18}
            height={18}
          />
          Tags
        </span>
        <span className='flex gap-3'>
          {tags.map((item, index) => (
            <div
              key={index}
              className='p-1 bg-slate-200 rounded-md text-slate-600'
            >
              {item}
            </div>
          ))}
        </span>
      </div>
      {archived === true && (
        <div className='flex items-center justify-start gap-3'>
          <span className='flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300'>
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
        <span className='flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300'>
          <Image
            className='dark:invert'
            src={ClockIcon}
            alt='clockIcon'
            width={18}
            height={18}
          />
          Last edited
        </span>
        <span className='flex gap-3 text-slate-600 dark:text-slate-300'>
          {date}
        </span>
      </div>
    </div>
  );
};

export default NoteHeader;
