const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getProfile, getMe, updateAvatar } = require('../controllers/users');

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

module.exports = router;
