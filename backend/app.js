require('dotenv').config();
const express = require('express');
const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

// Подлключение к БД mestodb
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Мидлвары
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  next();
});
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(requestLogger); // логи запросов
app.use(errorLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(8).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.use(auth);
app.use('/users', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
