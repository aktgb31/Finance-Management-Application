const express = require('express');
const errorHandler = require('./middlewares/error');
const session = require('express-session');
const { SESSION } = require('./config');
const path = require('path');
const hbs = require('hbs');
const defaultRoutes = require('./routes/otherRoutes');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const { json, equals } = require('./utils/hbsHelpers');
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// Hbs register json helper
hbs.registerHelper('json', json);
hbs.registerHelper('equals', equals)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Routes
app.use('/user', userRoutes);
app.use('/user', express.static(path.join(__dirname, 'public')));
app.use('/expense', expenseRoutes);
app.use('/expense', express.static(path.join(__dirname, 'public')));
app.use('/', defaultRoutes);
app.use('/', express.static(path.join(__dirname, 'public')));
// Error Handler
app.use(errorHandler);

module.exports = app;