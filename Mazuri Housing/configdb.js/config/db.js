// config/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Create the MySQL connection using environment variables from the .env file
// Removed duplicate db declaration and connection logic

const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost", // Your DB host
    user: process.env.DB_USER || "root", // Your DB user
    password: process.env.DB_PASSWORD || "", // Your DB password
    database: process.env.DB_NAME || "mazuri_housing", // Your DB name
});

module.exports = db.promise(); // Using promises with MySQL2


