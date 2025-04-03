'use server';
import { Note } from '@/models/NoteModel';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export async function deleteNote(noteId) {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    const session = await getServerSession();
    const chosenDeleteNote = await Note.findOneAndDelete({
      _id: noteId,
      userEmail: session.user.email
    });
    console.log(chosenDeleteNote);
    if (!chosenDeleteNote) {
      return 404;
    }
    return 200;
  } catch (error) {
    console.error(error);
  }
}
