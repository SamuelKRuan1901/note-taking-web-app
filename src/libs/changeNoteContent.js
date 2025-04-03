'use server';
import { Note } from '@/models/NoteModel';
import mongoose from 'mongoose';
// import { getServerSession } from 'next-auth';

export async function changeNoteContent(noteId, newContent) {
  console.log(newContent);
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
    chosenChangeNote.content = newContent;
    chosenChangeNote.lastEdited = date.toISOString();
    await chosenChangeNote.save();
    return 200;
  } catch (error) {
    console.error(error);
  }
}
