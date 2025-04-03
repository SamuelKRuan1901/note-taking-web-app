import CommonInput from '@/components/CommonInput';
import PrimaryButton from '@/components/PrimaryButton';
import InfoIcon from '@/assets/images/icon-info.svg';
import Image from 'next/image';
import React, { useContext } from 'react';
import { SettingContext } from '@/contexts/SettingProvider';

const ChangePassword = () => {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword
  } = useContext(SettingContext);

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
