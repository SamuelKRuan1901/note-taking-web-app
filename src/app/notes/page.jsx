import DesktopNotesPage from '@/app/notes/components/DesktopNotesPage';
import MobileNotesPage from '@/app/notes/components/MobileNotesPage';

const NotesPage = () => {
  return (
    <section
      className={`w-screen h-full flex flex-col justify-center 
      items-center min-lg:my-0 min-lg:px-0 my-16 
      px-4 rounded-md overflow-x-hidden`}
    >
      <div className='w-full min-lg:hidden'>
        <MobileNotesPage />
      </div>
      <div className='w-full max-lg:hidden'>
        <DesktopNotesPage />
      </div>
    </section>
  );
};

export default NotesPage;
