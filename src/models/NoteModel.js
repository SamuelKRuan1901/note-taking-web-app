import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema(
  {
    userEmail: {
      required: true,
      type: String,
      ref: 'User'
    },
    title: { required: true, type: String },
    content: { required: true, type: String },
    tags: [{ type: String }],
    lastEdited: { type: String, required: true },
    isArchived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Note = mongoose.models?.Note || mongoose.model('Note', noteSchema);
