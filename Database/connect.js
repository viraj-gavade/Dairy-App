// Import required module
const mongoose = require('mongoose');

/**
 * Establish connection to MongoDB database
 * @param {string} url - MongoDB connection string
 * @returns {Promise} Mongoose connection promise
 */
const connectDB = async (url) => {
    try {
        // MongoDB connection options
        const connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        // Attempt to connect to the database
        await mongoose.connect(url, connectionOptions);

        // Log successful connection
        console.log('MongoDB connection established successfully');

        // Return the mongoose connection
        return mongoose.connection;
    } catch (error) {
        // Log detailed connection error
        console.error('MongoDB connection error:', error.message);

        // Exit the process with failure status
        process.exit(1);
    }
};

module.exports = connectDB;