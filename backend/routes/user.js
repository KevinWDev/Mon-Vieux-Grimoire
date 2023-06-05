const express = require('express');
const rateLimit = require('express-rate-limit')
const router = express.Router();
const userCtrl = require('../controllers/user');

const signupLimiter = rateLimit({
    windowMS: 60 * 60 * 1000,
    max: 5,
})

router.post('/signup', signupLimiter, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;