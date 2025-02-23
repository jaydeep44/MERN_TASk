import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // Fetch URI from .env
    if (!uri) throw new Error("MongoDB connection URI is missing!");

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Could not connect to MongoDB", error.message);
    process.exit(1);
  }
};

export default connectDB;
