'use client';
import { createContext, useEffect, useState } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [chosen, setChosen] = useState('Notes');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  // const data = require('@/app/api/data.json');

  // create a note
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [archive, setArchive] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [date, setDate] = useState();

  const dateFormate = (note) => {
    const editingDate = new Date(note?.lastEdited);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return editingDate.toLocaleString('en-GB', options);
  };

  const getNotes = async () => {
    try {
      await fetch('api/notes')
        .then((res) => {
          if (!res.ok) return null;
          return res.json();
        })
        .then((notes) => {
          console.log(notes);
          setData(notes);
        });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const values = {
    data,
    setData,
    date,
    setDate,
    isEditing,
    setIsEditing,
    noteId,
    setNoteId,
    dateFormate,
    chosen,
    setChosen,
    search,
    setSearch,
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    archive,
    setArchive,
    isCancel,
    setIsCancel,
    getNotes
  };
  return <NoteContext.Provider value={values}>{children}</NoteContext.Provider>;
};
