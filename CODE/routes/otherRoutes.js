const router = require('express').Router();
const { register, login, loginScren, dashboard, getProfile } = require('../controllers/userController');
const { isAuthenticatedUser, isLoginedUser } = require('../middlewares/auth');

router.get('/login', isLoginedUser, loginScren);

router.post('/login', isLoginedUser, login);

router.post('/register', isLoginedUser, register);

router.get('/', isAuthenticatedUser, dashboard);

module.exports = router;