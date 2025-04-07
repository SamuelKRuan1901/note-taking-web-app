import { NoteContext } from '@/contexts/NoteProvider';
import { useContext } from 'react';
import SearchIcon from '@/assets/images/icon-search.svg';
import SettingsIcon from '@/assets/images/icon-settings.svg';
import Image from 'next/image';

const DesktopHeader = () => {
  const { chosen, setChosen, search, setSearch, setNoteId, chosenTags } =
    useContext(NoteContext);

  // show title by order
  const handleShowPageTitle = (chosen) => {
    if (chosen === 'Notes') {
      return 'All Notes';
    } else if (chosen === 'Archived') {
      return 'Archived';
    } else if (chosen === 'Search') {
      return `Showing results for: ${
        search.charAt(0).toUpperCase() +
        search.slice(1, search.length).toLowerCase()
      }`;
    } else if (chosen === 'Settings') {
      return 'Settings';
    } else {
      if (!chosenTags) return 'Tags';
      return `Notes Tagged: ${chosenTags}`;
    }
  };

  const handleSearchNotes = (event) => {
    setSearch(event.target.value);
  };

  const handleChoseSetting = () => {
    if (chosen == 'Settings') return;
    setChosen('Settings');
    setNoteId(0);
  };
  const handleChoseSearch = () => {
    if (chosen === 'Search') return;
    setNoteId(0);
  };

  return (
    <div className='w-full h-20 flex items-center justify-between px-6 py-3 border-b border-l border-slate-400'>
      <div className='text-lg font-bold'>{handleShowPageTitle(chosen)}</div>
      <div className='flex items-center justify-center gap-4 pr-4'>
        <div className='relative' onClick={() => setChosen('Search')}>
          <input
            type='text'
            className='w-52 h-10 border border-slate-400 rounded-md pl-3 pr-10 dark:hover:bg-slate-600 hover:bg-slate-200 transition-all duration-300'
            placeholder='Search...'
            value={search}
            onChange={handleSearchNotes}
            onClick={handleChoseSearch}
          />
          <Image
            src={SearchIcon}
            alt={'searchIcon'}
            className='absolute top-2 right-3 dark:invert'
            priority={false}
            width={'auto'}
            height={'auto'}
          />
        </div>
        <div
          className='hover:bg-slate-300 dark:hover:bg-slate-700 p-2 rounded-md cursor-pointer transition-all duration-300'
          onClick={handleChoseSetting}
        >
          <Image
            className='dark:invert'
            src={SettingsIcon}
            alt='settingIcon'
            priority={false}
            width={'auto'}
            height={'auto'}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
