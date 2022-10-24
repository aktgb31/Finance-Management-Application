const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// To stop already logined user from accessing login and register page
exports.isLoginedUser = catchAsyncErrors(async (req, res, next) => {
    if (req.session && req.session.user)
        return res.redirect('/');
    else return next();
});

// To stop not logined user from accessing other features
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    if (req.session && req.session.user) return next();
    else return res.redirect("/login");
});