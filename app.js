const express = require('express');
const { MemoryStore } = require('express-session');
const errorHandler = require('./middlewares/error');

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store:MemoryStore,
        rolling: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        }
    })
)

app.use(express.urlencoded({ extended: true }));

// Routes

// Error Handler
app.use(errorHandler);

module.exports=app;