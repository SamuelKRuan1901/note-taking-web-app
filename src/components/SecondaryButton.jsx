const SecondaryButton = ({ content, ...props }) => {
  return (
    <button
      className='w-full h-11 bg-slate-300 rounded-md text-slate-700 text-md hover:bg-slate-500 cursor-pointer flex items-center justify-center gap-2'
      {...props}
    >
      {content}
    </button>
  );
};

export default SecondaryButton;
