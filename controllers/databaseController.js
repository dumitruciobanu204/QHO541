const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = connectToDatabase;