'use client';
import Image from 'next/image';
import HomeIcon from '@/assets/images/icon-home.svg';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import TagIcon from '@/assets/images/icon-tag.svg';
import SearchIcon from '@/assets/images/icon-search.svg';
import SettingIcon from '@/assets/images/icon-settings.svg';
import { useContext } from 'react';
import { NoteContext } from '@/contexts/NoteProvider';

const MobileNav = () => {
  const navElements = [
    { id: 1, icon: HomeIcon, alt: 'Notes', title: 'Home' },
    { id: 2, icon: SearchIcon, alt: 'Search', title: 'Search' },
    { id: 3, icon: ArchiveIcon, alt: 'Archived', title: 'Archived' },
    { id: 4, icon: TagIcon, alt: 'Tags', title: 'Tags' },
    { id: 5, icon: SettingIcon, alt: 'Settings', title: 'Settings' }
  ];

  const { chosen, setChosen, setChosenTags, chosenTags, isEditing, setNoteId } =
    useContext(NoteContext);

  const handleChoseElement = (element) => {
    if (element !== 'Tags') {
      setChosen(element);
      return;
    }
    if (isEditing === true) {
      setIsCancel(true);
      return;
    }
    setChosen(element);
    setChosenTags('');
    setNoteId(0);
  };
  return (
    <div
      className={`fixed bottom-0 w-screen h-14
        dark:bg-slate-800 dark:border-slate-400
          flex justify-between items-center gap-2 px-2
          transition-all
          min-lg:hidden border-t-2 border-gray-200 
          bg-white hover:border-gray-300
          `}
    >
      {navElements.map((element) => (
        <div
          key={element.id}
          onClick={() => handleChoseElement(element.alt)}
          className={`w-14 h-10 hover:bg-sky-200 dark:hover:bg-sky-700 
            flex flex-col items-center justify-center
            text-[8px] font-light tracking-wider
            rounded-sm
            cursor-pointer ${
              chosen === element.alt && 'bg-sky-200 dark:bg-sky-700'
            }`}
        >
          <Image
            className='dark:invert'
            src={element.icon}
            alt={element.alt}
            width={20}
            height={20}
          />
          {element.title}
        </div>
      ))}
    </div>
  );
};

export default MobileNav;
