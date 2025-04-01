import { User } from '@/models/UserModel';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { oldPassword, newPassword } = await req.json();
  console.log(oldPassword, newPassword);
  const session = await getServerSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return new Response('User not found', { status: 404 });
  }
  const password = user.password;
  const isMatch = await bcrypt.compare(oldPassword, password);
  if (!isMatch) {
    return new Response('Incorrect password', { status: 402 });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);
  user.password = hashedPassword;
  console.log(hashedPassword);
  await user.save();

  return new Response({ status: 200 });
}
