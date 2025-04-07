import { User } from '@/models/UserModel';
import mongoose from 'mongoose';

export async function POST(req) {
  const { email } = await req.json();
  try {
    await mongoose.connect(process.env.MONGO_DB);
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ status: 404 });
    }
    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500 });
  }
}
