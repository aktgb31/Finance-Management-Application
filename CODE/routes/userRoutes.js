const router = require('express').Router();

const { getProfile } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.get("/profile", isAuthenticatedUser, getProfile);


module.exports = router;