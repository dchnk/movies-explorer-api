const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/jwt');
const NotFoundError = require('../utils/Errors/NotFoundError');
const AuthError = require('../utils/Errors/AuthError');
const BadRequestError = require('../utils/Errors/BadRequestError');
const ConflictError = require('../utils/Errors/ConflictError');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(
    req.user,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Новые данные не валидны'));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    })
      .then((newUser) => res.status(201).send(newUser)))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError('Введенные данные некорректны'));
      }
      if (error.code === 11000) {
        return next(new ConflictError('Пользователь уже существует'));
      }
      return next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((userData) => {
      if (!userData) {
        return next(new AuthError('Неверный email или пароль'));
      }

      return bcrypt.compare(password, userData.password, (err, result) => {
        if (result) {
          const token = generateToken(userData._id);
          return res.status(200).send({ token });
        }
        return next(new AuthError('Неверный email или пароль'));
      });
    })
    .catch(next);
};
