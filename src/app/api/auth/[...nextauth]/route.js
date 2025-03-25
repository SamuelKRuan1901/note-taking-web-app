import mongoose from 'mongoose';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '@/models/UserModel';
import bcrypt from 'bcrypt';

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET, // Get this from your .env file
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_DB);
        const user = await User.findOne({ email });
        if (!user) {
          console.log('User does not exist');
          return null;
        }

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
          console.log('Password is incorrect');
          return null;
        }
        return user;
      }
    })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
