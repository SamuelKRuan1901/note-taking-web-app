'use client';
import React, { useState } from 'react';
import Logo from '@/assets/images/logo.svg';
import InfoIcon from '@/assets/images/icon-info.svg';
import Image from 'next/image';
import CommonInput from '@/components/CommonInput';
import PrimaryButton from '@/components/PrimaryButton';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const ForgotPasswordPage = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const [result, setResult] = useState();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password || !cfPassword) {
      toast.error('Please fill all fields');
      return;
    }
    if (password !== cfPassword) {
      toast.error('Password and Confirm Password must be the same');
      return;
    }
    console.log(password);
    await fetch('api/forgotPassword/resetPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === 500) {
          toast.error('Failed to reset password');
          return;
        }
        if (data.status === 404) {
          toast.error('Email not found');
          return;
        }
        toast.success('Reset password success');
        redirect('/login');
      });
  };

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setErr(false);
      toast.error('Please enter your email');
      return;
    }
    await fetch(`api/forgotPassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === 500) {
          toast.error('Failed to send email');
          return;
        }
        if (data.status === 404) {
          toast.error('Email not found');
          return;
        }
        toast.success('Enter your new password');
        setErr(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to send email');
      });
  };

  return (
    <section className='w-screen h-screen flex items-center justify-center py-10'>
      {err === false && (
        <div
          className={`w-4/5 h-auto min-lg:w-1/2 
        flex flex-col item-center justify-center 
        gap-3 border-2 border-slate-300 
        rounded-xl px-6 py-10 transition-all duration-500 ease-in
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
              <h1 className='text-2xl font-bold mb-2'>
                Forgotten your password?
              </h1>
              <p className='text-sm text-slate-400 tracking-wide'>
                Enter your email below, and we’ll send you a link to reset it.
              </p>
            </div>
          </div>
          <form className='flex flex-col gap-4' onSubmit={handleCheckEmail}>
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
      )}
      {err === true && (
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
              <h1 className='text-2xl font-bold mb-2'>Reset Your Password</h1>
              <p className='text-sm text-slate-400 tracking-wide'>
                Choose a new password to secure your account.
              </p>
            </div>
          </div>
          <form className='flex flex-col gap-4' onSubmit={handleResetPassword}>
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
              <Image src={InfoIcon} alt='infoIcon' width={20} height={20} />
              <span className='text-xs text-slate-500'>
                Password must be at least 8 characters.
              </span>
            </div>
            <PrimaryButton content={'Reset Password'} type={'submit'} />
          </form>
        </div>
      )}
    </section>
  );
};

export default ForgotPasswordPage;
