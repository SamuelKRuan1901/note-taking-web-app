'use client';
import SansSerifIcon from '@/assets/images/icon-font-sans-serif.svg';
import SerifIcon from '@/assets/images/icon-font-serif.svg';
import MonoSpaceIcon from '@/assets/images/icon-font-monospace.svg';
import Image from 'next/image';
import { useContext } from 'react';
import { SettingContext } from '@/contexts/SettingProvider';

const FontTheme = () => {
  const fontThemes = [
    {
      id: 0,
      name: 'Sans-Serif',
      detail: 'A clean and modern, easy to read.',
      value: 'sans',
      icon: SansSerifIcon,
      alt: 'sansSerifIcon'
    },
    {
      id: 1,
      name: 'Serif',
      detail: 'Classic and elegant for a timeless feel.',
      value: 'serif',
      icon: SerifIcon,
      alt: 'serifIcon'
    },
    {
      id: 2,
      name: 'Monospace',
      detail: 'Code-like, great for technical vibe',
      value: 'mono',
      icon: MonoSpaceIcon,
      alt: 'monoSpaceIcon'
    }
  ];

  const { font, handleChangeFont, isLoading } = useContext(SettingContext);

  return (
    <div className='w-full p-6 flex flex-col gap-8'>
      <div className='w-96 h-12'>
        <h1 className='text-xl font-bold '>Font Theme</h1>
        <p className='text-slate-600'>Choose your font theme:</p>
      </div>
      <div className='w-96 flex flex-col gap-4'>
        {fontThemes.map((fontTheme) => (
          <div
            key={fontTheme.id}
            className={`w-full flex items-center justify-between
                gap-4 p-2 border-1 border-slate-400 rounded-2xl 
                dark:hover:bg-slate-500 active:text-slate-900
                cursor-pointer hover:bg-slate-200 ${
                  font === fontTheme.value
                    ? 'bg-slate-300 dark:bg-slate-700'
                    : ''
                } transition-all duration-500`}
            onClick={() => handleChangeFont(fontTheme.value)}
          >
            <div className='w-80 flex items-center gap-5'>
              <div
                className={`w-12 h-12 border-1 border-slate-400
                   rounded-xl flex items-center justify-center`}
              >
                <Image
                  className='dark:invert'
                  src={fontTheme.icon}
                  alt={fontTheme.alt}
                  width={32}
                  height={32}
                />
              </div>
              <div>
                {fontTheme.name}
                <p className='text-xs'>{fontTheme.detail}</p>
              </div>
            </div>
            <div
              className={`w-5 h-5 border border-slate-400 
                  rounded-full flex items-center justify-center ${
                    font === fontTheme.value ? 'bg-blue-500' : ''
                  } transition-all duration-500`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  font === fontTheme.value ? 'bg-white' : ''
                } transition-all duration-500`}
              />
            </div>
          </div>
        ))}
        <div className='flex justify-end w-full'></div>
      </div>
      {isLoading && (
        <div className='w-screen h-screen bg-white dark:bg-slate-800 fixed flex top-0 right-0 items-center justify-center'>
          <p className='text-xl'>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default FontTheme;
