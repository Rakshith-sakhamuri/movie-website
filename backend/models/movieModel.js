import mongoose from 'mongoose';

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    // language: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Language',
    //   required: true,
    // },
    releaseYear: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      range: [0, 10]
    },
  },
  {
    timestamps: true,
  }
);

export const Movie = mongoose.model('Movie', movieSchema);