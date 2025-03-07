'use client';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import HomeIcon from '@/assets/images/icon-home.svg';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import TagIcon from '@/assets/images/icon-tag.svg';
import { useContext } from 'react';
import React from 'react';
import { NoteContext } from '@/contexts/NoteProvider';
import DesktopHeader from '@/components/DesktopHeader';
import DesktopContent from '@/components/DesktopContent';

const DesktopNotesPage = () => {
  // const data = require('@/app/api/data.json');
  const { data, setNoteId, noteId, chosen, setChosen } =
    useContext(NoteContext);

  const Tags = data.notes.map((note) => note.tags.map((tag) => tag));
  const uniqueTags = [...new Set(Tags.flat())];

  // show notes list by ordered

  return (
    <div className='h-full flex items-start justify-start '>
      {/* left side content */}
      <div className='w-64 h-full px-3'>
        <div className='my-10'>
          <Image src={Logo} alt='Logo' width={100} height={36} />
        </div>
        <div className='flex flex-col gap-3 pb-5 border-b border-slate-500'>
          <div
            className={`flex items-center justify-start gap-2 p-2 rounded-md hover:text-slate-700
                   cursor-pointer hover:bg-slate-200 transition-all duration-300
                   ${chosen === 'Notes' ? 'bg-slate-200 text-slate-700' : ''}`}
            onClick={() => setChosen('Notes')}
          >
            <div className='bg-slate-50 p-1 rounded-md'>
              <Image src={HomeIcon} alt={'HomeIcon'} width={20} height={20} />
            </div>
            All Notes
          </div>
          <div
            className={`flex items-center justify-start gap-2 p-2 rounded-md hover:text-slate-700
                   cursor-pointer hover:bg-slate-200 transition-all duration-300
                   ${
                     chosen === 'Archived' ? 'bg-slate-200 text-slate-700' : ''
                   }`}
            onClick={() => setChosen('Archived')}
          >
            <div className='bg-slate-50 p-1 rounded-md'>
              <Image
                src={ArchiveIcon}
                alt={'ArchiveIcon'}
                width={20}
                height={20}
              />
            </div>
            Archived Notes
          </div>
        </div>
        <div className='w-full h-full pt-5 pb-20 flex flex-col items-start justify-start gap-1 overflow-auto'>
          <div className='text-xl font-medium text-slate-600'>Tags</div>
          {uniqueTags.map((tag, index) => (
            <div
              key={index}
              className={`text-lg flex items-center justify-start gap-2 p-2 hover:text-slate-700
                hover:bg-slate-200 rounded-md cursor-pointer transition-all duration-300
                ${chosen === tag ? 'bg-slate-200 text-slate-700' : ''}`}
              onClick={() => setChosen(tag)}
            >
              <div className='bg-slate-50 p-1 rounded-md'>
                <Image src={TagIcon} alt={'TagIcon'} width={20} height={20} />
              </div>

              {tag}
            </div>
          ))}
        </div>
      </div>
      {/* right side content */}

      <div className='w-full h-screen'>
        {/* right side header */}
        <DesktopHeader />
        {/* right side content */}
        <DesktopContent />
      </div>
    </div>
  );
};

export default DesktopNotesPage;
