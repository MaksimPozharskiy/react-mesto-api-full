const router = require('express').Router();
const { getUsers, getProfile, getMe } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:id', getProfile);

module.exports = router;
