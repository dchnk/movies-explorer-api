const mongoose = require('mongoose');

const { linkRegexTest } = require('../utils/linkRegexTest');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return linkRegexTest(v);
      },
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator(v) {
        return linkRegexTest(v);
      },
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(v) {
        return linkRegexTest(v);
      },
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('movie', movieSchema);
