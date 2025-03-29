const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/index"); // Import the routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(morgan("dev")); // Log HTTP requests
app.use(cors()); // Enable cross-origin resource sharing
app.use(bodyParser.json()); // Parse incoming JSON payloads

// Use the routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
