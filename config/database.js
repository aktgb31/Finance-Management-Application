const dotenv = require("dotenv");
const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't find env file");
}

const Sequelize = require("sequelize");

const DATABASE= {
    name: process.env.DATABASE_NAME,
    uri: process.env.DATABASE_URI,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
};

const Db = new Sequelize(DATABASE.name, DATABASE.user, DATABASE.pass, {
    host: DATABASE.uri,
    dialect: "mysql",
    logging: false,
});

module.exports = Db;