import mongoose from 'mongoose';

const languageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Language = mongoose.model('Language', languageSchema);