'use client';
import Logo from '@/assets/images/logo.svg';
import PrimaryButton from '@/components/PrimaryButton';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <main className='w-screen h-full flex flex-col justify-center items-center gap-4 my-16 py-12 px-4 rounded-md text-center'>
      <div className='min-w-1/3 h-auto flex flex-col justify-center items-center gap-4'>
        <Image src={Logo} alt='Logo' width={120} height={40} />
        <h1 className='text-4xl text-slate-800'>
          Welcome to the Note Take App
        </h1>
        <p className='text-lg text-slate-600'>
          This is a simple note taking app built with Next.js and Tailwind CSS.
        </p>
        <PrimaryButton
          content={'Get Start'}
          onClick={() => redirect('/login')}
        />
      </div>
    </main>
  );
}
