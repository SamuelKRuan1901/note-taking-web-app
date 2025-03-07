'use client';
import React, { useState } from 'react';
import Logo from '@/assets/images/logo.svg';
import Image from 'next/image';
import CommonInput from '@/components/CommonInput';
import PrimaryButton from '@/components/PrimaryButton';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const ForgotPasswordPage = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErr(true);
      toast.error('Please enter your email');
      return;
    }

    setErr(false);
    console.log(email);
    toast.success('success');
    redirect('/reset-password');
  };

  return (
    <section className='w-screen h-screen flex items-center justify-center py-10'>
      <div
        className={`w-4/5 h-auto min-lg:w-1/2 
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
            <h1 className='text-2xl font-bold mb-2'>
              Forgotten your password?
            </h1>
            <p className='text-sm text-slate-400 tracking-wide'>
              Enter your email below, and we’ll send you a link to reset it.
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
          <PrimaryButton content={'Send Reset Link'} type={'submit'} />
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
