/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const { errorsFisher } = require('./middlewares/errorsFisher');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const app = express();

const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/bitfilmsdb', {
  useNewUrlParser: true,
  autoIndex: true,
}).then(() => {
  console.log('db is connected');
});

// app.use(cors({
//   origin: ['http://denis-diachenko.nomoredomains.work', 'https://denis-diachenko.nomoredomains.work'],
// }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsFisher);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
