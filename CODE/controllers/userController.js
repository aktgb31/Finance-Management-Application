const { User } = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { validateName, validateEmail } = require("../utils/validator");
const { passwordGenerator } = require("../utils/passwordGenerator");
const { sendVerificationEmail } = require('../utils/mailer');
const ErrorHandler = require("../utils/errorHandler");
const { hash } = require("../utils/encrypt");
const { getExpensesByEmail, getExpensesByTagEmail } = require("./expenseController");
const Tag = require("../models/tag");
const { getMessage } = require("../utils/message");

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
    req.session.message = { success: true, text: "Registeration Succesfull. Your password is sent to your email id." };
    res.redirect("/login");
});

// Login screen
exports.loginScren = catchAsyncErrors(async (req, res, next) => {
    const message = getMessage(req);
    res.render("login", { message });
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
    req.session.message = { success: true, text: "Login Succesfull" };
    res.redirect("/");
});

// Logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
    // req.session.destroy();
    // res.clearCookie("connect.sid");
    req.session.user = null;
    req.session.message = { success: true, text: "Logout Succesfull" };
    res.on('finish', req.session.destroy);
    res.redirect("/login");
});

// User Dasboard
exports.dashboard = catchAsyncErrors(async (req, res, next) => {
    const [expenses, tags] = await Promise.all([getExpensesByEmail(req.session.user.emailId), Tag.findAll({ raw: true })]);
    const message = getMessage(req);
    res.render("dashboard", { user: req.session.user, expenses: expenses, tags: tags, dashboard: true, filter: false, message });
});


exports.filteredDashboard = catchAsyncErrors(async (req, res, next) => {
    const { tag } = req.body;
    if (tag == "All") {
        res.redirect("/");
    }
    const [expenses, tags] = await Promise.all([getExpensesByTagEmail(req.session.user.emailId, tag), Tag.findAll({ raw: true })]);
    const message = getMessage(req);
    res.render("dashboard", { user: req.session.user, expenses: expenses, tags: tags, dashboard: true, filter: true, message });
});


// User Profile
exports.getProfile = catchAsyncErrors(async (req, res, next) => {
    const message = getMessage(req);
    res.render("profile", { user: req.session.user, profile: true, message });
});

//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const { name, emailId, password } = req.body;
    validateName(name);
    const profile = await User.findByPk(emailId);
    if (password === "") {
        await profile.update({ name: name });
    }
    else {
        await profile.update({ password: password, name: name });
    }
    req.session.user = { name: name, emailId: emailId };
    req.session.message = { success: true, text: "Profile Updated Succesfully" };
    res.redirect("/user/profile")
});

//delete user profile
exports.deleteProfile = catchAsyncErrors(async (req, res, next) => {
    const profile = await User.findByPk(req.session.user.emailId);
    profile.destroy();
    // req.session.destroy();
    // res.clearCookie("connect.sid");
    req.session.user = null;
    req.session.message = { success: true, text: "Profile Deleted Succesfully" };
    res.on('finish', req.session.destroy);
    res.redirect("/login");
});

// Get forgot password screen
exports.getForgotPassword = catchAsyncErrors(async (req, res, next) => {
    const message = getMessage(req);
    res.render("forgotPassword", { forgotPassword: true, message });
});

// User forgot password 
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const emailId = req.body.email;
    const user = await User.findByPk(emailId);
    if (!user) {
        throw new ErrorHandler(400, "Invalid Email");
    }
    const password = passwordGenerator();
    await user.update({ password: password });
    await sendVerificationEmail(emailId, password);
    req.session.message = { success: true, text: "Password Reset Succesfull. Your password is sent to your email id." };
    res.redirect("/login");
});