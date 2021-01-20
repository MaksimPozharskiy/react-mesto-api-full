const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

// Подлключение к БД mestodb
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Мидлвары
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

// Временное решение для авторизаци
app.use((req, res, next) => {
  req.user = {
    _id: '5fea1309760f053b4c12804c',
  };

  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.post('/signin', login);
app.post('/signup', createUser);
app.use('*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
