'use client';
import NoteItem from '@/components/NoteItem';
import { useState } from 'react';
import ArrowIcon from '@/assets/images/icon-arrow-left.svg';
import DeleteIcon from '@/assets/images/icon-delete.svg';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import TagIcon from '@/assets/images/icon-tag.svg';
import ClockIcon from '@/assets/images/icon-clock.svg';
import Image from 'next/image';
import MobileNav from '@/components/MobileNav';
import MobileHeader from '@/components/MobileHeader';

const MobileNotesPage = () => {
  const data = require('@/app/api/data.json');
  const [noteId, setNoteId] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const filterData = data.notes.filter((item) => item.id === noteId);
  const editingDate = new Date(filterData[0]?.lastEdited);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = editingDate.toLocaleString('en-GB', options);

  const handleEditNote = (e) => {
    setNoteContent(filterData[0]?.content + e.target.value);
    setShowBtn(true);
  };

  console.log(showBtn);
  return (
    <>
      <MobileHeader />
      {noteId === null && (
        <>
          <div className='w-full py-2'>
            <h1 className='text-2xl font-bold'>All Notes</h1>
          </div>
          <div className='w-full'>
            {data.notes.map((note) => (
              <div key={note.id} onClick={() => setNoteId(note.id)}>
                <NoteItem
                  title={note.title}
                  tags={note.tags}
                  date={note.lastEdited}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {/* show note single page */}
      {noteId !== null && (
        <>
          <div className='w-full flex items-center justify-between'>
            <div
              className='w-32 px-3 py-2 flex items-center justify-start text-lg cursor-pointer hover:bg-slate-200 rounded-md transition-colors duration-500'
              onClick={() => setNoteId(null)}
            >
              <Image
                src={ArrowIcon}
                alt={'arrow-left'}
                width={20}
                height={20}
              />
              Go Back
            </div>
            <div className='flex items-center justify-center gap-2'>
              <div className='cursor-pointer hover:bg-slate-200 rounded-sm p-2 transition-colors duration-500'>
                <Image src={DeleteIcon} alt={'delete'} width={24} height={24} />
              </div>
              <div className='cursor-pointer hover:bg-slate-200 rounded-sm p-2 transition-colors duration-500'>
                <Image
                  src={ArchiveIcon}
                  alt={'archive'}
                  width={24}
                  height={24}
                />
              </div>
            </div>
            {/* show button when click or change note content */}
            {showBtn && (
              <div className='flex items-center justify-center'>
                <span
                  className={`p-2 hover:bg-slate-200 hover: transition-all
                 duration-500 text-md text-md text-slate-500
                 rounded-md cursor-pointer`}
                  onClick={() => setShowBtn(false)}
                >
                  Cancel
                </span>
                <span
                  className={`p-2 hover:bg-slate-200  transition-all
                 duration-500 text-md text-md text-blue-500 
                 rounded-md cursor-pointer`}
                  onClick={() => setShowBtn(false)}
                >
                  Save
                </span>
              </div>
            )}
          </div>
          <div className='w-full flex flex-col gap-3'>
            <h1 className='text-3xl font-bold py-2'>{filterData[0]?.title}</h1>
            <div className='flex items-center justify-start gap-10'>
              <span className='flex items-center justify-center gap-2 text-slate-600'>
                <Image src={TagIcon} alt='tagIcon' width={24} height={24} />
                Tags
              </span>
              <span className='flex gap-3'>
                {filterData[0]?.tags.map((item, index) => (
                  <div
                    key={index}
                    className='p-1 bg-slate-200 rounded-md text-slate-600'
                  >
                    {item}
                  </div>
                ))}
              </span>
            </div>
            <div className='flex items-center justify-start gap-10'>
              <span className='flex items-center justify-center gap-2 text-slate-600'>
                <Image src={ClockIcon} alt='clockIcon' width={24} height={24} />
                Last edited
              </span>
              <span className='flex gap-3 text-slate-600'>{formattedDate}</span>
            </div>
          </div>
          <textarea
            name='note-text'
            rows={15}
            cols={50}
            className='w-full h-96 mt-2 border-0 overflow-auto'
            value={noteContent}
            onChange={(e) => handleEditNote(e)}
            onClick={() => setShowBtn(true)}
            placeholder={filterData[0]?.content}
          ></textarea>
        </>
      )}
      <MobileNav />
    </>
  );
};

export default MobileNotesPage;
