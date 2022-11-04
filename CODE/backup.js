// Nodejs script to backup mysql database
const dotenv = require("dotenv");
const envFound = dotenv.config();
const { exec } = require("child_process");

if (envFound.error) {
    throw new Error("Couldn't find env file");
}

const DATABASE = {
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
};

const backupDatabase = () => {
    const fileName = `backups/${DATABASE.name}-${new Date().toISOString()}_dump.sql`;
    exec(`mysqldump -u ${DATABASE.user} --password=${DATABASE.pass} ${DATABASE.name} >${fileName} --no-tablespaces`, function (error, stdout, stderr) {
        if (error) {
            console.log(error);
        }
        console.log("Database backed up successfully");
    });
}

backupDatabase();