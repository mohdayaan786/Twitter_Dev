const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Twitter_Dev");
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connect;
