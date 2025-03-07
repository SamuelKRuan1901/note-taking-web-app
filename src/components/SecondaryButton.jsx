const SecondaryButton = ({ content, ...props }) => {
  return (
    <button
      className={`w-full h-9 bg-slate-300 rounded-md 
        text-slate-700 text-xs hover:bg-slate-500 
        cursor-pointer flex items-center justify-center`}
      {...props}
    >
      {content}
    </button>
  );
};

export default SecondaryButton;
