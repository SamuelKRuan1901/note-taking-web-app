const NoteItem = ({ title, tags, date }) => {
  const editingDate = new Date(date);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = editingDate.toLocaleString('en-GB', options);
  return (
    <div
      className={`w-full h-auto px-3 py-4 flex flex-col gap-4 border-b 
      border-slate-400 cursor-pointer hover:bg-slate-200 hover:text-slate-900
        transition-all duration-500`}
    >
      <div className='text-xl font-bold tracking-wider'>{title}</div>
      <div className='flex gap-2'>
        {tags?.map((item, index) => (
          <div
            key={index}
            className='bg-slate-200 px-2 py-0.5 rounded-lg text-slate-600'
          >
            {item}
          </div>
        ))}
      </div>
      <div className='text-slate-400 tracking-wider'>{formattedDate}</div>
    </div>
  );
};

export default NoteItem;
