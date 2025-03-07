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
    <div className='w-auto h-20 flex items-center justify-between px-6 border-b border-l border-slate-400'>
      <div className='text-2xl font-bold'>{handleShowPageTitle(chosen)}</div>
      <div className='flex items-center justify-center gap-4 pr-4'>
        <div className='relative'>
          <input
            type='search'
            className='w-50 h-12 border border-slate-400 rounded-md pl-3 pr-10 hover:bg-slate-200 transition-all duration-300'
            placeholder='Search...'
          />
          <Image
            src={SearchIcon}
            alt={'searchIcon'}
            className='absolute top-3 right-3'
            width={25}
            height={25}
          />
        </div>
        <div
          className='hover:bg-slate-300 bg-slate-100 p-2 rounded-md cursor-pointer transition-all duration-300'
          onClick={() => setChosen('Settings')}
        >
          <Image src={SettingsIcon} alt='settingIcon' width={25} height={25} />
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
