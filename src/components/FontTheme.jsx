import SunIcon from '@/assets/images/icon-sun.svg';
import MoonIcon from '@/assets/images/icon-moon.svg';
import SysIcon from '@/assets/images/icon-system-theme.svg';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const FontTheme = () => {
  const { theme, setTheme } = useTheme();

  const colorThemes = [
    {
      id: 0,
      name: 'Light Mode',
      detail: 'Choose a clean and classic light theme',
      value: 'light',
      icon: SunIcon,
      alt: 'sunIcon'
    },
    {
      id: 1,
      name: 'Dark Mode',
      detail: 'Choose a sleek and modern dark theme',
      value: 'dark',
      icon: MoonIcon,
      alt: 'moonIcon'
    },
    {
      id: 2,
      name: 'System',
      detail: "Adapts to your device's system",
      value: 'system',
      icon: SysIcon,
      alt: 'sysIcon'
    }
  ];

  // const handleChooseTheme = (themeId) => {
  //   setChosenOption(themeId);
  //   console.log(chosenOption);
  //   if (chosenOption === '0') {
  //     setTheme('light');
  //   } else {
  //     setTheme('dark');
  //   }
  // };
  return (
    <div className='w-full p-6 flex flex-col gap-8'>
      <div className='w-[528px] h-12'>
        <h1 className='text-xl font-bold '>Color Theme</h1>
        <p className='text-slate-600'>Choose your color theme:</p>
      </div>
      <div className='w-[528px] flex flex-col gap-4'>
        {colorThemes.map((colorTheme) => (
          <div
            key={colorTheme.id}
            className={`2-full flex items-center justify-between
              gap-4 p-4 border-2 border-slate-400 rounded-2xl 
              hover:text-slate-900 active:text-slate-900
              cursor-pointer hover:bg-slate-200 ${
                theme === colorTheme.value ? 'bg-slate-400' : ''
              } transition-all duration-500`}
            onClick={() => setTheme(colorTheme.value)}
          >
            <div className='flex items-center gap-5 w-96'>
              <div
                className={`w-12 h-12 border-2 border-slate-400
                 rounded-xl flex items-center justify-center bg-slate-300`}
              >
                <Image
                  src={colorTheme.icon}
                  alt={colorTheme.alt}
                  width={32}
                  height={32}
                />
              </div>
              <div>
                {colorTheme.name}
                <p className='text-slate-600'>{colorTheme.detail}</p>
              </div>
            </div>
            <div
              className={`w-6 h-6 border border-slate-400 
                rounded-full flex items-center justify-center ${
                  theme === colorTheme.value ? 'bg-blue-500' : ''
                } transition-all duration-500`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  theme === colorTheme.value ? 'bg-white' : ''
                } transition-all duration-500`}
              />
            </div>
          </div>
        ))}
        <div className='flex justify-end w-full'>
          <button
            className={`w-42 h-12 border-2 border-none rounded-md
               text-white text-md tracking-wide bg-blue-400 
               hover:bg-blue-600 cursor-pointer`}
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FontTheme;
