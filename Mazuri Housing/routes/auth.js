// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
require('dotenv').config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// User Registration
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user
        User.create({ name, email, password: hashedPassword }, (err, userId) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).json({ message: 'Error registering user' });
            }

            res.status(201).json({ message: 'User registered successfully', userId });
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// User Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user by email
    User.findByEmail(email, async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
});

module.exports = router;
