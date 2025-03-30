// Import necessary modules
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

// Import routes
const authRoutes = require('./routes/auth');
const dataRoutes = require("./routes/data");

// Use imported routes
app.use('/api/auth', authRoutes);
app.use("/api/data", dataRoutes);

// Serve all frontend files from the "Mazuri Housing" directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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
  console.log(`Server running on: http://localhost:${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is starting...`);
  console.log(`Server running on http://localhost:${PORT}`);
});
