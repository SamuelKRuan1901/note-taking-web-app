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
    <div className='w-full h-full flex text-xs'>
      <div className='w-full h-full p-3'>
        <NoteHeader
          title={filterData[0]?.title}
          tags={filterData[0]?.tags}
          date={formattedDate}
          archived={filterData[0]?.isArchived}
        />
        {/* <div>{filterData[0]?.content}</div> */}
        <textarea
          name='note-text'
          rows={15}
          cols={50}
          className='w-full h-auto my-4 border-0 overflow-auto p-3'
          value={changeNoteContent}
          placeholder={noteContent}
          onChange={(e) => handleEditNote(e)}
          onClick={handleStartChangeNote}
        ></textarea>
      </div>
      <div className='w-44 py-2 px-2 border-l border-slate-400 flex flex-col justify-between gap-4'>
        <div className='w-full flex flex-col gap-3'>
          <BorderButton content={'Archive Note'} icon={ArchiveIcon} />
          <BorderButton content={'Delete Note'} icon={DeleteIcon} />
        </div>
        {showBtn === true && (
          <div className='w-full py-2 border-slate-400 flex flex-col gap-1'>
            <span className='w-auto' onClick={handelSaveNote}>
              <PrimaryButton content={'Save Note'} />
            </span>
            <span className='w-auto' onClick={handleCancelChange}>
              <SecondaryButton content={'Cancel'} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteSinglePage;
