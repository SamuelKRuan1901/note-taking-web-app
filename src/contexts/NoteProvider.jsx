'use client';
import { createContext, useState } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [chosen, setChosen] = useState('Notes');
  const data = require('@/app/api/data.json');

  // create a note
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [archive, setArchive] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const dateFormate = (note) => {
    const editingDate = new Date(note?.lastEdited);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return editingDate.toLocaleString('en-GB', options);
  };

  const values = {
    isEditing,
    setIsEditing,
    data,
    noteId,
    setNoteId,
    dateFormate,
    chosen,
    setChosen,
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    archive,
    setArchive,
    isCancel,
    setIsCancel
  };
  return <NoteContext.Provider value={values}>{children}</NoteContext.Provider>;
};
