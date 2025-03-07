import Image from 'next/image';
import React from 'react';

const BorderButton = ({ content, icon = {} }) => {
  return (
    <button
      className={`w-full h-10 px-2 border-2 border-slate-600 
        rounded-md text-slate-700 text-xs text-md font-semibold 
        bg-slate-100 hover:bg-slate-400 cursor-pointer 
        flex items-center justify-center gap-2 transition-colors 
        duration-300`}
    >
      {icon && <Image src={icon} alt={'btnIcon'} width={15} height={15} />}
      {content}
    </button>
  );
};

export default BorderButton;
