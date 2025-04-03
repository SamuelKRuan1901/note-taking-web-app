'use server';
import { Note } from '@/models/NoteModel';
import mongoose from 'mongoose';
// import { getServerSession } from 'next-auth';

export async function changeNoteContent(noteId, newTitle, newTags, newContent) {
  console.log(newTitle, newTags, newContent);
  try {
    await mongoose.connect(process.env.MONGO_DB);
    // const session = await getServerSession();
    const date = new Date();

    const chosenChangeNote = await Note.findById({
      _id: noteId
    });
    console.log(chosenChangeNote);
    if (!chosenChangeNote) {
      return 404;
    }
    chosenChangeNote.title =
      newTitle.charAt(0).toUpperCase() + newTitle.slice(1, newTitle.length);
    chosenChangeNote.tags = newTags
      .split(',')
      .map(
        (tag) =>
          tag.trim().charAt(0).toUpperCase() + tag.trim().slice(1).toLowerCase()
      );
    chosenChangeNote.content = newContent;
    chosenChangeNote.lastEdited = date.toISOString();
    await chosenChangeNote.save();
    return 200;
  } catch (error) {
    console.error(error);
  }
}
