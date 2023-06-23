require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

// Check the connection
pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error connecting to MySQL server:', error);
    return;
  }
  console.log('Connected to MySQL server!');
  connection.release(); // Release the connection
});

module.exports = pool.promise();