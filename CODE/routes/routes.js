const router = require('express').Router();
const { register, login, loginScren, dashboard, profile } = require('../controllers/userController');
const { isAuthenticatedUser, isLoginedUser } = require('../middlewares/auth');

router.get('/login', isLoginedUser, loginScren);

router.post('/login', isLoginedUser, login);

router.get('/profile', profile);

router.post('/register', isLoginedUser, register);

router.get('/', isAuthenticatedUser, dashboard);

module.exports = router;