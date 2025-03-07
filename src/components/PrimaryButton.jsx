const PrimaryButton = ({ content, ...props }) => {
  return (
    <button
      className={`w-full h-11 bg-blue-400 rounded-md text-white 
        text-md hover:bg-blue-600 cursor-pointer flex items-center 
        justify-center gap-2 transition-all duration-300`}
      {...props}
    >
      {content}
    </button>
  );
};

export default PrimaryButton;
