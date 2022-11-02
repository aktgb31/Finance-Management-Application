const router = require('express').Router();

const { getProfile, logout, getForgotPassword, forgotPassword, updateProfile } = require('../controllers/userController');
const { isAuthenticatedUser, isLoginedUser } = require('../middlewares/auth');

router.get("/profile", isAuthenticatedUser, getProfile);

router.post("/profile", isAuthenticatedUser, updateProfile);

router.post("/logout", isAuthenticatedUser, logout);

router.get("/forgotPassword", isLoginedUser, getForgotPassword);

router.post("/forgotPassword", isLoginedUser, forgotPassword);

module.exports = router;