const express = require('express');               // Express framework for creating the server
const bodyParser = require('body-parser');         // Middleware to parse request bodies
const cors = require('cors');                           // Built-in module to interact with the file system
const analyzeRoute = require('./routes/analyze');  // Importing the analyze route module
const enhanceRoute = require('./routes/enhanceResume');
const statsRoutes = require('./routes/stats');      // Importing the stats route module

// Initialize the Express application
const app = express();
const PORT = process.env.PORT;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/api/analyze', analyzeRoute);
app.use('/api/enhance', enhanceRoute);
app.use("/api/stats", statsRoutes);


// Start the server
app.listen(PORT, () => {                           
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
