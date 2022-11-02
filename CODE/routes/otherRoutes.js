const router = require('express').Router();
const { register, login, loginScren, dashboard, getProfile, filteredDashboard } = require('../controllers/userController');
const { isAuthenticatedUser, isLoginedUser } = require('../middlewares/auth');

router.get('/login', isLoginedUser, loginScren);

router.post('/login', isLoginedUser, login);

router.post('/register', isLoginedUser, register);

router.get('/', isAuthenticatedUser, dashboard);

router.post('/',isAuthenticatedUser,filteredDashboard);

module.exports = router;