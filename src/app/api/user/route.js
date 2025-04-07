import { User } from '@/models/UserModel';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export async function GET(req) {
  const session = await getServerSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  const email = session.user.email;
  try {
    await mongoose.connect(process.env.MONGO_DB);
    if (!email) {
      return new Response('Missing email', { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Remove password from user object before sending it to client
    let resUser = {
      email: user.email,
      password: (user.password = undefined),
      id: (user._id = undefined),
      colorTheme: user.colorTheme,
      fontTheme: user.fontTheme
    };

    return Response.json({
      user: resUser
    });
  } catch (err) {
    console.log(err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// change font theme
export async function POST(req) {
  const { newFont } = await req.json();
  const session = await getServerSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  const email = session?.user.email;
  if (!email) {
    return new Response('Missing email', { status: 400 });
  }
  try {
    await mongoose.connect(process.env.MONGO_DB);
    const user = await User.findOne({ email });
    if (!user) {
      return new Response('User not found', { status: 404 });
    }
    user.fontTheme = newFont;
    await user.save();
  } catch (err) {
    console.log(err);
    return new Response('Internal Server Error', { status: 500 });
  }
  return new Response('ok', { status: 200 });
}
