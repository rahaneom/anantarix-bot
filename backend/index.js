import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";

dotenv.config();

const app = express();

// using middleware
app.use(express.json());
app.use(cors());

// importing routes
import userRoutes from "./routes/userRoute.js";
import chatRoutes from "./routes/chatRoutes.js";

// using routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// console.log(process.env.Gmail, process.env.Password);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDb();
});
