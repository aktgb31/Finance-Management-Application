const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Expense } = require("../models/expense");
const { validateAmount, validateDate, validateRemarks, validateTagId } = require("../utils/validator");


exports.addExpenseScreen = catchAsyncErrors(async (req, res, next) => {
    res.render("addExpense");
});

exports.addExpense = catchAsyncErrors(async (req, res, next) => {
    const { amount, date, remarks, tagId } = req.body;
    validateAmount(amount);
    validateDate(date);
    validateRemarks(remarks);
    validateTagId(tagId);
    const expense = await Expense.create({ amount, date, remarks, tagId });
});

exports.getExpenses = catchAsyncErrors(async (req, res, next) => {
    const expenses = await Expense.findAll({ where: { userEmailId: req.session.user.emailId } });
    res.json(expenses);
});

exports.getExpensesByEmail = catchAsyncErrors(async (req, res, next) => {
    const expenses = await Expense.findByPk(req.params.emailId);
    res.json(expenses);
});

exports.deleteExpense = catchAsyncErrors(async (req, res, next) => {
    const expense = await Expense.findByPk(req.params.id);
    await expense.destroy();
});

exports.updateExpense = catchAsyncErrors(async (req, res, next) => {
    const { amount, date, remarks, tagId } = req.body;
    validateAmount(amount);
    validateDate(date);
    validateRemarks(remarks);
    validateTagId(tagId);
    const expense = await Expense.findByPk(req.params.id);
    await expense.update({ amount, date, remarks, tagId });
});