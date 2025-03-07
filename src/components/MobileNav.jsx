'use client';
import Image from 'next/image';
import HomeIcon from '@/assets/images/icon-home.svg';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import TagIcon from '@/assets/images/icon-tag.svg';
import SearchIcon from '@/assets/images/icon-search.svg';
import SettingIcon from '@/assets/images/icon-settings.svg';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';

const MobileNav = () => {
  const navElements = [
    { id: 1, icon: HomeIcon, alt: 'Home', href: '/notes' },
    { id: 2, icon: SearchIcon, alt: 'Search', href: '/search' },
    { id: 3, icon: ArchiveIcon, alt: 'Archive', href: '/archive' },
    { id: 4, icon: TagIcon, alt: 'Tag', href: '/tags' },
    { id: 5, icon: SettingIcon, alt: 'Setting', href: '/setting' }
  ];

  const pathname = usePathname();
  return (
    <div
      className={`fixed bottom-0 w-full h-16
          flex justify-around items-center
          transition-all duration-500 ease-in-out
          min-lg:hidden border-t-2 border-gray-200 
          bg-white hover:border-gray-300 ${
            pathname === '/' ||
            pathname === '/login' ||
            pathname === '/sign-up' ||
            pathname === '/forgot-password' ||
            pathname === '/reset-password'
              ? 'hidden'
              : ''
          }
          `}
    >
      {navElements.map((element) => (
        <div
          key={element.id}
          onClick={() => redirect(element.href)}
          className={`hover:bg-sky-200 flex items-center justify-center
              px-5 py-1 rounded-sm transition-all duration-500 ease-in-out
              cursor-pointer ${pathname === element.href && 'bg-sky-200'}`}
        >
          <Image src={element.icon} alt={element.alt} />
        </div>
      ))}
    </div>
  );
};

export default MobileNav;
