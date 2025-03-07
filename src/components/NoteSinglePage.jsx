'use client';
import BorderButton from '@/components/BorderButton';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import DeleteIcon from '@/assets/images/icon-delete.svg';
import NoteHeader from '@/components/NoteHeader';
import { useContext, useEffect, useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { NoteContext } from '@/contexts/NoteProvider';

const NoteSinglePage = () => {
  const { noteId, data, dateFormate } = useContext(NoteContext);
  const filterData = data.notes.filter((item) => item.id === noteId);
  const formattedDate = dateFormate(filterData[0]);
  const [noteContent, setNoteContent] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [changeNoteContent, setChangeNoteContent] = useState('');

  const handleEditNote = (e) => {
    setChangeNoteContent(noteContent + e.target.value);
    setShowBtn(true);
  };

  const handelSaveNote = () => {
    setNoteContent(changeNoteContent);
    setChangeNoteContent('');
    setShowBtn(false);
  };

  const handleCancelChange = () => {
    setChangeNoteContent('');
    setShowBtn(false);
  };

  const handleStartChangeNote = () => {
    setShowBtn(true);
    setChangeNoteContent(noteContent);
  };

  useEffect(() => {
    setNoteContent(filterData[0].content);
  });

  console.log(filterData);
  return (
    <div className='w-full h-full flex'>
      <div className='w-full h-full p-5'>
        <NoteHeader
          title={filterData[0]?.title}
          tags={filterData[0]?.tags}
          date={formattedDate}
          archived={filterData[0]?.isArchived}
        />
        {/* <div>{filterData[0]?.content}</div> */}
        <textarea
          name='note-text'
          rows={20}
          cols={50}
          className='w-full h-[450px] mt-2 border-0 overflow-auto'
          value={changeNoteContent}
          placeholder={noteContent}
          onChange={(e) => handleEditNote(e)}
          onClick={handleStartChangeNote}
        ></textarea>
        {showBtn === true && (
          <div className='w-full py-5 border-t border-slate-400 flex gap-3'>
            <span className='w-24' onClick={handelSaveNote}>
              <PrimaryButton content={'Save Note'} />
            </span>
            <span className='w-24' onClick={handleCancelChange}>
              <SecondaryButton content={'Cancel'} />
            </span>
          </div>
        )}
      </div>
      <div className='w-64 h-full py-10 pl-4 pr-10 border-l border-slate-400 flex flex-col gap-4'>
        <BorderButton content={'Archive Note'} icon={ArchiveIcon} />
        <BorderButton content={'Delete Note'} icon={DeleteIcon} />
      </div>
    </div>
  );
};

export default NoteSinglePage;
