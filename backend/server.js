// Import required modules
// const functions = require('firebase-functions');
const express = require('express');                 // Express framework for creating the server
const bodyParser = require('body-parser');         // Middleware to parse request bodies
const cors = require('cors');                      // Middleware to allow cross-origin requests
const path = require('path');                      // Built-in module to handle file paths
const fs = require('fs');                          // Built-in module to interact with the file system
const analyzeRoute = require('./routes/analyze');  // Importing the analyze route module
const enhanceRoute = require('./routes/enhanceResume');
const statsRoutes = require('./routes/stats');      // Importing the stats route module
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

// Initialize the Express application
const app = express();                             // Create an Express application instance
const PORT = process.env.PORT;            // Define the port the server will listen on

// Middleware setup
app.use(cors({
  origin: ["https://resume-ai-analyzer-alpha.vercel.app"], // allow frontend domain
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["*"], // Allow all headers
}));                               // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());                        // Parse incoming JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data from forms

// Define routes
app.use('/api/analyze', analyzeRoute);             // Mount the analyze route on '/api/analyze'
app.use('/api/enhance', enhanceRoute);
app.use("/api/stats", statsRoutes);

// Start the server
app.listen(PORT, () => {                           // Start listening on the defined port
  console.log(`✅ Backend server running at http://localhost:${PORT}`); // Log success message
});