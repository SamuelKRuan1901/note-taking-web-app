'use client';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import { usePathname } from 'next/navigation';

const MobileHeader = () => {
  const pathname = usePathname();
  return (
    <header
      className={`fixed top-0 w-full h-auto bg-indigo-50 px-4 py-5 min-lg:hidden  ${
        pathname === '/' ||
        pathname === '/login' ||
        pathname === '/sign-up' ||
        pathname === '/forgot-password' ||
        pathname === '/reset-password'
          ? 'hidden'
          : ''
      }`}
    >
      <Image src={Logo} alt='logo' width={80} height={36} />
    </header>
  );
};

export default MobileHeader;
