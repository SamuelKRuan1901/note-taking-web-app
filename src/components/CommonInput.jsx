'use client';
import Image from 'next/image';
import ShowPassword from '@/assets/images/icon-show-password.svg';
import HidePassword from '@/assets/images/icon-hide-password.svg';
import Link from 'next/link';
import { useState } from 'react';

const CommonInput = ({
  label,
  type,
  placeholder = '',
  isLoginPage = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isShowTextPassword =
    type === 'password' && showPassword ? 'text' : type;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <label className='flex flex-col gap-1 text-sm font-semibold tracking-wide relative'>
      <div className='flex justify-between'>
        <span className='px-2'>{label}</span>
        {isLoginPage && (
          <span className='text-xs text-slate-500 underline cursor-pointer hover:text-slate-700'>
            <Link href='/forgot-password'>Forgot</Link>
          </span>
        )}
      </div>

      <input
        type={isShowTextPassword}
        placeholder={placeholder}
        className='w-full h-11 border-2 border-slate-400 rounded-md pl-2 pr-8'
        {...props}
      />
      {isPassword && (
        <Image
          src={showPassword ? HidePassword : ShowPassword}
          alt='showPassIcon'
          width={20}
          height={20}
          className='absolute right-2 top-9 cursor-pointer'
          onClick={handleShowPassword}
        />
      )}
    </label>
  );
};

export default CommonInput;
