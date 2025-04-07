import MobileHeader from '@/components/MobileHeader';
import { NoteContext } from '@/contexts/NoteProvider';
import { useContext } from 'react';
import TagIcon from '@/assets/images/icon-tag.svg';
import arrowLeftIcon from '@/assets/images/icon-arrow-left.svg';
import NoteItem from '@/components/NoteItem';
import Image from 'next/image';
import MobileNoteSinglePage from '@/components/MobileNoteSinglePage';

const MobileTags = () => {
  const {
    data,
    noteId,
    setNoteId,
    isEditing,
    setIsEditing,
    chosen,
    setChosen,
    chosenTags,
    setChosenTags
  } = useContext(NoteContext);
  const Tags = data?.map((note) => note.tags.map((tag) => tag));
  const uniqueTags = [...new Set(Tags?.flat())];

  const handleChoseNote = (note) => {
    if (note !== noteId && isEditing === true) {
      toast.error('Cannot switch notes while editing');
      setIsCancel(true);
      return;
    }
    setNoteId(note);
    setIsEditing(false);
  };

  const handleChoseTag = (chosenTag) => {
    setChosen(chosenTag);
    setChosenTags(chosenTag);
    setNoteId(0);
  };
  const handleBackToTagOptions = () => {
    setChosen('Tags');
    setChosenTags('');
  };
  return (
    <div className='w-screen h-screen relative'>
      <MobileHeader />
      {noteId === 0 && (
        <>
          <div className='flex items-center justify-content-center gap-3 px-2'>
            {chosenTags !== '' && (
              <div
                className={`flex items-center justify-center w-18
                          gap-1 p-1 hover:bg-slate-300 dark:hover:bg-slate-800 
                          cursor-pointer rounded-md text-xs`}
                onClick={handleBackToTagOptions}
              >
                <Image
                  className='dark:invert'
                  src={arrowLeftIcon}
                  alt={'arrowLeft'}
                  priority={false}
                  width={'auto'}
                  height={'auto'}
                />
                Back
              </div>
            )}
            <h1 className='text-xl p-2 font-semibold'>
              {chosenTags ? `Note Tagged: ${chosenTags}` : 'Tags'}
            </h1>
          </div>

          {/* show tags  */}
          {chosenTags === '' && (
            <>
              {chosen !== 'Notes' &&
                chosen !== 'Search' &&
                chosen !== 'Archived' &&
                chosen !== 'Settings' && (
                  <div className='w-full h-auto pt-5 flex flex-col items-start justify-start gap-1 overflow-auto'>
                    {uniqueTags.map((tag, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-start gap-1 p-1
                          hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md 
                          cursor-pointer transition-all duration-300 text-xs
                          ${
                            chosen === tag
                              ? 'bg-slate-200 dark:bg-slate-700'
                              : ''
                          }`}
                        onClick={() => handleChoseTag(tag)}
                      >
                        <Image
                          className='dark:invert'
                          src={TagIcon}
                          alt={'TagIcon'}
                          priority={false}
                          width={'auto'}
                          height={'auto'}
                        />

                        {tag}
                      </div>
                    ))}
                  </div>
                )}
            </>
          )}
          {chosenTags !== '' && (
            <>
              <div
                className={`${
                  noteId !== 0 && typeof noteId === 'string' ? 'hidden' : ''
                }`}
              >
                {data
                  ?.filter((note) => note.tags.includes(chosenTags))
                  .map((note) => (
                    <div
                      className={`${
                        noteId === note._id
                          ? 'bg-slate-300 dark:bg-slate-700'
                          : ''
                      }`}
                      key={note._id}
                      onClick={() => handleChoseNote(note._id)}
                    >
                      <NoteItem
                        title={note.title}
                        tags={note.tags}
                        date={note.lastEdited}
                      />
                    </div>
                  ))}
              </div>
            </>
          )}
        </>
      )}
      {noteId !== 0 && typeof noteId === 'string' && <MobileNoteSinglePage />}
    </div>
  );
};

export default MobileTags;
