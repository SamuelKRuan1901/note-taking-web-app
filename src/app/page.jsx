'use client';
import Logo from '@/assets/images/logo.svg';
import PrimaryButton from '@/components/PrimaryButton';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <section
      className={`w-screen h-full flex flex-col 
    justify-center items-center gap-4 my-16 py-12 
    px-4 rounded-md text-center`}
    >
      <div className='min-w-1/3 h-auto flex flex-col justify-center items-center gap-4'>
        <Image
          className='dark:invert'
          src={Logo}
          alt='Logo'
          width={120}
          height={40}
        />
        <h1 className='text-4xl'>Welcome to the Note Take App</h1>
        <p className='text-lg text-slate-600 dark:text-slate-400'>
          This is a simple note taking app built with Next.js and Tailwind CSS.
        </p>
        <PrimaryButton
          content={'Get Start'}
          onClick={() => redirect('/login')}
        />
      </div>
    </section>
  );
}
