'use client';
import NoteItem from '@/components/NoteItem';
import { useContext, useState } from 'react';
import ArrowIcon from '@/assets/images/icon-arrow-left.svg';
import DeleteIcon from '@/assets/images/icon-delete.svg';
import ArchiveIcon from '@/assets/images/icon-archive.svg';
import TagIcon from '@/assets/images/icon-tag.svg';
import ClockIcon from '@/assets/images/icon-clock.svg';
import Image from 'next/image';
import MobileNav from '@/components/MobileNav';
import MobileAllNotes from '@/components/MobileAllNotes';
import { NoteContext } from '@/contexts/NoteProvider';
import MobileTags from '@/components/MobileTags';
import MobileSearchNote from '@/components/MobileSearchNote ';
import MobileArchivedNote from '@/components/MobileArchivedNote';
import MobileSetting from '@/components/MobileSetting';

const MobileNotesPage = () => {
  const data = require('@/app/api/data.json');
  const [noteId, setNoteId] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const filterData = data.notes.filter((item) => item.id === noteId);
  const editingDate = new Date(filterData[0]?.lastEdited);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = editingDate.toLocaleString('en-GB', options);

  const { chosen } = useContext(NoteContext);

  const handleShowPage = (chosen) => {
    if (chosen === 'Notes') {
      return <MobileAllNotes />;
    } else if (chosen === 'Archived') {
      return <MobileArchivedNote />;
    } else if (chosen === 'Search') {
      return <MobileSearchNote />;
    } else if (chosen === 'Settings') {
      return <MobileSetting />;
    } else {
      return <MobileTags />;
    }
  };
  return (
    <>
      {handleShowPage(chosen)}
      <MobileNav />
    </>
  );
};

export default MobileNotesPage;
