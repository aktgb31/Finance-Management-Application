const { DataTypes } = require("sequelize");
const Db = require("../config/database");

// Expense Model
const Expense = Db.define("expense", {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    remarks:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{ timestamps: false });

exports.Expense = Expense;
