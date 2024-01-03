const mysql = require('mysql2/promise');
require('dotenv').config();

const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DB = process.env.MYSQL_DB;

const connection = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
});


module.exports = connection;