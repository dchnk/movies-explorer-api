const Movie = require('../models/movie');
const NotFoundError = require('../utils/Errors/NotFoundError');
const BadRequestError = require('../utils/Errors/BadRequestError');
const ForbiddenError = require('../utils/Errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

module.exports.saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    owner: req.user,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Данные невалидны ${err.message}`));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Не найдено'));
      }
      if (movie.owner.toString() !== req.user) {
        return next(new ForbiddenError('Нет прав для удаления'));
      }
      return Movie.findByIdAndDelete(req.params._id)
        .then(res.status(200).send({ message: 'Удалено' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный ID'));
      }
      return next(err);
    });
};
