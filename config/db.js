// db.js
import mongoose from "mongoose";

const dbUrl = process.env.MONGODB_URL;

export const connectDB = () => {
  // Connect to MongoDB
  mongoose.connect(dbUrl);

  // Get the connection instance
  const dbConnection = mongoose.connection;

  // Handle the "connected" event
  dbConnection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });

  // Handle the "disconnected" event
  dbConnection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

  // Handle the "error" event
  dbConnection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
};
