const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Expense } = require("../models/expense");
const { validateAmount, validateDate, validateRemarks, validateTagId } = require("../utils/validator");
const Tag = require("../models/tag");

exports.addExpenseScreen = catchAsyncErrors(async (req, res, next) => {
    const tags = await Tag.findAll({ raw: true });
    res.render("addExpense", { user: req.session.user, tags: tags, addExpense: true });
});

exports.addExpense = catchAsyncErrors(async (req, res, next) => {
    const { amount, date, remarks, tagId } = req.body;
    const emailId= req.session.user.emailId;
    validateAmount(amount);
    validateDate(date);
    validateRemarks(remarks);
    validateTagId(tagId);
    const expense = await Expense.create({ amount, date, remarks, tagId,emailId });
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

exports.deleteExpense = catchAsyncErrors(async (req, res, next) => {
    const expense = await Expense.findByPk(req.params.id);
    await expense.destroy();
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

    res.redirect("/");
});