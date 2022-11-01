const { addExpense, addExpenseScreen, updateExpense, deleteExpense } = require('../controllers/expenseController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/add', isAuthenticatedUser, addExpenseScreen);

router.post('/add', isAuthenticatedUser, addExpense);

router.post('/update/:id', isAuthenticatedUser, updateExpense);

router.post('/delete/:id', isAuthenticatedUser, deleteExpense);

module.exports = router;