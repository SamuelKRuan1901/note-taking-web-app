import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '@/models/UserModel';

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;
  console.log(email, password);
  try {
    await mongoose.connect(process.env.MONGO_DB);
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ status: 404 });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    user.password = hashedPassword;
    await user.save();
    return Response.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ status: 500 });
  }
}
