const { DataTypes } = require("sequelize");
const Db = require("../config/database");

// Tag Model
const Tag = Db.define("tag", {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    multiplier:{
        type:DataTypes.ENUM("1","-1"),
        allowNull: false,
    }
},{ timestamps: false });

Tag.hasMany(Expense,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

exports.Tag = Tag;
