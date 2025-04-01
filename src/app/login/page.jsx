'use client';
import React, { useState } from 'react';
import Logo from '@/assets/images/logo.svg';
import GoogleIcon from '@/assets/images/icon-google.svg';
import Image from 'next/image';
import CommonInput from '@/components/CommonInput';
import PrimaryButton from '@/components/PrimaryButton';
import BorderButton from '@/components/BorderButton';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';

const LoginPage = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const session = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErr(true);
      toast.error('Please fill all fields');
      return;
    }
    setErr(false);
    // Assuming signIn is a function that handles the login process
    try {
      await signIn('credentials', { email, password });
      toast.success('Login success');
    } catch (error) {
      toast.error('Failed to login');
    }
  };

  return (
    <section className='w-screen h-auto flex items-center justify-center py-10'>
      {session.status === 'authenticated' && (
        <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
          <p className='text-lg font-bold'>You are already logged in</p>
          <Link
            href='/notes'
            className='text-lg font-bold text-blue-500 p-2 border rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
          >
            Go to Notes
          </Link>
        </div>
      )}
      {session.status !== 'authenticated' && (
        <div
          className={`w-4/5 h-auto min-lg:w-1/3
        flex flex-col item-center justify-center gap-3 border-2 border-slate-300 
        rounded-xl px-6 py-10 transition-all duration-500 ease-in
        ${err ? 'border-red-500 border-2' : ''}
        `}
        >
          <div className='flex items-center justify-center flex-col gap-4'>
            <Image
              className='dark:invert'
              src={Logo}
              alt='logo'
              width={80}
              height={36}
            />
            <div className='text-center mb-5'>
              <h1 className='text-2xl font-bold mb-2'>Welcome To Note</h1>
              <p className='text-sm text-slate-400 tracking-wide'>
                Please Log in to continue
              </p>
            </div>
          </div>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <CommonInput
              label={'Email Address'}
              type={'email'}
              placeholder={'email@example.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CommonInput
              label={'Password'}
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isLoginPage={true}
            />
            <PrimaryButton content={'Login'} type={'submit'} />
          </form>
          <hr className='text-slate-500' />
          <form className='flex flex-col gap-5 items-center justify-center'>
            <div className='text-slate-600'>Or log in with</div>
            <BorderButton content={'Google'} icon={GoogleIcon} />
          </form>
          <div className='text-center text-slate-600'>
            No account yet?{' '}
            <Link href={'/sign-up'} className='font-semibold hover:underline'>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoginPage;
