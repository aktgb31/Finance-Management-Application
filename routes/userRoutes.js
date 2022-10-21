const router  = require('express').Router();

const { register } = require('../controllers/userController');
const {isAuthenticatedUser, isLoginedUser} = require('../middlewares/auth');

router.post('/register/', isAuthenticatedUser,register);