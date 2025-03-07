import TagIcon from '@/assets/images/icon-tag.svg';
import ClockIcon from '@/assets/images/icon-clock.svg';
import StatusIcon from '@/assets/images/icon-status.svg';
import Image from 'next/image';

const NoteHeader = ({ title, tags, date, archived = false }) => {
  return (
    <div className='w-full flex flex-col gap-3 border-b border-slate-400 pb-10'>
      <h1 className='text-3xl font-bold py-2'>{title}</h1>
      <div className='flex items-center justify-start gap-10'>
        <span className='flex items-center justify-center gap-2 text-slate-600'>
          <Image src={TagIcon} alt='tagIcon' width={24} height={24} />
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
        <div className='flex items-center justify-start gap-10'>
          <span className='flex items-center justify-center gap-2 text-slate-600'>
            <Image src={StatusIcon} alt='archivedIcon' width={24} height={24} />
            Status
          </span>
          <span className='flex gap-3 text-slate-600'>Archived</span>
        </div>
      )}
      <div className='flex items-center justify-start gap-10'>
        <span className='flex items-center justify-center gap-2 text-slate-600'>
          <Image src={ClockIcon} alt='clockIcon' width={24} height={24} />
          Last edited
        </span>
        <span className='flex gap-3 text-slate-600'>{date}</span>
      </div>
    </div>
  );
};

export default NoteHeader;
