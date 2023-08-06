const jwt = require('jsonwebtoken');
const BadRequestError = require('./Errors/BadRequestError');

const { JWT_SECRET = 'somekey' } = process.env;
const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
const verifyToken = (token) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    throw new BadRequestError('Что-то не так с токеном');
  }
  return decoded.id;
});

module.exports = {
  generateToken,
  verifyToken,
};
