'use server';
import { Note } from '@/models/NoteModel';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export async function archiveNote(noteId) {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    const session = await getServerSession();
    const chosenArchiveNote = await Note.findById({
      _id: noteId
    });
    if (!chosenArchiveNote) {
      return 404;
    }
    chosenArchiveNote.isArchived = true;
    await chosenArchiveNote.save();
    console.log(chosenArchiveNote);
    if (!chosenArchiveNote) {
      return 404;
    }
    return 200;
  } catch (error) {
    console.error(error);
  }
}
