import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Db_url, {
      dbName: "Chatbot",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDb;