import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema(
  {
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: { required: true, type: String },
    content: { required: true, type: String },
    tags: [{ type: String }],
    lastEdited: { type: string, default: Date.now },
    isArchived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Note = mongoose.models?.Note || mongoose.model('Note', noteSchema);
