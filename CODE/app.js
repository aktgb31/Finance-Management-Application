const express = require('express');
const errorHandler = require('./middlewares/error');
const session = require('express-session');
const { SESSION } = require('./config');
const path = require('path');
const hbs = require('hbs');
const defaultRoutes = require('./routes/routes');
// const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const app = express();

app.use(
    session({
        secret: SESSION.secret,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        }
    })
)

app.use(express.urlencoded({ extended: true }));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes


// app.use('/user',userRoutes);
app.use('/expense', expenseRoutes);
app.use('/', defaultRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;