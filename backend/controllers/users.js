const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send(err));

const getProfile = (req, res) => User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Id юзера не валидный' });
    }
    return res.status(500).send(err);
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Данные не прошли валидацию' });
      }
      return res.status(500).send(err);
    });
};

module.exports = { getUsers, getProfile, createUser };
