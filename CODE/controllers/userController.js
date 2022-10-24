const { User } = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { validateName, validateEmail } = require("../utils/validator");
const { passwordGenerator } = require("../utils/passwordGenerator");
const { sendVerificationEmail } = require('../utils/mailer');
const ErrorHandler = require("../utils/errorHandler");
const { hash } = require("../utils/encrypt");

// Register a new user
exports.register = catchAsyncErrors(async (req, res, next) => {
    const { name, email } = req.body;
    validateName(name);
    validateEmail(email);
    const password = passwordGenerator();

    const user = await User.findOne({ where: { emailId: email }, raw: true });
    if (user) {
        throw new ErrorHandler(409, "User already exists");

    }
    const userInserted = await User.create({
        name: name,
        emailId: email,
        password: password
    });


    try {
        await sendVerificationEmail(email, password);
    } catch (err) {
        userInserted.destroy(); // No waiting for destruction
        throw err;
    }

    res.redirect("/login");
});

// Login screen
exports.loginScren = catchAsyncErrors(async (req, res, next) => {
    res.render("login");
});

// Login existing user
exports.login = catchAsyncErrors(async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(new ErrorHandler(400, "Please Enter Email and Password"));
    }
    const emailId = req.body.email;
    const password = hash(emailId + req.body.password);

    const user = await User.findOne({
        where: { emailId: emailId, password: password },
    });
    if (!user) {
        return next(new ErrorHandler(400, "Invalid Username or Password"));
    }

    req.session.user = { name: user.name, emailId: user.emailId };
    res.redirect("/dashboard");
});

// User Dasboard
exports.dashboard = catchAsyncErrors(async (req, res, next) => {
    res.render("dashboard", { user: req.session.user });
});
