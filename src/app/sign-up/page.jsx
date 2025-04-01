'use client';
import React, { useState } from 'react';
import Logo from '@/assets/images/logo.svg';
import GoogleIcon from '@/assets/images/icon-google.svg';
import InfoIcon from '@/assets/images/icon-info.svg';
import Image from 'next/image';
import CommonInput from '@/components/CommonInput';
import PrimaryButton from '@/components/PrimaryButton';
import BorderButton from '@/components/BorderButton';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const SignUpPage = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password || !cfPassword) {
      setErr(true);
      toast.error('Please fill all fields');
      setIsLoading(false);
      return;
    }
    if (password !== cfPassword) {
      setErr(true);
      toast.error('Password and Confirm Password must be the same');
      setIsLoading(false);
      return;
    }
    setErr(false);
    console.log(email, password);
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      params: JSON.stringify({ email, password })
    });
    let status = res.status;
    if (status === 201) {
      toast.success('Sign up success');
      redirect('/login');
    }
    if (status === 400) {
      toast.error('User already exists');
      setIsLoading(false);
      return;
    }
    if (status === 500) {
      toast.error('Internal server error');
      setIsLoading(false);
      return;
    }
  };

  return (
    <section className='w-screen h-auto flex items-center justify-center py-10'>
      <div
        className={`w-4/5 h-auto min-lg:w-1/3 
        flex flex-col item-center justify-center 
        gap-3 border-2 border-slate-300  
        rounded-xl px-6 py-10 transition-all duration-500 ease-in
        ${err ? 'border-red-500 border-2' : ''}`}
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
            <h1 className='text-2xl font-bold mb-2'>Create Your Account</h1>
            <p className='text-sm text-slate-400 tracking-wide'>
              Sign up to start organizing your notes and boost your
              productivity.
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
          />
          <CommonInput
            label={'Confirm Password'}
            type={'password'}
            value={cfPassword}
            onChange={(e) => setCfPassword(e.target.value)}
          />
          <div className='flex items-center gap-2'>
            <Image
              className='dark:invert'
              src={InfoIcon}
              alt='infoIcon'
              width={20}
              height={20}
            />
            <span className='text-xs text-slate-500'>
              Password must be at least 8 characters.
            </span>
          </div>
          <PrimaryButton
            content={isLoading ? 'Loading' : 'Sign up'}
            type={'submit'}
            disabled={isLoading}
          />
        </form>
        <hr className='text-slate-500' />
        <form className='flex flex-col gap-5 items-center justify-center'>
          <div className='text-slate-600'>Or log in with</div>
          <BorderButton
            content={'Google'}
            icon={GoogleIcon}
            disabled={isLoading}
          />
        </form>
        <div className='text-center text-slate-600'>
          Already have account?{' '}
          <Link href={'/login'} className='font-semibold hover:underline'>
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
