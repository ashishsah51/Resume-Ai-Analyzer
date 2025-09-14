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

// Define the path to the uploads folder
const uploadPath = path.join(__dirname, 'uploads'); // Resolve the full path to "uploads" folder

// Check if the uploads folder exists; if not, create it
if (!fs.existsSync(uploadPath)) {                  // Check if uploads folder does not exist
  fs.mkdirSync(uploadPath);                        // Create the uploads folder
}

// Middleware setup
app.use(cors());                                   // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());                        // Parse incoming JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data from forms
app.options("*", cors());

// Define routes
app.use('/api/analyze', analyzeRoute);             // Mount the analyze route on '/api/analyze'
app.use('/api/enhance', enhanceRoute);
app.use("/api/stats", statsRoutes);


// Export as a Firebase Function
// exports.api = functions.https.onRequest(app);

// Start the server
app.listen(PORT, () => {                           // Start listening on the defined port
  console.log(`✅ Backend server running at http://localhost:${PORT}`); // Log success message
});


// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const analyzeRoute = require("./routes/analyze");
// const enhanceRoute = require("./routes/enhanceResume");
// const statsRoutes = require("./routes/stats");

// const app = express();

// // ✅ CORS middleware
// app.use(
//   cors({
//     origin: [
//       "http://localhost:8080", // local dev
//       "https://resume-ai-analyzer-alpha.vercel.app", // your frontend prod
//     ],
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.options("*", cors());

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Routes
// app.use("/api/analyze", analyzeRoute);
// app.use("/api/enhance", enhanceRoute);
// app.use("/api/stats", statsRoutes);

// // ✅ Export app instead of app.listen for Vercel
// module.exports = app;
