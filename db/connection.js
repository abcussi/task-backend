const mongoose = require('mongoose');
const { connectionString, options } = require('./database'); // Adjust the path

mongoose.Promise = require('bluebird'); // Set Bluebird as the promise library

// Initialize the MongoDB connection and setup event listeners
function initializeMongooseConnection() {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established successfully.');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected.');
  });

  // Connect to MongoDB using the standard mongoose connect function
  mongoose.connect(connectionString, options);
}

// Export the initialize function and mongoose
module.exports = { initializeMongooseConnection, mongoose };