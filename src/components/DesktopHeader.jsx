import { NoteContext } from '@/contexts/NoteProvider';
import { useContext } from 'react';
import SearchIcon from '@/assets/images/icon-search.svg';
import SettingsIcon from '@/assets/images/icon-settings.svg';
import Image from 'next/image';

const DesktopHeader = () => {
  const { chosen, setChosen } = useContext(NoteContext);

  // show title by order
  const handleShowPageTitle = (chosen) => {
    if (chosen === 'Notes') {
      return 'All Notes';
    } else if (chosen === 'Archived') {
      return 'Archived';
    } else if (chosen === 'Search') {
      return 'Search';
    } else if (chosen === 'Settings') {
      return 'Settings';
    } else {
      return `Notes Tagged: ${chosen}`;
    }
  };

  return (
    <div className='w-full h-20 flex items-center justify-between px-6 py-3 border-b border-l border-slate-400'>
      <div className='text-lg font-bold'>{handleShowPageTitle(chosen)}</div>
      <div className='flex items-center justify-center gap-4 pr-4'>
        <div className='relative'>
          <input
            type='search'
            className='w-40 h-10 border border-slate-400 rounded-md pl-3 pr-10 hover:bg-slate-200 transition-all duration-300'
            placeholder='Search...'
          />
          <Image
            src={SearchIcon}
            alt={'searchIcon'}
            className='absolute top-3 right-3 dark:invert'
            width={15}
            height={15}
          />
        </div>
        <div
          className='hover:bg-slate-300 dark:hover:bg-slate-700 p-2 rounded-md cursor-pointer transition-all duration-300'
          onClick={() => setChosen('Settings')}
        >
          <Image
            className='dark:invert'
            src={SettingsIcon}
            alt='settingIcon'
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
