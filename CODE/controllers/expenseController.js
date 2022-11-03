const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Expense } = require("../models/expense");
const { validateAmount, validateDate, validateRemarks, validateTagId } = require("../utils/validator");
const Tag = require("../models/tag");
const { getMessage } = require("../utils/message");

exports.addExpenseScreen = catchAsyncErrors(async (req, res, next) => {
    const tags = await Tag.findAll({ raw: true });
    const message = getMessage(req);
    res.render("addExpense", { user: req.session.user, tags: tags, addExpense: true, message });
});

exports.addExpense = catchAsyncErrors(async (req, res, next) => {
    const { amount, date, remarks, tagId } = req.body;
    const [dd, mm, yyyy] = date.split('/');
    const iDate = mm + "/" + dd + "/" + yyyy;
    const emailId = req.session.user.emailId;
    validateAmount(amount);
    validateDate(date);
    validateRemarks(remarks);
    validateTagId(tagId);
    const expense = await Expense.create({ amount, date: iDate, remarks, tagId, userEmailId: emailId });
    req.session.message = { success: true, text: "Expense Added Succesfully" };
    res.redirect("/expense/add")
});

exports.getExpenses = async () => {
    const expenses = await Expense.findAll({ where: { userEmailId: req.session.user.emailId, raw: true } });
    return expenses;
};

exports.getExpensesByEmail = async (emailId) => {
    const expenses = (await Expense.findAll({ where: { userEmailId: emailId }, order: [['date', 'DESC']], include: Tag, nest: true, raw: true }));
    return expenses;
};
exports.getExpensesByTagEmail = async (emailId, tag) => {
    const expenses = (await Expense.findAll({ where: { userEmailId: emailId, tagId: tag }, order: [['date', 'DESC']], include: Tag, nest: true, raw: true }));
    return expenses;
};

exports.deleteExpense = catchAsyncErrors(async (req, res, next) => {
    const expense = await Expense.findByPk(req.params.id);
    await expense.destroy();
    req.session.message = { success: true, text: "Expense Deleted Succesfully" };
    res.redirect("/");
});

exports.updateExpense = catchAsyncErrors(async (req, res, next) => {
    const { amount, date, remarks, tagId } = req.body;
    validateAmount(amount);
    validateDate(date);
    validateRemarks(remarks);
    validateTagId(tagId);
    const expense = await Expense.findByPk(req.params.id);
    await expense.update({ amount, date, remarks, tagId });
    req.session.message = { success: true, text: "Expense Updated Succesfully" };
    res.redirect("/");
});