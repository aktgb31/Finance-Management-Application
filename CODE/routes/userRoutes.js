const router  = require('express').Router();

const { register } = require('../controllers/userController');
const {isAuthenticatedUser, isLoginedUser} = require('../middlewares/auth');



module.exports = router;