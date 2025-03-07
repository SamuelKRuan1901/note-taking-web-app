const PrimaryButton = ({ content, ...props }) => {
  return (
    <button
      className={`w-full h-9 bg-blue-400 rounded-md text-white 
        text-xs hover:bg-blue-600 cursor-pointer flex items-center 
        justify-center transition-all duration-300`}
      {...props}
    >
      {content}
    </button>
  );
};

export default PrimaryButton;
