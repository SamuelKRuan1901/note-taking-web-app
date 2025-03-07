'use client';
import NoteItem from '@/components/NoteItem';
import { useState } from 'react';
import ArrowIcon from '@/assets/images/icon-arrow-left.svg';
import DeleteIcon from '@/assets/images/icon-delete.svg';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import TagIcon from '@/assets/images/icon-tag.svg';
import ClockIcon from '@/assets/images/icon-clock.svg';
import Image from 'next/image';
// import { useState, useEffect } from 'react';

const TagsPage = () => {
  const data = require('@/app/api/data.json');
  const [noteId, setNoteId] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [chosenTag, setChosenTag] = useState();
  const filterData = data.notes.filter((item) => item.id === noteId);
  const editingDate = new Date(filterData[0]?.lastEdited);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = editingDate.toLocaleString('en-GB', options);
  const Tags = data.notes.map((note) => note.tags.map((tag) => tag));
  const uniqueTags = [...new Set(Tags.flat())];
  const filteredNotes = data.notes.filter((note) =>
    note.tags.includes(chosenTag)
  );
  console.log(filteredNotes);

  const handleEditNote = (e) => {
    setNoteContent(filterData[0]?.content + e.target.value);
    setShowBtn(true);
  };

  console.log(showBtn);

  return (
    <section className='w-screen h-full flex flex-col justify-center items-center my-16 px-4 rounded-md'>
      {noteId === null && !chosenTag && (
        <>
          <div className='w-full py-2'>
            <h1 className='text-2xl font-bold'>Tags</h1>
          </div>
          <div className='w-full h-auto flex flex-col items-start justify-between'>
            {uniqueTags.map((tag, index) => (
              <div
                className='w-full flex item-center justify-items-start gap-2 p-4 cursor-pointer border-b hover:bg-slate-200 transition-colors duration-300'
                key={index}
                onClick={() => setChosenTag(tag)}
              >
                <Image src={TagIcon} alt='tagIcon' />
                {tag}
              </div>
            ))}
          </div>
        </>
      )}
      {noteId === null && chosenTag && (
        <>
          <div className='w-full flex items-center justify-between'>
            <div
              className='w-32 px-3 py-2 flex items-center justify-start text-lg cursor-pointer hover:bg-slate-200 rounded-md transition-colors duration-500'
              onClick={() => setChosenTag('')}
            >
              <Image
                src={ArrowIcon}
                alt={'arrow-left'}
                width={20}
                height={20}
              />
              Go Back
            </div>
          </div>
          <div className='w-full py-2'>
            <h1 className='text-2xl font-bold text-slate-400'>
              Notes Tagged: <span className='text-slate-800'>{chosenTag}</span>
            </h1>
          </div>
          <div className='w-full'>
            {filteredNotes.map((note) => (
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
      {noteId !== null && chosenTag && (
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
    </section>
  );
};

export default TagsPage;
