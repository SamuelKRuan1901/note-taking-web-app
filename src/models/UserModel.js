import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    colorTheme: {
      type: String,
      default: 'light'
    },
    fontTheme: {
      type: String,
      default: 'sans'
    }
  },
  { timestamp: true }
);

export const User = mongoose.models?.User || mongoose.model('User', userSchema);
