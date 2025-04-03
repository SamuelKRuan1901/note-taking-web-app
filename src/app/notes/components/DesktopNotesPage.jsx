'use client';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import HomeIcon from '@/assets/images/icon-home.svg';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import TagIcon from '@/assets/images/icon-tag.svg';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { NoteContext } from '@/contexts/NoteProvider';
import DesktopHeader from '@/components/DesktopHeader';
import DesktopContent from '@/components/DesktopContent';

const DesktopNotesPage = () => {
  // const data = require('@/app/api/data.json');
  const { chosen, setChosen, data } = useContext(NoteContext);
  const Tags = data?.map((note) => note.tags.map((tag) => tag));
  console.log(data);
  const uniqueTags = [...new Set(Tags?.flat())];

  // show notes list by ordered

  return (
    <div className='w-full h-full flex'>
      {/* left side content */}
      <div className='w-48 px-3'>
        <div className='mt-5 mb-10'>
          <Image
            className='dark:invert'
            src={Logo}
            alt='Logo'
            width={80}
            height={36}
          />
        </div>
        <div className='flex flex-col gap-1 pb-5 border-b border-slate-500'>
          <div
            className={`flex items-center justify-start gap-2 p-2 rounded-md
                   cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700
                    transition-all duration-300 text-xs
                   ${
                     chosen === 'Notes' ? 'bg-slate-200 dark:bg-slate-700 ' : ''
                   }`}
            onClick={() => setChosen('Notes')}
          >
            <Image
              className='dark:invert'
              src={HomeIcon}
              alt={'HomeIcon'}
              width={15}
              height={15}
            />
            All Notes
          </div>
          <div
            className={`flex items-center justify-start gap-2 p-2 rounded-md
                   cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 
                   transition-all duration-300 text-xs
                   ${
                     chosen === 'Archived'
                       ? 'bg-slate-200 dark:bg-slate-700'
                       : ''
                   }`}
            onClick={() => setChosen('Archived')}
          >
            <Image
              className='dark:invert'
              src={ArchiveIcon}
              alt={'ArchiveIcon'}
              width={15}
              height={15}
            />
            Archived Notes
          </div>
        </div>
        {/* tags menu */}
        <div className='w-full h-auto pt-5 flex flex-col items-start justify-start gap-1 overflow-auto'>
          <div className='text-xl font-medium text-slate-600 mb-2'>Tags</div>
          {uniqueTags.map((tag, index) => (
            <div
              key={index}
              className={`flex items-center justify-start gap-1 p-1
                hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md 
                cursor-pointer transition-all duration-300 text-xs
                ${chosen === tag ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
              onClick={() => setChosen(tag)}
            >
              <Image
                className='dark:invert'
                src={TagIcon}
                alt={'TagIcon'}
                width={15}
                height={15}
              />

              {tag}
            </div>
          ))}
        </div>
      </div>
      {/* right side content */}
      <div className='w-full h-full flex flex-col'>
        {/* right side header */}
        <DesktopHeader />
        {/* right side content */}
        <DesktopContent />
      </div>
    </div>
  );
};

export default DesktopNotesPage;
