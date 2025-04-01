import CommonInput from '@/components/CommonInput';
import PrimaryButton from '@/components/PrimaryButton';
import InfoIcon from '@/assets/images/icon-info.svg';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warn('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const res = await fetch('api/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    if (res.status === 401) {
      toast.error('Unauthorized');
      return;
    }
    if (res.status === 402) {
      toast.error('Incorrect password');
      return;
    }
    if (res.status === 500) {
      toast.error('Internal server error');
      return;
    }
    toast.success('Password changed successfully');
    window.location.reload();
  };

  return (
    <div className='w-full p-6 flex flex-col gap-8'>
      <div className='w-96 h-12'>
        <h1 className='text-xl font-bold '>Change Password</h1>
      </div>
      <div className='w-96 flex flex-col gap-4'>
        <CommonInput
          label={'Old Password'}
          type={'password'}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <CommonInput
          label={'New Password'}
          type={'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
        <CommonInput
          label={'Confirm New Password'}
          type={'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className='w-full flex justify-end items-end'>
          <div className='w-36'>
            <PrimaryButton
              content={'Save Password'}
              onClick={handleChangePassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
