// Import necessary packages
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(morgan('dev')); // Logs HTTP requests to the console
app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
  res.send('Mazuri Housing API is running...');
});

// Import routes
const authRoutes = require('./routes/auth');

// Use imported routes
app.use('/api/auth', authRoutes);

// Set up static file serving (for frontend assets if any)
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware (if any route does not match)
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

// Start the server
const PORT = process.env.PORT || 5000; // Use the port defined in .env, or default to 5000
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
// Export the app for testing or further configuration if needed
module.exports = app;



