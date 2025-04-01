import { User } from '@/models/UserModel';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const body = await req.json();
  let { email, password } = body;
  console.log(email, password);
  // Check if user already exists in the database. If yes, return an error status code. If no, hash the password and create a new user.
  try {
    await mongoose.connect(process.env.MONGO_DB);
    const user = await User.findOne({ email });
    if (user) {
      return Response.json({ message: 'User already exists' }, { status: 400 });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      email: email,
      password: hashedPassword
    });
    await newUser.save();
    return Response.json({ message: 'Success in register' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
