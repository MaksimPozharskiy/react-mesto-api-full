const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send(err));

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Данные не прошли валидацию' });
      }
      return res.status(500).send(err);
    });
};

const deleteCard = (req, res) => {
  Card.findOneAndRemove({ owner: req.user._id, _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(200).send('Карточка удалена');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Id карточки не валидный' });
      }
      return res.status(500).send(err);
    });
};

module.exports = { getCards, createCard, deleteCard };
