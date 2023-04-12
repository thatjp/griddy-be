const express = require('express');

const { register, login, getMe } = require('../controllers/auth');

const { protect } = require('../middleware/auth')
const { validateUser } = require('../validators/userValidator')

const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', login);
router.post('/me', protect, getMe);

module.exports = router;
