require('dotenv').config();
const { Pool } = require('pg');

// Database connection configuration
const db = {
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
host: process.env.DB_HOST,
port: process.env.DB_PORT,
database: process.env.DB_NAME,
};  

const pool = new Pool(db);
module.exports = pool