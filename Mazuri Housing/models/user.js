// models/user.js
const db = require('../config/db'); // Import the database configuration

const User = {
    create: (user, callback) => {
        db.query('INSERT INTO users SET ?', user, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results.insertId); // Return the new user's ID
        });
    },
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results[0]); // Return the first result (user)
        });
    },
    findById: (id, callback) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results[0]); // Return the first result (user)
        });
    },
};

module.exports = User;
