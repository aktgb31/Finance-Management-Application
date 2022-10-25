const { addExpense, addExpenseScreen, updateExpense, deleteExpense } = require('../controllers/expenseController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/add', isAuthenticatedUser, addExpenseScreen);

router.post('/add', isAuthenticatedUser, addExpense);

router.put('/:id', isAuthenticatedUser, updateExpense);

router.delete('/:id', isAuthenticatedUser, deleteExpense);

module.exports = router;