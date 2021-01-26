const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getProfile, getMe, updateAvatar, updateProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
}), getProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().trim().uri(),
  }),
}), updateAvatar);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

module.exports = router;
