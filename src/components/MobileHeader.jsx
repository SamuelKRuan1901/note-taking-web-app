'use client';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import { usePathname } from 'next/navigation';

const MobileHeader = () => {
  return (
    <header
      className={` w-screen h-auto bg-indigo-50 px-4 py-3 dark:bg-slate-800`}
    >
      <Image
        className='dark:invert'
        src={Logo}
        alt='logo'
        priority={false}
        width={'auto'}
        height={'auto'}
      />
    </header>
  );
};

export default MobileHeader;
