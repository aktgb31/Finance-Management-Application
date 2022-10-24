const { DataTypes } = require("sequelize");
const Db = require("../config/database");
const { hash } = require("../utils/encrypt");
const { Expense } = require("./expense");

// User Model
const User = Db.define("user", {
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue("password", hash(this.emailId + value));
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{ timestamps: false });

User.hasMany(Expense,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

exports.User = User;
