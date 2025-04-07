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
  const { chosen, setChosen, data, setNoteId, chosenTags, setChosenTags } =
    useContext(NoteContext);
  const Tags = data?.map((note) => note.tags.map((tag) => tag));
  const uniqueTags = [...new Set(Tags?.flat())];

  const handleChoseAllNote = () => {
    if (chosen === 'Settings') {
      setChosen('Notes');
      setNoteId(0);
      return;
    }
    setChosen('Notes');
  };
  const handleChoseArchived = () => {
    if (chosen === 'Settings') {
      setChosen('Archived');
      setNoteId(0);
      return;
    }
    setChosen('Archived');
  };
  const handleChoseTag = (chosenTag) => {
    if (chosen === 'Settings') {
      setChosen(chosenTag);
      setChosenTags(chosenTag);
      setNoteId(0);
      return;
    }
    setChosen(chosenTag);
    setChosenTags(chosenTag);
  };

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
            priority={false}
            width={'auto'}
            height={'auto'}
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
            onClick={handleChoseAllNote}
          >
            <Image
              className='dark:invert'
              src={HomeIcon}
              alt={'HomeIcon'}
              priority={false}
              width={'auto'}
              height={'auto'}
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
            onClick={handleChoseArchived}
          >
            <Image
              className='dark:invert'
              src={ArchiveIcon}
              alt={'ArchiveIcon'}
              priority={false}
              width={'auto'}
              height={'auto'}
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
              onClick={() => handleChoseTag(tag)}
            >
              <Image
                className='dark:invert'
                src={TagIcon}
                alt={'TagIcon'}
                priority={false}
                width={'auto'}
                height={'auto'}
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
