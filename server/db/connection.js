// db/connection.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',  // XAMPP's default root password is blank
//     database: 'goagamesblue',
//     port: 3306
// });

// const pool = mysql.createPool({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'matka',
//     port: process.env.DB_PORT || 3306,
//     // timezone: '+05:30'
// });

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'myuser',
    password: process.env.DB_PASSWORD || 'mypassword',
    database: process.env.DB_NAME || 'matka',
    port: process.env.DB_PORT || 3306,
});

export default pool;
