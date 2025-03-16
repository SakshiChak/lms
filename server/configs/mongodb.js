import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Set event listeners for connection status
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully.");
        });

        mongoose.connection.on("error", (error) => {
            console.error("Database connection error:", error);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Database disconnected.");
        });

        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/lms`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connection established.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;
