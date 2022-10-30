const router = require('express').Router();

const { getProfile, logout } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.get("/profile", isAuthenticatedUser, getProfile);

router.post("/logout", isAuthenticatedUser, logout);

module.exports = router;