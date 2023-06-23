// require("dotenv").config();

const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.DBUSER,
    password:  process.env.DBPASSWORD,
    host :  process.env.DBHOST,
    port:  process.env.DBPORT,
    database:  process.env.DBDATABASE
});

module.exports = pool;

//Because the app is the single source of thruth, you do not need to keep importing the dotenv config.