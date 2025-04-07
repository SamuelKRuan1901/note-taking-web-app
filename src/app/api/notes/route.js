import { Note } from '@/models/NoteModel';
import { User } from '@/models/UserModel';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export async function POST(req) {
  const body = await req.json();
  const { title, tags, content, lastEdited, isArchived } = body;
  // Create a new note in the database using the provided title and content.
  // Return the created note's ID.
  const session = await getServerSession();
  try {
    await mongoose.connect(process.env.MONGO_DB);
    const user = await User.findOne({ email: session?.user.email });
    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }
    const newNote = new Note({
      userEmail: session.user.email,
      title,
      tags,
      content,
      lastEdited,
      isArchived
    });
    await newNote.save();
    return Response.json('ok', { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    const session = await getServerSession();
    const notes = await Note.find({ userEmail: session?.user.email });
    return Response.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE() {
  const body = await req.json();
  const { id } = body;
  try {
    await mongoose.connect(process.env.MONGO_DB);
    const session = await getServerSession();
    const note = await Note.findOneAndDelete({
      _id: id,
      userEmail: session?.user?.email
    });
    if (!note) {
      return Response.json({ message: 'Note not found' }, { status: 404 });
    }
    return Response.json('ok', { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
