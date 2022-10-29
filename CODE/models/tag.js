const { DataTypes } = require("sequelize");
const Db = require("../config/database");

// Tag Model
const Tag = Db.define("tag", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        // autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    multiplier: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validator: {
            isIn: {
                args: [[1, -1]],
                msg: "Multiplier can only be 1 or -1"
            }
        }
    }
}, { timestamps: false });

module.exports = Tag;
