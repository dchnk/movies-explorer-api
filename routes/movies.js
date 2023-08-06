const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { RegExp } = require('../utils/linkRegexTest');

const {
  getMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(RegExp).required(),
    trailerLink: Joi.string().pattern(RegExp).required(),
    thumbnail: Joi.string().pattern(RegExp).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), saveMovie);

module.exports = router;
