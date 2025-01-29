import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) return res.status(401).json({ message: "Please Login!!!" });

    const decode = jwt.verify(token, process.env.Jwt_sec);
    console.log(decode); // Debug the payload
    
    req.user = await User.findById(decode._id);

    next();
  } catch (error) {
    console.error("Auth Error:", error.message); // Log the error
    res.status(500).json({
      message: "Login First!",
    });
  }
};
