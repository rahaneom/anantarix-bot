import sendMail from "../middlewares/sendMail.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      user = await User.create({ email });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const verifyToken = jwt.sign({ user, otp }, process.env.Activation_sec, {
      expiresIn: "15m",
    });

    await sendMail(email, "ChatBot", otp);

    res.json({
      message: "Otp send to your mail",
      verifyToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;
    console.log("Activation Secret:", process.env.Activation_sec);
    const verify = jwt.verify(verifyToken, process.env.Activation_sec);
    console.log("Decoded Token:", verify);

    if (!verify)
      return res.status(400).json({
        message: "Otp Expired",
      });

    if (verify.otp !== otp)
      return res.status(400).json({
        message: "Wrong otp",
      });

    const token = jwt.sign({ _id: verify.user._id }, process.env.Jwt_sec, {
      expiresIn: "5d",
    });

    res.json({
      message: "Logged in successfully",
      user: verify.user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const myProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
